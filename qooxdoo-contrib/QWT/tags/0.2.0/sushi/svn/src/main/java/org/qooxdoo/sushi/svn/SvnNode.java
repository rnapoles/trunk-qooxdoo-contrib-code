/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.svn;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.qooxdoo.sushi.io.DeleteException;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Filesystem;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.LastModifiedException;
import org.qooxdoo.sushi.io.LengthException;
import org.qooxdoo.sushi.io.ListException;
import org.qooxdoo.sushi.io.Misc;
import org.qooxdoo.sushi.io.MkdirException;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.SetLastModifiedException;
import org.tmatesoft.svn.core.SVNCommitInfo;
import org.tmatesoft.svn.core.SVNDirEntry;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNLogEntry;
import org.tmatesoft.svn.core.SVNLogEntryPath;
import org.tmatesoft.svn.core.SVNNodeKind;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.internal.io.dav.DAVRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.fs.FSRepositoryFactory;
import org.tmatesoft.svn.core.io.ISVNEditor;
import org.tmatesoft.svn.core.io.SVNFileRevision;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;
import org.tmatesoft.svn.core.io.diff.SVNDeltaGenerator;
import org.tmatesoft.svn.core.wc.ISVNStatusHandler;
import org.tmatesoft.svn.core.wc.SVNClientManager;
import org.tmatesoft.svn.core.wc.SVNStatus;
import org.tmatesoft.svn.core.wc.SVNStatusType;
import org.tmatesoft.svn.core.wc.SVNWCUtil;

public class SvnNode extends Node {
    private static final char SEPARATOR_CHAR = '/';
    public static final String SEPARATOR = "" + SEPARATOR_CHAR;
    public static final int SEPARATOR_LENGTH = 1;
    private static final Filesystem FS = new Filesystem("svn:/", SEPARATOR_CHAR);
    
    static {
        FSRepositoryFactory.setup();
        DAVRepositoryFactory.setup();
    }

    //--
    
    public static SvnNode create(IO io, String url) throws SVNException {
        return create(io, url, null, null);
    }

    public static SvnNode create(IO io, String url, String username, String password) throws SVNException {
        SVNRepository repository;
        String root;
        String path;
        
        if (url.endsWith(SEPARATOR)) {
            throw new IllegalArgumentException(url);
        }
        repository = repository(SVNURL.parseURIEncoded(url), username, password);
        root = repository.getRepositoryRoot(true).toString();
        path = repository.getLocation().toString();
        if (root.equals(path)) {
            path = "";
        } else {
            root = root + "/";
            if (!path.startsWith(root)) {
                throw new IllegalArgumentException(root + "+" + path);
            }
            repository.setLocation(SVNURL.parseURIEncoded(root), true);
            path = path.substring(root.length());
        }
        return create(io, repository, path);
    }
    
    private static SVNRepository repository(SVNURL url, String username, String password) throws SVNException {
        SVNRepository repository;
        
        repository = SVNRepositoryFactory.create(url);
        repository.setAuthenticationManager(SVNWCUtil.createDefaultAuthenticationManager(
                SVNWCUtil.getDefaultConfigurationDirectory(),
                username, password, 
                false /* do not store credentials, not even when configured */));
        return repository;
    }
    
    public static SvnNode create(IO io, SVNRepository repository, String path) throws SVNException {
        return new SvnNode(io, repository, repository.checkPath(path, -1) == SVNNodeKind.DIR, path);
    }

    //--
    
    private final SVNRepository repository;
    private final boolean directory;
    private final String path;
    private String comment;
    
    public SvnNode(IO io, SVNRepository repository, boolean directory, String path) {
        super(io, FS);
        if (path.startsWith(SEPARATOR)) {
            throw new IllegalArgumentException(path);
        }
        if (path.endsWith(SEPARATOR)) {
            throw new IllegalArgumentException(path);
        }
        this.repository = repository;
        this.directory = directory;
        this.path = path;
        this.comment = "sushi commit";
    }
    
    /** use when closing an output stream */
    public void setComment(String comment) {
        this.comment = comment;
    }
    
    public SVNRepository getRepository() {
        return repository;
    }
    
    @Override
    public Node getBase() {
        return null;
    }
    
    @Override
    public SvnNode newInstance(String path) {
        try {
            return create(io, repository, path);
        } catch (SVNException e) {
            throw new RuntimeException("TODO", e);
        }
    }

    @Override
    public String getPath() {
        return path;
    }
    
    @Override
    public List<SvnNode> list() throws ListException {
        List<SVNDirEntry> lst;
        List<SvnNode> result;
        SVNDirEntry entry;
        
        try {
            if (repository.checkPath(path, -1) != SVNNodeKind.DIR) {
                return null;
            }
            lst = new ArrayList<SVNDirEntry>();
            repository.getDir(path, -1, false, lst);
            result = new ArrayList<SvnNode>(lst.size());
            for (int i = 0; i < lst.size(); i++) {
                entry = lst.get(i);
                result.add(new SvnNode(io, repository, entry.getKind() == SVNNodeKind.DIR, join(path, entry.getRelativePath())));
            }
            return result;
        } catch (SVNException e) {
            throw new ListException(this, e);
        }
    }
    
    public long getLatestRevision() throws SVNException {
        List<Long> revs;
        SVNDirEntry dir;
        
        if (directory) {
            dir = repository.getDir(path, -1, false, new ArrayList<Object>());
            return dir.getRevision();
        } else {
            revs = getRevisions();
            return revs.get(revs.size() - 1);
        }
    }

    public List<Long> getRevisions() throws SVNException {
        return getRevisions(0);
    }
    
    public List<Long> getRevisions(long start) throws SVNException {
        return getRevisions(start, repository.getLatestRevision());
    }

    public List<Long> getRevisions(long start, long end) throws SVNException {
        Collection<SVNFileRevision> revisions;
        List<Long> result;
        
        revisions = (Collection<SVNFileRevision>) repository.getFileRevisions(path, null, start, end);
        result = new ArrayList<Long>();
        for (SVNFileRevision rev : revisions) {
            result.add(rev.getRevision());
        }
        return result;
    }

    @Override
    public InputStream createInputStream() throws IOException {
        FileNode tmp;
        OutputStream dest;
        
        tmp = io.createTempFile();
        dest = tmp.createOutputStream();
        try {
            load(dest);
        } catch (SVNException e) {
            throw Misc.exception("svn failure", e);
        }
        dest.close();
        return tmp.createInputStream();
    }
    
    @Override
    public OutputStream createOutputStream() throws IOException {
        return new ByteArrayOutputStream() {
            @Override
            public void close() throws IOException {
                super.close();
                try {
                    save(toByteArray(), comment);
                } catch (SVNException e) {
                    throw Misc.exception("close failed", e);
                }
            }
        };
    }

    @Override
    public SvnNode delete() throws DeleteException {
        try {
            if (!exists()) {
                throw new DeleteException(this, new FileNotFoundException());
            }
            delete("sushi delete");
        } catch (ExistsException e) {
            throw new DeleteException(this, e);
        } catch (SVNException e) {
            throw new DeleteException(this, e);
        }
        return this;
    }
    
    /** @return revision */ 
    public long delete(String comment) throws SVNException {
        ISVNEditor editor;
        SVNCommitInfo info;
        
        editor = repository.getCommitEditor(comment, null);
        editor.openRoot(-1);
        editor.deleteEntry(path, -1);
        editor.closeDir();
        info = editor.closeEdit();
        return info.getNewRevision();
    }
    
    @Override
    public Node mkdir() throws MkdirException {
        ISVNEditor editor;

        try {
            editor = repository.getCommitEditor("sushi delete", null);
            editor.openRoot(-1);
            editor.addDir(path, null, -1);
            editor.closeDir();
            editor.closeDir();
            editor.closeEdit();
            return this;
        } catch (SVNException e) {
            throw new MkdirException(this, e);
        }
    }
    
    public long load(OutputStream dest) throws SVNException, FileNotFoundException {
        return load(repository.getLatestRevision(), dest);
    }

    public long load(long revision, OutputStream dest) throws FileNotFoundException, SVNException {
        if (repository.checkPath(path, revision) != SVNNodeKind.FILE) {
            throw new FileNotFoundException("no such file: " + path + ", revision " + revision);
        }
        return repository.getFile(path, revision, null, dest);
    }

    @Override
    public boolean exists() throws ExistsException {
        try {
            return exists(repository.getLatestRevision());
        } catch (SVNException e) {
            throw new ExistsException(this, e);
        }
    }
    
    public boolean exists(long revision) throws SVNException {
        SVNNodeKind kind;
        
        kind = repository.checkPath(path, revision);
        return kind == SVNNodeKind.FILE || kind == SVNNodeKind.DIR;
    }

    @Override
    public long length() throws LengthException {
        try {
            return repository.info(path, -1).getSize();
        } catch (SVNException e) {
            throw new LengthException(this, e);
        }
    }
    
    @Override
    public boolean isFile() throws ExistsException {
        return kind() == SVNNodeKind.FILE;
    }

    @Override
    public boolean isDirectory() throws ExistsException {
        return kind() == SVNNodeKind.DIR;
    }
    
    private SVNNodeKind kind() throws ExistsException {
        try {
            return repository.checkPath(path, repository.getLatestRevision());
        } catch (SVNException e) {
            throw new ExistsException(this, e);
        }
    }

    @Override
    public long lastModified() throws LastModifiedException {
        try {
            return repository.info(path, -1).getDate().getTime();
        } catch (SVNException e) {
            throw new LastModifiedException(this, e);
        }
    }

    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        throw new SetLastModifiedException(this);
    }
    

    /** @return revision */
    public long save(byte[] content, String comment) throws SVNException {
        return save(new ByteArrayInputStream(content), comment);
    }
    
    /** @return revision */ 
    public long save(InputStream content, String comment) throws SVNException {
        boolean exists;
        ISVNEditor editor;
        SVNCommitInfo info;
        SVNDeltaGenerator deltaGenerator;
        String checksum;
        
        try {
            exists = exists();
        } catch (ExistsException e) {
            throw (SVNException) e.getCause();
        }
        editor = repository.getCommitEditor(comment, null);
        editor.openRoot(-1);
        if (exists) {
            editor.openFile(path, -1);
        } else {
            editor.addFile(path, null, -1);
        }
        editor.applyTextDelta(path, null);
        deltaGenerator = new SVNDeltaGenerator();
        checksum = deltaGenerator.sendDelta(path, content, editor, true);
        editor.closeFile(path, checksum);
        editor.closeDir();
        info = editor.closeEdit();
        return info.getNewRevision();
    }
    
    @Override
    public boolean equalsNode(Node node) {
        return repository == ((SvnNode) node).repository;
    }

    //--
    
    // TODO
    public static String join(String left, String right) {
        if (left.length() == 0) {
            return right;
        }
        return left + SEPARATOR + right;
    }

    public long export(Node dest) throws IOException, SVNException {
        long latest;
        
        latest = getLatestRevision();
        export(dest, latest);
        return latest;
    }

    public void export(Node dest, long revision) throws IOException, SVNException {
        Exporter exporter;
        SVNRepository sub;
        
        this.checkDirectory();
        dest.checkDirectory();
        exporter = new Exporter(revision, dest);
        if (path.length() == 0) {
            sub = repository;
        } else {
            // repository updates has a target to restrict the result, but it supports
            // only one segment. So I have to create a new repository ...
            sub = repository(repository.getLocation().appendPath(path, true), null, null); // TODO: auth
        }
        sub.update(revision, "", true, exporter, exporter);
    }
    
    // --

    public String changelog(long startRevision, String viewvc) throws SVNException {
        StringBuilder result;
        
        result = new StringBuilder();
        changelog(startRevision, viewvc, result);
        return result.toString();
    }
    
    /** @return revision */
    public long changelog(long startRevision, String viewvc, StringBuilder result) throws SVNException {
        Collection<SVNLogEntry> changeset;
        
        changeset = queryChanges(startRevision);
        report(viewvc, changeset, result);
        return getRevision(changeset);
    }

    private long getRevision(Collection<SVNLogEntry> entries) {
        long revision;
        
        revision = 0;
        for (SVNLogEntry logEntry : entries) {
            revision = Math.max(revision, logEntry.getRevision());
        }
        return revision;
    }
    
    protected Collection<SVNLogEntry> queryChanges(long startRevision) throws SVNException {
        long endRevision;
        
        endRevision = repository.getLatestRevision();
        if (startRevision > endRevision) {
            // empty log - might happen if "last deployed revision + 1" is passed to this function
            return new ArrayList<SVNLogEntry>();
        }
        return (Collection<SVNLogEntry>) repository.log(new String[] { getPath() }, null, startRevision, endRevision, true, true);
    }

    private void report(String viewvc, Collection<SVNLogEntry> entries, StringBuilder dest) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SVNLogEntryPath entryPath;
        String path;
        
        for (SVNLogEntry entry : entries) {
            dest.append(format.format(entry.getDate())).append(' ').append(entry.getAuthor()).append(' ').
                append(entry.getRevision()).append("\n\n");
            for (String key : (Set<String>) entry.getChangedPaths().keySet()) {
                entryPath = (SVNLogEntryPath) entry.getChangedPaths().get(key);
                path = getPath(entryPath);
                if (path == null) {
                    // file outside this directory that was modified in this change 
                } else {
                    dest.append("  " + entryPath.getType() + " " + toDiff(viewvc, path, entry.getRevision()));
                    dest.append('\n');
                }
            }
            dest.append("\n  ");
            dest.append(entry.getMessage().trim());
            dest.append("\n\n");
        }
    }
    
    private String getPath(SVNLogEntryPath entryPath) {
        String result;
        String path;
        int idx;
        
        result = entryPath.getPath();
        if (!result.startsWith("/")) {
            throw new IllegalArgumentException(result);
        }
        result = result.substring(1);
        path = getPath();
        idx = result.indexOf(path);
        if (idx == -1) {
            return null; // not in this project
        }
        result = result.substring(idx + path.length());
        if (result.equals("")) {
            return ".";
        }
        if (result.startsWith("/")) {
            return result.substring(1);
        }
        return result;
    }
    
    private String toDiff(String viewvc, String path, long revision) {
        if (path.startsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        if (viewvc == null) {
            return path;
        } else {
            if (viewvc.endsWith("/")) {
                throw new IllegalArgumentException(path);
            }
            return path + "\n" + "    " + viewvc + "/" + path + "?r1=" + (revision - 1) + "&r2=" + revision;
        }
    }

    //--
    
    public String checkWorkspace(FileNode basedir) throws SVNException {
        final List<String> local;
        final List<String> remote;
        StringBuilder message;
        SVNClientManager manager;

        local = new ArrayList<String>();
        remote = new ArrayList<String>();
        manager = SVNClientManager.newInstance(SVNWCUtil.createDefaultOptions(true), repository.getAuthenticationManager());
        manager.getStatusClient().doStatus(basedir.getFile(), true /* recursive */, true /* remote - make sure we detect global changes */, 
                    true /* report all */, false /* includeIgnored */, false /* collect parent externals */, new ISVNStatusHandler() {
                        public void handleStatus(SVNStatus status) throws SVNException {
                            SVNStatusType s;

                            s = status.getContentsStatus();
                            if (s != SVNStatusType.STATUS_NONE && s != SVNStatusType.STATUS_NORMAL) {
                                local.add(s.getCode() + " " + status.getFile().getPath());
                            }
                            s = status.getRemoteContentsStatus();
                            if (s != SVNStatusType.STATUS_NONE && s != SVNStatusType.STATUS_NORMAL) {
                                remote.add(s.getCode() + " " + status.getFile().getPath());
                            }
                        }
                    });
        if (local.size() + remote.size() != 0) {
            message = new StringBuilder();
            if (local.size() > 0) {
                message.append("local modifications, please commit you changes:\n");
                for (String file : local) {
                    message.append("  ");
                    message.append(file);
                    message.append('\n');
                }
            }
            if (remote.size() > 0) {
                message.append("remote changes, please update your working copy:\n");
                for (String file : remote) {
                    message.append("  ");
                    message.append(file);
                    message.append('\n');
                }
            }
            return message.toString();
        }
        return null;
    }
}
