package org.qooxdoo.toolkit.plugin.qul.css;

public class Ruleset {
    private final Selector[] selectors;
    private final Declaration[] declarations;
    
    public Ruleset(Selector[] selectors, Declaration[] declarations) {
        this.selectors = selectors;
        this.declarations = declarations;
    }
}
