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

package org.qooxdoo.toolkit.engine;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import org.junit.Before;
import org.junit.Test;
import org.qooxdoo.toolkit.engine.Call;
import org.qooxdoo.toolkit.engine.common.Registry;

public class CallTest {
    private Object dest;
    
    @Before
    public void setUp() {
        dest = new Object();
    }

    @Test
    public void noFound() {
        try {
            call("nosuchmethod", "");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void noArgs() {
        Call call;
        
        call = call("notify", "[]");
        assertEquals("notify", call.getMethod().getName());
        assertEquals(0, call.args.size());
    }

    @Test
    public void oneArg() {
        Call call;
        
        call = call("notify", "['x']");
        assertEquals(1, call.args.size());
        assertEquals("x", call.args.get(0));
    }

    @Test
    public void twoArgs() {
        Call call;
        
        call = call("notify", "['null',null]");
        assertEquals(2, call.args.size());
        assertEquals("null", call.args.get(0));
        assertEquals(null, call.args.get(1));
    }
    
    private Call call(String method, String args) {
        return Call.parseMethod(new Registry(), null, dest, method, args);
    }
}
