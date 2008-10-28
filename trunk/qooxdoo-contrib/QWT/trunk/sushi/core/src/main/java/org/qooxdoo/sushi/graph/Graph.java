package org.qooxdoo.sushi.graph;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** A directed graph */
public class Graph<T> {
    private final Map<T, Node<T>> nodes;
    
    public Graph() {
        this.nodes = new HashMap<T, Node<T>>();
    }
    
    /** @return number of nodes */
    public int size() {
        return nodes.size();
    }
    
    /** creates a new node if data is not already part of the graph */
    public boolean node(T data) {
        if (nodes.get(data) == null) {
            doNode(data);
            return true;
        } else {
            return false;
        }
    }
    
    public boolean arrow(T src, T dest) {
        Node<T> left;
        Node<T> right;
        
        left = doNode(src);
        right = doNode(dest);
        if (left.starting.contains(right)) {
            return false;
        } else {
            left.starting.add(right);
            right.ending.add(left);
            return true;
        }
    }

    //--
    
    /** CAUTION: removes nodes from the graph */
    public List<T> sort() throws CyclicDependency {
        List<T> result;
        Node<T> node;
        
        result = new ArrayList<T>();
        while (nodes.size() > 0) {
            node = start();
            if (node == null) {
                throw new CyclicDependency(this);
            }
            doRemove(node);
            result.add(node.data);
        }
        return result;
    }
    
    //--
    
    public void check() {
        for (Node<T> node : nodes.values()) {
            for (Node<T> tmp : node.starting) {
                if (!tmp.ending.contains(node)) {
                    throw new IllegalStateException();
                }
            }
            for (Node<T> tmp : node.ending) {
                if (!tmp.starting.contains(node)) {
                    throw new IllegalStateException();
                }
            }
        }
    }
    
    //--
    
    private Node<T> start() {
        for (Node<T> node : nodes.values()) {
            if (node.ending.size() == 0) {
                return node;
            }
        }
        return null;
    }

    private Node<T> doNode(T data) {
        Node<T> node;
        
        node = nodes.get(data);
        if (node != null) {
            return node;
        }
        node = new Node<T>(data);
        nodes.put(data, node);
        return node;
    }

    private void doRemove(Node<T> node) {
        if (nodes.remove(node.data) != node) {
            throw new IllegalStateException();
        }
        for (Node<T> tmp : node.starting) {
            if (!tmp.ending.remove(node)) {
                throw new IllegalStateException();
            }
        }
        for (Node<T> tmp : node.ending) {
            if (!tmp.starting.remove(node)) {
                throw new IllegalStateException();
            }
        }
    }
    
    public String getNodeNames() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        for (T data : nodes.keySet()) {
            builder.append(data);
            builder.append(' ');
        }
        return builder.toString();
    }
}
