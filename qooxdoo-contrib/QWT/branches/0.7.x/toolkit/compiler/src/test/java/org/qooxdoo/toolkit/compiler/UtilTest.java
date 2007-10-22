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

package org.qooxdoo.toolkit.compiler;

import org.junit.Test;
import static org.junit.Assert.*;

public class UtilTest {
    @Test
    public void escape() {
        check("");
        check("\n");
        check("abc");
        check("/* */");
        check("/** */");
        check("/** #post foo*/");
        check("// #post foo");
        check("<tag/>");
        check("@foo @bar");
    }
    
    private void check(String str) {
        String escaped;
        
        escaped = Util.annotationEscape(str);
        assertEquals(str, Util.annotationUnescape(escaped));
    }
}
