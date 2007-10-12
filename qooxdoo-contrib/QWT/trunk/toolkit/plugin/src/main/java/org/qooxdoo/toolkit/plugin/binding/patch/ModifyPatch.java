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

package org.qooxdoo.toolkit.plugin.binding.patch;

public class ModifyPatch implements Patch {
    private final String from;
    private final String to;
    
    public ModifyPatch(String from, String to) {
        this.from = from;
        this.to = to;
    }
    
    public void apply(StringBuilder clazz) {
        int idx;
        
        idx = clazz.indexOf(from);
        if (idx == -1) {
            throw new PatchException("'" + from + "' not found");
        }
        if (clazz.indexOf(from, idx + 1) != -1) {
            throw new PatchException("'" + from + "' ambiguous");
        }
        clazz.replace(idx, idx + from.length(), to);
    }
}
