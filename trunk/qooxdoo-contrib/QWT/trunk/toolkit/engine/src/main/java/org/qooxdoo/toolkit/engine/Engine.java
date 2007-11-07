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
import java.util.Map;
import java.util.logging.Level;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.toolkit.engine.common.Transport;

/** Main class */
public class Engine extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public Application application = null;
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        if (application != null) {
            throw new IllegalStateException();
        }
        application = Application.get(config.getServletContext());
        application.startup();
    }

    @Override
    public String getServletInfo() {
        if (application == null) {
            return "(not initialized)";
        } else {
            return application.getName();
        }
    }

    @Override
    public void destroy() {
        application.shutdown();
        application = null;
    }

    @Override
    public void doHead(HttpServletRequest req, HttpServletResponse res) {
        throw new UnsupportedOperationException("HEAD " + req.getPathInfo() + " - ignored");
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        process(req, res);
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        process(req, res);
    }

    @Override
    public long getLastModified(HttpServletRequest request) {
        String path;
        Client client;
        
        path = request.getPathInfo();
        application.log.info("getLastModified: " + path);
        client = application.getClient();
        return client.getIndex().lastModified();
    }
    
    private void process(HttpServletRequest httpRequest, HttpServletResponse response) throws ServletException, IOException {
        if (application == null) {
            throw new IllegalStateException();
        }
        try {
            processUnchecked(httpRequest, response);
        } catch (IOException e) {
            report(e, httpRequest);
            throw e;
        } catch (ServletException e) {
            report(e, httpRequest);
            throw e;
        } catch (RuntimeException e) {
            report(e, httpRequest);
            throw e;
        } catch (Error e) {
            report(e, httpRequest);
            throw e;
        }
    }
    
    private void report(Throwable e, HttpServletRequest request) {
        application.log.log(Level.SEVERE, request.getPathInfo() + ": " + e.getClass().getSimpleName() + ": " + e.getMessage(), e);
    }
    
    private void processUnchecked(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        Map<?, ?> map;
        Client client;
        ResourceManager rm;
        String path;

        path = request.getPathInfo();
        map = request.getParameterMap();
        if (map.size() > 0) {
            String url = request.getContextPath() + path;
            application.log.warning("ignoring unexpected parameters " + map + ", redirect to " + url);
            response.sendRedirect(url);
            return;
        }
        client = application.getClient();
        if (path == null || "/".equals(path)) {
            response.sendRedirect(request.getContextPath() + "/" + client.getIndex().getName());
        } else {
            rm = client.allocate();
            try {
                doProcessUnchecked(request, response, rm, path);
            } finally {
                client.free(rm);
            }
        }
    }

    private void doProcessUnchecked(HttpServletRequest request, HttpServletResponse response, 
            ResourceManager rm, String path) throws IOException, ServletException {
        String ae;
        boolean gz;
        
        ae = request.getHeader("accept-encoding");
        gz = (ae != null && ae.toLowerCase().indexOf("gzip") != -1);
        if (path.startsWith(Transport.METHOD)) {
            processCall(request, response, rm, path);
        } else if (path.startsWith("/") && rm.render(path.substring(1), gz, response)) {
            // done
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    private void processCall(HttpServletRequest request, HttpServletResponse response, ResourceManager rm, String path)
    throws IOException, ServletException {
        Call call;
        Writer writer;
        String error;

        application.log.info("call begin");
        call = Call.parse(rm.getBuffer(), application, path.substring(Transport.METHOD.length()), request);
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
    
    public String getReportableException(Throwable cause) {
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
    
    //--
    
    public static final String ENCODING = "UTF-8";
    public static final String CONTENT_TYPE = "text/plain";
    
    public static Writer createTextWriter(HttpServletResponse response) throws IOException {
        response.setCharacterEncoding(ENCODING);
        response.setContentType(CONTENT_TYPE);
        return response.getWriter();
    }
}
