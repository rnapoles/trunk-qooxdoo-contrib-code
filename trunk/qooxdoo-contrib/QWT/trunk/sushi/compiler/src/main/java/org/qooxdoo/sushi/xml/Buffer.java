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

package org.qooxdoo.sushi.xml;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntArrayList;

import org.qooxdoo.sushi.scanner.Position;

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

    @Override
    public String toString() {
        StringBuilder buffer;
        int i;
        int max;

        buffer = new StringBuilder();
        max = terminals.size();
        for (i = 0; i < max; i++) {
            buffer.append("[" + terminals.get(i) + "," + texts.get(i) + "]");
        }
        return buffer.toString();
    }

    public String getAllText() {
        StringBuilder buffer;
        int i;
        int max;

        buffer = new StringBuilder();
        max = terminals.size();
        for (i = 0; i < max; i++) {
            buffer.append(texts.get(i));
        }
        return buffer.toString();
    }

}
