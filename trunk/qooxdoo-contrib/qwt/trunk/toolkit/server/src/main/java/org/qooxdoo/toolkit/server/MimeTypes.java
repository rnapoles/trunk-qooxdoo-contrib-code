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

package org.qooxdoo.toolkit.server;

import java.util.HashMap;
import java.util.Map;

import org.qooxdoo.sushi.io.Node;

public class MimeTypes {
    public static MimeTypes create() {
        MimeTypes result;
        
        result = new MimeTypes();
        result.add("xml", "text/xml");
        result.add("html", "text/html");
        result.add("gif", "image/gif");
        result.add("png", "image/png");
        return result;
    }
    //--
    
    private final Map<String, String> map;

    public MimeTypes() {
        map = new HashMap<String, String>();
    }

    public void add(String ext, String type) {
        if (map.containsKey(ext)) {
            throw new IllegalArgumentException(ext);
        }
        map.put(ext, type);
    }
    
    public String get(Node node) {
        return get(node.getPath());
    }
    
    public String get(String path) {
        String ext;
        String type;
        
        ext = path.substring(path.lastIndexOf('.') + 1); // ok for -1
        type = map.get(ext);
        if (type == null) {
            throw new IllegalArgumentException(path);
        }
        return type;
    }
}
