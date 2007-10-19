/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.plugin.binding.java;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.Strings;

public class GroupType implements Type {
    public static GroupType parse(String group) {
        GroupType result;
        
        result = new GroupType();
        for (String str : Strings.split(",", group)) {
            str = str.trim();
            if (!str.startsWith("\"")) {
                throw new IllegalArgumentException(str);
            }
            if (!str.endsWith("\"")) {
                throw new IllegalArgumentException(str);
            }
            result.items.add(str.substring(1, str.length() - 1));
        }
        return result;
    }

    public final List<String> items;
    
    public GroupType() {
        this.items = new ArrayList<String>();
    }

    public String getJavaName() {
        return "Object";
    }
    
    @Override
    public String toString() {
        return items.toString();
    }
}
