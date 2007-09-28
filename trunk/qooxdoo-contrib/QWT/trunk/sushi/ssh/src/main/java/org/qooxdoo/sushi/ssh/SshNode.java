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
import java.util.ArrayList;
import java.util.List;

import com.jcraft.jsch.JSchException;

import org.qooxdoo.sushi.io.Buffer;
import org.qooxdoo.sushi.io.DeleteException;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.LengthException;
import org.qooxdoo.sushi.io.Misc;
import org.qooxdoo.sushi.io.MkdirException;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.SetLastModifiedException;
import org.qooxdoo.sushi.util.ExitCode;
import org.qooxdoo.sushi.util.Strings;

public class SshNode extends Node {
    private final Host host;
    private final String slashPath;
    
    public SshNode(IO io, String host, User user, String path) throws JSchException {
        this(io, new Host(host, user), path);
    }

    public SshNode(IO io, Host host, String path) {
        super(io);
        
        if (path.startsWith("/")) {
            throw new IllegalArgumentException();
        }
        if (path.endsWith("/")) {
            throw new IllegalArgumentException(path);
        }
        this.host = host;
        this.slashPath = "/" + path;
    }

    @Override
    public long length() {
        String result;
        
        try {
            result = host.exec("du", "-b", slashPath);
        } catch (ExitCode e) {
            throw new LengthException(e);
        } catch (JSchException e) {
            throw new LengthException(e);
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
    public Node newInstance(String path) {
        return new SshNode(io, host, path);
    }

    @Override
    public String getPath() {
        return slashPath.substring(1);
    }

    public Host getHost() {
        return host;
    }
    
    //--
    
    @Override
    public Node[] children() {
        List<Node> lst;
        
        try {
            lst = ls();
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("TODO", e);
        }
        if (lst == null) {
            return null;
        }
        return lst.toArray(new Node[lst.size()]);
    }
    
    //--

    /** @return null when invoked on a file */
    private List<Node> ls() throws JSchException, ExitCode, IOException, InterruptedException {
        String result;
        List<Node> nodes;
        
        result = host.exec("ls", slashPath).trim();
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
    public void delete() throws DeleteException {
        String result;
        Throwable cause;
        
        try {
            result = host.exec("rm", "-r", slashPath);
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
    }

    @Override
    public Node mkdir() throws MkdirException {
        String result;

        try {
            result = host.exec("mkdir", slashPath);
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
    public boolean exists() {
        return test("-a");
    }
    
    @Override
    public boolean isFile() {
        return test("-f");
    }

    @Override
    public boolean isDirectory() {
        return test("-d");
    }

    @Override
    public long lastModified() {
        return 0; // TODO
    }

    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        throw new SetLastModifiedException(this);
    }
    
    private boolean test(String flag) {
        try {
            host.exec("test", flag, slashPath);
            return true;
        } catch (ExitCode e) {
            return false;
        } catch (JSchException e) {
            throw new ExistsException(e);
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
        host.invoke(new Transfer("scp -f " + slashPath) { // "from"
            @Override
            public void doInvoke(Buffer buffer) throws JSchException, IOException {
                String line;
                char c;
                
                sendAck();
                while (true) {
                    line = buffer.readLine(in);
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
        host.invoke(new Transfer("scp -t " + slashPath) { // "to"
            @Override
            public void doInvoke(Buffer buffer) throws JSchException, IOException {
                readAck();
                out.write(buffer.bytes("C0644 " + data.length + " bytearray\n"));
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
        return host == ((SshNode) node).host;
    }
}
