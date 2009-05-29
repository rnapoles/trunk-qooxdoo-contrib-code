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

package org.qooxdoo.sushi.fs;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class SettingsTest {
    @Test(expected=IllegalArgumentException.class)
    public void invalidEncoding() {
         new Settings("nosuchencoding");
    }

    @Test
    public void encoding() {
        encode("");
        encode("abc");
        encode("\u0000\u0001");
    }

    private void encode(String str) {
        Settings settings;
        
        settings = new Settings();
        assertEquals(str, settings.string(settings.bytes(str)));
    }
}
