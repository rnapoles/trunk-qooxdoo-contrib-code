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

import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

public class ConstantValue extends Attribute {
    public static final String NAME = "ConstantValue";

    public final Object value;

    public ConstantValue(Object valueInit) {
        super(NAME);

        value = valueInit;
    }

    public ConstantValue(Input src) throws IOException {
        super(NAME);

        int len;

        len = src.readU4();
        if (len != 2) {
            throw new RuntimeException("ConstantValue attribute of length "
                                       + len);
        }
        value = src.readConstant();
    }

    @Override
    public void write(Output dest) throws IOException {
        dest.writeUtf8(name);
        dest.writeU4(2);
        dest.writeConstant(value);
    }

    @Override
    public String toString() {
        return name + " attribute " + value;
    }
}
