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

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Comet extends HttpServlet implements CometProcessor {
    /** millis */
    private static final int SESSION_TIMEOUT = 5 * 60 * 1000;

    private static final long serialVersionUID = 1L;

    private Application application;

    @Override
    public void init(ServletConfig config) throws ServletException {
        ServletContext context;

        context = config.getServletContext();
        application = Application.get(context);
    }

    public void event(CometEvent event) throws IOException, ServletException {
        String path;
        HttpServletResponse response;
        Client client;
        Session session;

        path = event.getHttpServletRequest().getPathInfo();
        client = application.getClient();
        session = session(client, path);
        if (session == null) {
            if (event.getEventType() != CometEvent.EventType.BEGIN) {
                throw new IllegalStateException(path + ": unexpected event " + event.getEventType());
            }
            client.start(event.getHttpServletResponse());
            event.close();
        } else {
            switch (event.getEventType()) {
               case BEGIN:
                   event.setTimeout(SESSION_TIMEOUT);
                   session.setListener(event);
                   break;
               case END:
                   session.unsetListener(event);
                   event.close();
                   break;
               case ERROR:
                   if (event.getEventSubType() == CometEvent.EventSubType.TIMEOUT) {
                       session(client, path).stop();
                   } else {
                       System.out.println("TOOD: error " + path + " " + event.getHttpServletResponse());
                       System.out.println("      subtype " + event.getEventSubType());
                   }
                   event.close();
                   break;
                 default:
                     throw new IllegalArgumentException("unkown event: " + event.getEventType());
            }
        }
    }
    
    private Session session(Client client, String path) {
        int id;

        if (!path.startsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        if (path.length() == 1) {
            return null;
        } else {
            id = Integer.parseInt(path.substring(1));
            return client.lookup(id);
        }
    }
}
