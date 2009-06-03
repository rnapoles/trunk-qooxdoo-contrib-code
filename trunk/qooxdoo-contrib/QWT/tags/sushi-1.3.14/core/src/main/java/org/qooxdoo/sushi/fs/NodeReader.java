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
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

public class NodeReader extends InputStreamReader {
    public static NodeReader create(Node node) throws IOException {
        return new NodeReader(node, node.createInputStream(), node.getIO().getSettings().encoding);
    }

    //--
    
    private final Node node;
    private final String encoding;
    
    public NodeReader(Node node, InputStream source, String encoding) throws UnsupportedEncodingException {
        super(source, encoding);
        
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
