// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/BuiltIn.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

import java.io.IOException;

/**
 * BuiltIn predicates.
 */

public class BuiltIn {
    /**
     * Eat java comments and white space
     */
    public static int WHITE(Buffer r) throws IOException {
        int c, c2;
        int prev;
        int count;

        c = r.readOrEof();
        if (c == '/') {
            c2 = r.readOrEof();
            if (c2 == '*') {          // comment / * * /
                count = 3;
                c = r.readOrEof();
                do {
                    prev = c;
                    c = r.readOrEof();
                    count++;
                    if (c == -1) return -1;
                } while (prev != '*' || c != '/');
                return count;
            } else if (c2 == '/') {   // comment / /
                count = 2;
                while (c != '\n') { // '/' at the first time - doesn't matter
                    c = r.readOrEof();
                    if (c == -1) break;
                    count++;
                }
                return count;
            } else return -1;
        } else {
            count = 0;
            while (Character.isWhitespace((char) c)) {
                count++;
                c = r.readOrEof();
            }
            return (count == 0)? -1 : count;
        }
    }

    /**
     * Test for integer token (Java IntegerLiterals without type suffix.
     */
    public static int IntegerLiteral(Buffer r) throws IOException {
        int count;
        int c;

        c = r.readOrEof();
        if (c == '0') {
            c = r.readOrEof();
            if ((c == 'x') || (c == 'X')) {
                c = r.readOrEof();
                count = 2;
                // hexadecimal
                while (((c >= '0') && (c <= '9'))
                       || ((c >= 'a') && (c <= 'f'))
                       || ((c >= 'A') && (c <= 'F')))
                {
                    count++;
                    c = r.readOrEof();
                }
                return (count == 2)? 1 /* not -1 ! */ : count;
            } else {
                count = 1;
                // octal
                while ((c >= '0') && (c <= '7')) {
                    count++;
                    c = r.readOrEof();
                }
                return count;
            }
        } else if ((c >= '1') && (c <= '9')) {
            count = 1;
            c = r.readOrEof();
            // decimal
            while ((c >= '0') && (c <= '9')) {
                count++;
                c = r.readOrEof();
            }
            return count;
        } else {
            return -1;
        }
    }

    /**
     * Test for Java identifier token
     */
    public static int Identifier(Buffer r) throws IOException {
        int c;
        int count;

        c = r.readOrEof();
        if (!Character.isJavaIdentifierStart((char) c)) {
            return -1;
        }
        count = 1;
        c = r.readOrEof();
        while (Character.isJavaIdentifierPart((char) c)) {
            c = r.readOrEof();
            count++;
        }
        return count;
    }

    /**
     * Test for a string token. Character escapes are allowed.
     */
    public static int StringLiteral(Buffer src) throws IOException {
        int c, count;

        c = src.readOrEof();
        if (c != '"') return -1;
        count = 1;
        do {
            c = src.readOrEof();
            if (c =='\\') {
                // read over escaped character
                c = src.readOrEof();
                c = src.readOrEof();
                // if EOF was read, result is -1, so +=2 does no harm
                count += 2;
            }
            if ((c == -1) || (c == '\n') || (c == '\r')) {
                return -1; // string without end is illegal
            }
            count++;
        } while (c != '"');

        return count;
    }

    /**
     * Test for a character token. Character escapes are allowed.
     */

    public static int CharacterLiteral(Buffer src) throws IOException {
        int c, count;

        c = src.readOrEof();
        if (c != '\'') return -1;
        count = 1;
        do {
            c = src.readOrEof();
            if (c == '\\') {
                // read over escaped character
                c = src.readOrEof();
                c = src.readOrEof();
                // if EOF was read, result is -1, so += 2 does no harm
                count += 2;
            }
            if ((c == -1) || (c == '\n') || (c == '\r')) {
                return -1; // character without end is illegal
            }
            count++;
        } while (c != '\'');

        return count;
    }
}
