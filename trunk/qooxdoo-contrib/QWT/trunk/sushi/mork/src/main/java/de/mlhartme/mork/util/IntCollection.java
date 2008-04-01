// §{header}:
// 
// This is file src/de/mlhartme/mork/util/IntCollection.java,
// Mork version 0.6  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.util;

/**
 * This interface is quite incomplete, I add methods as necessary.
 */

public interface IntCollection {
    void add(int ele);
    int remove(int ele);
    void clear();
    boolean contains(int ele);
    int size();
    int[] toArray();
}
