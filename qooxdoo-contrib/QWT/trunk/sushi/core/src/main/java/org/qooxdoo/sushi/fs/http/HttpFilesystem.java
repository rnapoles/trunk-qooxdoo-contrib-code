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

import org.qooxdoo.sushi.fs.Filesystem;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.RootPathException;

public class HttpFilesystem extends Filesystem {
    private int defaultConnectTimeout;
    private int defaultReadTimeout;
    
    public HttpFilesystem(IO io) {
        super(io, "http", '/');
        
        this.defaultConnectTimeout = 0;
        this.defaultReadTimeout = 0;
    }

    @Override
    public HttpRoot rootPath(String rootPath, StringBuilder path) throws RootPathException {
        URL url;
        
        try {
            url = new URL("http:" + rootPath);
        } catch (MalformedURLException e) {
            throw new RootPathException(e);
        }
        path.append(url.getPath().substring(1));
        return root(url);
    }

    public HttpRoot root(URL url) {
        if (!url.getProtocol().equals(url.getProtocol())) {
            throw new IllegalArgumentException(url.toString());
        }
        if (url.getRef() != null) {
            throw new IllegalArgumentException(url.toString());
        }
        if (url.getUserInfo() != null) {
            throw new IllegalArgumentException(url.toString());
        }
        if (url.getQuery() != null) {
            throw new IllegalArgumentException(url.toString());
        }
        // ignores url.getPath()
        return new HttpRoot(this, url.getHost(), url.getPort());
    }

    public int getDefaultConnectTimeout() {
        return defaultConnectTimeout;
    }
    
    public void setDefaultConnectTimeout(int millis) {
        defaultConnectTimeout = millis;
    }
    
    public int getDefaultReadTimeout() {
        return defaultReadTimeout;
    }
    
    public void setDefaultReadTimeout(int millis) {
        defaultReadTimeout = millis;
    }
}
