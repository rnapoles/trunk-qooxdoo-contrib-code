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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.CometEvent;
import org.apache.catalina.CometProcessor;
import org.qooxdoo.toolkit.engine.common.Serializer;

public class Comet extends HttpServlet implements CometProcessor {
    public void event(CometEvent event) throws IOException, ServletException {
        String path;
        
        path = event.getHttpServletRequest().getPathInfo();
        if (!"/".equals(path)) {
            throw new IllegalArgumentException(path);
        }
        if (event.getEventType() == CometEvent.EventType.BEGIN) {
            begin(event.getHttpServletResponse());
        } else {
            System.out.println("unkown event: " + event.getEventType());
        }
    }
    
    private void begin(HttpServletResponse response) throws IOException, ServletException {
        Session session;
        Application application;
        Client client;
        Writer writer;

        application = Engine.application;
        client = application.getFirstClient(); // TODO
        System.out.println("begin");
        session = client.start(application);
        writer = Engine.createHtmlWriter(response);
        writer.write(Serializer.run(application.getRegistry(), session.argument));
        writer.close();
    }
}
