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

public class LocalVariableInfo {
    public int start;  // code idx
    public int end;    // code idx
    public String name;
    public String descriptor;  // a field descriptor
    public int index;

    public static final int SIZE = 10;

    public LocalVariableInfo(Input src) throws IOException {
        start = src.readIdx();
        end = src.readEndIdxOrLast(start);
        name = src.readUtf8();
        descriptor = src.readUtf8();
        index = src.readU2();
    }

    public void write(Output dest) throws IOException {
        dest.writeIdx(start);
        dest.writeEndIdxOrLast(start, end);
        dest.writeUtf8(name);
        dest.writeUtf8(descriptor);
        dest.writeU2(index);
    }

    @Override
    public String toString() {
        return name + " " + descriptor + " " + start + " " + end;
    }
}
