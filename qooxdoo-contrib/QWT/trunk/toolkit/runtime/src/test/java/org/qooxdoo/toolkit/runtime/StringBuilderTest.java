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

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;


public class StringBuilderTest extends Base2 {
    @Test
    public void empty() {
        expr("new StringBuilder().toString()", ANY, "",
             "typeof x === 'string'"
             );
    }

    @Test
    public void constructor() {
        expr("new StringBuilder(\"foo\").toString()", ANY, "foo",
             "typeof x === 'string'"
             );
    }

    @Test
    public void chars() {
        expr("new StringBuilder().append('a').append('b').toString()", ANY, "ab");
    }

    @Test
    public void string() {
        expr("new StringBuilder().append(\"foo\").append(\"bar\").toString()", ANY, "foobar",
             "typeof x === 'string'"
             );
    }
}
