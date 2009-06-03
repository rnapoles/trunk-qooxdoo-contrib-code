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

package org.qooxdoo.sushi.metadata;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class ItemTest {
    @Test
    public void name() {
        name("", "");
        name("abc", "abc");
        name("A", "A");
        name("foo-bar", "fooBar");
    }
    
    private void name(String expected, String name) {
        assertEquals(expected, Item.xmlName(name));
    }
}
