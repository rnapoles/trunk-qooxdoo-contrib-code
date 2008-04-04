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

import java.util.Arrays;

import org.qooxdoo.sushi.csv.Csv;
import org.qooxdoo.sushi.csv.Format;
import org.qooxdoo.sushi.csv.View;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;

public class CsvSample {
    private static final IO IO_OBJ = new IO();
    private static final Type TYPE = new ReflectSchema(IO_OBJ).type(All.class);
    
    /** Serialize object to xml and load the result back into an object */
    public static void main(String[] args) throws Exception {
        All all;
        View view;
        Csv csv;
        Instance<All> data;
        
        all = new All();

        System.out.println("object:\n" + all);
        
        data = TYPE.instance(all);
        csv = new Csv(new Format());
        view = View.fromXml(IO_OBJ.stringNode("<view>" +
                "  <scope>items</scope>" +
                "  <field><name>Id</name><path>id</path></field>" +
                "  <field><name>String</name><path>string</path></field>" +
                "</view>"));
        data.exportCsv(view, csv, "7", "2");
        System.out.println("orig\n" + csv);
        csv.get(2).get(1).set(0, "two");
        data.importCsv(view, csv);
        System.out.println("modified\n" + csv);
    }
    
    public static class All {
        // TOOD: doesn't work for Lists because the static type is used
        public final Item[] items = { new Item(2, "zwei"), new Item(7, "sieben") };
        
        @Override
        public String toString() {
            return Arrays.asList(items).toString();
        }
    }
    
    public static class Item {
        public int id;
        public String string;
        
        public Item() {
            this(0, "");
        }

        public Item(int id, String string) {
            this.id = id;
            this.string = string;
        }
        
        @Override
        public String toString() {
            return "id=" + id + "+string=" + string;
        }
    }
}
