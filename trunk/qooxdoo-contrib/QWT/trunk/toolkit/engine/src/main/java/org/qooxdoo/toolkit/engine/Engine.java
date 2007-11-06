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
        Object[] tmp;
        Client client;
        
        path = request.getPathInfo();
        application.log.info("getLastModified: " + path);
        tmp = getClient(path);
        if (tmp == null) {
            return -1;
        }
        client = (Client) tmp[0];
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
        Object[] tmp;
        
        path = request.getPathInfo();
        map = request.getParameterMap();
        if (map.size() > 0) {
            String url = request.getContextPath() + path;
            application.log.warning("ignoring unexpected parameters " + map + ", redirect to " + url);
            response.sendRedirect(url);
            return;
        }
        tmp = getClient(path);
        if (tmp != null) {
            client = (Client) tmp[0];
            rm = client.allocate();
            try {
                forClient(request, response, rm, (String) tmp[1]);
            } finally {
                client.free(rm);
            }
        } else {
            client = application.getClient();
            String url = request.getContextPath() + "/" + client.getName() + "/" + client.getIndex().getName();
            application.log.info("unknown request '" + path + "', redirect to " + url);
            response.sendRedirect(url);
        }
    }

    private void forClient(HttpServletRequest request, HttpServletResponse response, 
            ResourceManager rm, String path) throws IOException, ServletException {
        Call call;
        Writer writer;
        String error;
        
        String ae = request.getHeader("accept-encoding");
        boolean compress = (ae != null && ae.toLowerCase().indexOf("gzip") != -1);
        if (path.startsWith("/") && rm.render(path.substring(1), compress, response)) {
            return;
        }
        if (path.startsWith(Transport.METHOD)) {
            call = Call.parse(rm.getIO(), application, 
                    path.substring(Transport.METHOD.length()), request);
            if (call == null) {
                throw new IllegalArgumentException("no call: " + path);
            }
            application.log.info("invoke call");
            writer = createTextWriter(response);
            try {
                writer.write(call.invoke());
            } catch (InvocationTargetException e) {
                error = getReportableException(e.getTargetException());
                application.log.log(Level.SEVERE, error, e);
            }
            application.log.info("done call");
            return;
        }
        throw new IllegalArgumentException(path);
    }
    
    private Object[] getClient(String path) {
        int idx;
        Client client;

        if (!path.startsWith("/")) {
            return null;
        }
        path = path.substring(1);
        idx = path.indexOf('/');
        if (idx == -1) {
            return null;
        }
        client = application.getClient();
        if (client.getName().equals(path.substring(0, idx))) {
            return new Object[] { client, path.substring(idx) };
        } else {
            return null;
        }
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
