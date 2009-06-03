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

package org.qooxdoo.sushi.classfile;

import java.io.IOException;

public class ExceptionInfo {
    public int start;  // a pc
    public int end;    // a pc or code.size
    public int handler; // a pc
    public ClassRef type;

    public static final int SIZE = 8;

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

    @Override
    public String toString() {
        return "start=" + start + " end=" + end +
            " handler=" + handler + " type=" + type;
    }
}
