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

package org.qooxdoo.sushi;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;

public class MetadataSample {
    /** Serialize object to xml and load the result back into an object */
    public static void main(String[] args) throws Exception {
        Instance<Obj> data;
        Obj obj;
        
        data = TYPE.loadXml(new IO().stringNode("<obj><number>2</number><string>str</string></obj>"));
        obj = data.get();
        System.out.println("object:\n" + obj);
        obj.number = 3;
        System.out.println("xml:\n" + data.toXml());
    }
    
    private static final Type TYPE = new ReflectSchema(new IO()).type(Obj.class);
    
    public static class Obj {
        public int number;
        public String string;
        
        public Obj() {
            this(0, "");
        }

        public Obj(int number, String string) {
            this.number = number;
            this.string = string;
        }
        
        @Override
        public String toString() {
            return "number=" + number + ",string=" + string;
        }
    }
}
