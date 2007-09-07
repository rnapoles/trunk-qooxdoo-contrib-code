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

import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSchException;

import org.qooxdoo.sushi.util.ExitCode;
import org.qooxdoo.sushi.util.Strings;

public class Exec {
    public static Exec begin(Connection connection, ChannelExec channel, OutputStream out, String ... command) throws JSchException {
        TimedOutputStream dest;
        
        dest = new TimedOutputStream(out);
        channel.setCommand(Strings.join(" ", command));
        channel.setInputStream(null);
        channel.setOutputStream(dest);
        channel.setExtOutputStream(dest);
        channel.connect();
        return new Exec(connection, command, channel, dest);
    }

    private final Connection connection;
    private final String[] command;
    private final TimedOutputStream dest;
    private final ChannelExec channel;

    public Exec(Connection connection, String[] command, ChannelExec channel, TimedOutputStream dest) {
        if (channel == null) {
            throw new IllegalArgumentException();
        }
        this.connection = connection;
        this.command = command;
        this.channel = channel;
        this.dest = dest;
    }

    public Connection getConnection() {
        return connection;
    }

    public boolean canEnd() {
        return channel.isClosed();
    }

    public void end() throws JSchException, ExitCode {
        try {
            end(1000L * 60 * 60 * 24); // 1 day
        } catch (InterruptedException e) {
            throw new RuntimeException("unexpected", e);
        }
    }
    
    /** @param CAUTION: &lt;= 0 immediately times out */
    public void end(long timeout) throws JSchException, ExitCode, InterruptedException {
        long deadline;
        
        try {
            deadline = System.currentTimeMillis() + timeout;
            while (!channel.isClosed()) {
                if (System.currentTimeMillis() >= deadline) {
                    throw new TimeoutException(this);
                }
                Thread.sleep(100); // throws InterruptedException
            }
            if (channel.getExitStatus() != 0) {
                throw new ExitCode(Arrays.asList(command), channel.getExitStatus());
            }
        } finally {
            channel.disconnect();
        }
    }

    public long duration() {
        return dest.duration;
    }
    
    @Override
    public String toString() {
        Host host = connection.getHost();
        return host.getUser().getName() + '@' + host.getMachine() + "# " + Strings.join(" ", command);
    }

    private static class TimedOutputStream extends FilterOutputStream {
        private long started;
        public long duration;

        public TimedOutputStream(OutputStream out) {
            super(out);
            this.started = System.currentTimeMillis();
            this.duration = 0;
        }
        
        @Override
        public void close() throws IOException {
            super.close();
            if (duration == 0) {
                duration = System.currentTimeMillis() - started;
            } else {
                // already closed
            }
        }
    }
}
