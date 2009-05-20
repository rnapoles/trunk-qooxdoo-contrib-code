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

package org.qooxdoo.sushi.csv;

import java.util.List;

import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.Path;
import org.qooxdoo.sushi.metadata.SimpleTypeException;
import org.qooxdoo.sushi.metadata.Variable;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type public class Field {
    @Value private String name;
    @Value private Path path;
    
    public Field() { // TODO
        this("", new Path(""));
    }

    public Field(String name, Path path) {
        this.name = name;
        this.path = path;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Path getPath() {
        return path;
    }

    public void setPath(Path path) {
        this.path = path;
    }

    public List<String> get(Instance<?> context) {
        Variable<?> var;

        var = path.access(context, false);
        if (var == null) {
            return null;
        } else {
            return var.getStrings();
        }
    }
    
    public void set(Instance<?> context, List<String> values) throws SimpleTypeException {
        if (values == null) {
            // ignore
        } else {
            path.access(context, true).setStrings(values);
        }
    }

    @Override
    public String toString() {
        return name + ":" + path.toString();
    }
}
