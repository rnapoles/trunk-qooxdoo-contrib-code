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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;

public class Comet extends HttpServlet implements CometProcessor {
    private static final long serialVersionUID = 1L;

    public void event(CometEvent event) throws IOException, ServletException {
        String path;
        HttpServletResponse response;
        Client client;
        
        path = event.getHttpServletRequest().getPathInfo();
        if (!path.startsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        client = Engine.application.getFirstClient(); // TODO
        if (event.getEventType() == CometEvent.EventType.BEGIN) {
            System.out.println("start " + path + " " + event.getHttpServletResponse());
            response = event.getHttpServletResponse();
            if ("/".equals(path)) {
                client.start(response);
            } else {
                session(client, path).setListener(response);
            }
        } else if (event.getEventType() == CometEvent.EventType.END) {
            System.out.println("end " + path + " " + event.getHttpServletResponse());
            // TODO: session(client, path).stop();
            event.close();
        } else if (event.getEventType() == CometEvent.EventType.ERROR) {
            System.out.println("error " + path + " " + event.getHttpServletResponse());
            // TODO: session(client, path).stop();
            event.close();
        } else {
            System.out.println("unknown event: " + event.getEventType());
        }
    }
    
    private Session session(Client client, String path) {
        Session session;
        int no;
        
        no = Integer.parseInt(path.substring(1));
        session = client.lookup(no);
        if (session == null) {
            throw new IllegalArgumentException("no session for path " + path);
        }
        return session;
    }
}
