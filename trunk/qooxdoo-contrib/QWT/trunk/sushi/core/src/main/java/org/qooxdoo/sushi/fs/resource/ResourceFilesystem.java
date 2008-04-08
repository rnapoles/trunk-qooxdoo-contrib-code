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

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.ParseException;
import org.qooxdoo.sushi.fs.Root;


public class ResourceFilesystem extends Filesystem implements Root {
    public ResourceFilesystem(IO io) {
        super(io, "resource", '/');
    }

    @Override
    public ResourceNode parse(String rootPath) throws ParseException {
        return new ResourceNode(this, rootPath);
    }

    public Filesystem getFilesystem() {
        return this;
    }

    public String getId() {
        return "";
    }
}
