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

import java.io.IOException;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class FilterTest {
    private Node root;
    
    @Before
    public void setup() throws IOException {
    	root = new IO().getTemp().createTempDirectory();
    }
    
    @Test
    public void emptyIncludes() throws IOException {
        create();
        assertEquals(0, root.find().size());
    }

    @Test
    public void dir() throws IOException {
        create("a/b", "b/c");
        assertEquals(1, root.find("a/b").size());
    }

    @Test
    public void child() throws IOException {
        create("one");
        checkSet(root.find("one"), "one");
    }

    @Test
    public void specialchar() throws IOException {
        create("foo+bar");
        checkSet(root.find("foo+bar"), "foo+bar");
    }
    
    @Test
    public void children() throws IOException {
        create("a", "b");
        checkSet(root.find("?"), "a", "b");
    }

    @Test
    public void grandChildren() throws IOException {
        List<Node> nodes;
        
        create("a", "b/c", "b/d");
        nodes = root.find("*/*");
        checkSet(nodes, "b/c", "b/d");
    }

    @Test
    public void star() throws IOException {
        create("1", "2", "3");
        check("*", "1", "2", "3"); 
    }

    @Test
    public void doubleStar() throws IOException {
        create("a/b");
        check("**/*", "a", "a/b");
    }

    @Test(expected=IllegalArgumentException.class)
    public void rejectEmptyPath() throws IOException {
        root.find("");
    }

    @Test(expected=IllegalArgumentException.class)
    public void rejectDoubleStarOnly() throws IOException {
        root.getIO().filter().include("**");
    }
    
    @Test(expected=IllegalArgumentException.class)
    public void rejectDoubleDoubleStar() throws IOException {
        root.getIO().filter().include("**/**");
    }
    
    @Test
    public void predicate() throws IOException {
        List<Node> nodes;
        
        create("a", "b/c", "b/d");
        nodes = root.find(root.getIO().filter().include("**/*").predicate(Predicate.DIRECTORY));
        assertEquals(1, nodes.size());
        assertEquals(root.join("b"), nodes.get(0));
    }
    
    @Test
    public void depth() throws IOException {
        create("a", "b/c", "b/d/e");
        
        check(filter().include("**/*").maxDepth(0) );
        check(filter().include("**/*").maxDepth(1), "a", "b");
        check(filter().include("**/*").minDepth(2).maxDepth(2), "b/c", "b/d");
        check(filter().include("b/*").minDepth(2).maxDepth(2), "b/c", "b/d");
        check(filter().include("**/*").minDepth(3), "b/d/e");
    }

    @Test(expected=IOException.class)
    public void permissionDenied() throws IOException {
        assertEquals(0, root.getIO().node("/").find("lost+found/*").size());
    }

    //--
    
    private Filter filter() {
    	return root.getIO().filter();
    }
    
    private void create(String... paths) {
        Node file;
        
        try {
            for (String path : paths) {
                path = path.replace('/', root.getRoot().getFilesystem().getSeparatorChar());
                file = root.join(path);
                file.getParent().mkdirsOpt();
                file.writeBytes();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    private void check(String pattern, String ... paths) throws IOException {
    	checkSet(root.find(pattern), paths);
    }

    private void check(Filter filter, String ... paths) throws IOException {
    	checkSet(root.find(filter), paths);
    }
    
    private void checkSet(List<Node> nodes, String ... names) {
        assertEquals(names.length, nodes.size());
        for (String name : names) {
            assertTrue(nodes.contains(root.join(name)));
        }
    }
}
