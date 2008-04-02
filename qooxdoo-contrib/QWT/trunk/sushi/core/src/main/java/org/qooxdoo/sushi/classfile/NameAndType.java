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

// not public
class NameAndType {
    /** field or method name */
    public final String name;

    /** field or method descriptor */
    public final String descriptor;

    public NameAndType(String name, String descriptor) {
        this.name = name;
        this.descriptor = descriptor;
    }

    public NameAndType(String name, FieldRef ref) {
        this(name, ref.type.toFieldDescriptor());
    }

    public NameAndType(String name, MethodRef ref) {
        this(name, ref.toDescriptor());
    }

    @Override
    public boolean equals(Object obj) {
        NameAndType nt;

        if (!(obj instanceof NameAndType)) {
            return false;
        }
        nt = (NameAndType) obj;
        return name.equals(nt.name) && descriptor.equals(nt.descriptor);
    }
    
    @Override
    public int hashCode() {
        return name.hashCode();
    }
}
