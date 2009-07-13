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

package org.qooxdoo.sushi.fs.filter;

import java.io.IOException;
import java.util.Collection;

import org.qooxdoo.sushi.fs.Node;

public class CollectAction implements Action {
    private final Collection<Node> collection;
    
    public CollectAction(Collection<Node> collection) {
        this.collection = collection;
    }
    
    public void enter(Node node) {
    }

    public void enterFailed(Node node, IOException e) throws IOException {
        throw e;
    }

    public void leave(Node node) {
    }
    
    public void select(Node node) {
        collection.add(node);
    }
}
