// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/compiler/tests/sideeffect/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler.tests.sideeffect;

import de.mlhartme.mork.mapping.Mapper;
import java.io.StringReader;

/**
 * Test env arguments.
 */
public class Main {
    public static void main(String[] args) throws Exception {
        Mapper mapper;
        Object[] result;

        mapper = new Mapper("de.mlhartme.mork.compiler.tests.sideeffect.Mapper");
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
