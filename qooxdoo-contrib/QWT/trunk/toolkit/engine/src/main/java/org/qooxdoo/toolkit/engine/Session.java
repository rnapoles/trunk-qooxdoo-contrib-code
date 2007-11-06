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
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;

/** A running client. Create instances with Client.start. */
public class Session implements SessionMBean, CallListener {
    private final Client client;
    private final int id;
    
    /** result from Server.createClient */
    public final Object argument;
    
    private final ArrayBlockingQueue<CometEvent> listener;

    public Session(Client client, int id, Object argument) {
        this.client = client;
        this.id = id;
        this.argument = argument;
        this.listener = new ArrayBlockingQueue<CometEvent>(1);
    }

    public void unsetListener(CometEvent listener) {
        if (listener != this.listener.peek()) {
            throw new IllegalArgumentException();
        }
        this.listener.clear();
    }

    public void setListener(CometEvent listener) {
        this.listener.add(listener); // throws exception if list is full
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
        if (listener.peek() != null) {
            System.out.println("TODO: stopped with running listener");
            listener.clear();
        }
    }
    
    //--
    
    public void notify(String str) throws IOException {
        PrintWriter writer;
        CometEvent event;

        try {
            event = listener.poll(5, TimeUnit.SECONDS);
            listener.add(event); // TODO
        } catch (InterruptedException e) {
            listener.clear();
            throw new IOException("client is unavailable");
        }
        writer = event.getHttpServletResponse().getWriter();
        writer.print(str);
        writer.close();
        // CAUTION: do not close event or remove the event - that's done by the end event
    }
}

