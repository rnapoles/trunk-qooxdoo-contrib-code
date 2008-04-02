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

package org.qooxdoo.toolkit.compiler;

import org.junit.Test;
import static org.junit.Assert.*;

public class NamingTest {
    @Test
    public void strip() {
        strip("", "");
        strip("a", "a");
        strip("foo", "foo");
        strip("Foo.bar", "Foo.bar<T>");
        strip("Map", "Map<A, b>");
        strip("Map", "Map<<A>,<<B>>>");
        strip("java.util.AbstractList.Itr", "java.util.AbstractList<T>.Itr");
        strip("a.b.c", "a<X>.b<Y>.c<T,U>");
    }

    private void strip(String expected, String name) {
        assertEquals(expected, Naming.stripTypeParameter(name));
    }
}
