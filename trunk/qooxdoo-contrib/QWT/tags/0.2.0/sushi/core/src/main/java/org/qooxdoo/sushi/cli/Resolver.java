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

package org.qooxdoo.sushi.cli;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.io.ListException;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;

public class Resolver {
    private static final String SEP = ":";
    private final IO io;
    private final Map<String, Node> nodes;
    
    public Resolver(IO io) {
        this.io = io;
        this.nodes = new HashMap<String, Node>();
    }

    public Resolver add(String prefix, Node node) {
        if (prefix.contains(SEP)) {
            throw new IllegalArgumentException(prefix);
        }
        if (nodes.containsKey(prefix)) {
            throw new IllegalArgumentException("duplicate prefix: " + prefix);
        }
        nodes.put(prefix, node);
        return this;
    }

    public List<String> files() throws ListException {
        List<String> result;
        
        result = new ArrayList<String>();
        for (Node node : nodes.values()) {
            for (Node child : node.list()) {
                result.add(child.getName());
            }
        }
        return result;
    }
    
    public Node node(String file) throws IOException {
        int idx;
        String prefix;
        Node node;
        List<Node> found;
        
        idx = file.indexOf(SEP);
        if (idx != -1) {
            prefix = file.substring(0, idx);
            file = file.substring(idx + SEP.length());
            if (prefix.length() > 0) {
                node = nodes.get(prefix);
                if (node == null) {
                    throw new IOException("unkown prefix: " + prefix);
                }
                return node.join(file);
            } else {
                found = new ArrayList<Node>();
                for (String p : nodes.keySet()) {
                    node = nodes.get(p).join(file);
                    if (node.exists()) {
                        found.add(node);
                    }
                }
                switch (found.size()) {
                case 0:
                    throw new IOException("file not found: " + file);
                case 1:
                    return found.get(0);
                default:
                    throw new IOException("file ambiguous: " + file);
                }
            }
        } else if (file.equals("-")) {
            return new ConsoleNode(io);
        } else {
            return io.node(file);
        }
    }
}
