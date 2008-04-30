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
import java.util.Set;
import org.qooxdoo.sushi.classfile.attribute.Attribute;

public class FieldDef extends Definition {
    public final Set<Access> accessFlags;
    public final String name;
    public final ClassRef type;
    public Attribute[] attributes;

    public FieldDef(Set<Access> accessFlags, String name, ClassRef type) {
        this.accessFlags = accessFlags;
        this.name = name;
        this.type = type;
        this.attributes = new Attribute[0];
    }
    
    public FieldDef(Input src) throws IOException {
        int i;
        String descriptor;

        accessFlags = Access.fromFlags(src.readU2(), false);
        name = src.readUtf8();
        descriptor = src.readUtf8();
        type = ClassRef.forFieldDescriptor(descriptor);
        attributes = new Attribute[src.readU2()];
        for (i = 0; i < attributes.length; i++) {
            attributes[i] = Attribute.create(src);
        }
    }

    public void write(Output dest) throws IOException {
        int i;

        dest.writeU2(Access.toFlags(accessFlags));
        dest.writeUtf8(name);
        dest.writeUtf8(type.toFieldDescriptor());
        dest.writeU2(attributes.length);
        for (i = 0; i < attributes.length; i++) {
            attributes[i].write(dest);
        }
    }

    public FieldRef reference(ClassRef owner) {
        return new FieldRef(owner, name, type);
    }
    
    @Override
    public String toString() {
        return Access.toPrefix(accessFlags) + type + " " + name;
    }
}
