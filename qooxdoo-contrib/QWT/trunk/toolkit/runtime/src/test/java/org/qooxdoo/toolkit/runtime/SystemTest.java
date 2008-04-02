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


public class SystemTest extends Base2 {
    @Test
    public void arraycopyToLeft() throws Exception {
        stmt("Object[] array = { \"a\", \"b\", \"c\", \"d\" }; " +
             "assertTrue(array.length == 4);" +
             "System.arraycopy(array, 1, array, 0, 2); " +
             "assertTrue(\"b\".equals(array[0]));" +
             "assertTrue(\"c\".equals(array[1]));" +
             "assertTrue(\"c\".equals(array[2]));" +
             "assertTrue(\"d\".equals(array[3]));" +
             "",
             ANY, "new Foo().code(); true");
    }
    
    @Test
    public void arraycopyToRight() throws Exception {
        stmt("Object[] array = { \"a\", \"b\", \"c\", \"d\" }; " +
             "assertTrue(array.length == 4);" +
             "System.arraycopy(array, 0, array, 1, 2); " +
             "assertTrue(\"a\".equals(array[0]));" +
             "assertTrue(\"a\".equals(array[1]));" +
             "assertTrue(\"b\".equals(array[2]));" +
             "assertTrue(\"d\".equals(array[3]));" +
             "",
             ANY, "new Foo().code(); true");
    }
}
