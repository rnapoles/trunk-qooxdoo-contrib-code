// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/GrammarScanner.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

import java.io.IOException;
import java.io.Reader;
import de.mlhartme.mork.util.GenericException;
/**
 * A token stream, input for parsers. Adds filter functionality to
 * regular expressions.
 */

public class GrammarScanner implements Scanner {
    // this should be a value with a short representation in a Utf8 String
    // because it is saved as part of a String
    public static final int ERROR_PC = 1;

    // the last value with a two-byte representation in utf8
    // (this constant is less important than ERROR_PC because most states
    // an end states; in my Java grammar 40-non-end vs. 260 end states)
    public static final int NO_TERMINAL = 0x07ff;

    private final int start;
    private final int modeCount;
    private final char[] data;
    private final int eofSymbol;
    private final Buffer src;

    public GrammarScanner(int start, int modeCount, int eofSymbol, char[] data, Position pos, Reader reader) {
        this.start = start;
        this.modeCount = modeCount;
        this.eofSymbol = eofSymbol;
        this.data = data;
        this.src = new Buffer();
        src.open(pos, reader);
    }

    // TODO: expensive; not in interface
    public String getRemainingInput() throws IOException {
        int c;
        StringBuilder buffer;

        buffer = new StringBuilder();
        for (c = src.readOrEof(); c != -1; c = src.readOrEof()) {
            buffer.append((char) c);
        }
        return buffer.toString();
    }

    public void getPosition(Position result) {
        src.getPosition(result);
    }

    public String getText() {
        return src.createString();
    }

    public int eat(int mode) throws IOException {
        int pc;        // idx in data
        int c;
        int tmp;
        int endTerminal;
        int endCount;
        int count; // counting the ofset is faster than querying it from the buffer

        src.mark();

        endTerminal = -1;
        endCount = 0;
        count = 0;
        pc = start;
        try {
            do {
                tmp = data[pc + mode];
                pc += modeCount;
                if (tmp != NO_TERMINAL) {
                    endTerminal = tmp;
                    endCount = count;
                }
                c = src.read();
                count++;
                while (c > data[pc]) {
                    pc += 2;
                }
                pc = data[pc + 1];
            } while (pc != ERROR_PC);
        } catch (GenericException e) {
            if (e != Buffer.EOF) {
                throw new IllegalStateException("unexpected GenericException " + e);
            }
            if (!src.wasEof()) {
                throw new IllegalStateException();
            }
            src.reset(endCount);
            if (endTerminal == -1) {
                return eofSymbol;
            } else {
                return endTerminal;
            }
        }
        src.reset(endCount);
        return endTerminal;
    }
}
