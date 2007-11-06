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
import org.qooxdoo.toolkit.engine.common.CallListener;

import java.io.IOException;
import java.io.PrintWriter;

/** A running client. Create instances with Client.start. */
public class Session implements SessionMBean, CallListener {
    private final Client client;
    private final int id;
    
    /** result from Server.createClient */
    public final Object argument;
    
    public CometEvent listener;
    
    public Session(Client client, int id, Object argument) {
        this.client = client;
        this.id = id;
        this.argument = argument;
    }

    public void setListener(CometEvent listener) {
        if (listener == null) {
            throw new IllegalArgumentException();
        }
        if (this.listener != null) {
            System.out.println("TODO: overwriting old listener: " + listener);
        }
        this.listener = listener;
    }

    public Client getClient() {
        return client;
    }

    public String getName() {
        return Integer.toString(id);
    }

    public int getId() {
        return id;
    }

    public void stop() {
        client.getApplication().getServer().clientStop();
        client.getApplication().unregister(this);
        if (listener != null) {
            try {
                notify("");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            // TODO
        }
        listener = null;
        // silently ignore errors because the file might haven been deleted by the shutdown hook
    }
    
    //--
    
    public void notify(String str) throws IOException {
        PrintWriter writer;
        
        if (listener == null) {
            throw new RuntimeException("TODO");
        }
        writer = listener.getHttpServletResponse().getWriter();
        writer.print(str);
        writer.close();
        listener.close();
        listener = null;
    }
}

