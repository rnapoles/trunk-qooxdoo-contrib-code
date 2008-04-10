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

import org.qooxdoo.sushi.fs.InstantiateException;
import org.qooxdoo.sushi.fs.Root;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNNodeKind;
import org.tmatesoft.svn.core.io.SVNRepository;

public class SvnRoot implements Root {
    private final SvnFilesystem filesystem;
    private final SVNRepository repository;
    
    public SvnRoot(SvnFilesystem filesystem, SVNRepository repository) {
        this.filesystem = filesystem;
        this.repository = repository;
    }
    
    public SvnFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return repository.getLocation().toString() + "/";
    }

    public SVNRepository getRepository() {
        return repository;
    }
    
    public SvnNode node(String path) throws InstantiateException {
        try {
            return new SvnNode(this, repository.checkPath(path, -1) == SVNNodeKind.DIR, path);
        } catch (SVNException e) {
            throw new InstantiateException(e);
        }
    }

    @Override
    public boolean equals(Object obj) {
        SvnRoot root;
        
        if (obj instanceof SvnRoot) {
            root = (SvnRoot) obj;
            return repository.getLocation().equals(root.repository.getLocation());
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return repository.getLocation().hashCode();
    }
}
