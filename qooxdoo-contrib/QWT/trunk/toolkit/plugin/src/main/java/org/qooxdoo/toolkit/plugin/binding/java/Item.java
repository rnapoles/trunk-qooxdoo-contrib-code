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

package org.qooxdoo.toolkit.plugin.binding.java;

import java.io.Serializable;

public abstract class Item implements Serializable {
    private final String description;
    private String extra;
    
    public Item(String description) {
        this.description = description;
        this.extra = null;
    }
    
    public String getDescription() {
        return description;
    }

    public String getExtra() {
        return extra;
    }
    
    public void setExtra(String extra) {
        this.extra = extra;
    }
    
    public static String concat(String left, String right) {
        if (left == null) {
            return right; 
        }
        if (right == null) {
            return left;
        }
        left = left.trim();
        right = right.trim();
        if (left.endsWith(".")) {
            return left + " " + right;
        } else {
            return left + ". " + right;
        }
    }

    public String comment(boolean indent) {
        StringBuilder builder;
        
        if (description == null && extra == null) {
            return "";
        }
        builder = new StringBuilder();
        line(indent, "/**", "", builder);
        line(indent, " * ", description, builder);
        line(indent, " * ", extra, builder);
        moreExtra(builder);
        line(indent, " */", "", builder);
        return builder.toString();
    }
    
    protected void moreExtra(StringBuilder builder) {
    }

    private void line(boolean indent, String start, String content, StringBuilder dest) {
        if (content != null) {
            if (indent) {
                dest.append("    ");
            }
            dest.append(start).append(content).append('\n');
        }
    }
}
