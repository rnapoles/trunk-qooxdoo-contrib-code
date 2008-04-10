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
    public SvnNode parse(String rootPath) throws RootPathException {
        try {
            return doParse(rootPath);
        } catch (SVNException e) {
            throw new RootPathException(e);
        }
    }
    
    public SvnNode doParse(String url) throws SVNException {
        SVNRepository repository;
        String root;
        String path;
        
        if (url.endsWith(getSeparator())) {
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
        return root(repository).node(path);
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
