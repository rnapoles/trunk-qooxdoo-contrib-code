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

import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.DeleteException;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Filesystem;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.LastModifiedException;
import org.qooxdoo.sushi.io.LengthException;
import org.qooxdoo.sushi.io.ListException;
import org.qooxdoo.sushi.io.Misc;
import org.qooxdoo.sushi.io.MkdirException;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.SetLastModifiedException;
import org.qooxdoo.sushi.io.Settings;
import org.qooxdoo.sushi.util.ExitCode;
import org.qooxdoo.sushi.util.Strings;

import com.jcraft.jsch.JSchException;

public class SshNode extends Node {
    private static final Filesystem FS = new Filesystem("ssh:/", '/');
    
    private final Connection connection;
    private final String slashPath;
    
    public SshNode(IO io, Connection connection, String path) {
        super(io, FS);
        
        if (path.startsWith("/")) {
            throw new IllegalArgumentException();
        }
        if (path.endsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        this.connection = connection;
        this.slashPath = "/" + path;
    }

    @Override
    public long length() throws LengthException {
        String result;
        
        try {
            if (connection.isMac()) {
                result = connection.exec("stat", "-f%z", slashPath);
                result = result.trim();
            } else {
                result = connection.exec("du", "-b", slashPath);
                result = first(result);
            }
        } catch (ExitCode e) {
            throw new LengthException(this, e);
        } catch (JSchException e) {
            throw new LengthException(this, e);
        }
        return Long.parseLong(first(result));
    }

    private static String first(String str) {
        int i;
        int max;
        
        max = str.length();
        for (i = 0; i < max; i++) {
            if (Character.isWhitespace(str.charAt(i))) {
                break;
            }
        }
        return str.substring(0, i);
    }

    @Override
    public Node getBase() {
        return null;
    }
    
    @Override
    public SshNode newInstance(String path) {
        return new SshNode(io, connection, path);
    }

    @Override
    public String getPath() {
        return slashPath.substring(1);
    }

    public Connection getConnection() {
        return connection;
    }
    
    //--
    
    @Override
    public SshNode[] list() throws ListException {
        List<Node> lst;
        
        try {
            lst = ls();
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new ListException(this, e);
        }
        if (lst == null) {
            return null;
        }
        return lst.toArray(new SshNode[lst.size()]);
    }
    
    //--

    /** @return null when invoked on a file */
    private List<Node> ls() throws JSchException, ExitCode, IOException, InterruptedException {
        String result;
        List<Node> nodes;
        
        result = connection.exec("ls", slashPath).trim();
        if (slashPath.equals(result)) {
            return null;
        }
        nodes = new ArrayList<Node>();
        for (String name : Strings.split("\n", result)) {
            try {
                nodes.add(join(name));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("illegal name: " + name, e);
            }
        }
        return nodes;
    }

    @Override
    public SshNode delete() throws DeleteException {
        String result;
        Throwable cause;
        
        try {
            result = connection.exec("rm", "-r", slashPath);
            if (result.length() != 0) {
                throw new JSchException("unexpected output: " + result);
            }
        } catch (ExitCode e) {
            if (e.output.contains("No such file or directory")) {
                cause = new FileNotFoundException();
            } else {
                cause = e;
            }
            throw new DeleteException(this, cause);
        } catch (JSchException e) {
            throw new DeleteException(this, e);
        }
        return this;
    }

    @Override
    public Node mkdir() throws MkdirException {
        String result;

        try {
            result = connection.exec("mkdir", slashPath);
            if (result.length() != 0) {
                throw new JSchException("unexpected output: " + result);
            }
            return this;
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new MkdirException(this, e);
        }
    }

    @Override
    public boolean exists() throws ExistsException {
        return test("-a");
    }
    
    @Override
    public boolean isFile() throws ExistsException {
        return test("-f");
    }

    @Override
    public boolean isDirectory() throws ExistsException {
        return test("-d");
    }

    private static final SimpleDateFormat TOUCH_FORMAT = new SimpleDateFormat("yyMMddHHmm.ss");

    @Override
    public long lastModified() throws LastModifiedException {
        String result;
        
        try {
            if (connection.isMac()) {
                result = connection.exec("stat", "-f%m", slashPath).trim();
            } else {
                result = connection.exec("stat", "--format=%Y", slashPath).trim();
            }
        } catch (ExitCode e) {
            throw new LastModifiedException(this, e);
        } catch (JSchException e) {
            throw new LastModifiedException(this, e);
        }
        return Long.parseLong(result) * 1000;
    }

    
    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        String stamp;
        
        stamp = TOUCH_FORMAT.format(new Date(millis));
        try {
            connection.exec("touch", "-t", stamp, slashPath);
        } catch (ExitCode e) {
            throw new SetLastModifiedException(this, e);
        } catch (JSchException e) {
            throw new SetLastModifiedException(this, e);
        }
    }
    
    private boolean test(String flag) throws ExistsException {
        try {
            connection.exec("test", flag, slashPath);
            return true;
        } catch (ExitCode e) {
            return false;
        } catch (JSchException e) {
            throw new ExistsException(this, e);
        }
    }

    
    @Override
    public InputStream createInputStream() throws IOException {
        FileNode tmp;
        
        tmp = io.createTempFile();
        try {
            get(tmp);
        } catch (JSchException e) {
            throw Misc.exception("ssh get failure", e);
        } catch (InterruptedException e) {
            throw Misc.exception("ssh get interrupted", e);
        }
        return tmp.createInputStream();
    }
    
    @Override
    public OutputStream createOutputStream() throws IOException {
        return new ByteArrayOutputStream() {
            @Override
            public void close() throws IOException {
                super.close();
                try {
                    put(toByteArray());
                } catch (JSchException e) {
                    throw Misc.exception("ssh write failed", e);
                } catch (InterruptedException e) {
                    throw Misc.exception("ssh write interrupted", e);
                }
            }
        };
    }

    public void get(final FileNode dest) throws JSchException, IOException, InterruptedException {
        connection.invoke(new Transfer("scp -f " + slashPath) { // "from"
            @Override
            public void doInvoke(Settings settings, Buffer buffer) throws JSchException, IOException {
                String line;
                char c;
                
                sendAck();
                while (true) {
                    line = buffer.readLine(in, settings.encoding);
                    if (line == null) {
                        break;
                    }
                    if (line.length() == 0) {
                        throw new EOFException();
                    }
                    c = line.charAt(0);
                    if (c == 'C') {
                        parseAndFetchFile(buffer, line, dest);
                    } else if (c == 1 || c == 2) {
                        throw exception(line.substring(1));
                    } else {
                        throw new IOException("unknown server response: " + line);
                    }
                }
            }
            
            private void parseAndFetchFile(Buffer buffer, String header, FileNode dest) throws IOException {
                int start;
                int end;
                int size;
                
                end = header.indexOf(" ", 1);
                start = end + 1;
                end = header.indexOf(" ", start + 1);
                size = Integer.parseInt(header.substring(start, end));
                fetchFile(buffer, dest, size);
                readAck();
                sendAck();
            }

            private void fetchFile(Buffer buffer, FileNode dest, int filesize) throws IOException {
                FileOutputStream fos;
                int length;

                sendAck();
                fos = dest.createOutputStream();
                try {
                    length = buffer.copy(in, fos, filesize);
                    if (length != filesize) {
                        throw new EOFException("file truncated");
                    }
                } finally {
                    fos.flush();
                    fos.close();
                }
            }
        });
    }

    private static IOException exception(String message) {
        if (message.contains("Not a directory")) {
            return new FileNotFoundException();
        } else if (message.contains("not a regular file")) {
            return new FileNotFoundException();
        } else if (message.contains("No such file or directory")) {
            return new FileNotFoundException();
        } else {
            return new IOException(message);
        }
    }
    
    public void put(final byte[] data) throws JSchException, IOException, InterruptedException {
        connection.invoke(new Transfer("scp -t " + slashPath) { // "to"
            @Override
            public void doInvoke(Settings settings, Buffer buffer) throws JSchException, IOException {
                readAck();
                out.write(settings.bytes("C0644 " + data.length + " bytearray\n"));
                out.flush();
                readAck();
                out.write(data);
                out.write(0);
                out.flush();
                readAck();
                out.close();
            }
        });
    }
    
    @Override
    protected boolean equalsNode(Node node) {
        return connection == ((SshNode) node).connection;
    }
}
