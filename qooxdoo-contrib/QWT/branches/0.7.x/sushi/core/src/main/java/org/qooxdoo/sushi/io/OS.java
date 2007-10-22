/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.io;

public enum OS {
    MAC("-f", "%Op"), 
    LINUX("--format", "%a");

    public static OS detect() {
        String name;

        name = System.getProperty("os.name");
        if (name.contains("Mac")) {
            return MAC;
        }
        if (name.contains("Linux")) {
            return LINUX;
        }
        throw new IllegalArgumentException("unkown ok:" + name);
    }

    public final String[] stat;

    private OS(String... stat) {
        this.stat = stat;
    }
}
