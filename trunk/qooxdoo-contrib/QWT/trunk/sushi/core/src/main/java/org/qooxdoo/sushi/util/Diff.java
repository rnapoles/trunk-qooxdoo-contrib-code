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

package org.qooxdoo.sushi.util;

import java.util.List;

public class Diff {
    public static String diff(String leftStr, String rightStr) {
        List<String> left;
        List<String> right;
        int li;
        int ri;
        int lmax;
        int rmax;
        int rnext;
        StringBuilder result;
        
        left = Strings.lines(leftStr);
        right = Strings.lines(rightStr);
        li = 0;
        ri = 0;
        lmax = left.size();
        rmax = right.size();
        result = new StringBuilder();
        while (li < lmax || ri < rmax) {
            rnext = li < lmax ? indexOf(right, ri, left.get(li)) : rmax;
            if (rnext == ri) {
                li++;
                ri++;
            } else if (rnext == -1) {
                result.append("- " + left.get(li++));
            } else {
                for ( ; ri < rnext; ri++) {
                    result.append("+ " + right.get(ri));
                }
            }
        }
        return result.toString();
    }
    
    private static int indexOf(List<String> all, int ofs, String str) {
        int max;

        max = all.size();
        for (int i = ofs; i < max; i++) {
            if (str.equals(all.get(i))) {
                return i;
            }
        }
        return -1;
    }
}
