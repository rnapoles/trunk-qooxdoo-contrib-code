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

package org.qooxdoo.toolkit.server;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.io.Node;

public class Resource {
    private final Node normal;
    private final Node compressed;
    private final String type;

    public Resource(Node normal, Node compressed, String type) {
        this.normal = normal;
        this.compressed = compressed;
        this.type = type;
    }

    public void copy(boolean compress, HttpServletResponse dest) throws IOException {
        Node node;
        
        if (compress && compressed != null) {
            dest.setHeader("Content-Encoding", "gzip");
            node = compressed;
        } else {
            node = normal;
        }
        dest.setDateHeader("Last-Modified", node.lastModified());
        dest.setContentType(type);
        copy(node, dest.getOutputStream());
        // do not flush/close dest: response would be committed
    }

    public void copy(OutputStream dest) throws IOException {
        copy(normal, dest);
    }

    private void copy(Node node, OutputStream dest) throws IOException {
        InputStream src;

        src = node.createInputStream();
        node.io.buffer.copy(src, dest);
        src.close();
    }
}
