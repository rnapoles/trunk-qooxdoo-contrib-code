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

package org.qooxdoo.sushi.ssh;

import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.Settings;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

public abstract class Transfer {
    private final String command;
    protected OutputStream out;
    protected InputStream in;
    
    public Transfer(String command) {
        this.command = command;
    }

    public void invoke(Settings settings, Buffer buffer, Session session) throws JSchException, IOException {
        ChannelExec channel;
        
        channel = (ChannelExec) session.openChannel("exec");
        channel.setCommand(command);
        out = channel.getOutputStream();
        in = channel.getInputStream();
        channel.connect();
        try {
            doInvoke(settings, buffer);
        } finally {
            channel.disconnect();
        }
    }

    public abstract void doInvoke(Settings settings, Buffer buffer) throws JSchException, IOException;

    public void sendAck() throws IOException {
        out.write(0);
        out.flush();
    }

    public void readAck() throws IOException {
        int b;
        int c;
        StringBuilder builder;
        
        b = in.read();
        if (b == -1) {
            throw new EOFException("No response from server");
        } else if (b != 0) {
            builder = new StringBuilder();
            
            c = in.read();
            while (c > 0 && c != '\n') {
                builder.append((char) c);
                c = in.read();
            }

            if (b == 1) {
                throw new IOException("scp error: " + builder.toString());
            } else if (b == 2) {
                throw new IOException("fatal scp error: " + builder.toString());
            } else {
                throw new IOException("unknown response, code " + b + " message: " + builder.toString());
            }
        }
    }
}
