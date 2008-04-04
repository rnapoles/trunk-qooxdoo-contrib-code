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

package org.qooxdoo.sushi.metadata.reflect;

import org.junit.Test;
import static org.junit.Assert.*;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.metadata.Type;

public class ReflectSchemaTest {
    @Test
    public void normal() {
        Type type;
        
        type = new ReflectSchema().type(IO.class);
        assertEquals("iO", type.getName());
    }
    
    @Test
    public void nodes() {
        new ReflectSchema().type(IO.class);
        new ReflectSchema().type(Node.class);
        new ReflectSchema().type(FileNode.class);
    }
}
