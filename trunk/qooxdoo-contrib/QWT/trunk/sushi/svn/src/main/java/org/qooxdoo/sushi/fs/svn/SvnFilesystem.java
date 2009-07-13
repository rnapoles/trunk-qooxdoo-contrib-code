/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.fs.svn;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.RootPathException;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNURL;
import org.tmatesoft.svn.core.internal.io.dav.DAVRepositoryFactory;
import org.tmatesoft.svn.core.internal.io.fs.FSRepositoryFactory;
import org.tmatesoft.svn.core.io.SVNRepository;
import org.tmatesoft.svn.core.io.SVNRepositoryFactory;
import org.tmatesoft.svn.core.wc.SVNWCUtil;

public class SvnFilesystem extends Filesystem {
    static {
        FSRepositoryFactory.setup();
        DAVRepositoryFactory.setup();
        System.setProperty("svnkit.upgradeWC", "false"); // see https://wiki.svnkit.com/SVNKit_specific_system_properties        
    }
    
    private String username;
    private String password;
    
    public SvnFilesystem(IO io) {
        super(io, "svn", '/');
        
        this.username = null;
        this.password = null;
    }

    public void setCredentials(String username, String password) {
        this.username = username;
        this.password = password;
    }
    
    
    @Override
    public SvnRoot rootPath(String rootPath, StringBuilder path) throws RootPathException {
        try {
            return doRootPath(rootPath, path);
        } catch (SVNException e) {
            throw new RootPathException(e);
        }
    }
    
    public SvnRoot doRootPath(String url, StringBuilder path) throws SVNException {
        String separator;
        SVNRepository repository;
        String root;
        
        separator = getSeparator();
        repository = repository(SVNURL.parseURIEncoded(url), username, password);
        root = repository.getRepositoryRoot(true).toString();
        if (!url.startsWith(root)) {
            throw new IllegalStateException(url + " vs " + root);
        }
        if (!root.endsWith(separator)) {
            root = root + separator;
            repository.setLocation(SVNURL.parseURIEncoded(root), true);
        }
        if (url.length() > root.length()) {
            path.append(url.substring(root.length()));
        }
        return root(repository);
    }
    
    public SvnRoot root(SVNRepository repository) throws SVNException {
        return new SvnRoot(this, repository);
    }

    //--
    
    public static SVNRepository repository(SVNURL url, String username, String password) throws SVNException {
        SVNRepository repository;
        
        repository = SVNRepositoryFactory.create(url);
        repository.setAuthenticationManager(SVNWCUtil.createDefaultAuthenticationManager(
                SVNWCUtil.getDefaultConfigurationDirectory(),
                username, password, 
                false /* do not store credentials, not even when configured */));
        return repository;
    }
}
