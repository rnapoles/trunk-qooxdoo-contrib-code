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

package org.qooxdoo.toolkit.plugin.qul.css;

import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.qul.Loader;

public class Ruleset {
    private final Selector[] selectors;
    private final Declaration[] declarations;
    
    public Ruleset(Selector[] selectors, Declaration[] declarations) {
        this.selectors = selectors;
        this.declarations = declarations;
    }
    
    public boolean matches(String element) {
        for (Selector selector : selectors) {
            if (selector.matches(element)) {
                return true;
            }
        }
        return false;
    }
    
    public void apply(Clazz clazz, String v, Loader dest) {
        for (Declaration declaration : declarations) {
            declaration.apply(clazz, v, dest);
        }
    }
}
