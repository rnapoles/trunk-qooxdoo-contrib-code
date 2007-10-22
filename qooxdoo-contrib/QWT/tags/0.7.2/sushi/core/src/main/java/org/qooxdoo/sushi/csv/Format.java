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

package org.qooxdoo.sushi.csv;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.List;

/**
 * Parser and Serializer for csv file lines.  
 * 
 * Note:
 * o whitespace is always significant because it's never stripped by OOCalc 
 *   (except for digit-only values).
 * o comments are not supported because OOCalc would consider them as strings.
 * o a line has at least one cell
 * 
 * You have to implement some pre- or post-processing if you want comments of whitespace handling.
 *
 *
 * Grammar
 * 
 * line    = cell (SEP cell)* newline ;
 * cell    = values 
 *         | QUOTE values QUOTE ;
 * values  = value (VSEP value)* 
 *         | EMPTY
 *         | NULL ;
 * value   = char* ;
 * char    = QUOTE QUOTE
 *         | ESC CH
 *         | SEP                               <-- aber nur wenn drumrum quotes stehen
 *         | CH \ QUOTE \ ESC \ SEP \ VSEP  ;
 * newline = CR | LF | CR LF ;
 * 
 * Terminals as configured for the format: 
 *   QUOTE, SEP, VSEP, NEWLINE, COMMENT, NULL, EMPTY, ESC
 *   
 * Other Terminals:
 *   CH: arbitrary unicode character
 */
public class Format {
    public final boolean merged;

    /** between cells */
    private final char separator;
    
    /** between values */
    private final char valueSeparator;

    private final String empty;
    
    private final String nul;
    
    /** escape special characters */
    private final char escape;
    
    /** to quote cells */
    private final char quote;

    private final String unquoted;
    
    public Format() {
        this(false);
    }
    
    public Format(boolean merged) {
        this(merged, '\\', '"');
    }
    public Format(boolean merged, char escape, char quote) {
        this(merged, "\n", ';', '|', "EMPTY", "NULL", escape, quote, "01234567890");
    }
    
    public Format(boolean merged, String newline, char separator, char valueSeparator, 
            String empty, String nul, char escape, char quote, String unquoted) {
        this.merged = merged;
        this.separator = separator;
        this.valueSeparator = valueSeparator;
        this.empty = "EMPTY";
        this.nul = "NULL";
        this.escape = escape;
        this.quote = quote;
        this.unquoted = unquoted;
    }
    
    public Line read(String line) throws CsvLineException {
        Line result;
        Source src;
        int c;
        
        result = new Line();
        src = new Source(line);
        while (true) {
            cell(src, result);
            c = src.peek();
            if (c == Source.END) {
                return result;
            }
            if (c != separator) {
                throw new CsvLineException("separator expected");
            }
            src.eat();
        }
    }

    private void cell(Source src, Line result) throws CsvLineException {
        boolean quoted;
        
        quoted = src.peek() == quote;
        if (quoted) {
            src.eat();
        }
        values(src, quoted, result);
        if (quoted) {
            if (src.peek() != quote) {
                throw new CsvLineException("quote not closed");
            }
            src.eat();
        }
    }

    private void values(Source src, boolean quoted, Line result) throws CsvLineException {
        List<String> values;

        if (src.eat(nul, quoted ? quote : separator)) {
            result.addNull();
            return;
        }
        values = result.add();
        if (src.eat(empty, quoted ? quote : separator)) {
            return;
        }
        while (true) {
            value(src, quoted, values);
            if (src.peek() != valueSeparator) {
                return;
            }
            src.eat();
        }
    }

    private void value(Source src, boolean quoted, List<String> values) throws CsvLineException { 
        StringBuilder builder;
        int c;
        
        builder = new StringBuilder();
        while (true) {
            c = src.peek();
            if (c == -1) {
                break;
            } else if (c == quote) {
                if (src.peekNext() == quote) {
                    src.eat();
                    builder.append(quote);
                } else {
                    break;
                }
            } else if (c == separator) {
                if (quoted) {
                    builder.append(c);
                } else {
                    break;
                }
            } else if (c == valueSeparator) {
                break;
            } else if (c == escape) {
                src.eat();
                c = src.peek();
                if (c == Source.END) {
                    throw new CsvLineException("tailing escape character " + escape);
                }
                builder.append((char) c);
            } else {
                builder.append((char) c);
            }
            src.eat();
        }
        values.add(builder.toString());
    }
    
    //--
    
    public String write(Line line) {
        StringWriter dest;
        
        dest = new StringWriter();
        try {
            write(line, dest);
        } catch (IOException e) {
            throw new RuntimeException("unused", e);
        }
        return dest.toString();
    }
    
    public void write(Line line, Writer dest) throws IOException {
        for (int i = 0, max = line.size(); i < max; i++) {
            if (i > 0) {
                dest.write(separator);
            }
            writeCell(line.get(i), dest);
        }
        dest.write('\n');
    }
    
    private void writeCell(List<String> values, Writer dest) throws IOException {
        boolean quoted;
        char c;
        boolean first;

        if (values == null) {
            dest.write(nul);
            return;
        }
        if (values.size() == 0) {
            dest.write(empty);
            return;
        }
        quoted = values.size() != 1 || needsQuotes(values.get(0));
        if (quoted) {
            dest.write(quote);
        }
        first = true;
        for (String value : values) {
            if (first) {
                first = false;
            } else {
                dest.write(valueSeparator);
            }
            if (value.equals(nul)) {
                dest.write(escape);
                dest.write(nul);
            } else if (value.equals(empty)) {
                dest.write(escape);
                dest.write(empty);
            } else {
                for (int i = 0, max = value.length(); i < max; i++) {
                    c = value.charAt(i);
                    if (c == quote) { 
                        dest.write(quote);
                        dest.write(quote);
                    } else if (c == separator || c == valueSeparator || c == escape) {
                        dest.write(escape);
                        dest.write(c);
                    } else {
                        dest.write(c);
                    }
                }
            }
        }
        if (quoted) {
            dest.write(quote);
        }
    }

    private boolean needsQuotes(String value) {
        for (int i = 0, max = value.length(); i < max; i++) {
            if (unquoted.indexOf(value.charAt(i)) == -1) {
                return true;
            }
        }
        return false;
    }
}
