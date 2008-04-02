/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package de.mlhartme.mork.semantics;



/**
 * Predefined functions usefull for attribution. Note. the Java API
 * defines many more functions, e.g. Integer.parseInt, Boolean.TRUE,
 * Boolean.FALSE.
 */

public class BuiltIn {
    // unlike Boolean.TRUE, there is no constant for null pointers
    public static final Object NULL = null;

    //---------------------------------------------------------
    // character and string parsing

    // Helper for escapeCharacter and unicodeCharacter - set
    // by parseChar and parseString
    private static String text = null;
    private static int ofs;
    private static int len;

    public static char parseChar(String textInit)
        throws IllegalLiteral
    {
        char result;

        text = textInit;
        ofs = 1;
        len = text.length();

        try {
            if ((len > 2) && (text.charAt(0) == '\'') && (text.charAt(len - 1) == '\'')) {
                result = charOrEscape();
                if (ofs + 1 == len) {
                    return result;
                }
            }
            throw new IllegalLiteral("illegal character literal: " + textInit);
        }
        finally {
            text = null;
        }
    }

    public static String parseString(String textInit)
        throws IllegalLiteral
    {
        char c;
        StringBuilder result;

        try {
            text = textInit;
            len = text.length();
            ofs = 1;
            result = new StringBuilder();

            if ((len >= 2) && (text.charAt(0) == '"') && (text.charAt(len - 1) == '"')) {
                while (ofs + 1 < len) {
                    result.append(charOrEscape());
                }
            } else {
                throw new IllegalLiteral("illegal string literal: " + textInit);
            }
            return result.toString();
        }
        finally {
            text = null;
        }
    }

    private static char charOrEscape() throws IllegalLiteral {
        int result;

        if (text.charAt(ofs) == '\\') {
            ofs++;
            result = charEscape();
            if (result != -1) {
                return (char) result;
            }
            result = unicodeEscape();
            if (result != -1) {
                return (char) result;
            }
            // TODO: ocatal escape

            throw new IllegalLiteral("illegal literal");
        } else {
            return text.charAt(ofs++);
        }
    }

    private static int unicodeEscape() {
        int start;
        int i, v;
        int result;

        start = ofs;
        while (ofs < len) {
            if (text.charAt(ofs) != 'u') {
                break;
            }
            ofs++;
        }
        if ((ofs == start) || (ofs + 4 > len)) {
            return -1;
        }

        result = 0;
        for (i = 0; i < 4; i++) {
            v = Character.digit(text.charAt(ofs + i), 16);
            if (v == -1) {
                return -1;
            }
            result = result * 16 + v;
        }
        ofs += 4;
        return result;
    }

    private static int charEscape() {
        if (ofs < len) {
            switch (text.charAt(ofs++)) {
            case 'b':       // backspace
                return '\b';
            case 't':        // horizontal tab
                return '\t';
            case 'n':        // linefeet LF
                return '\n';
            case 'f':        // form feet FF
                return '\f';
            case 'r':        // cariage return CR
                return '\r';
            case '"':        // double quotes
                return '\"';
            case '\'':       // single quotes
                return '\'';
            case '\\':       // blackslash \
                return '\\';
            default:
                ofs--;
                return -1;
            }
        }
        return -1;
    }
}
