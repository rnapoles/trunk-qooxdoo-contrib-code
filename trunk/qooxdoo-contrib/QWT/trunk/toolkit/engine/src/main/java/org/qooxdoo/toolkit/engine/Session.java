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

import javax.servlet.http.HttpServletResponse;

/** A running client. Create instances with Client.start. */
public class Session implements SessionMBean {
    private final Client client;
    private final int no;
    
    /** result from Server.createClient */
    public final Object argument;
    
    public HttpServletResponse listener;
    
    public Session(Client client, int no, Object argument) {
        this.client = client;
        this.no = no;
        this.argument = argument;
    }

    public void setListener(HttpServletResponse listener) {
        if (listener == null) {
            throw new IllegalArgumentException();
        }
        if (this.listener != null) {
            throw new IllegalStateException();
        }
        this.listener = listener;
    }

    public Client getClient() {
        return client;
    }

    public String getName() {
        return Integer.toString(no);
    }

    public int getNo() {
        return no;
    }

    public void stop() {
        client.getApplication().getServer().clientStop();
        client.getApplication().unregister(this);
        if (listener != null) {
            try {
                listener.getWriter().close();
            } catch (IOException e) {
                throw new RuntimeException("TODO", e);
            }
            listener = null;
        }
        // Silently ignore errors because the file might haven been deleted by the shutdown hook
    }
}

