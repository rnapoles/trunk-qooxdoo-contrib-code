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
import java.net.URL;
import java.net.URLConnection;
import java.util.List;

import org.qooxdoo.sushi.fs.DeleteException;
import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.SetLastModifiedException;

/** 
 * Use http networking properties to specify proxies:
 * http://java.sun.com/j2se/1.5.0/docs/guide/net/properties.html
 */
public class HttpNode extends Node {
    private final HttpRoot root;
    private final URL url;
    
    public HttpNode(HttpRoot root, URL url) {
        super();
        this.root = root;
        this.url = url;
    }

    @Override
    public HttpRoot getRoot() {
        return root;
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
    public OutputStream createOutputStream(boolean append) throws IOException {
        URLConnection connection;

        if (append) {
            unsupported("createOutputStream(true)");
        }
        connection = url.openConnection();
        connection.connect();
        return connection.getOutputStream();
    }

    private InputStream inputStream() throws IOException {
        URLConnection connection;
        
        connection = url.openConnection();
        connection.setConnectTimeout(getRoot().getConnectTimeout());
        connection.setReadTimeout(getRoot().getReadTimeout());
        connection.connect();
        return connection.getInputStream();
    }

    @Override
    public List<HttpNode> list() {
        return null;
    }

    @Override
    public String getPath() {
        return getPath(url);
    }

    public static String getPath(URL url) {
        String result;
        
        result = url.getPath();
        if (result.startsWith("/")) {
            return result.substring(1);
        } else {
            return result;
        }
    }
}
