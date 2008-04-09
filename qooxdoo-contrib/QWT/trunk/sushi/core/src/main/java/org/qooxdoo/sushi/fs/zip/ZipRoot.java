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

package org.qooxdoo.sushi.fs.zip;

import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.qooxdoo.sushi.fs.Root;

public class ZipRoot implements Root {
    private final ZipFilesystem filesystem;
    private final ZipFile zip;
    
    public ZipRoot(ZipFilesystem filesystem, ZipFile zip) {
        this.filesystem = filesystem;
        this.zip = zip;
    }

    @Override
    public boolean equals(Object obj) {
        ZipRoot root;
        
        if (obj instanceof ZipRoot) {
            root = (ZipRoot) obj;
            return filesystem == root.filesystem && zip.equals(root.zip);
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return zip.hashCode();
    }

    public ZipFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return zip.getName() + "!/";
    }

    public ZipNode newInstance(String path) {
        return new ZipNode(this, path);
    }
    
    public InputStream createInputStream(String path) throws IOException {
        ZipEntry entry;
        
        entry = zip.getEntry(path);
        if (entry == null) {
            return null;
        }
        return zip.getInputStream(entry);
    }
}
