package org.qooxdoo.sushi.graph;

public class CyclicDependency extends Exception {
    private final Graph<?> graph;
    
    public CyclicDependency(Graph<?> g) {
        super("cycle with these nodes: " + g.getNodeNames());
        this.graph = g;
    }
    
    public Graph<?> getGraph() {
        return graph;
    }
}
