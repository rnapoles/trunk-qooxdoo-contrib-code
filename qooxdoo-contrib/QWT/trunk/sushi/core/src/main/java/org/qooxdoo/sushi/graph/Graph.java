package org.qooxdoo.sushi.graph;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
    
    public List<T> data() {
        return new ArrayList<T>(nodes.keySet());
    }

    public boolean contains(T data) {
        return nodes.containsKey(data);
    }
    
    /** Adds data to the Graph and returns true, or does nothing and returns false if data is already part of the graph. */
    public boolean node(T data) {
        if (nodes.get(data) == null) {
            doNode(data);
            return true;
        } else {
            return false;
        }
    }
    
    public boolean edge(T src, T dest) {
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
    
    public List<T> closure(T ... data) {
        List<T> result;
        
        result = new ArrayList<T>(Arrays.asList(data));
        closure(result);
        return result;
    }
    
    public void closure(List<T> result) {
        T data;
        Node<T> node;
        int i;
        
        // size grows!
        for (i = 0; i < result.size(); i++) {
            data = result.get(i);
            node = nodes.get(data);
            if (node == null) {
                throw new IllegalArgumentException("unkown data: " + data);
            }
            for (Node<T> to : node.starting) {
                if (!result.contains(to.data)) {
                    result.add(to.data);
                }
            }
        }
    }
    
    public void retain(List<T> seeds) {
        for (T name : new ArrayList<T>(nodes.keySet())) {
            if (!seeds.contains(name)) {
                doRemove(nodes.get(name));
            }
        }
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
    
    //--
    
    @Override
    public String toString() {
        List<String> items;

        items = new ArrayList<String>();
        for (T data : nodes.keySet()) {
            items.add(toNodeString(data));
        }
        Collections.sort(items);
        return items.toString();
    }
    
    private String toNodeString(T data) {
        StringBuilder builder;
        Node<T> node;
        boolean firstTo;
        
        builder = new StringBuilder();
        node = nodes.get(data);
        builder.append(toString(data));
        if (node.starting.size() > 0) {
            builder.append("-");
            firstTo = true;
            for (Node<T> to : node.starting) {
                if (firstTo) {
                    firstTo = false;
                } else {
                    builder.append('|');
                }
                builder.append(toString(to.data));
            }
        }
        return builder.toString();
    }

    private String toString(T data) {
        return data.toString();
    }
}
