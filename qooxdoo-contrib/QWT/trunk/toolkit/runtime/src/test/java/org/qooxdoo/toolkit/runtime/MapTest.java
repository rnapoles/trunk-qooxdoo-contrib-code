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

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;


public class MapTest extends Base2 {
    @Test
    public void hashMap() throws Exception {
        expr("new java.util.HashMap()", ANY, ANY,
                "x instanceof java.lang.Object",
                "x instanceof java.util.HashMap",
                "instanceofInterface(x, java.util.Map)"
                );
    }

    @Test
    public void hashMapOps() throws Exception {
        stmt("java.util.HashMap m = new java.util.HashMap(); " +
             "assertTrue(m.size() == 0);" +
             "assertTrue(!m.containsKey(\"key\"));" +
             "assertTrue(!m.containsValue(\"value\"));" +
             "m.put(\"key\", \"value\");" +
             "assertTrue(m.size() == 1);" +
             "assertTrue(m.containsKey(\"key\"));" +
             "assertTrue(m.containsValue(\"value\"));" +
             "assertTrue(m.get(\"key\").equals(\"value\"));" +
             "m.put(\"key2\", \"value2\");" +
             "assertTrue(m.size() == 2);" +
             "assertTrue(m.get(\"key\").equals(\"value\"));" +
             "assertTrue(m.get(\"key2\").equals(\"value2\"));",
             ANY, "new Foo().code(); true");
    }
    
    @Test
    public void hashMapIterator() throws Exception {
        expr("new java.util.HashMap().entrySet().iterator().hasNext()", ANY, false);
    }
    
    @Test
    public void hashMapOpsIterator() throws Exception {
        stmt("java.util.HashMap m = new java.util.HashMap(); " +
             "m.put(\"a\", \"1\");" +
             "m.put(\"b\", \"2\");" +
             "m.put(\"c\", \"3\");" +
             "assertTrue(m.size() == 3);" +
             "assertTrue(m.keySet().size() == 3);" +
             "assertTrue(m.values().size() == 3);" +
             "assertTrue(m.entrySet().size() == 3);" +
             "assertTrue(m.entrySet().iterator().hasNext());" +
             "for (Object obj : m.entrySet()) {" +
             "  java.util.Map.Entry entry = (java.util.Map.Entry) obj;" +
             "  assertTrue(m.get(entry.getKey()).equals(entry.getValue()));" +
             "}",
             ANY, "new Foo().code(); true");
    }

}
