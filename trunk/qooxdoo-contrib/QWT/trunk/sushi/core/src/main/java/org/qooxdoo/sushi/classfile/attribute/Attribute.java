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

import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.Input;
import org.qooxdoo.sushi.classfile.Output;

public abstract class Attribute {
    public final String name;

    protected Attribute(String nameInit) {
        name = nameInit;
    }

    public static Attribute create(Input src) throws IOException {
        String name;

        name = src.readUtf8();
        if (name.equals("Code")) {
            return new Code(src);
        } else if (name.equals("ConstantValue")) {
            return new ConstantValue(src);
        } else if (name.equals("Exceptions")) {
            return new Exceptions(src);
        } else if (name.equals("InnerClasses")) {
            return new InnerClasses(src);
        } else if (name.equals("Synthetic")) {
            return new Synthetic(src);
        } else if (name.equals("SourceFile")) {
            return new SourceFile(src);
        } else if (name.equals("LineNumberTable")) {
            return new LineNumberTable(src);
        } else if (name.equals("LocalVariableTable")) {
            return new LocalVariableTable(src);
        } else if (name.equals("Deprecated")) {
            return new Deprecated(src);
        } else {
            return new Blackbox(name, src);
        }
    }

    public abstract void write(Output dest) throws IOException;
}
