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

package org.qooxdoo.toolkit.repository;

import java.util.List;

import org.mozilla.javascript.RhinoException;
import org.qooxdoo.sushi.util.Strings;

public class JavaScriptException extends Exception {
    public static JavaScriptException create(RhinoException e, String message, String script) {
        return create(e.sourceName(), e.lineNumber(), e.columnNumber(), message, script, e, null);
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
