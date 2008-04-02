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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;

/** 
 * Some experience:
 *   o the end event is unreliable, I don't use it
 *   o begin events are stored until they're used by the server;
 *     after the server use, they're closed and discarded
 *   o calling event.close() avoids END calls on this event;
 *     this is particularly important when handling END events, 
 *     you get an infinite loop otherwise!
 */
public class SessionServlet extends HttpServlet implements CometProcessor {
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

    @Override
    public void destroy() {
        application.log.info("[destroy]");
    }
    
    public void event(CometEvent event) throws IOException, ServletException {
        String path;
        Client client;
        Session session;

        path = event.getHttpServletRequest().getPathInfo();
        client = application.getClient();
        session = session(client, path);
        application.log.info("["  +(session == null ? "+" : session.getId()) + "] " 
                + event.getEventType() + " " + event.getEventSubType() + " (" + event.hashCode() + ")");
        if (session == null) {
            if (event.getEventType() != CometEvent.EventType.BEGIN) {
                throw new IllegalStateException(path + ": expected BEGIN event, got " + event.getEventType());
            }
            client.startSession(event.getHttpServletResponse());
            event.close();
        } else {
            switch (event.getEventType()) {
               case BEGIN:
                   event.setTimeout(SESSION_TIMEOUT);
                   session.begin(event);
                   break;
               case END:
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
