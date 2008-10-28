package org.qooxdoo.sushi.graph;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** A directed graph of nodes (with type T) and edges. */
public class Graph<T> {
    private final Map<T, Node<T>> nodes;
    
    public Graph() {
        this.nodes = new LinkedHashMap<T, Node<T>>();
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
    
    public boolean contains(T left, T right) {
        Node<T> start;

        start = nodes.get(left);
        if (start == null) {
            return false;
        }
        for (Node<T> end : start.starting) {
            if (end.data.equals(right)) {
                return true;
            }
        }
        return false;
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

    public boolean edges(T left, T ... rights) {
        return edges(left, Arrays.asList(rights));
    }
    
    public boolean edges(T left, List<T> rights) {
        boolean modified;
        
        modified = false;
        for (T right : rights) {
            if (edge(left, right)) {
                modified = true;
            }
        }
        return modified;
    }

    /**
     * Adds all nodes and edges to his graph.
     * 
     * @return true if this Graph has been modified
     */
    public boolean graph(Graph<T> graph) {
        boolean modified;

        modified = false;
        for (Node<T> src : graph.nodes.values()) {
            if (node(src.data)) {
                modified = true;
            }
            for (Node<T> dest : src.starting) {
                if (edge(src.data, dest.data)) {
                    modified = true;
                }
            }
        }
        return modified;
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
    
    /**
     * @return null to indicate a cyclic dependency  TODO 
     */
    public List<T> sort(List<T> all) {
        List<T> unsorted;
        List<T> sorted;
        List<T> current;
        int size;

        unsorted = new ArrayList<T>(all);
        sorted = new ArrayList<T>();
        size = all.size();
        while (sorted.size() < size) {
            current = getNext(sorted, unsorted);
            if (current.size() == 0) {
                return null; // cyclic dependency
            }
            sorted.addAll(current);
            unsorted.removeAll(current);
        }
        return sorted;
    }

    private List<T> getNext(List<T> leftCollection, Collection<T> rightCollection) {
        List<T> current;
        EdgeIterator<T> relationIter;

        current = new ArrayList<T>();
        for (T right : rightCollection) {
            relationIter = edges();
            while (relationIter.step()) {
                if (relationIter.right().equals(right)) {
                    if (relationIter.left().equals(right)) {
                        // reflective element, do nothing
                    } else {
                        if (!leftCollection.contains(relationIter.left())) {
                            relationIter = null;
                            break;
                        }
                    }
                }
            }
            if (relationIter != null) {
                current.add(right);
            }
        }

        return current;
    }

    //--

    // TODO: merge with other closure methods
    public void closureHere() {
        boolean modified;

        // clone collections to cope with modification
        do {
            modified = false;
            for (Node<T> left : new ArrayList<Node<T>>(nodes.values())) {
                for (Node<T> right : new ArrayList<Node<T>>(left.starting)) {
                    for (Node<T> rightright : right.starting) {
                        if (edge(left.data, rightright.data)) {
                            modified = true;
                        }
                    }
                }
            }
        } while (modified);
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
    
    //--  Graph as a relation

    public EdgeIterator<T> edges() {
        // TODO
        return new EdgeIterator<T>(new ArrayList<Node<T>>(nodes.values()).iterator());
    }

    public Set<T> getDomain() {
        Set<T> set;
        
        set = new HashSet<T>();
        getDomain(set);
        return set;
    }
    
    public void getDomain(Collection<T> result) {
        for (Node<T> node : nodes.values()) {
            if (node.starting.size() > 0) {
                result.add(node.data);
            }
        }
    }

    public Set<T> getImage() {
        Set<T> set;
        
        set = new HashSet<T>();
        getImage(set);
        return set;
    }

    public void getImage(Collection<T> result) {
        for (Node<T> node : nodes.values()) {
            if (node.ending.size() > 0) {
                result.add(node.data);
            }
        }
    }

    public String toRelationString() {
        StringBuilder result;
        EdgeIterator<T> iter;
        boolean first;

        result = new StringBuilder();
        result.append("{ ");
        iter = edges();
        first = true;
        while (iter.step()) {
            if (!first) {
                result.append(", ");
                first = false;
            }
            result.append('(');
            result.append(iter.left().toString());
            result.append(',');
            result.append(iter.right().toString());
            result.append(')');
        }
        result.append(" }");
        return result.toString();
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
