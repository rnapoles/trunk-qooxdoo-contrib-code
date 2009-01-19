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

package org.qooxdoo.sushi.classfile;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

public class AccessTest {
    @Test
    public void flags() {
        Set<Access> all;
        
        all = Access.fromFlags((char) 0x0c, false);
        assertEquals(new HashSet<Access>(Arrays.asList(Access.STATIC, Access.PROTECTED)), all);
        assertEquals((char) 0x0c, Access.toFlags(all));
    }
}
