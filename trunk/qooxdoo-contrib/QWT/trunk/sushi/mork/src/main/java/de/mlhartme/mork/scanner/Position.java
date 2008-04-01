// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/Position.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

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
