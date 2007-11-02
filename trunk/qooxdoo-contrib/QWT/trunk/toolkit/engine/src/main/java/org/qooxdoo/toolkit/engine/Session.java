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

import java.io.Writer;

/** A running client. Create instances with Client.start. */
public class Session implements SessionMBean {
    private final Client client;
    private final int no;
    private final Writer writer;
    
    /** result from Server.createClient */
    public final Object argument;
    
    public Session(Client client, int no, Writer writer, Object argument) {
        this.client = client;
        this.no = no;
        this.writer = writer;
        this.argument = argument;
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

    public Writer getWriter() {
        return writer;
    }

    public void stop() {
        client.getApplication().getServer().clientStop();
        client.getApplication().unregister(this);
        // Silently ignore errors because the file might haven been deleted by the shutdown hook
    }
}

