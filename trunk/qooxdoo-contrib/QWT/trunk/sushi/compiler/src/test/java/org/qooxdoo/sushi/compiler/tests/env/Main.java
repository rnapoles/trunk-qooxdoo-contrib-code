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

package org.qooxdoo.sushi.compiler.tests.env;

import org.qooxdoo.sushi.mapping.Mapper;
import java.io.StringReader;

/**
 * Test env arguments.
 */
public class Main {
    public static void main(String[] args) throws Exception {
        Mapper mapper;
        Object[] result;

        mapper = new Mapper("org.qooxdoo.sushi.compiler.tests.env.Mapper");
        mapper.setEnvironment(new Integer(3));
        result = mapper.run("<const>", new StringReader("ab"));
        System.out.println("result: " + result[0]);
    }

    public static int add(Object left, Object right) {
        return ((Integer) left).intValue() + ((Integer) right).intValue();
    }
}
