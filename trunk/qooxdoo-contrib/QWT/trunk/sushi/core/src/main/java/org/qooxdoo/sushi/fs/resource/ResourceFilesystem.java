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

package org.qooxdoo.sushi.fs.resource;

import java.io.InputStream;

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Root;


public class ResourceFilesystem extends Filesystem implements Root {
    private ClassLoader loader;
    
    public ResourceFilesystem(IO io) {
        super(io, "resource", '/');
        loader = getClass().getClassLoader();
    }

    @Override
    public ResourceFilesystem rootPath(String rootPath, StringBuilder path) {
        path.append(rootPath);
        return this;
    }

    //-- Root methods
    
    public ResourceFilesystem getFilesystem() {
        return this;
    }

    public String getId() {
        return "";
    }

    public ResourceNode node(String path) {
        return new ResourceNode(this, path);
    }
    
    public InputStream inputStream(String path) {
        // TODO: ResourceNode.class.getLoader() doesn't work for SshNode's billy loading ...
        if (loader == null) {
            return ClassLoader.getSystemResourceAsStream(path);
        } else {
            return loader.getResourceAsStream(path);
        }
    }
}
