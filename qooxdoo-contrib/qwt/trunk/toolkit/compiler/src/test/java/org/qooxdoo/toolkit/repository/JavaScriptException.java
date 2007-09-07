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

package org.qooxdoo.toolkit.repository;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.script.ScriptException;

import org.qooxdoo.sushi.util.Strings;

public class JavaScriptException extends Exception {
    public static JavaScriptException create(ScriptException e, String message, String script) {
        return create(e.getFileName(), e.getLineNumber(), e.getColumnNumber(), message, script, e, null);
    }

    public static JavaScriptException create(ScriptException e, Throwable cause, String script) {
        final String HEAD = "script(";
        StringWriter dest;
        int idx;
        StringBuilder stack;
        Integer no;
        String file;
        int tmp;
        
        dest = new StringWriter();
        cause.printStackTrace(new PrintWriter(dest));
        stack = new StringBuilder();
        no = null;
        file = null;
        for (String line : Strings.split("\n", dest.toString())) {
            idx = line.indexOf(HEAD);
            if (idx != -1) {
                line = line.substring(idx + HEAD.length(), line.indexOf(')', idx));
                idx = line.lastIndexOf(':');
                if (idx == -1) {
                    throw new IllegalArgumentException(line);
                }
                tmp = Integer.parseInt(line.substring(idx + 1));
                if (no == null) {
                    no = tmp;
                    file = line.substring(0, idx);
                }
                stack.append(line);
                stack.append('\n');
            }
        }
        if (no == null) {
            no = e.getLineNumber();
            file = e.getFileName();
        }
        return create(file, no, e.getColumnNumber(), cause.getMessage(), script, e, stack.toString());
    }

    public static JavaScriptException create(String file, int no, int col, String message, String script, Throwable cause, String stack) {
        List<String> lines;
        String pos;
        
        lines = Strings.split("\n", script);
        if (no - 1 >= lines.size()) {
            pos = "(line not found)";
        } else {
            pos = lines.get(no - 1);
            pos = pos + "\n" + Strings.times(' ', col) + "^";
        }
        return new JavaScriptException(file + ":" + no + ":" + col + ":" + message + "\n" + stack + "\n" + pos, 
                file, no, col, stack, script, cause);
    }

    public final String file;
    public final int line;
    public final int col;
    public final String stack;
    public final String script;
    
    private JavaScriptException(String msg, String file, int line, int col, String stack, String script, Throwable cause) {
        super(msg, cause);
        this.file = file;
        this.line = line;
        this.col = col;
        this.stack = stack;
        this.script = script;
    }
}
