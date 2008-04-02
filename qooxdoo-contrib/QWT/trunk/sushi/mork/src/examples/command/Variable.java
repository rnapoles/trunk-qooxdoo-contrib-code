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

package command;

public class Variable {
    /** used to refer to the variable */
    private String name;

    /** used in the frontend to label the variable's input field. */
    private String label;

    /** contents */
    private String value;

    public Variable(String name, String label) {
        this.name = name;
        this.label = label;
        this.value = "";
    }

    public String getName() {
        return name;
    }

    public String getLabel() {
        return label;
    }

    public String get() {
        return value;
    }

    public void set(String obj) {
        value = obj;
    }
}
