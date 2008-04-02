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

package org.qooxdoo.toolkit.plugin.binding.java;

public enum SimpleType implements Type {
    VOID("void"), BOOLEAN("boolean"), NUMBER("int"), STRING("String"), OBJECT("Object"), 
    MAP("Object"), FUNCTION("Object"), 
    VAR("Object"); // TODO

    private final String java;
    
    private SimpleType(String java) {
        this.java = java;
    }

    public String getJavaName() {
        return java;
    }
}
