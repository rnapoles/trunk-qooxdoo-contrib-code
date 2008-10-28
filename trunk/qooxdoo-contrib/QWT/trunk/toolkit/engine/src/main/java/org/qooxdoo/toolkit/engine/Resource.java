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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.fs.GetLastModifiedException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.io.Buffer;

public class Resource {
    private final Node normal;
    private final Node compressed;
    private final MimeType type;

    public Resource(Node normal, Node compressed, MimeType type) {
        this.normal = normal;
        this.compressed = compressed;
        this.type = type;
    }

    public long getLastModified() throws GetLastModifiedException {
        return normal.getLastModified();
    }
    
    public void copy(Buffer buffer, boolean compress, HttpServletResponse dest) throws IOException {
        Node node;
        
        if (compress && compressed != null) {
            dest.setHeader("Content-Encoding", "gzip");
            node = compressed;
        } else {
            node = normal;
        }
        dest.setDateHeader("Last-Modified", node.getLastModified());
        dest.setContentType(type.code);
        copy(buffer, node, dest.getOutputStream());
        // do not flush/close dest: response would be committed
    }

    public void copy(Buffer buffer, OutputStream dest) throws IOException {
        copy(buffer, normal, dest);
    }

    private void copy(Buffer buffer, Node node, OutputStream dest) throws IOException {
        InputStream src;

        src = node.createInputStream();
        // CAUTION: do not use node buffer because to avoid concurrent modifications!
        buffer.copy(src, dest);
        src.close();
    }
}
