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

package org.qooxdoo.toolkit.server;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.toolkit.engine.Call;

public class CallTest {
    private Object dest;
    
    @Before
    public void setUp() {
        dest = new Object();
    }

    @Test
    public void noFound() {
        try {
            Call.parseMethod(dest, "nosuchmethod", "");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void noArgs() {
        Call call;
        
        call = Call.parseMethod(dest, "notify", "[]");
        assertEquals("notify", call.getMethod().getName());
        assertEquals(0, call.args.size());
    }

    @Test
    public void oneArg() {
        Call call;
        
        call = Call.parseMethod(dest, "notify", "['x']");
        assertEquals(1, call.args.size());
        assertEquals("x", call.args.get(0));
    }

    @Test
    public void twoArgs() {
        Call call;
        
        call = Call.parseMethod(dest, "notify", "['null',null]");
        assertEquals(2, call.args.size());
        assertEquals("null", call.args.get(0));
        assertEquals(null, call.args.get(1));
    }
}
