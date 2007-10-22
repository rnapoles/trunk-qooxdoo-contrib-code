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

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import org.qooxdoo.sushi.io.Buffer;

public abstract class Transfer {
    private final String command;
    protected OutputStream out;
    protected InputStream in;
    
    public Transfer(String command) {
        this.command = command;
    }

    public void invoke(Buffer buffer, Session session) throws JSchException, IOException {
        ChannelExec channel;
        
        channel = (ChannelExec) session.openChannel("exec");
        channel.setCommand(command);
        out = channel.getOutputStream();
        in = channel.getInputStream();
        channel.connect();
        try {
            doInvoke(buffer);
        } finally {
            channel.disconnect();
        }
    }

    public abstract void doInvoke(Buffer buffer) throws JSchException, IOException;

    public void sendAck() throws IOException {
        out.write(0);
        out.flush();
    }

    public void readAck() throws IOException {
        int b;
        
        b = in.read();
        if (b == -1) {
            // didn't receive any response
            throw new EOFException("No response from server");
        } else if (b != 0) {
            StringBuffer sb = new StringBuffer();

            int c = in.read();
            while (c > 0 && c != '\n') {
                sb.append((char) c);
                c = in.read();
            }

            if (b == 1) {
                throw new IOException("scp error: " + sb.toString());
            } else if (b == 2) {
                throw new IOException("fatal scp error: " + sb.toString());
            } else {
                throw new IOException("unknown response, code " + b + " message: " + sb.toString());
            }
        }
    }

    
}
