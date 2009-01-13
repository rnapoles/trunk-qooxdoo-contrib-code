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
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.RootPathException;
import org.qooxdoo.sushi.fs.file.FileNode;

/** Accesses external hosts and might need proxy configuration => Full test */
public class ZipNodeTest {
    private IO ioObj = new IO();
    
    @Test
    public void junit() throws RootPathException, IOException {
        FileNode jar;
        String rootPath;
        String locator;
        ZipNode assrt;
        ZipNode junit;
        List<? extends Node> list;
        List<? extends Node> tree;
        
        jar = ioObj.locateClasspathItem(Assert.class);
        rootPath = jar.getAbsolute() + "!/org/junit/Assert.class";
        locator = "zip:" + rootPath;
        assrt = (ZipNode) ioObj.node(locator);
        assertEquals(locator, assrt.getLocator());
        assertEquals("org/junit/Assert.class", assrt.getPath());
        assertTrue(assrt.exists());
        assertTrue(assrt.isFile());
        assertTrue(assrt.readString().length() > 100);
        junit = (ZipNode) assrt.getParent();
        assertEquals("org/junit", junit.getPath());
        assertTrue(junit.isDirectory());
        list = junit.list();
        assertTrue(list.size() > 10);
        assertTrue(list.contains(assrt));
        assertFalse(list.contains(list));
        assertEquals(2, junit.getParent().list().size());
        tree = junit.find("**/*");
        assertTrue(tree.size() > list.size());
        assertTrue(tree.contains(assrt));
        assertFalse(tree.contains(list));
        assertTrue(tree.containsAll(list));
        assrt = (ZipNode) junit.join("Assert.class");
        assertTrue(assrt.exists());
        assertTrue(assrt.isFile());
    }
 
    @Test
    public void manifest() throws IOException {
        FileNode jar;
            
        jar = ioObj.locateClasspathItem(Object.class);
        assertNotNull(jar.openZip().getRoot().readManifest());
    }
}

