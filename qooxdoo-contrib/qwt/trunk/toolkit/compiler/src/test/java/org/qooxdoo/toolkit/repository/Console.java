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

import java.util.ArrayList;
import java.util.List;

import javax.script.ScriptException;

/** fake firebug console */
public class Console {
    public final List<String> messages;
    public final boolean firebug = true;
    
    public Console() {
        messages = new ArrayList<String>();
    }
    
    public void info(String message) throws ScriptException {
        log(message);
    }
    
    public void debug(String message) throws ScriptException {
        log(message);
    }

    public void error(String message) throws ScriptException {
        log(message);
    }

    public void log(String message) throws ScriptException {
        // System.out.println(message);
        messages.add(message);
    }

    public String last() {
        return messages.get(messages.size() - 1);
    }
}
