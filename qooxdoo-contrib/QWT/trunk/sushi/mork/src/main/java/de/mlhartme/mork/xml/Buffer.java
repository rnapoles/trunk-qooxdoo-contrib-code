// §{{header}}:
//
// This is file src/de/mlhartme/mork/xml/Buffer.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.xml;

import de.mlhartme.mork.scanner.Position;
import de.mlhartme.mork.util.IntArrayList;
import java.util.ArrayList;
import java.util.List;

/**
 * Stores grammar token.
 */

public class Buffer {
    /** current position. */
    private int idx;
    private IntArrayList terminals;
    private List texts;
    private List positions;

    public Buffer() {
        idx = 0;
        terminals = new IntArrayList();
        texts = new ArrayList();
        positions = new ArrayList();
    }

    public int size() {
        return terminals.size();
    }

    public boolean isEof() {
        return idx == terminals.size();
    }

    public void reset() {
        idx = 0;
    }

    public void add(int terminal, String text, Position pos) {
        terminals.add(terminal);
        texts.add(text);
        positions.add(pos);
    }

    // TODO
    public void prepend(int terminal, String text, Position pos) {
        terminals.add(0, terminal);
        texts.add(0, text);
        positions.add(0, pos);
    }

    public void remove(int ofs, int count) {
        while (count-- > 0) {
            terminals.remove(ofs);
            texts.remove(ofs);
            positions.remove(ofs);
        }
    }

    public void next() {
        idx++;
    }

    public int getTerminal() {
        if (idx < terminals.size()) {
            return terminals.get(idx);
        } else {
            return -1;
        }
    }

    public String getPreviousText() {
        return (String) texts.get(idx - 1);
    }

    public String getText() {
        return (String) texts.get(idx);
    }

    public Position getPreviousPosition() {
        return (Position) positions.get(idx - 1);
    }

    public Position getPosition() {
        return (Position) positions.get(idx);
    }

    public String toString() {
        StringBuffer buffer;
        int i;
        int max;

        buffer = new StringBuffer();
        max = terminals.size();
        for (i = 0; i < max; i++) {
            buffer.append("[" + terminals.get(i) + "," + texts.get(i) + "]");
        }
        return buffer.toString();
    }

    public String getAllText() {
        StringBuffer buffer;
        int i;
        int max;

        buffer = new StringBuffer();
        max = terminals.size();
        for (i = 0; i < max; i++) {
            buffer.append(texts.get(i));
        }
        return buffer.toString();
    }

}
