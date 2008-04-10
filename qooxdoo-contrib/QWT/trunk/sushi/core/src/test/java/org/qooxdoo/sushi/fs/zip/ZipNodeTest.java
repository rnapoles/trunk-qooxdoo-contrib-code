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
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.RootPathException;
import org.qooxdoo.sushi.fs.file.FileNode;

/** Accesses external hosts and might need proxy configuration => Full test */
public class ZipNodeTest {
    private IO ioObj = new IO();
    private ZipFilesystem fs = ioObj.getFilesystem(ZipFilesystem.class);
    
    @Test
    public void jar() throws RootPathException, IOException {
        FileNode jar;
        String rootPath;
        String locator;
        ZipNode node;
        
        jar = ioObj.locateClasspathItem(Object.class);
        rootPath = jar.getAbsolute() + "!/java/lang/Object.class";
        locator = "zip:" + rootPath;
        node = fs.parse(rootPath);
        assertEquals(locator, node.getLocator());
        assertEquals("java/lang/Object.class", node.getPath());
        assertTrue(node.exists());
        assertTrue(node.isFile());
        assertEquals("java/lang", node.getParent().getPath());
        node = (ZipNode) node.getParent().join("Object.class");
        assertTrue(node.exists());
    }
}

