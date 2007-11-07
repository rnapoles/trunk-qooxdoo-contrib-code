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

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.io.Buffer;

/** Performs application startup and servers resources. */
public class ResourceServlet extends Servlet {
    private Client client;
    
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        application.startup();
        client = application.getClient();
    }

    @Override
    public void destroy() {
        application.shutdown();
        super.destroy();
    }

    @Override
    public long getLastModified(HttpServletRequest request) {
        String path;
        ResourceManager rm;
        Resource resource;
        
        path = request.getPathInfo();
        application.log.info("getLastModified: " + path);
        if (path == null || "/".equals(path)) {
            return -1;
        }
        rm = application.getResourceManager();
        resource = rm.lookup(path.substring(1));
        if (resource == null) {
            return -1;
        } 
        return resource.getLastModified();
    }
    
    @Override
    protected void processUnchecked(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        Buffer buffer;
        String path;

        path = request.getPathInfo();
        if (path == null || "/".equals(path)) {
            response.sendRedirect(request.getContextPath() + "/" + client.getIndex().getName());
        } else {
            buffer = client.allocate();
            try {
                doProcessUnchecked(request, response, buffer, path);
            } finally {
                client.free(buffer);
            }
        }
    }

    private void doProcessUnchecked(HttpServletRequest request, HttpServletResponse response, 
            Buffer buffer, String path) throws IOException, ServletException {
        String ae;
        boolean gz;
        
        ae = request.getHeader("accept-encoding");
        gz = (ae != null && ae.toLowerCase().indexOf("gzip") != -1);
        if (path != null && path.startsWith("/") && application.getResourceManager().render(buffer, path.substring(1), gz, response)) {
            // done
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
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
