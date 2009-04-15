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

import java.util.ArrayList;
import java.util.List;

public class Diff {
    public static String diff(String leftStr, String rightStr) {
        return diff(Strings.lines(leftStr), Strings.lines(rightStr));
    }

    public static String diff(List<String> left, List<String> right) {
        List<Chunk> chunks;
        StringBuilder result;
        
        chunks = diff(left, Lcs.compute(left, right), right);
        result = new StringBuilder();
        for (Chunk chunk : chunks) {
            if (chunk.delete > 0) {
                for (int i = chunk.left; i < chunk.left + chunk.delete; i++) {
                    result.append("- " + left.get(i));
                }
            }
            if (chunk.add.size() > 0) {
                for (String line : chunk.add) {
                    result.append("+ ").append(line);
                }
            }
        }
        return result.toString();
    }
    
    public static List<Chunk> diff(List<String> left, List<String> commons, List<String> right) {
        Chunk chunk;
        List<Chunk> result;
        int li;
        int ri;
        int lmax;
        int rmax;
        String common;
        
        result = new ArrayList<Chunk>();
        lmax = left.size();
        rmax = right.size();
        li = 0;
        ri = 0;
        for (int ci = 0; ci <= commons.size(); ci++) {
            common = ci < commons.size() ? commons.get(ci) : null;
            if (li < lmax && !left.get(li).equals(common)) {
                chunk = new Chunk(li, ri);
                result.add(chunk);
                do {
                    li++;
                } while (li < lmax && !left.get(li).equals(common));
                chunk.delete = li - chunk.left; 
            } else {
                // definite assignment
                chunk = null;
            }
            if (ri < rmax && !right.get(ri).equals(common)) {
                if (chunk == null) {
                    chunk = new Chunk(li, ri);
                    result.add(chunk);
                }
                do {
                    chunk.add.add(right.get(ri++));
                } while (ri < rmax && !right.get(ri).equals(common));
            }
            li++;
            ri++;
        }
        return result;
    }

    private static class Chunk {
        public final int left;
        public final int right;
        public int delete;
        public final List<String> add;
        
        public Chunk(int left, int right) {
            this.left = left;
            this.right = right;
            this.add = new ArrayList<String>();
        }
    }
}
