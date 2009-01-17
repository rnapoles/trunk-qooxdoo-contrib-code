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

package org.qooxdoo.sushi.compiler.tests.sideeffect;

import org.qooxdoo.sushi.mapping.Mapper;
import java.io.StringReader;

/**
 * Test env arguments.
 */
public class Main {
    public static void main(String[] args) throws Exception {
        Mapper mapper;
        Object[] result;

        mapper = new Mapper("org.qooxdoo.sushi.compiler.tests.sideeffect.Mapper");
        mapper.setLogging(null, System.out);
        result = mapper.run("<const>", new StringReader("abbb"));
        System.out.println("result: " + result[0]);
    }

    public static StringBuffer copy(StringBuffer a) {
        return a;
    }

    public static StringBuffer create() {
        return new StringBuffer("a");
    }

    public static int add(StringBuffer buffer) {
        buffer.append("b");
        return 0; // TODO
    }
}
