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


public class ObjectTest extends Base2 {
    @Test
    public void object() throws Exception {
        expr("new Object()", ANY, ANY, 
                "x instanceof java.lang.Object", 
                "x.hashCode() == 1");
    }

    @Test
    public void objectToString() throws Exception {
        expr("new Object().toString()", ANY, ANY, 
                "x == 'java.lang.Object@1'");
    }

    @Test
    public void clasS() throws Exception {
        expr("new Object().getClass()", ANY, ANY,
                "x instanceof java.lang.Class", 
                "x instanceof java.lang.Object", 
                "x.getName() == 'java.lang.Object'");
    }
}
