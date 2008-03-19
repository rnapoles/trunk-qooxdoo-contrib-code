package org.qooxdoo.toolkit.plugin.qul.css;

import java.util.ArrayList;
import java.util.List;

public class Css {
    public final List<StyleRule> rules;
    
    public Css() {
        rules = new ArrayList<StyleRule>();
    }
    
    public void add(StyleRule rule) {
        rules.add(rule);
    }
    
    @Override
    public String toString() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        for (StyleRule rule : rules) {
            builder.append(rule.toString());
        }
        return builder.toString();
    }
}
