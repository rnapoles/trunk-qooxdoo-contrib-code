/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.fs.ssh;

import java.io.OutputStream;
import java.util.Arrays;

import org.qooxdoo.sushi.util.ExitCode;
import org.qooxdoo.sushi.util.Strings;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSchException;

/** Process on the remote host */
public class Process {
    public static Process start(SshRoot root, boolean tty, OutputStream out, String ... command) 
    throws JSchException {
        TimedOutputStream dest;
        ChannelExec channel;
        
        dest = new TimedOutputStream(out);
        channel = root.createChannelExec();
        // tty=true propagates ctrl-c to the remote host:
        // (unfortunately, this causes ssh servers to send cr/lf, and I didn't find
        // a way to stop this - I tried setTerminalMode and also sending special character sequences)
        channel.setPty(tty);
        channel.setCommand(Strings.join(" ", command));
        channel.setInputStream(null);
        channel.setOutputStream(dest);
        channel.setExtOutputStream(dest);
        channel.connect();
        return new Process(root, command, channel, dest);
    }

    private final SshRoot root;
    private final String[] command;
    private final TimedOutputStream dest;
    private final ChannelExec channel;

    public Process(SshRoot root, String[] command, ChannelExec channel, TimedOutputStream dest) {
        if (channel == null) {
            throw new IllegalArgumentException();
        }
        this.root = root;
        this.command = command;
        this.channel = channel;
        this.dest = dest;
    }

    public SshRoot getRoot() {
        return root;
    }

    public boolean isTerminated() {
        return channel.isClosed();
    }

    public void waitFor() throws JSchException, ExitCode {
        try {
            waitFor(1000L * 60 * 60 * 24); // 1 day
        } catch (InterruptedException e) {
            throw new RuntimeException("unexpected", e);
        }
    }
    
    /** 
     * Waits for termination.
     *  
     * @param CAUTION: &lt;= 0 immediately times out */
    public void waitFor(long timeout) throws JSchException, ExitCode, InterruptedException {
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
        return root.getUser() + '@' + root.getHost() + "# " + Strings.join(" ", command);
    }
}
