// §{{header}}:
//
// This is file examples/compiler/Runtime.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

/**
 * Runtime Library needed to run a compiled program.
 */

public class Runtime {
    private static final BufferedReader
        input = new BufferedReader(new InputStreamReader(System.in));

    public static int inputInt() throws IOException {
        String str;

        str = input.readLine();
        return Integer.parseInt(str);
    }

    public static String inputString() throws IOException {
        return input.readLine();
    }

    public static void printInt(int a) {
        System.out.print("" + a);
    }

    public static void printString(String str) {
        System.out.print(str);
    }
}
