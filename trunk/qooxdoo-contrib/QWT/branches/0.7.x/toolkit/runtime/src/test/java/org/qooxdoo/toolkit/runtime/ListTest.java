/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;


public class ListTest extends Base2 {
    @Test
    public void arrayList() throws Exception {
        expr("new java.util.ArrayList()", ANY, ANY,
                "x instanceof java.lang.Object",
                "x instanceof java.util.ArrayList",
                "instanceofInterface(x, java.lang.Iterable)",
                "instanceofInterface(x, java.util.List)",
                "x.size() == 0"
                );
    }
    @Test
    public void arrayListSize() throws Exception {
        expr("new java.util.ArrayList().size()", ANY, 0.0);
    }
    @Test
    public void arrayListIterator() throws Exception {
        expr("new java.util.ArrayList().iterator()", ANY, ANY,
             "x instanceof java.lang.Object");
    }
    @Test
    public void arrayListIteratorHasNext() throws Exception {
        expr("new java.util.ArrayList().iterator().hasNext()", ANY, false);
    }
    
    @Test
    public void arrayListOps() throws Exception {
        stmt("java.util.ArrayList a = new java.util.ArrayList(1); " +
             "assertTrue(a.size() == 0);" +
             "a.add(\"foo\"); " +
             "assertTrue(a.size() == 1);" +
             "assertTrue(a.contains(\"foo\"));" +
             "assertTrue(a.get(0).equals(\"foo\"));" +
             "a.add(\"bar\"); " + 
             "a.add(\"baz\"); " + 
             "assertTrue(a.size() == 3);" +
             "assertTrue(a.contains(\"bar\"));" +
             "assertTrue(!a.contains(\"FOO\"));" +
             "a.remove(0);" +
             "assertTrue(a.size() == 2);" +
             "/*assertTrue(!a.contains(\"foo\"));" +
             "assertTrue(a.contains(\"bar\"));" +
             "assertTrue(a.contains(\"baz\"));" +
             "a.clear();" + 
             "assertTrue(a.size() == 0);*/",
             ANY, "new Foo().code(); true");
    }

    @Test
    public void arrayListOpsIterator() throws Exception {
        stmt("java.util.ArrayList a = new java.util.ArrayList(); " +
             "a.add(\"foo\"); " +
             "a.add(\"bar\"); " + 
             "a.add(\"baz\"); " +
             "assertTrue(a.indexOf(\"baz\") == 2);" + 
             "assertTrue(a.lastIndexOf(\"baz\") == 2);" + 
             "assertTrue(a.size() == 3);" +
             "int idx = 0;" +
             "for (Object obj : a) { " +
             "  assertTrue(a.get(idx).equals(obj)); " +
             "  idx++; " +
             "}" +
             "assertTrue(\"foo\".equals(a.remove(0)));" +
             "assertTrue(a.size() == 2);" +
             "assertTrue(\"bar\".equals(a.get(0)));",
             ANY, "new Foo().code(); true");
    }
}
