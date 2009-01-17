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

package org.qooxdoo.sushi.scanner;

/**
 * <p>Position in a buffer.</p>
 *
 * <pre>
 * TODO
 * o expensive?
 * o URL?
 * o check corresponding jaxp class
 * </pre>
 */
public class Position {
    /** Usually a string of a URL */
    private Object context;

    /** Starts at 1 */
    private int line;

    /** Starts at 1 */
    private int col;

    /** Starts at 0. Its redundant and may be removed. */
    private int ofs;

    public Position() {
        this(null);
    }

    public Position(Object context) {
        this.context = context;
        this.line = 1;
        this.col = 1;
        this.ofs = 0;
    }

    public void set(Object context, int line, int col, int ofs) {
        this.context = context;
        this.line = line;
        this.col = col;
        this.ofs = ofs;
    }

    public void set(Position arg) {
        set(arg.context, arg.line, arg.col, arg.ofs);
    }

    /** the indicated range has been passed by the scanner. */
    public void update(char[] data, int start, int end) {
        int i;

        for (i = start; i < end; i++) {
            if (data[i] == '\n') {
                col = 1;
                line++;
            } else {
                col++;
            }
        }
        ofs += (end - start);
    }

    public Object getContext() {
        return context;
    }

    public int getOffset() {
        return ofs;
    }

    public int getLine() {
        return line;
    }

    public int getColumn() {
        return col;
    }

    @Override
    public String toString() {
        if (context != null) {
            return context + ":" + line + ":" + col;
        } else {
            return line + ":" + col;
        }
    }
}
