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

package org.qooxdoo.sushi.metadata;

public class Cardinality {
    public static final Cardinality OPTION = new Cardinality(0, 1);
    public static final Cardinality VALUE = new Cardinality(1, 1);
    public static final Cardinality SEQUENCE = new Cardinality(0, Integer.MAX_VALUE);
    
    public final int min;
    public final int max;

    private Cardinality(int min, int max) {
        this.min = min;
        this.max = max;
    }
    
    public boolean isOptional() {
        return min == 0;
    }
    
    public boolean isUnbounded() {
        return max == Integer.MAX_VALUE;
    }
    
    public String forSchema() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        if (min != 1) {
            builder.append(" minOccurs='");
            builder.append(min);
            builder.append("'");
        }
        if (isUnbounded()) {
            builder.append(" maxOccurs='unbounded'");
        } else if (max != 1) {
            builder.append(" '");
            builder.append(max);
            builder.append("'");
        }
        return builder.toString();
    }
}
