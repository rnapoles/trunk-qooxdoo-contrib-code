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

package org.qooxdoo.sushi.metadata.store;

import java.util.List;

import org.qooxdoo.sushi.metadata.Item;

public interface Store {
    void write(List<Item<?>> parents, String path, String value) throws Exception;
    
    /** @return null if not found */ 
    String read(List<Item<?>> parents, String path) throws Exception;
}
