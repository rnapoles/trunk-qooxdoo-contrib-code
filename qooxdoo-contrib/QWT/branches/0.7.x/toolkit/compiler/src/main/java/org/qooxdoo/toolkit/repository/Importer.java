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

package org.qooxdoo.toolkit.repository;

import java.util.ArrayList;
import java.util.List;

/** Qooxdoo annotations. */
public class Importer {
    public final String content;

    public Importer(String content) {
        this.content = content;
    }

    public void require(List<String> result) {
        parse("#require", result);
    }
    public void post(List<String> result) {
        parse("#post", result);
    }

    public String base() {
        List<String> lst;
        int idx;
        String extend;

        lst = new ArrayList<String>();
        parse(".extend", lst);
        switch(lst.size()) {
        case 0:
            return null;
        case 1:
            extend = lst.get(0);
            idx = extend.indexOf(',');
            if (idx == -1) {
                throw new ImportException("missing ," + extend);
            }
            extend = extend.substring(0, idx).trim();
            return "Object".equals(extend)? null : extend;
        default:
            throw new ImportException("extend ambiguous");
        }
    }
    
    public void parse(String key, List<String> result) {
        int idx;
        int keyLength;
        int open;
        int close;

        keyLength = key.length();
        idx = content.indexOf(key);
        while (idx != -1) {
            open = idx + keyLength;
            while (open < content.length() && Character.isWhitespace(content.charAt(open))) {
                open++;
            }
            if (open == content.length()) {
                break;
            }
            if (content.charAt(open) != '(') {
                idx = content.indexOf(key, open);
                continue;
            }
            close = content.indexOf(')', open);
            if (close == -1) {
                throw new ImportException("missing ')': " + content.substring(open));
            }
            result.add(content.substring(open + 1, close));
            idx = content.indexOf(key, close);
        }
    }
}
