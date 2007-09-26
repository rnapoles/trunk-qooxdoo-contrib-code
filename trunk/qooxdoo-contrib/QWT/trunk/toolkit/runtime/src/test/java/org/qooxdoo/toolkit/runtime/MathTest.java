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


public class MathTest extends Base2 {
    @Test
    public void floor() throws Exception {
        expr("Math.floor(2)", ANY, 2.0);
        expr("Math.floor(2.0)", ANY, 2.0);
        expr("Math.floor(2.1)", ANY, 2.0);
        expr("Math.floor(1.9)", ANY, 1.0);
    }
}
