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

package org.qooxdoo.toolkit.compiler;

/** JavaScrip code generation. */
public class JavaScript {
    private final StringBuilder builder;
    private int indent;
    private boolean startOfLine;
    
    public JavaScript() {
        builder = new StringBuilder();
        indent = 0;
        startOfLine = true;
    }
    
    public void open() {
        append('{');
        newline();
        inc();
    }
    public void close() {
        dec();
        append('}');
        newline();
    }

    public void inc() {
        indent++;
    }

    public void dec() {
        indent--;
    }

    public void newline() {
        builder.append('\n');
        startOfLine = true;
    }

    //--
    
    public JavaScript append(char c) {
        start();
        builder.append(c);
        return this;
    }
    
    public JavaScript append(String ... strings) {
        start();
        for (String str: strings) {
            builder.append(str);
        }
        return this;
    }
    
    private void start() {
        if (startOfLine) {
            startOfLine = false;
            for (int i = 0; i < indent; i++) {
                builder.append("    ");
            }
        }
    }
    
    //--
    
    public int size() {
        return builder.length();
    }
    
    public void clear() {
        builder.setLength(0);
    }
    
    @Override
    public String toString() {
        return builder.toString();
    }
}
