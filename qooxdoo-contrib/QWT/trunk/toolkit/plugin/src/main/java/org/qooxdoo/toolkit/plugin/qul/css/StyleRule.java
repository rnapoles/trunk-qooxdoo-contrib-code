package org.qooxdoo.toolkit.plugin.qul.css;

public class StyleRule extends Rule {
    public final String selector;
    public final Object obj;
    
    public StyleRule(String selector, Object obj) {
        this.selector = selector;
        this.obj = obj;
    }
    
    public String toString() {
        return selector + "{ " + obj + " }";
    }
}
