package net.sf.qooxdoo.rpc.json;

/*
Copyright (c) 2002 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
// AJ
import java.util.Date;
//
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * A JSONTokener takes a source string and extracts characters and tokens from
 * it. It is used by the JSONObject and JSONArray constructors to parse
 * JSON source strings.
 * @author JSON.org
 * @version 1
 */
public class JSONTokener {

    /**
     * The index of the next character.
     */
    private int myIndex;


    /**
     * The source string being tokenized.
     */
    private String mySource;


    // AJ
    private DateFormat internalDateFormat =
        new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSS z");
    //
    
    /**
     * Construct a JSONTokener from a string.
     *
     * @param s     A source string.
     */
    public JSONTokener(String s) {
        this.myIndex = 0;
        this.mySource = s;
    }


    /**
     * Back up one character. This provides a sort of lookahead capability,
     * so that you can test for a digit or letter before attempting to parse
     * the next number or identifier.
     */
    public void back() {
        if (this.myIndex > 0) {
            this.myIndex -= 1;
        }
    }



    /**
     * Get the hex value of a character (base16).
     * @param c A character between '0' and '9' or between 'A' and 'F' or
     * between 'a' and 'f'.
     * @return  An int between 0 and 15, or -1 if c was not a hex digit.
     */
    public static int dehexchar(char c) {
        if (c >= '0' && c <= '9') {
            return c - '0';
        }
        if (c >= 'A' && c <= 'F') {
            return c + 10 - 'A';
        }
        if (c >= 'a' && c <= 'f') {
            return c + 10 - 'a';
        }
        return -1;
    }


    /**
     * Determine if the source string still contains characters that next()
     * can consume.
     * @return true if not yet at the end of the source.
     */
    public boolean more() {
        return this.myIndex < this.mySource.length();
    }


    /**
     * Get the next character in the source string.
     *
     * @return The next character, or 0 if past the end of the source string.
     */
    public char next() {
        if (more()) {
	        char c = this.mySource.charAt(this.myIndex);
	        this.myIndex += 1;
	        return c;
        }
		return 0;
    }


    /**
     * Consume the next character, and check that it matches a specified
     * character.
     * @param c The character to match.
     * @return The character.
     * @throws ParseException if the character does not match.
     */
    public char next(char c) throws ParseException {
        char n = next();
        if (n != c) {
            throw syntaxError("Expected '" + c + "' and instead saw '" +
                    n + "'.");
        }
        return n;
    }


    /**
     * Get the next n characters.
     *
     * @param n     The number of characters to take.
     * @return      A string of n characters.
     * @exception ParseException
     *   Substring bounds error if there are not
     *   n characters remaining in the source string.
     */
     public String next(int n) throws ParseException {
         int i = this.myIndex;
         int j = i + n;
         if (j >= this.mySource.length()) {
            throw syntaxError("Substring bounds error");
         }
         this.myIndex += n;
         return this.mySource.substring(i, j);
     }


    /**
     * Get the next char in the string, skipping whitespace
     * and comments (slashslash, slashstar, and hash).
     * @throws ParseException
     * @return  A character, or 0 if there are no more characters.
     */
    public char nextClean() throws java.text.ParseException {
        while (true) {
            char c = next();
            if (c == '/') {
                switch (next()) {
                case '/':
                    do {
                        c = next();
                    } while (c != '\n' && c != '\r' && c != 0);
                    break;
                case '*':
                    while (true) {
                        c = next();
                        if (c == 0) {
                            throw syntaxError("Unclosed comment.");
                        }
                        if (c == '*') {
                            if (next() == '/') {
                                break;
                            }
                            back();
                        }
                    }
                    break;
                default:
                    back();
                    return '/';
                }
            } else if (c == '#') {
                do {
                    c = next();
                } while (c != '\n' && c != '\r' && c != 0);
            } else if (c == 0 || c > ' ') {
                return c;
            }
        }
    }


    /**
     * Return the characters up to the next close quote character.
     * Backslash processing is done. The formal JSON format does not
     * allow strings in single quotes, but an implementation is allowed to
     * accept them.
     * @param quote The quoting character, either
     *      <code>"</code>&nbsp;<small>(double quote)</small> or
     *      <code>'</code>&nbsp;<small>(single quote)</small>.
     * @return      A String.
     * @exception ParseException Unterminated string.
     */
    public String nextString(char quote) throws ParseException {
        char c;
        StringBuffer sb = new StringBuffer();
        while (true) {
            c = next();
            switch (c) {
            case 0:
            case '\n':
            case '\r':
                throw syntaxError("Unterminated string");
            case '\\':
                c = next();
                switch (c) {
                case 'b':
                    sb.append('\b');
                    break;
                case 't':
                    sb.append('\t');
                    break;
                case 'n':
                    sb.append('\n');
                    break;
                case 'f':
                    sb.append('\f');
                    break;
                case 'r':
                    sb.append('\r');
                    break;
                case 'u':
                    sb.append((char)Integer.parseInt(next(4), 16));
                    break;
                case 'x' :
                    sb.append((char) Integer.parseInt(next(2), 16));
                    break;
                default:
                    sb.append(c);
                }
                break;
            default:
                if (c == quote) {
                    return sb.toString();
                }
                sb.append(c);
            }
        }
    }


    /**
     * Get the text up but not including the specified character or the
     * end of line, whichever comes first.
     * @param  d A delimiter character.
     * @return   A string.
     */
    public String nextTo(char d) {
        StringBuffer sb = new StringBuffer();
        while (true) {
            char c = next();
            if (c == d || c == 0 || c == '\n' || c == '\r') {
                if (c != 0) {
                    back();
                }
                return sb.toString().trim();
            }
            sb.append(c);
        }
    }


    /**
     * Get the text up but not including one of the specified delimeter
     * characters or the end of line, whichever comes first.
     * @param delimiters A set of delimiter characters.
     * @return A string, trimmed.
     */
    public String nextTo(String delimiters) {
        char c;
        StringBuffer sb = new StringBuffer();
        while (true) {
            c = next();
            if (delimiters.indexOf(c) >= 0 || c == 0 ||
                    c == '\n' || c == '\r') {
                if (c != 0) {
                    back();
                }
                return sb.toString().trim();
            }
            sb.append(c);
        }
    }


    // AJ
    private static final Pattern DATE_PATTERN =
        Pattern.compile("new\\s+Date\\s*\\(\\s*Date\\s*\\.\\s*UTC\\s*\\(" +
                        "\\s*(\\d+)\\s*" +      // year
                        ",\\s*(\\d+)\\s*" +     // month
                        ",\\s*(\\d+)\\s*" +     // day
                        ",\\s*(\\d+)\\s*" +     // hour
                        ",\\s*(\\d+)\\s*" +     // minute
                        ",\\s*(\\d+)\\s*" +     // second
                        "(,\\s*(\\d+)\\s*)?" +  // millisecond
                        "\\)\\)");
                        
    public Date nextDate() throws ParseException {
        String dateString = nextTo(")");
        char next = nextClean();
        if (next != 0) {
            dateString += next;
        }
        if (next != ')') {
            throw syntaxError("Illegal date syntax: " + dateString);
        }
        next = nextClean();
        if (next != 0) {
            dateString += next;
        }
        if (next != ')') {
            throw syntaxError("Illegal date syntax: " + dateString);
        }
        Matcher m = DATE_PATTERN.matcher(dateString);
        if (!m.matches()) {
            throw syntaxError("Illegal date syntax: " + dateString);
        }
        String millis = null;
        try {
            millis = m.group(8);
        } catch (Exception e) {
            // no millis found
        }
        String newDateString =
            m.group(1) + "-" + (Integer.parseInt(m.group(2)) + 1) + "-" + m.group(3) + " " +
            m.group(4) + ":" + m.group(5) + ":" + m.group(6) + "." +
            (millis == null ? "0" : millis) + " GMT";
        Date retVal = internalDateFormat.parse(newDateString);
        //System.out.println("Millis of date: " + retVal.getTime());
        return retVal;
    }
    //
    
    /**
     * Get the next value. The value can be a Boolean, Double, Integer,
     * JSONArray, JSONObject, or String, or the JSONObject.NULL object.
     * @exception ParseException The source does not conform to JSON syntax.
     *
     * @return An object.
     */
    public Object nextValue() throws ParseException {
        char c = nextClean();
        // AJ
        char c2 = next();
        back();
        //
        String s;

        switch (c) {
            case '"':
            case '\'':
                return nextString(c);
            case '{':
                back();
                return new JSONObject(this);
            case '[':
                back();
                return new JSONArray(this);
            // AJ
            case 'n':
                if (c2 == 'e') {
                    // ugly, but the only way without rewriting the whole parser
                    back();
                    return nextDate();
                }
            //
        }

        /*
         * Handle unquoted text. This could be the values true, false, or
         * null, or it can be a number. An implementation (such as this one)
         * is allowed to also accept non-standard forms.
         *
         * Accumulate characters until we reach the end of the text or a
         * formatting character.
         */

        StringBuffer sb = new StringBuffer();
        char b = c;
        while (c >= ' ' && ",:]}/\\\"[{;=#".indexOf(c) < 0) {
            sb.append(c);
            c = next();
        }
        back();

        /*
         * If it is true, false, or null, return the proper value.
         */

        s = sb.toString().trim();
        if (s.equals("")) {
            throw syntaxError("Missing value.");
        }
        if (s.equalsIgnoreCase("true")) {
            return Boolean.TRUE;
        }
        if (s.equalsIgnoreCase("false")) {
            return Boolean.FALSE;
        }
        if (s.equalsIgnoreCase("null")) {
            return JSONObject.NULL;
        }
        // AJ
        if (s.startsWith("new Date(") && s.endsWith(")")) {
            return new Date(Long.parseLong(
                s.substring(9, s.length() - 1)));
        }
        //

        /*
         * If it might be a number, try converting it. We support the 0- and 0x-
         * conventions. If a number cannot be produced, then the value will just
         * be a string. Note that the 0-, 0x-, plus, and implied string
         * conventions are non-standard. A JSON parser is free to accept
         * non-JSON forms as long as it accepts all correct JSON forms.
         */

        if ((b >= '0' && b <= '9') || b == '.' || b == '-' || b == '+') {
            if (b == '0') {
                if (s.length() > 2 &&
                        (s.charAt(1) == 'x' || s.charAt(1) == 'X')) {
                    try {
                        return new Integer(Integer.parseInt(s.substring(2),
                                                            16));
                    } catch (Exception e) {
						/* Ignore the error */
                    }
                } else {
                    try {
                        return new Integer(Integer.parseInt(s, 8));
                    } catch (Exception e) {
						/* Ignore the error */
                    }
                }
            }
            try {
                return new Integer(s);
            } catch (Exception e) {
				/* Ignore the error */
            }
            try {
                return new Double(s);
            }  catch (Exception e) {
				/* Ignore the error */
            }
        }
        return s;
    }


    /**
     * Skip characters until the next character is the requested character.
     * If the requested character is not found, no characters are skipped.
     * @param to A character to skip to.
     * @return The requested character, or zero if the requested character
     * is not found.
     */
    public char skipTo(char to) {
        char c;
        int index = this.myIndex;
        do {
            c = next();
            if (c == 0) {
                this.myIndex = index;
                return c;
            }
        } while (c != to);
        back();
        return c;
    }


    /**
     * Skip characters until past the requested string.
     * If it is not found, we are left at the end of the source.
     * @param to A string to skip past.
     */
    public void skipPast(String to) {
        this.myIndex = this.mySource.indexOf(to, this.myIndex);
        if (this.myIndex < 0) {
            this.myIndex = this.mySource.length();
        } else {
            this.myIndex += to.length();
        }
    }


    /**
     * Make a ParseException to signal a syntax error.
     *
     * @param message The error message.
     * @return  A ParseException object, suitable for throwing
     */
    public ParseException syntaxError(String message) {
        return new ParseException(message + toString(), this.myIndex);
    }


    /**
     * Make a printable string of this JSONTokener.
     *
     * @return " at character [this.myIndex] of [this.mySource]"
     */
    public String toString() {
        return " at character " + this.myIndex + " of " + this.mySource;
    }


    /**
     * Convert <code>%</code><i>hh</i> sequences to single characters, and
     * convert plus to space.
     * @param s A string that may contain
     *      <code>+</code>&nbsp;<small>(plus)</small> and
     *      <code>%</code><i>hh</i> sequences.
     * @return The unescaped string.
     */
    public static String unescape(String s) {
        int len = s.length();
        StringBuffer b = new StringBuffer();
        for (int i = 0; i < len; ++i) {
            char c = s.charAt(i);
            if (c == '+') {
                c = ' ';
            } else if (c == '%' && i + 2 < len) {
                int d = dehexchar(s.charAt(i + 1));
                int e = dehexchar(s.charAt(i + 2));
                if (d >= 0 && e >= 0) {
                    c = (char)(d * 16 + e);
                    i += 2;
                }
            }
            b.append(c);
        }
        return b.toString();
    }
}
