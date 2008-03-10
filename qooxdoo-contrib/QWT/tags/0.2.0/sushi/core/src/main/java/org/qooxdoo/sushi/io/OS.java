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
    LINUX("Linux", "$", "", ':', "\n", "--format", "%a"),
    MAC("Mac", "$", "", ':', "\n", "-f", "%Op"), 
    WINDOWS("Windows", "%", "%", ';', "\r\n", "/f", "%a"); 

    private static OS detect() {
        String name;

        name = System.getProperty("os.name");
        for (OS os : values()) {
            if (name.contains(os.substring)) {
                return os;
            }
        }
        throw new IllegalArgumentException("unkown os:" + name);
    }

    public static final OS CURRENT = detect();

    private final String substring;
    private final String variablePrefix;
    private final String variableSuffix;
    public final char listSeparatorChar;
    public final String listSeparator;
    public final String lineSeparator;
    public final String[] stat;
    
    private OS(String substring, String variablePrefix, String variableSuffix, 
            char listSeparatorChar, String lineSeparator, String... stat) {
        this.substring = substring;
        this.variablePrefix = variablePrefix;
        this.variableSuffix = variableSuffix;
        this.listSeparatorChar = listSeparatorChar;
        this.listSeparator = "" + listSeparatorChar;
        this.lineSeparator = lineSeparator;
        this.stat = stat;
    }

    public String variable(String name) {
        return variablePrefix + name + variableSuffix;
    }
}
