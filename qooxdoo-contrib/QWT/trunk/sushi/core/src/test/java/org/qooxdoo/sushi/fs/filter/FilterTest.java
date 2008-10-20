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

package org.qooxdoo.sushi.fs.filter;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.List;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.Root;

// TODO: generalize, don't use File nodes
public class FilterTest {
    private static final IO IO_OBJ = new IO();
    private static final Root ROOT = IO_OBJ.getTemp().getRoot();

    @Test
    public void empty() throws IOException {
        Node dir;
        
        dir = create();
        assertEquals(0, dir.find().size());
    }

    @Test
    public void doubleStar() throws IOException {
        Node dir;
        List<Node> nodes;
        
        dir = create("a/b");
        nodes = dir.find("**/*");
        assertEquals(2, nodes.size());
        assertEquals(dir.join("a"), nodes.get(0));
        assertEquals(dir.join("a", "b"), nodes.get(1));
    }

    @Test
    public void rejectDoubleStarOnly() throws IOException {
        try {
            IO_OBJ.filter().include("**");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }
    
    @Test
    public void grandChildren() throws IOException {
        Node dir;
        List<Node> nodes;
        
        dir = create("a", "b/c", "b/d");
        nodes = dir.find("*/*");
        checkSet(nodes, dir, "b/c", "b/d");
    }

    @Test
    public void predicate() throws IOException {
        Node dir;
        List<Node> nodes;
        
        dir = create("a", "b/c", "b/d");
        nodes = dir.find(IO_OBJ.filter().include("**/*").predicate(Predicate.DIRECTORY));
        assertEquals(1, nodes.size());
        assertEquals(dir.join("b"), nodes.get(0));
    }
    
    @Test
    public void depth() throws IOException {
        Node dir;
        List<Node> nodes;
        
        dir = create("a", "b/c", "b/d/e");
        
        assertEquals(0, dir.find(IO_OBJ.filter().include("**/*").maxDepth(0)).size());

        nodes = dir.find(IO_OBJ.filter().include("**/*").maxDepth(1));
        checkSet(nodes, dir, "a", "b");

        nodes = dir.find(IO_OBJ.filter().include("**/*").minDepth(2).maxDepth(2));
        checkSet(nodes, dir, "b/c", "b/d");

        nodes = dir.find(IO_OBJ.filter().include("**/*").minDepth(3));
        checkSet(nodes, dir, "b/d/e");
    }

    private Node create(String... paths) {
        Node root;
        Node file;
        
        try {
            root = IO_OBJ.getTemp().createTempDirectory();
            for (String path : paths) {
                path = path.replace('/', ROOT.getFilesystem().getSeparatorChar());
                file = root.join(path);
                file.getParent().mkdirsOpt();
                file.writeBytes();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return root;
    }
    
    private void checkSet(List<Node> nodes, Node dir, String ... names) {
        assertEquals(names.length, nodes.size());
        for (String name : names) {
            assertTrue(nodes.contains(dir.join(name)));
        }
    }
}

