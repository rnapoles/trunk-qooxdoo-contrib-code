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
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

import org.qooxdoo.toolkit.engine.common.Serializer;

/** a running client. */
public class Session implements SessionMBean, HttpSessionBindingListener {
    public static final String ID = "WINDOW";

    private static final String SESSION_ATTRIBUTE = "SESSION_CONTEXT";

    public static synchronized Session get(HttpSession httpSession, HttpServletRequest httpRequest, 
            Application application, Client client)
        throws IOException, ServletException {
        Session session;

        session = (Session) httpSession.getAttribute(SESSION_ATTRIBUTE);
        if (session == null) {
            session = client.start(application);
            application.register(session);
            httpSession.setAttribute(SESSION_ATTRIBUTE, session);
        }
        return session;
    }

    //--

    private final Client client;
    private final int no;
    
    /** result from Server.createClient */
    public final Object argument;
    
    // TODO: share between sessions?
    public final ResourceManager rm;

    public Session(Client client, ResourceManager rm, int no, Object argument) {
        this.client = client;
        this.rm = rm;
        this.no = no;
        this.argument = argument;
    }

    public Client getClient() {
        return client;
    }

    public void addArgument(HttpServletResponse reponse) {
        String serialized;
        
        if (argument != null) {
            serialized = Serializer.run(client.getApplication().getRegistry(), argument);
            reponse.addCookie(new Cookie(org.qooxdoo.toolkit.engine.common.Transport.COOKIE, serialized));
        }
    }

    public String getName() {
        return Integer.toString(no);
    }

    public int getNo() {
        return no;
    }

    //--
    
    public void valueBound(HttpSessionBindingEvent event) {
        // do nothing
    }

    public void valueUnbound(HttpSessionBindingEvent event) {
        if (event.getValue() != this) {
            throw new IllegalArgumentException();
        }
        client.getApplication().getServer().clientStop();
        client.getApplication().unregister(this);
        // Silently ignore errors because the file might haven been deleted by the shutdown hook
    }
}

