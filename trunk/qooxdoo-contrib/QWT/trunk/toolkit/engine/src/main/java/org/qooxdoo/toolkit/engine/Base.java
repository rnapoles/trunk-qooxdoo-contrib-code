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
import java.util.Map;
import java.util.logging.Level;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Main class */
public abstract class Base extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected Application application = null;
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        if (application != null) {
            throw new IllegalStateException();
        }
        application = Application.get(config.getServletContext());
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

    public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path;
        Map<String, String> map;
        
        if (application == null) {
            throw new IllegalStateException();
        }
        path = request.getPathInfo();
        map = request.getParameterMap();
        if (map.size() > 0) {
            String url = request.getContextPath() + path;
            application.log.warning("ignoring unexpected parameters " + map + ", redirect to " + url);
            response.sendRedirect(url);
            return;
        }
        try {
            processUnchecked(request, response);
        } catch (IOException e) {
            report(e, request);
            throw e;
        } catch (ServletException e) {
            report(e, request);
            throw e;
        } catch (RuntimeException e) {
            report(e, request);
            throw e;
        } catch (Error e) {
            report(e, request);
            throw e;
        }
    }
    
    protected abstract void processUnchecked(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException;
    
    private void report(Throwable e, HttpServletRequest request) {
        application.log.log(Level.SEVERE, request.getPathInfo() + ": " + e.getClass().getSimpleName() + ": " + e.getMessage(), e);
    }

    public static final String ENCODING = "UTF-8";
    public static final String CONTENT_TYPE = "text/plain";
    
    public static Writer createTextWriter(HttpServletResponse response) throws IOException {
        response.setCharacterEncoding(ENCODING);
        response.setContentType(CONTENT_TYPE);
        return response.getWriter();
    }
}
