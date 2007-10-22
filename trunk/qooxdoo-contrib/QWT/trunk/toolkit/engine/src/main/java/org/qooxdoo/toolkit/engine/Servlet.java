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
import javax.servlet.http.HttpSession;

/** Main class */
public class Servlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private static final String METHOD = "/method/";

    private Application application = null;
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        if (application != null) {
            throw new IllegalStateException();
        }
        try {
            application = Application.create(config);       
            application.add(Unit.create(config, application));
        } catch (IOException e) {
            throw new ServletException("cannot load application", e);
        }
        application.startup();
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
    
    private void process(HttpServletRequest httpRequest, HttpServletResponse response) throws ServletException, IOException {
        if (application == null) {
            throw new IllegalStateException();
        }
        try {
            processUnchecked(httpRequest, response);
        } catch (IOException e) {
            application.log.log(Level.SEVERE, "IOException: " + e.getMessage(), e);
            throw e;
        } catch (RuntimeException e) {
            application.log.log(Level.SEVERE, "RuntimeException: " + e.getMessage(), e);
            throw new ServletException(e);
        } catch (Error e) {
            application.log.log(Level.SEVERE, "Error: " + e.getMessage(), e);
            throw new ServletException(e);
        }
    }
    
    private void processUnchecked(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        Map<?, ?> map;
        String path;
        Object[] tmp;
        Session session;
        Call call;
        String error;
        Writer writer;
        HttpSession httpSession;
        Unit unit;
        
        map = request.getParameterMap();
        if (map.size() > 0) {
            String url = request.getContextPath() + request.getPathInfo();
            application.log.info("ignoring unexpected parameters " + map + ", redirect to " + url);
            response.sendRedirect(url);
            return;
        }
        path = request.getPathInfo();
        httpSession = request.getSession();
        tmp = getUnit(path);
        if (tmp != null) {
            unit = (Unit) tmp[0];
            path = (String) tmp[1];
            if (path.equals("/" + unit.getIndex().getName()) && !httpSession.isNew()) {
                httpSession.invalidate();
                httpSession = request.getSession();
                if (!httpSession.isNew()) {
                    throw new RuntimeException();
                }
                application.log.info("forced new session");
                unit.reload();
            }
            synchronized (httpSession) {
                session = Session.get(httpSession, request, application, unit);
                String ae = request.getHeader("accept-encoding");
                boolean compress = (ae != null && ae.toLowerCase().indexOf("gzip") != -1);
                if (path.startsWith("/") && session.rm.render(path.substring(1), compress, response)) {
                    return;
                }
                try {
                    if (path != null && path.startsWith(METHOD)) {
                        // TODO sync(session, httpRequest);
                        if (httpSession.isNew()) {
                            application.log.info("no frame request so far -- probably cached by browser");
                        }
                        call = Call.parse(session, path.substring(METHOD.length()), request);
                        if (call == null) {
                            throw new IllegalArgumentException("no call: " + path);
                        }
                        log(session, "invoke " + call);
                        writer = createHtmlWriter(response);
                        try {
                            writer.write(call.invoke());
                        } catch (InvocationTargetException e) {
                            error = getReportableException(e.getTargetException());
                            application.log.log(Level.SEVERE, error, e);
                        }
                        log(session, "done " + call);
                        return;
                    }
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("cannot process '" + path + "'", e);
                }
            }
        }

        Unit first = application.lookup(application.getFirstApplication());
        String url = request.getContextPath() + "/" + first.getName() + "/" + first.getIndex().getName();
        application.log.info("unknown request '" + path + "', redirect to " + url);
        httpSession.invalidate(); // because we expect new sessions for the frame only
        response.sendRedirect(url);
    }

    private Object[] getUnit(String path) {
        int idx;
        Unit unit;
        
        if (!path.startsWith("/")) {
            return null;
        }
        path = path.substring(1);
        idx = path.indexOf('/');
        if (idx == -1) {
            return null;
        }
        unit = application.lookup(path.substring(0, idx));
        if (unit == null) {
            return null;
        }
        return new Object[] { unit, path.substring(idx) };
    }

    private void log(Session session, Object obj) {
        String str;
        
        str = obj.toString();
        if (str.endsWith("\n")) {
            str = str.substring(0, str.length() - 1);
        }
        application.log.info("[" + session.getNo() + "] " + str);
    }
    
    public String getReportableException(Throwable cause) {
        if (cause instanceof Error) {
            application.log.log(Level.SEVERE, "rethrowing error", cause);
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
    
    private static final String ENCODING = "UTF-8";
    private static final String CONTENT_TYPE = "text/html; charset=" + ENCODING;
    private static Writer createHtmlWriter(HttpServletResponse response) throws IOException {
        response.setContentType(CONTENT_TYPE);
        return response.getWriter();
    }
    
}
