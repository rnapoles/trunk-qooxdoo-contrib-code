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

package org.qooxdoo.toolkit.repository;

/**
 * Compresses a String containing JavaScript by removing comments and 
 * whitespace.
 */
public class Compressor {
    public static String run(String script) {
        return new Compressor(script).run();
    }

    private static enum Token {
        /** space or tab */
        SPACE,
        /** cr or lf */
        NEWLINE,
        /** identifier or keyword */
        IDENTIFIER,
        /** string, regex or number */
        LITERAL,
        /** ';', ',', ':' or '{' */
        DELIMITER,
        /** everything else */
        MISC
    }

    //--
    
    private static final char TAB = '\t';
    private static final char LF = '\n';
    private static final char CR = '\r';
    private static final char SPACE = ' ';

    private final String script;
    private final int length;
    private final StringBuffer compressed;

    private Token current;
    private Token last;
    private Token lastLast;

    private Compressor(String script) {
        this.last = Token.DELIMITER;
        this.lastLast = Token.DELIMITER;
        this.script = script;
        this.length = script.length();
        this.compressed = new StringBuffer(script.length());
    }
    
    public String run() {
        int after;
        char c;
        char next;
        int pos;

        for (pos = 0; pos < length; pos = after) {
            c = script.charAt(pos);
            switch (c) {
                case SPACE:
                case TAB:
                    current = Token.SPACE;
                    after = pos + 1;
                    break;
                case CR:
                case LF:
                    current = Token.NEWLINE;
                    after = pos + 1;
                    break;
                case ';':
                case ',':
                case ':':
                case '{':
                    after = pos + 1;
                    current = Token.DELIMITER;
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    after = number(c, pos + 1);
                    current = Token.LITERAL;
                    break;
                case '"':
                case '\'':
                    after = string(c, pos + 1);
                    current = Token.LITERAL;
                    break;
                case '/':
                    next = getOrNull(pos + 1);
                    if (next == '/') {
                        after = lineComment(pos + 2);
                        current = Token.NEWLINE;
                    } else if (next == '*') {
                        after = blockComment(pos + 2);
                        current = Token.SPACE;
                    } else {
                        after = regex(pos + 1);
                        if (after == -1) {
                            // / found
                            after = pos + 1;
                            current = Token.MISC;
                        } else {
                            // regex found
                            current = Token.LITERAL;
                        }
                    }
                    break;
                default:
                    if (Character.isJavaIdentifierStart(c)) {
                        after = identifierPart(pos + 1);
                        current = Token.IDENTIFIER;
                    } else {
                        after = pos + 1;
                        current = Token.MISC;
                    }
            }
            add(pos, after);
        }
        return compressed.toString();
    }

    //--

    private char getOrNull(int pos) {
        return pos < length ? script.charAt(pos) : 0;
    }

    private int number(char start, int pos) {
        char next;

        if (start == '0') {
            next = getOrNull(pos);
            if (next == 'x' || next == 'X') {
                return hex(pos);
            }
        }
        return dec(pos);
    }

    /** does not eat exponents or fragments */
    private int dec(int pos) {
        char c;

        for (; pos < length; pos++) {
            c = script.charAt(pos);
            if (c >= '0' && c <= '9') {
                // continue
            } else {
                return pos;
            }
        }
        return pos;
    }

    private int hex(int pos) {
        char c;

        for (; pos < length; pos++) {
            c = script.charAt(pos);
            if (c >= '0' && c <= '9') {
                // continue
            } else if (c >= 'a' && c <= 'f') {
                // continue
            } else if (c >= 'A' && c <= 'F') {
                // continue
            } else {
                return pos;
            }
        }
        return pos;
    }

    private int identifierPart(int pos) {
        while (pos < length && Character.isJavaIdentifierPart(script.charAt(pos))) {
            pos++;
        }
        return pos;
    }

    private int string(char endChar, int pos) {
        char c;

        for (; pos < length; pos++) {
            c = script.charAt(pos);
            if (c == '\\' && pos + 1 < length) {
                pos++;
            } else {
                if (c == endChar) {
                    return pos + 1;
                } else if (c == CR || c == LF) {
                    throw new IllegalArgumentException();
                }
            }
        }
        return pos;
    }

    private int regex(int pos) {
        char c;

        for (; pos < length; pos++) {
            c = script.charAt(pos);
            if (c == '\\' && pos + 1 < length) {
                pos++;
            } else {
                if (c == '/') {
                    // skip flags
                    return identifierPart(pos + 1);
                } else if (c == CR || c == LF) {
                    return -1;
                }
            }
        }
        return -1;
    }

    private int lineComment(int pos) {
        char c;

        for (; pos < length; pos++) {
            c = script.charAt(pos);
            if (c == CR || c == LF) {
                return pos;
            }
        }
        return pos;
    }

    private int blockComment(int pos) {
        for (; pos < length; pos++) {
            if (script.charAt(pos) == '*' && pos + 1 < length && script.charAt(pos + 1) == '/') {
                return pos + 2;
            }
        }
        return pos;
    }

    //--

    private void add(int start, int after) {
        char c;

        switch (current) {
            case SPACE:
                if (last == Token.SPACE || last == Token.NEWLINE || last == Token.DELIMITER) {
                    // ignore this
                    return;
                }
                compressed.append(' ');
                break;
            case NEWLINE:
                if (last == Token.DELIMITER || last == Token.NEWLINE) {
                    return;
                }
                if (last == Token.SPACE) {
                    compressed.setCharAt(compressed.length() - 1, LF);
                    last = lastLast;
                } else {
                    compressed.append(LF);
                }
                break;
            case MISC:
                c = script.charAt(start);
                if ((lastLast == Token.IDENTIFIER || lastLast == Token.LITERAL) && last == Token.SPACE) {
                    compressed.setCharAt(compressed.length() - 1, c);
                    last = lastLast;
                } else {
                    compressed.append(c);
                }
                break;
            case IDENTIFIER:
            case LITERAL:
                if (lastLast == Token.MISC && last == Token.SPACE) {
                    compressed.setLength(compressed.length() - 1);
                    last = lastLast;
                }
                compressed.append(script.substring(start, after));
                break;
            case DELIMITER:
                if (last == Token.SPACE || last == Token.NEWLINE) {
                    compressed.setCharAt(compressed.length() - 1, script.charAt(start));
                    lastLast = last;
                } else {
                    compressed.append(script.charAt(start));
                }
                break;
            default:
                throw new IllegalArgumentException("" + current);
        }
        lastLast = last;
        last = current;
    }
}
