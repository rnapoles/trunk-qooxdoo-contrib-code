package org.qooxdoo.sushi.fs.svn;

import org.qooxdoo.sushi.fs.Root;
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
        return repository.hashCode();
    }
}
