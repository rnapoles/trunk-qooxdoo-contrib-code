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
    public void event(CometEvent event) throws IOException, ServletException {
        String path;
        HttpServletResponse response;
        Client client;
        
        path = event.getHttpServletRequest().getPathInfo();
        if (!"/".equals(path)) {
            throw new IllegalArgumentException(path);
        }
        client = Engine.application.getFirstClient(); // TODO
        response = event.getHttpServletResponse();
        if (event.getEventType() == CometEvent.EventType.BEGIN) {
            client.start(response);
        } else if (event.getEventType() == CometEvent.EventType.END) {
            client.stop(response);
            event.close();
        } else if (event.getEventType() == CometEvent.EventType.ERROR) {
            System.out.println("error event");
            client.stop(response);
            event.close();
        } else {
            System.out.println("unkown event: " + event.getEventType());
        }
    }
}
