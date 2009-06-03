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

package org.qooxdoo.sushi.graph;

import java.util.ArrayList;
import java.util.Iterator;


public class EdgeIterator<T> {
    /** points behind the current  to the next candidate */
    private final Iterator<Node<T>> lefts;
    private Iterator<Node<T>> rights;

    private T left;
    private T right;
    
    public EdgeIterator(Iterator<Node<T>> lefts) {
        this.lefts = lefts;
        this.rights = null;
    }
    
    public boolean step() {
        Node<T> tmp;
        
        if (rights != null && rights.hasNext()) {
            right = rights.next().data;
            return true;
        } 
        while (lefts.hasNext()) {
            tmp = lefts.next();
            if (tmp.starting.size() > 0) {
                left = tmp.data;
                // TODO
                rights = new ArrayList<Node<T>>(tmp.starting).iterator();
                right = rights.next().data;
                return true;
            }
        }
        return false;
    }

    /** undefined without previously calling step() */
    public T left() {
        return left;
    }

    /** undefined without previously calling step() */
    public T right() {
        return right;
    }
}
