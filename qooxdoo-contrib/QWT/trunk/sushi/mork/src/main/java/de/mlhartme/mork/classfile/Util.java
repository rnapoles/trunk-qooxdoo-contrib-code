// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Util.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.MethodRef;

public class Util implements Bytecodes {
    public static void unwrap(Class cl, Code dest) {
        ClassRef wrapper;

        if (cl.isPrimitive()) {
            wrapper = new ClassRef(ClassRef.wrappedType(cl));
            dest.emit(CHECKCAST, wrapper);
            dest.emit(INVOKEVIRTUAL,
                      MethodRef.meth(wrapper, new ClassRef(cl), cl.getName() + "Value"));
        } else {
            // do nothing
            //  dest.emit(CHECKCAST, new ClassRef(cl));
        }
    }
}
