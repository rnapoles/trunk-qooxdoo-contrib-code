/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package java.util;

public interface Collection<T> extends Iterable<T> {
    int size();
    boolean isEmpty();
    Iterator<T> iterator();
    void add(T obj);
    void addAll(Collection<? extends T> collection);
    boolean remove(T obj);
    void clear();
}
