package org.qooxdoo.sushi.fs.filter;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;

// TODO: is this another node-type?
public class Tree {
    public final Node node;
    public final List<Tree> children;
    
    public Tree(Node node) {
        this.node = node;
        this.children = new ArrayList<Tree>();
    }
    
    @Override
    public String toString() {
        return node.getName();
    }
}
