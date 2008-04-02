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

public class NumberTest extends Base2 {
    @Test
    public void integer() throws Exception {
        expr("new Integer(3).intValue()", ANY, 3);
        expr("Integer.parseInt(\"2\")", ANY, 2.0);
        // TODO: autoboxing
        expr("new Integer(Integer.parseInt(\"0\")).toString()", ANY, "0");
    }

    @Test
    public void lonG() throws Exception {
        expr("Long.parseLong(\"-3\")", ANY, -3.0);
        // TODO: autoboxing
        expr("new Long(Long.parseLong(\"0\")).toString()", ANY, "0");
    }
}
