// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/ExceptionInfo.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.IOException;

public class ExceptionInfo {
    public int start;  // a pc
    public int end;    // a pc or code.size
    public int handler; // a pc
    public ClassRef type;

    public static final int size = 8;

    public ExceptionInfo(int start, int end, int handler, ClassRef type) {
        this.start = start;
        this.end = end;
        this.handler = handler;
        this.type = type;
    }

    public ExceptionInfo(Input src) throws IOException {
        src.requireCode();
        start = src.readIdx();
        end = src.readIdxOrLast();
        handler = src.readIdx();
        try {
            type = src.readClassRef();
        } catch (NullPointerException e) {
            type = null;  // default handler, called for any exception
        }
    }

    public void write(Output dest) throws IOException {
        int tmp;

        dest.requireCode();
        dest.writeIdx(start);
        dest.writeIdxOrLast(end);
        dest.writeIdx(handler);
        try {
            dest.writeClassRef(type);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
    }

    public String toString() {
        return "start=" + start + " end=" + end +
            " handler=" + handler + " type=" + type;
    }
}
