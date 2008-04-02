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

public class InnerClassesInfo {
    public ClassRef inner;
    public ClassRef outer;
    public String name;
    public int flags;

    public static final int SIZE = 8;

    public InnerClassesInfo(Input src) throws IOException {
        try {
            inner = src.readClassRef();
        } catch (NullPointerException e) {
            inner = null;
        }
        try {
            outer = src.readClassRef();
        } catch (NullPointerException e) {
            outer = null;
        }
        try {
            name = src.readUtf8();
        } catch (NullPointerException e) {
            name = null;
        }
        flags = src.readU2();
    }

    public void write(Output dest) throws IOException {
        try {
            dest.writeClassRef(inner);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        try {
            dest.writeClassRef(outer);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        try {
            dest.writeUtf8(name);
        } catch (NullPointerException e) {
            dest.writeU2(0);
        }
        dest.writeU2(flags);
    }

}
