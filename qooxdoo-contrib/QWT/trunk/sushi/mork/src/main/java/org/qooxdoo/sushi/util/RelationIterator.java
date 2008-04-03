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

package de.mlhartme.mork.util;


public class RelationIterator {
    private final Relation relation;
    private int leftIdx;
    private int rightIdx;
    private Object left;
    private Object right;

    public RelationIterator(Relation relation) {
        this.relation = relation;
        this.leftIdx = 0;
        this.rightIdx = 0;
        this.left = null;
        this.right = null;
    }

    public boolean hasNext() {
        return (leftIdx < relation.getLeftSize()) && (rightIdx < relation.getRightSize(leftIdx));
    }

    public void next() {
        left = relation.getLeft(leftIdx);
        right = relation.getRight(leftIdx, rightIdx);
        rightIdx++;
        if (rightIdx >= relation.getRightSize(leftIdx)) {
            leftIdx++;
            rightIdx = 0;
        }
    }
    public boolean step() {
        if (hasNext()) {
            next();
            return true;
        } else {
            return false;
        }
    }

    public Object left() {
        return left;
    }

    public Object right() {
        return right;
    }
}
