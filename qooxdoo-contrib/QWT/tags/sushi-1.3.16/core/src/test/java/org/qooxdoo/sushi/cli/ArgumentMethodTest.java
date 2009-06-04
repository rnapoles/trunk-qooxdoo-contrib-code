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

package org.qooxdoo.sushi.cli;

import java.lang.reflect.Method;

import org.junit.Test;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;
import static org.junit.Assert.*;

public class ArgumentMethodTest {
    @Test
    public void integer() {
        check(1);
    }
    
    private void check(int expected) {
        Argument arg;
        
        arg = ArgumentMethod.create("setInt", new ReflectSchema(new IO()), getMethod());
        arg.set(this, expected);
        assertEquals(expected, i);
    }

    private Method getMethod() {
        try {
            return getClass().getMethod("setInt", Integer.TYPE);
        } catch (SecurityException e) {
            throw new RuntimeException(e);
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    //--
    
    private Object i;
    
    public void setInt(int i) {
        this.i = i;
    }
}
