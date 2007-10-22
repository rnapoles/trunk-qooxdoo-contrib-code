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
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

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

    private final Client unit;
    private final int no;
    private final Map<String, Object> objects;
    
    // TODO: share between sessions?
    public final ResourceManager rm;

    public Session(Client unit, ResourceManager rm, int no) {
        this.unit = unit;
        this.rm = rm;
        this.no = no;
        this.objects = new HashMap<String, Object>();
    }

    public void addObject(String name, Object obj) {
        if (objects.containsKey(name)) {
            throw new IllegalArgumentException("duplicate object: " + name);
        }
        objects.put(name, obj);
    }
    
    public Object lookupObject(String name) {
        return objects.get(name);
    }

    public Client getUnit() {
        return unit;
    }

    public String getName() {
        return Integer.toString(no);
    }

    public int getNo() {
        return no;
    }

    //--
    
    public void valueBound(HttpSessionBindingEvent event) {
        // to nothing
    }

    public void valueUnbound(HttpSessionBindingEvent event) {
        // TODO: unregister((Session) event.getValue());
        // Silently ignore errors because the file might haven been deleted by the shutdown hook
        // Caution: do not use Node.delete to avoid race conditions.
        rm.getIO().getTemp().getFile().delete();
    }
}

