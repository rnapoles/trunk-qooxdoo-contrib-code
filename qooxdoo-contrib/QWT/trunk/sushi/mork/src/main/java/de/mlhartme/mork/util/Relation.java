// �{header}:
// 
// This is file src/de/mlhartme/mork/util/Relation.java,
// Mork version 0.6  Copyright � 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// �.

package de.mlhartme.mork.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

/**
 * Set of pairs of objects. Method names follow the Set interface (which cannot be implemented
 * because, e.g., the add methods takes two arguments.
 */
public class Relation {
    /** domain objexts */
    private List leftList;

    /** List of List of image objects, corresponding indexes with leftList */
    private List rightsList;

    public Relation() {
        leftList = new ArrayList();
        rightsList = new ArrayList();
    }

    public void addDomain(Collection col) {
        col.addAll(leftList);
    }

    public void addImage(Collection col) {
        int i;
        int max;

        max = rightsList.size();
        for (i = 0; i < max; i++) {
            col.addAll((List) rightsList.get(i));
        }
    }

    public int count() {
        int i;
        int max;
        int count;

        max = rightsList.size();
        count = 0;
        for (i = 0; i < max; i++) {
            count += ((List) rightsList.get(i)).size();
        }
        return count;
    }

    public boolean contains(Object left, Object right) {
        int i;
        List lst;

        i = leftList.indexOf(left);
        if (i == -1) {
            return false;
        }
        lst = (List) rightsList.get(i);
        return lst.indexOf(right) != -1;
    }

    /**
     * @return true for new elements
     */
    public boolean add(Object left, Object right) {
        int i;
        List lst;

        i = leftList.indexOf(left);
        if (i == -1) {
            leftList.add(left);
            lst = new ArrayList();
            lst.add(right);
            rightsList.add(lst);
            return true;
        }
        lst = (List) rightsList.get(i);
        if (lst.indexOf(right) == -1) {
            lst.add(right);
            return true;
        }
        return false;
    }

    /**
     * @return true if this Relation has been modified
     */
    public boolean addAll(Relation toAdd) {
        int i;
        int max;
        boolean modified;

        modified = false;
        max = toAdd.leftList.size();
        for (i = 0; i < max; i++) {
            if (addSpecial(toAdd.leftList.get(i), (List) toAdd.rightsList.get(i))) {
                modified = true;
            }
        }
        return modified;
    }

    public int getLeftSize() {
        return leftList.size();
    }

    public Object getLeft(int left) {
        return leftList.get(left);
    }

    public int getRightSize(int left) {
        return ((List) rightsList.get(left)).size();
    }

    public Object getRight(int left, int right) {
        return ((List) rightsList.get(left)).get(right);
    }

    public void closure() {
        int i;
        int j;
        List lst;
        Object left;
        Object right;
        int idx;
        boolean modified;

        // iteration is backwards to make sure that new elements don't confuse the algorithm
        do {
            modified = false;
            for (i = leftList.size() - 1; i >= 0; i--) {
                left = leftList.get(i);
                lst = (List) rightsList.get(i);
                for (j = lst.size() - 1; j >= 0; j--) {
                    right = lst.get(j);
                    idx = leftList.indexOf(right);
                    if (idx != -1) {
                        if (addSpecial(left, (List) rightsList.get(idx))) {
                            modified = true;
                        }
                    }
                }
            }
        } while (modified);
    }

    private boolean addSpecial(Object left, List rights) {
        int i;
        int max;
        boolean modified;
        Object right;
        List currentRightsList;
        int idx;

        idx = leftList.indexOf(left);
        if (idx == -1) {
            leftList.add(left);
            rightsList.add(new ArrayList(rights));
            return true;
        } else {
            modified = false;
            currentRightsList = (List) rightsList.get(idx);
            max = rights.size();
            for (i = 0; i < max; i++) {
                right = rights.get(i);
                if (currentRightsList.indexOf(right) == -1) {
                    currentRightsList.add(right);
                    modified = true;
                }
            }
            return modified;
        }
    }


    /**
     * @return null to indicate a cyclic dependency
     */
    public List sort(List all) {
        List unsorted;
        List sorted;
        List current;
        int size;

        unsorted = new ArrayList(all);
        sorted = new ArrayList();
        size = all.size();
        while (sorted.size() < size) {
            current = getNext(sorted, unsorted);
            if (current.size() == 0) {
                return null; // cyclic dependency
            }
            sorted.addAll(current);
            unsorted.removeAll(current);
        }
        return sorted;
    }

    private List getNext(List leftCollection, Collection rightCollection) {
        List current;
        Iterator iter;
        Object right;
        RelationIterator relationIter;

        current = new ArrayList();
        iter = rightCollection.iterator();
        while (iter.hasNext()) {
            right = iter.next();
            relationIter = iterate();
            while (relationIter.step()) {
                if (relationIter.right().equals(right)) {
                    if (relationIter.left().equals(right)) {
                        // reflective element, do nothing
                    } else {
                        if (!leftCollection.contains(relationIter.left())) {
                            relationIter = null;
                            break;
                        }
                    }
                }
            }
            if (relationIter != null) {
                current.add(right);
            }
        }
        Util.reverse(current);  // TODO
        return current;
    }

    public RelationIterator iterate() {
        return new RelationIterator(this);
    }

    public String toString() {
        StringBuilder result;
        RelationIterator iter;
        boolean first;

        result = new StringBuilder();
        result.append("{ ");
        iter = iterate();
        first = true;
        while (iter.step()) {
            if (!first) {
                result.append(", ");
                first = false;
            }
            result.append('(');
            result.append(iter.left().toString());
            result.append(',');
            result.append(iter.right().toString());
            result.append(')');
        }
        result.append(" }");
        return result.toString();
    }
}
