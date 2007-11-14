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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.InvocationTargetException;
import java.util.logging.Level;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.Settings;

/** Main class */
public class MethodServlet extends Servlet {
    @Override
    protected void doProcess(HttpServletRequest request, HttpServletResponse response, Settings settings, Buffer buffer) 
    throws IOException, ServletException {
        String path;
        Call call;
        Writer writer;
        String error;

        path = request.getPathInfo();
        if (!path.startsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        path = path.substring(1);
        application.log.info("call begin " + path);
        call = Call.parse(settings, buffer, application, path, request);
        if (call == null) {
            throw new IllegalArgumentException("unkown call: " + path);
        }
        writer = createTextWriter(response);
        try {
            writer.write(call.invoke());
        } catch (InvocationTargetException e) {
            error = getReportableException(e.getTargetException());
            application.log.log(Level.SEVERE, error, e);
        }
        application.log.info("call end");
    }
    
    private String getReportableException(Throwable cause) {
        if (cause instanceof Error) {
            application.log.log(Level.SEVERE, "re-throwing error", cause);
            throw (Error) cause;
        }
        if (cause instanceof RuntimeException) {
            application.log.log(Level.SEVERE, "re-throwing RuntimeException", cause);
            throw (RuntimeException) cause;
        }
        application.log.log(Level.SEVERE, "reportable exception:" + cause.getMessage(), cause);
        return cause.getMessage();
    }
}
