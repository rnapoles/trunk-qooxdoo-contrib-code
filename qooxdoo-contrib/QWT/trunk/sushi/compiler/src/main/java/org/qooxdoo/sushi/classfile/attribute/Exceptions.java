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

package org.qooxdoo.sushi.classfile.attribute;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

public class Exceptions extends Attribute {
    public static final String NAME = "Exceptions";
    public final List<ClassRef> exceptions;

    public Exceptions() {
        super(NAME);

        exceptions = new ArrayList<ClassRef>();
    }

    public Exceptions(Input src) throws IOException {
        this();

        int i;
        int len;
        int count;

        len = src.readU4();
        count = src.readU2();
        if (2 + count * 2 != len) {
            throw new RuntimeException("illegal exceptions attribute");
        }
        for (i = 0; i < count; i++) {
            exceptions.add(src.readClassRef());
        }
    }

    @Override
    public void write(Output dest) throws IOException {
        int i;
        int count;
        int start;

        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        count = exceptions.size();
        dest.writeU2(count);
        for (i = 0; i < count; i++) {
            dest.writeClassRef((ClassRef) exceptions.get(i));
        }
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }

    @Override
    public String toString() {
        StringBuilder result;
        int i, len;

        result = new StringBuilder();
        result.append(NAME);
        result.append(" attrib\n");
        len = exceptions.size();
        for (i = 0; i < len; i++) {
            result.append('\t');
            result.append(exceptions.get(i).toString());
            result.append('\t');
        }
        return result.toString();
    }
}
