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

public class HttpFilesystem extends Filesystem {
    public HttpFilesystem(IO io) {
        super(io, "http", '/');
    }

    @Override
    public HttpNode parse(String rootPath) throws MalformedURLException {
        return forUrl(new URL("http:" + rootPath));
    }

    public HttpNode forUrl(URL url) {
        return new HttpNode(HttpRoot.forUrl(this, url), url);
    }
}
