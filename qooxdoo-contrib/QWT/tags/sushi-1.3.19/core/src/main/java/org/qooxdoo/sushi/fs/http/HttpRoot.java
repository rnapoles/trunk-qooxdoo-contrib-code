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

import java.net.MalformedURLException;
import java.net.URL;

import org.qooxdoo.sushi.fs.Root;

public class HttpRoot implements Root {
    private final HttpFilesystem filesystem;
    private final String host;
    private final int port;
    private int connectTimeout;
    private int readTimeout;
    
    public HttpRoot(HttpFilesystem filesystem, String host, int port) {
        this.filesystem = filesystem;
        this.host = host;
        this.port = port;
        this.connectTimeout = filesystem.getDefaultConnectTimeout();
        this.readTimeout = filesystem.getDefaultReadTimeout();
    }

    public int getConnectTimeout() {
    	return connectTimeout;
    }
    public void setConnectTimeout(int millis) {
    	this.connectTimeout = millis;
    }

    public int getReadTimeout() {
    	return readTimeout;
    }
    public void setReadTimeout(int millis) {
    	this.readTimeout = millis;
    }
        
    @Override
    public boolean equals(Object obj) {
        HttpRoot root;
        
        if (obj instanceof HttpRoot) {
            root = (HttpRoot) obj;
            return filesystem == root.filesystem && host.equals(root.host) && port == root.port;
        }
        return false;
    }
    
    @Override
    public int hashCode() {
        return host.hashCode();
    }

    public HttpFilesystem getFilesystem() {
        return filesystem;
    }

    public String getId() {
        return "//" + host + (port == -1 ? "" : "" + port) + "/";
    }

    public HttpNode node(String path) {
        // ignores query
        try {
            return new HttpNode(this, new URL("http", host, port, "/" + path));
        } catch (MalformedURLException e) {
            throw new RuntimeException("TODO", e);
        }
    }
}
