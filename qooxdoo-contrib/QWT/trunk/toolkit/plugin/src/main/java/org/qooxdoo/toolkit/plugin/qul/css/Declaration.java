package org.qooxdoo.toolkit.plugin.qul.css;

public class Declaration {
    private final String property;
    private final String expr;
    
    public Declaration(String property, String expr) {
        this.property = property;
        this.expr = expr;
    }
}
