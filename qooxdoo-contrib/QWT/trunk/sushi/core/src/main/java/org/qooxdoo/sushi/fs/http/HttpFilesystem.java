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
import org.qooxdoo.sushi.fs.ParseException;
import org.qooxdoo.sushi.fs.file.FileNode;

public class HttpFilesystem extends Filesystem {
    public static final HttpFilesystem INSTANCE = new HttpFilesystem();
    
    private HttpFilesystem() {
        super("http", '/');
    }

    // CAUTION: no forResource method, because non-existing resources don't have a url
    
    @Override
    public HttpNode parse(IO io, String rootPath) throws ParseException, MalformedURLException {
        return new HttpNode(io, new URL(rootPath));
    }

    public HttpNode forFile(FileNode file) throws MalformedURLException {
        return new HttpNode(file.getIO(), file.toURI().toURL());
    }
}
