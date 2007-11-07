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

package org.qooxdoo.toolkit.engine;

import org.qooxdoo.sushi.io.Node;

public enum MimeType {
    XML("text/xml"),
    HTML("text/html", true),
    GIF("image/gif"),
    PNG("image/png");

    public final String code;
    public final boolean compressable;
    
    private MimeType(String code) {
        this(code, false);
    }
    private MimeType(String code, boolean compressable) {
        this.code = code;
        this.compressable = compressable;
    }

    public static MimeType get(Node node) {
        return get(node.getPath());
    }

    public static MimeType get(String path) {
        String ext;

        ext = path.substring(path.lastIndexOf('.') + 1).toUpperCase(); // ok for -1
        return MimeType.valueOf(ext);
    }
}
