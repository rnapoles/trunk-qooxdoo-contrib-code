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

package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;

public class NodeWriter extends OutputStreamWriter {
    public static NodeWriter create(Node node, boolean append) throws IOException {
        return new NodeWriter(node, node.createOutputStream(append), node.getIO().getSettings().encoding);
    }

    //--
    
    private final Node node;
    private final String encoding;
    
    public NodeWriter(Node node, OutputStream dest, String encoding) throws UnsupportedEncodingException {
        super(dest, encoding);
        
        this.node = node;
        this.encoding = encoding;
    }

    public Node getNode() {
        return node;
    }
    
    @Override
    public String getEncoding() {
        return encoding;
    }
}
