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
import java.util.concurrent.ArrayBlockingQueue;
import java.util.logging.Level;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.Settings;

/** Base class */
public abstract class Servlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final Settings SETTINGS = new Settings(Settings.UTF_8);

    protected Application application = null;
    
    private static final int BUFFER_COUNT = 5;
    private final ArrayBlockingQueue<Buffer> buffers;

    protected Servlet() {
        this.buffers = new ArrayBlockingQueue<Buffer>(BUFFER_COUNT);
        for (int i = 0; i < BUFFER_COUNT; i++) {
            buffers.add(new Buffer());
        }
    }
    
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
        Map<?, ?> map;
        Buffer buffer;
        
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
        buffer = allocate();
        try {
            doProcess(request, response, SETTINGS, buffer);
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
        } finally {
            free(buffer);
        }
    }

    //-- 
    
    private Buffer allocate() {
        try {
            return buffers.take();
        } catch (InterruptedException e) {
            throw new RuntimeException(e); // TODO
        }
    }
    private void free(Buffer buffer) {
        buffers.add(buffer);
    }
    
    //--
    
    protected abstract void doProcess(HttpServletRequest request, HttpServletResponse response, Settings settings, Buffer buffer) 
    throws IOException, ServletException;
    
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
