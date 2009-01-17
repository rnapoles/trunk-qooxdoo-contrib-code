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

package compiler;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

/**
 * Runtime Library needed to run a compiled program.
 */

public class Runtime {
    private static final BufferedReader INPUT = new BufferedReader(new InputStreamReader(System.in));

    public static int inputInt() throws IOException {
        String str;

        str = INPUT.readLine();
        return Integer.parseInt(str);
    }

    public static String inputString() throws IOException {
        return INPUT.readLine();
    }

    public static void printInt(int a) {
        System.out.print("" + a);
    }

    public static void printString(String str) {
        System.out.print(str);
    }
}
