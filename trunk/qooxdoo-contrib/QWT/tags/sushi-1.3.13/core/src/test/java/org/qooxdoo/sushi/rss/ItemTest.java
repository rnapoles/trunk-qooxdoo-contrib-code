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

package org.qooxdoo.sushi.rss;

import java.text.ParseException;

import junit.framework.TestCase;

public class ItemTest extends TestCase {
    public void testDate() throws ParseException {
        Item.FORMAT.parse("Tue, 27 Jun 2006 09:49:09 +0200");
    }
}
