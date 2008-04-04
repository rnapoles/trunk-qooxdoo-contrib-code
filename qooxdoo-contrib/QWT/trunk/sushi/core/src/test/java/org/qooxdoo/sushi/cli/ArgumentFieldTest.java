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

import java.lang.reflect.Field;

import org.junit.Test;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;
import static org.junit.Assert.*;

public class ArgumentFieldTest {
    @Test
    public void integer() {
        check("XY");
    }
    
    private void check(String expected) {
        Argument arg;
        
        arg = ArgumentField.create("fld", new ReflectSchema(new IO()), getField("fld"));
        arg.set(this, expected);
        assertEquals(expected, fld);
    }

    private Field getField(String name) {
        Class<?> c;
        
        c = getClass();
        try {
            return c.getDeclaredField(name);
        } catch (SecurityException e) {
            throw new RuntimeException(e);
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        }
    }

    //--
    
    private String fld;
}
