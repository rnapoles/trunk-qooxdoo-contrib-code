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

package compiler;

public class Variable {
    private Type type;
    private String name;
    private int address;

    public Variable(Type type, String name) {
        this.type = type;
        this.name = name;
        address = -1;
    }

    public int allocate(int no) {
        address = no;
        return no + 1;
    }

    public int getAddress() {
        return address;
    }

    public String getName() {
        return name;
    }

    public Type getType() {
        return type;
    }
}
