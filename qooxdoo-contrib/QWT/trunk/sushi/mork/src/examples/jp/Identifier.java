// §{{header}}:
//
// This is file examples/jp/Identifier.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

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
