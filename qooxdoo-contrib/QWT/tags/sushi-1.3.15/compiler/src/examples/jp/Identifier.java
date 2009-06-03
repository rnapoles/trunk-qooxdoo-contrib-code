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

package jp;

/**
 * Prints character ranges for Java Identifier. Output was used
 * to define Identifier in java.grm
 */

public class Identifier {
    public static void main(String[] args) {
        System.out.println("IdentifierStart");
        ranges(false);
        System.out.println("\nIdentifierPart");
        ranges(true);
    }

    public static void ranges(boolean part) {
        int c, start, end;
        int count;

        count = 0;
        c = 0;
        do {
            while ((c <= 0xffff) && !test(part, c)) {
                c++;
            }
            start = c;
            while ((c <= 0xffff) && test(part, c)) {
                c++;
            }
            end = c - 1;

            if (start <= end) {
                if (count % 4 == 0) {
                    System.out.print("\n      ");
                }
                count++;
                System.out.print(toHex(start) + ".." + toHex(end));
                System.out.print(" | ");
            }
        } while (c <= 0xffff);
        System.out.println();
    }

    public static boolean test(boolean part, int c) {
        if (part) {
            return Character.isJavaIdentifierPart((char) c);
        } else {
            return Character.isJavaIdentifierStart((char) c);
        }
    }

    public static String toHex(int c) {
        String result;

        if (c > 0xffff) {
            throw new IllegalArgumentException("" + c);
        }
        result = Integer.toHexString(c);
        while (result.length() < 4) {
            result = '0' + result;
        }
        return "0x" + result;
    }
}
