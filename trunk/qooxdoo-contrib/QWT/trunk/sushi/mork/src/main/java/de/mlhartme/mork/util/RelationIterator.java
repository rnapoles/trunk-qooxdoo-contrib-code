// §{header}:
// 
// This is file src/de/mlhartme/mork/util/RelationIterator.java,
// Mork version 0.6  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

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
