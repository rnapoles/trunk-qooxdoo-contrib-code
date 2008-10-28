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

package org.qooxdoo.sushi.util;


public class EdgeIterator<T> {
    private final Graph<T> relation;
    private int leftIdx;
    private int rightIdx;
    private Object left;
    private Object right;

    public EdgeIterator(Graph<T> relation) {
        this.relation = relation;
        this.leftIdx = 0;
        this.rightIdx = 0;
        this.left = null;
        this.right = null;
    }

    public boolean step() {
        if (leftIdx >= relation.getDomainSize() || rightIdx >= relation.getRightSize(leftIdx)) {
            return false;
        }
        left = relation.getLeft(leftIdx);
        right = relation.getRight(leftIdx, rightIdx);
        rightIdx++;
        if (rightIdx >= relation.getRightSize(leftIdx)) {
            leftIdx++;
            rightIdx = 0;
        }
        return true;
    }

    public Object left() {
        return left;
    }

    public Object right() {
        return right;
    }
}
