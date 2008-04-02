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

package java.util;

public interface Map<K, V> {
    int size();
    boolean isEmpty();
    
    boolean containsKey(Object key);
    boolean containsValue(Object value);
    
    V get(K key);
    void put(K key, V value);
    V remove(Object key);
    void clear();
    
    Set<Map.Entry<K, V>> entrySet();
    Set<K> keySet();
    Collection<V> values();
    
    public static interface Entry<K, V> {
        K getKey();
        V getValue();
        V setValue(V value);
    }
}
