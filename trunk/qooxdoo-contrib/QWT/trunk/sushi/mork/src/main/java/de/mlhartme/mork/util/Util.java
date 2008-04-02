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

package de.mlhartme.mork.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Misc static utility methods.
 */
public class Util {
    public static File absoluteFile(File dir, String fileName) {
        File file;

        file = new File(fileName);
        if (file.isAbsolute()) {
            return file;
        }
        return new File(dir, fileName);
    }

    public static String[] split(String str, char c) {
        List lst;
        int idx;
        int prev;
        String[] ar;

        lst = new ArrayList();
        idx = str.indexOf(c);
        prev = 0;
        while (idx != -1) {
            lst.add(str.substring(prev, idx));
            prev = idx + 1;
            idx = str.indexOf(c, prev);
        }
        lst.add(str.substring(prev));
        ar = new String[lst.size()];
        lst.toArray(ar);
        return ar;
    }

    public static void reverse(List lst) {
        int i;
        int last;
        int half;
        Object swap;

        last = lst.size();
        // dividing by 2 skips the middle object in lists with an odd number of arguments
        half = last / 2;
        last--;
        for (i = 0; i < half; i++) {
            swap = lst.get(i);
            lst.set(i, lst.get(last - i));
            lst.set(last - i, swap);
        }
    }

    public static int find(List[] as, Object a) {
        int i;
        int j;
        int max;
        List current;

        for (i = 0; i < as.length; i++) {
            current = as[i];
            max = current.size();
            for (j = 0; j < max; j++) {
                if (current.get(j) == a) {
                    return i;
                }
            }
        }
        return -1;
    }

}
