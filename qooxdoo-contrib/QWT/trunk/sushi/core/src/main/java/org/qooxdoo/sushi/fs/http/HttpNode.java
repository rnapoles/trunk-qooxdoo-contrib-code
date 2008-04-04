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

package org.qooxdoo.sushi.fs.http;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.Root;
import org.qooxdoo.sushi.fs.SetLastModifiedException;
import org.qooxdoo.sushi.fs.file.FileNode;

/** 
 * Use http networking properties to specify proxies:
 * http://java.sun.com/j2se/1.5.0/docs/guide/net/properties.html
 */
public class HttpNode extends Node {
    // CAUTION: no forResource method, because non-existing resources don't have a url
    
    public static HttpNode forFile(FileNode file) throws MalformedURLException {
        return new HttpNode(file.io, file.toURI().toURL());
    }

    //--
    
    private final URL url;
    
    public HttpNode(IO io, URL url) {
        super(io, new Root(HttpFilesystem.INSTANCE, root(url), '/'));
        this.url = url;
    }

    private static String root(URL url) {
    	int port;
    	
    	if (url.getRef() != null) {
    		throw new IllegalArgumentException(url.toString());
    	}
    	if (url.getUserInfo() != null) {
    		throw new IllegalArgumentException(url.toString());
    	}
    	port = url.getPort();
    	return url.getProtocol() + "://" + url.getHost() + ((port == -1) ? "" : "" + port) + '/';
    }
    
    @Override
    public long length() {
        throw new UnsupportedOperationException();
    }

    @Override 
    public long getLastModified() {
        return 0;
    }

    @Override
    public void setLastModified(long millis) throws SetLastModifiedException {
        throw new SetLastModifiedException(this);
    }
    
    public URL getUrl() {
        return url;
    }

    @Override
    public Node delete() throws DeleteException {
        throw new DeleteException(this);
    }

    @Override
    public Node mkdir() throws MkdirException {
        throw new MkdirException(this);
    }
    
    @Override
    public HttpNode newInstance(String path) {
    	// ignores query
        try {
            return new HttpNode(io, new URL(url.getProtocol(), url.getHost(), url.getPort(), path));
        } catch (MalformedURLException e) {
            throw new RuntimeException("TODO", e);
        }
    }
    
    @Override
    protected boolean equalsNode(Node node) {
        return url.sameFile(((HttpNode) node).url);
    }
    
    @Override
    public boolean exists() {
        try {
            return inputStream() != null;
        } catch (FileNotFoundException e) {
            return false;
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        }
    }

    @Override
    public boolean isFile() {
        return exists();
    }

    @Override
    public boolean isDirectory() {
        return false;
    }

    @Override
    public InputStream createInputStream() throws IOException {
        InputStream src;
        
        src = inputStream();
        if (src == null) {
            throw new FileNotFoundException("resource not found: " + url);
        }
        return src;
    }

    @Override
    public OutputStream createOutputStream() throws IOException {
        URLConnection connection;

        connection = url.openConnection();
        connection.connect();
        return connection.getOutputStream();
    }

    private InputStream inputStream() throws IOException {
        URLConnection connection;
        
        connection = url.openConnection();
        connection.connect();
        return connection.getInputStream();
    }

    @Override
    public List<HttpNode> list() {
        return null;
    }

    @Override
    public String getPath() {
        String result;
        
        result = url.getPath();
        if (result.startsWith("/")) {
            return result.substring(1);
        } else {
            return result;
        }
    }
}
