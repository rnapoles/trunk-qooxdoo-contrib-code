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

package org.qooxdoo.toolkit.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DependencyGraph {
    private Map<String, Node> nodes;
    
    public DependencyGraph() {
        nodes = new HashMap<String, Node>();
    }

    
    public boolean node(String name) {
        return doAdd(name) != null;
    }
    
    private Node doAdd(String name) {
        Node node;
            
        node = nodes.get(name);
        if (node == null) {
            node = new Node(name);
            nodes.put(name, node);
        }
        return node;
    }

    public List<String> nodes() {
        return new ArrayList<String>(nodes.keySet());
    }

    public boolean arrow(String from, String to) {
        return connect(doAdd(from), doAdd(to)); 
    }

    public int size() {
        return nodes.size();
    }

    /** CAUTION: removes nodes from the graph */
    public List<String> sort() {
        List<String> result;
        Node node;
        
        result = new ArrayList<String>();
        while (nodes.size() > 0) {
            node = start();
            if (node == null) {
                throw new DependencyException(toString());
            }
            remove(node);
            result.add(node.name);
        }
        return result;
    }

    public List<String> closure(String ... names) {
        List<String> result;
        
        result = new ArrayList<String>(Arrays.asList(names));
        closure(result);
        return result;
    }
    
    public void closure(List<String> result) {
        String name;
        Node node;
        int i;
        
        // size grows!
        for (i = 0; i < result.size(); i++) {
            name = result.get(i);
            node = nodes.get(name);
            if (node == null) {
                throw new IllegalArgumentException("unkown module: " + name);
            }
            for (Node to : node.tos) {
                if (!result.contains(to.name)) {
                    result.add(to.name);
                }
            }
        }
    }
    
    public boolean contains(String name) {
        return nodes.containsKey(name);
    }
    
    public void retain(List<String> seeds) {
        for (String name : new ArrayList<String>(nodes.keySet())) {
            if (!seeds.contains(name)) {
                remove(nodes.get(name));
            }
        }
    }
    
    @Override
    public String toString() {
        List<String> items;

        items = new ArrayList<String>();
        for (String name : nodes.keySet()) {
            items.add(toString(name));
        }
        Collections.sort(items);
        return items.toString();
    }
    
    private String toString(String name) {
        StringBuilder builder;
        Node node;
        boolean firstTo;
        
        builder = new StringBuilder();
        node = nodes.get(name);
        builder.append(name);
        if (node.tos.size() > 0) {
            builder.append("-");
            firstTo = true;
            for (Node to : node.tos) {
                if (firstTo) {
                    firstTo = false;
                } else {
                    builder.append('|');
                }
                builder.append(to.name);
            }
        }
        return builder.toString();
    }
    
    //--
    
    private boolean connect(Node from, Node to) {
        if (from.tos.contains(to)) {
            return false;
        } else {
            from.tos.add(to);
            to.from++;
            return true;
        }
    }

    private void remove(Node node) {
        if (nodes.remove(node.name) != node) {
            throw new IllegalStateException();
        }
        for (Node to : node.tos) {
            to.from--;
        }
        if (node.from != 0) {
            for (Node from : nodes.values()) {
                if (from.tos.remove(node)) {
                    node.from--;
                }
            }
            if (node.from != 0) {
                throw new IllegalStateException();
            }
        }
    }
    
    private Node start() {
        for (Node node : nodes.values()) {
            if (node.from == 0) {
                return node;
            }
        }
        return null;
    }

    public static class Node {
        private static int hashNo = 0;
        private final int hash;
        public final String name;
        public int from;
        public final List<Node> tos;
        
        public Node(String name) {
            this.hash = ++hashNo;
            this.name = name;
            this.from = 0;
            this.tos = new ArrayList<Node>();
        }

        @Override
        public String toString() {
            return from + "-" + name + "-" + tos.size();
        }
        
        @Override
        public int hashCode() {
            return hash;
        }

        @Override
        public boolean equals(Object obj) {
            return this == obj;
        }
    }
}
