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

package org.qooxdoo.sushi.semantics;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.util.Graph;
import org.qooxdoo.sushi.util.EdgeIterator;

/**
 * Helper class for OagBuilder
 */
public class Partition {
    public static List[] createA(Set synthesized, Set inherited, Graph idsX) throws GenericException {
        Graph closure;
        List done;
        List partitions;
        List[] result;
        int all;
        int initialSize;

        closure = new Graph();
        closure.graph(idsX);

        partitions = new ArrayList();
        done = new ArrayList();
        all = inherited.size() + synthesized.size();
        while (done.size() < all) {
            initialSize = done.size();
            partitions.add(extractStep(synthesized, done, closure));
            if (done.size() == all) {
                break;
            }
            partitions.add(extractStep(inherited, done, closure));
            if (initialSize == done.size()) {
                throw new GenericException("cyclic dependency");
            }
        }
        result = new List[partitions.size()];
        partitions.toArray(result);
        return result;
    }

    private static List extractStep(Collection lefts, Collection rights, Graph relation) {
        List current;
        List all;

        all = new ArrayList();
        while (true) { // loop is required because dependencies into the same parition are allowed
            current = getDisconnected(lefts, relation, rights);
            if (current.size() == 0) {
                return all;
            }
            lefts.removeAll(current);
            rights.addAll(current);
            all.addAll(current);
        }
    }

    /**
     * Returns all objects from leftCollection whole images are a disjoin from rightCollection,
     * none of the resulting objects has an image in rightCollection. Compares objects using ==.
     * Note that lefts with no image show up in the result.
     */
    public static List getDisconnected(
        Collection leftCollection, Graph relation, Collection rightCollection)
    {
        List disconnected;
        Iterator iter;
        Object left;
        EdgeIterator relationIter;

        disconnected = new ArrayList();
        iter = leftCollection.iterator();
        while (iter.hasNext()) {
            left = iter.next();
            relationIter = relation.iterate();
            while (relationIter.step()) {
                if (relationIter.left() == left) {
                    if (!rightCollection.contains(relationIter.right())) {
                        relationIter = null;
                        break;
                    }
                }
            }
            if (relationIter != null) {
                disconnected.add(left);
            }
        }
        return disconnected;
    }
}
