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

package org.qooxdoo.sushi.io;

public enum OS {
    LINUX("Linux", "$", "", ':', "\n", 
    		new String[] { "--format", "%a"},
            new String[] { "--format", "%u"}, 
            new String[] { "--format", "%g"}),
    MAC("Mac", "$", "", ':', "\n", 
    		new String[] { "-f", "%Op"},
    		new String[] { "-f", "%u"}, 
    		new String[] { "-f", "%g"}), 
    WINDOWS("Windows", "%", "%", ';', "\r\n", 
    		new String[] { "/f", "%a" }, 
    		new String[] { "/f", "%u" }, 
    		new String[] { "/f", "%g" }); 

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
    public final String[] mode;
    public final String[] uid;
    public final String[] gid;
    
    private OS(String substring, String variablePrefix, String variableSuffix, 
            char listSeparatorChar, String lineSeparator, 
            String[] mode, String[] uid, String[] gid) {
        this.substring = substring;
        this.variablePrefix = variablePrefix;
        this.variableSuffix = variableSuffix;
        this.listSeparatorChar = listSeparatorChar;
        this.listSeparator = Character.toString(listSeparatorChar);
        this.lineSeparator = lineSeparator;
        this.mode = mode;
        this.uid = uid;
        this.gid = gid;
    }

    public String variable(String name) {
        return variablePrefix + name + variableSuffix;
    }
}
