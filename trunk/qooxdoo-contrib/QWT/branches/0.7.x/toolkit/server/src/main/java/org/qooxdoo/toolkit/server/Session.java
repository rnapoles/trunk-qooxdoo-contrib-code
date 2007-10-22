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

package org.qooxdoo.toolkit.server;

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
            Application application, Unit unit)
        throws IOException, ServletException {
        Session session;

        session = (Session) httpSession.getAttribute(SESSION_ATTRIBUTE);
        if (session == null) {
            session = unit.createSession(application);
            application.register(session);
            httpSession.setAttribute(SESSION_ATTRIBUTE, session);
        }
        return session;
    }

    //--

    private final Unit unit;
    private final int no;
    private final Map<String, Object> objects;
    
    // TODO: share between sessions?
    public final ResourceManager rm;

    public Session(Unit unit, ResourceManager rm, int no) {
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

    public Unit getUnit() {
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

