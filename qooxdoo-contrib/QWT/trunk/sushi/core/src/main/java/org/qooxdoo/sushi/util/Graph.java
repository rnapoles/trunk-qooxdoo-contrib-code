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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

/**
 * Set of pairs of objects. Method names follow the Set interface (which cannot be implemented
 * because, e.g., the add methods takes two arguments.
 */
public class Graph<T> {
    /** domain objects */
    private List<T> leftList;

    /** List of List of image objects, corresponding indexes with leftList */
    private List<List<T>> rightsList;

    public Graph() {
        leftList = new ArrayList<T>();
        rightsList = new ArrayList<List<T>>();
    }

    public void addDomain(Collection<T> col) {
        col.addAll(leftList);
    }

    public void addImage(Collection<T> col) {
        int i;
        int max;

        max = rightsList.size();
        for (i = 0; i < max; i++) {
            col.addAll(rightsList.get(i));
        }
    }

    public int count() {
        int i;
        int max;
        int count;

        max = rightsList.size();
        count = 0;
        for (i = 0; i < max; i++) {
            count += rightsList.get(i).size();
        }
        return count;
    }

    public boolean contains(Object left, Object right) {
        int i;
        List<T> lst;

        i = leftList.indexOf(left);
        if (i == -1) {
            return false;
        }
        lst = rightsList.get(i);
        return lst.indexOf(right) != -1;
    }

    /**
     * @return true for new elements
     */
    public boolean edge(T left, T right) {
        int i;
        List<T> lst;

        i = leftList.indexOf(left);
        if (i == -1) {
            leftList.add(left);
            lst = new ArrayList<T>();
            lst.add(right);
            rightsList.add(lst);
            return true;
        }
        lst = rightsList.get(i);
        if (lst.indexOf(right) == -1) {
            lst.add(right);
            return true;
        }
        return false;
    }

    /**
     * @return true if this Relation has been modified
     */
    public boolean addAll(Graph<T> toAdd) {
        int i;
        int max;
        boolean modified;

        modified = false;
        max = toAdd.leftList.size();
        for (i = 0; i < max; i++) {
            if (addSpecial(toAdd.leftList.get(i), toAdd.rightsList.get(i))) {
                modified = true;
            }
        }
        return modified;
    }

    public int size() {
        return leftList.size();
    }

    protected Object getLeft(int left) {
        return leftList.get(left);
    }

    protected int getRightSize(int left) {
        return rightsList.get(left).size();
    }

    protected Object getRight(int left, int right) {
        return rightsList.get(left).get(right);
    }

    public void closure() {
        int i;
        int j;
        List<T> lst;
        T left;
        T right;
        int idx;
        boolean modified;

        // iteration is backwards to make sure that new elements don't confuse the algorithm
        do {
            modified = false;
            for (i = leftList.size() - 1; i >= 0; i--) {
                left = leftList.get(i);
                lst = rightsList.get(i);
                for (j = lst.size() - 1; j >= 0; j--) {
                    right = lst.get(j);
                    idx = leftList.indexOf(right);
                    if (idx != -1) {
                        if (addSpecial(left, rightsList.get(idx))) {
                            modified = true;
                        }
                    }
                }
            }
        } while (modified);
    }

    private boolean addSpecial(T left, List<T> rights) {
        int i;
        int max;
        boolean modified;
        T right;
        List<T> currentRightsList;
        int idx;

        idx = leftList.indexOf(left);
        if (idx == -1) {
            leftList.add(left);
            rightsList.add(new ArrayList<T>(rights));
            return true;
        } else {
            modified = false;
            currentRightsList = rightsList.get(idx);
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
    public List<T> sort(List<T> all) {
        List<T> unsorted;
        List<T> sorted;
        List<T> current;
        int size;

        unsorted = new ArrayList<T>(all);
        sorted = new ArrayList<T>();
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

    private List<T> getNext(List<T> leftCollection, Collection<T> rightCollection) {
        List<T> current;
        Iterator<T> iter;
        T right;
        GraphIterator<T> relationIter;

        current = new ArrayList<T>();
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

        return current;
    }

    public GraphIterator<T> iterate() {
        return new GraphIterator<T>(this);
    }

    @Override
    public String toString() {
        StringBuilder result;
        GraphIterator<T> iter;
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
