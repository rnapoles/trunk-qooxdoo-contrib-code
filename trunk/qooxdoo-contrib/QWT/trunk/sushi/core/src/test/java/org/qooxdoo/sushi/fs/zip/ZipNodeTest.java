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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.List;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.RootPathException;
import org.qooxdoo.sushi.fs.file.FileNode;

/** Accesses external hosts and might need proxy configuration => Full test */
public class ZipNodeTest {
    private IO ioObj = new IO();
    
    @Test
    public void jar() throws RootPathException, IOException {
        FileNode jar;
        String rootPath;
        String locator;
        ZipNode object;
        ZipNode lang;
        List<ZipNode> list;
        
        jar = ioObj.locateClasspathItem(Object.class);
        rootPath = jar.getAbsolute() + "!/java/lang/Object.class";
        locator = "zip:" + rootPath;
        object = (ZipNode) ioObj.node(locator);
        assertEquals(locator, object.getLocator());
        assertEquals("java/lang/Object.class", object.getPath());
        assertTrue(object.exists());
        assertTrue(object.isFile());
        assertTrue(object.readString().length() > 100);
        lang = (ZipNode) object.getParent();
        assertEquals("java/lang", lang.getPath());
        assertTrue(lang.isDirectory());
        list = lang.list();
        assertTrue(list.size() > 10);
        assertTrue(list.contains(object));
        assertFalse(list.contains(list));
        object = (ZipNode) lang.join("Object.class");
        assertTrue(object.exists());
        assertTrue(object.isFile());
    }
}

