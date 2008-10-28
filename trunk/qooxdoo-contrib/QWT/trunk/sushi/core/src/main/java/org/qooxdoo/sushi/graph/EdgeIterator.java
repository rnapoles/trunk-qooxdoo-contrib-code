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

import java.util.Iterator;
import java.util.NoSuchElementException;


public class EdgeIterator<T> {
    private final Iterator<Node<T>> iterator;
    
    // points to the current element
    private Node<T> left;
    private int right;

    public EdgeIterator(Iterator<Node<T>> lefts) {
        this.iterator = lefts;
        this.right = -1;
        next();
    }
    
    public boolean next() {
        if (left == null) {
            throw new NoSuchElementException();
        }
        if (right + 1 < left.starting.size()) {
            right++;
            return true;
        }
        right = 0;
        while (iterator.hasNext()) {
            left = iterator.next();
            if (left.starting.size() > 0) {
                return false;
            }
        }
        return true;
    }
    
    public T left() {
        return left.data;
    }

    public T right() {
        return left.starting.get(right).data;
    }
}
