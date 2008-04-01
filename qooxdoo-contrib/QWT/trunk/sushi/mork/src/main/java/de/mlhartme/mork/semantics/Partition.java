// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Partition.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.Relation;
import de.mlhartme.mork.util.RelationIterator;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * Helper class for OagBuilder
 */
public class Partition {
    public static List[] createA(Set synthesized, Set inherited, Relation ids_x)
        throws GenericException
    {
        Relation closure;
        List done;
        List partitions;
        List[] result;
        int all;
        int initialSize;

        closure = new Relation();
        closure.addAll(ids_x);

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

    private static List extractStep(Collection lefts, Collection rights, Relation relation) {
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
        Collection leftCollection, Relation relation, Collection rightCollection)
    {
        List disconnected;
        Iterator iter;
        Object left;
        RelationIterator relationIter;

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
