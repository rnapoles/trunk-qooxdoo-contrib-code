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
import java.io.PrintWriter;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.apache.catalina.CometEvent;
import org.qooxdoo.toolkit.engine.common.CallListener;

/** A running client. Create instances with Client.start. */
public class Session implements SessionMBean, CallListener {
    private final Client client;
    private final int id;
    
    /** result from Server.createClient */
    public final Object argument;
    
    private final ArrayBlockingQueue<CometEvent> active;

    public Session(Client client, int id, Object argument) {
        this.client = client;
        this.id = id;
        this.argument = argument;
        this.active = new ArrayBlockingQueue<CometEvent>(1);
    }

    public void begin(CometEvent event) {
        if (this.active.size() != 0) {
            System.out.println("TODO: " + this + ": removing stale listener");
            this.active.clear();
        }
        this.active.add(event);
    }

    public void end(CometEvent event) {
        if (event != this.active.peek()) {
            System.out.println("TODO: unexpected event: expected " + this.active.peek() + ", got " + event);
        }
        this.active.clear();
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
        if (active.peek() != null) {
            System.out.println("TODO: stopped with active event");
            active.clear();
        }
    }
    
    //--
    
    public void notify(String str) throws IOException {
        PrintWriter writer;
        CometEvent event;

        try {
            synchronized (active) {
                event = active.poll(10, TimeUnit.SECONDS);
                if (event == null) {
                    throw new IOException("session " + this + " client is unavailable");
                }
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        writer = event.getHttpServletResponse().getWriter();
        writer.print(str);
        writer.close();
        event.close();
        System.out.println(this + ": notified and event removed");
        // CAUTION: do not close event or remove the event - that's done by the end event
    }
 
    @Override
    public String toString() {
        return "" + id;
    }
}

