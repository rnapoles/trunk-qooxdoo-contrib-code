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
import org.qooxdoo.sushi.fs.file.FileNode;

public class HttpFilesystem extends Filesystem {
    public HttpFilesystem(IO io) {
        super(io, "http", '/');
    }

    @Override
    public HttpNode parse(String rootPath) throws MalformedURLException {
        return forUrl(new URL(rootPath));
    }

    // CAUTION: no forResource method, because non-existing resources don't have a url
    
    // TODO: dump?
    public HttpNode forFile(FileNode file) throws MalformedURLException {
        return forUrl(file.toURI().toURL());
    }
    
    public HttpNode forUrl(URL url) {
        return new HttpNode(root(url), url);
    }

    private HttpRoot root(URL url) {
        int port;

        if (url.getRef() != null) {
            throw new IllegalArgumentException(url.toString());
        }
        if (url.getUserInfo() != null) {
            throw new IllegalArgumentException(url.toString());
        }
        port = url.getPort();
        return new HttpRoot(this, url.getProtocol() + "://" + url.getHost() + ((port == -1) ? "" : "" + port) + '/');
    }
}
