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

/** 
 * I cannot use JavaScript Objects as maps because HashMaps support arbitrary keys, Object
 * maps support strings only.
 */
public class HashMap<K, V> implements Map<K, V> {
    private static final int CHUNK = 32;
   
    /** keys at 2n, values at 2n+1, for 0 <= n < size() */
    private Object[] data;
    
    /** number of keys */
    private int used;
    
    public HashMap() {
        this(CHUNK);
    }

    public HashMap(int initialSize) {
        this(new Object[initialSize * 2], 0);
    }

    public HashMap(Object[] data, int used) {
        this.data = data;
        this.used = used;
    }

    public int size() {
        return used;
    }
    
    public boolean isEmpty() {
        return used == 0;
    }

    public V get(K key) {
        int idx;
        K currentKey;
        
        idx = hash(key);
        while (true) {
            currentKey = (K) data[idx];
            if (currentKey == null) {
                return null;
            } else if (key.equals(currentKey)) {
                return (V) data[idx + 1];
            } else {
                idx = hashNext(idx);
            }
        }
    }

    public void put(K key, V value) {
        int idx;
        K currentKey;
        
        grow(used + 1);
        idx = hash(key);
        while (true) {
            currentKey = (K) data[idx];
            if (currentKey == null) {
                data[idx] = key;
                data[idx + 1] = value;
                used++;
                return;
            } else if (key.equals(currentKey)) {
                data[idx + 1] = value;
                return;
            } else {
                idx = hashNext(idx);
            }
        }
    }
    
    public void putAll(Map<? extends K, ? extends V> map) {
        for (Map.Entry<? extends K, ? extends V> entry : map.entrySet()) {
            put(entry.getKey(), entry.getValue());
        }
    }

    public V remove(Object key) {
        int idx;
        K currentKey;
        V currentValue;
        
        grow(used + 1);
        idx = hash(key);
        while (true) {
            currentKey = (K) data[idx];
            if (currentKey == null) {
                return null;
            } else if (key.equals(currentKey)) {
                currentValue = (V) data[idx + 1];
                data[idx] = null;
                data[idx + 1] = null;
                used--;
                return currentValue;
            } else {
                idx = hashNext(idx);
            }
        }
    }

    public void clear() {
        for (int i = 0; i < data.length; i++) {
            data[i] = null;
        }
        used = 0;
    }
    
    public Set<Map.Entry<K, V>> entrySet() {
        return new EntrySet<K, V>(this);
    }

    public boolean containsKey(Object key) {
        return contains(0, key);
    }

    public boolean containsValue(Object value) {
        return contains(1, value);
    }

    private boolean contains(int ofs, Object obj) {
        for (int i = ofs; i < data.length; i += 2) {
            if (obj.equals(data[i])) {
                return true;
            }
        }
        return false;
    }

    public Set<K> keySet() {
        return new DataSet<K>(0, (K[]) data, used);
    }

    public Collection<V> values() {
        return new DataSet<V>(1, (V[]) data, used);
    }

    //--
    
    /** @return index for key */
    private int hash(Object key) {
        return (key.hashCode() % (data.length / 2)) * 2;
    }

    private int hashNext(int prev) {
        return (prev + 2) % data.length;
    }
    
    private void grow(int minSize) {
        HashMap<K, V> old;
        int add;
        
        if (minSize > (data.length / 2) * 3 / 5) {
            old = new HashMap<K, V>(data, used);
            add = Math.max(CHUNK, (data.length / 2) * 3 / 2);
            data = new Object[Math.max(minSize, add) * 2];
            putAll(old);
        }
    }
    
    //--
    
    public static class Entry<K, V> implements Map.Entry<K, V> {
        private final K key;
        private final V value;
        
        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
        
        public V setValue(V value) {
            throw new UnsupportedOperationException();
        }
    }
    
    //--
    
    public static class EntrySet<K, V> implements Set<Map.Entry<K, V>> {
        private final HashMap<K, V> dest;

        public EntrySet(HashMap<K, V> dest) {
            this.dest = dest;
        }

        public void add(java.util.Map.Entry<K, V> obj) {
            dest.put(obj.getKey(), obj.getValue());
        }

        public void addAll(Collection<? extends java.util.Map.Entry<K, V>> collection) {
            for (Map.Entry<K, V> entry : collection) {
                dest.put(entry.getKey(), entry.getValue());
            }
        }

        public void clear() {
            dest.clear();
        }

        public boolean isEmpty() {
            return dest.isEmpty();
        }

        public Iterator<java.util.Map.Entry<K, V>> iterator() {
            return new EntryIterator<K, V>(dest.data);
        }

        public boolean remove(java.util.Map.Entry<K, V> obj) {
            return dest.remove(obj.getKey()) != null;
        }

        public int size() {
            return dest.size();
        }
    }

    public static class EntryIterator<K, V> implements Iterator<Map.Entry<K, V>> {
        private final Object[] data;
        int ofs;

        public EntryIterator(Object[] data) {
            this.data = data;
            skip();
        }

        public boolean hasNext() {
            return ofs < data.length;
        }
        
        public Map.Entry<K, V> next() {
            Entry<K, V> result;
            
            result = new Entry<K, V>((K) data[ofs], (V) data[ofs + 1]);
            ofs += 2;
            skip();
            return result; 
        }
        
        public void remove() {
            throw new UnsupportedOperationException();
        }
        
        private void skip() {
            while (ofs < data.length && data[ofs] == null) {
                ofs += 2;
            }
        }
    }
    
    public static class DataSet<T> implements Set<T> {
        private final T[] data;
        private final int ofs;
        private final int used;
        
        public DataSet(int ofs, T[] data, int used) {
            this.data = data;
            this.ofs = ofs;
            this.used = used;
        }

        public void add(T obj) {
            throw new UnsupportedOperationException();
        }

        public void addAll(Collection<? extends T> collection) {
            throw new UnsupportedOperationException();
        }

        public void clear() {
            throw new UnsupportedOperationException();
        }

        public boolean isEmpty() {
            return used == 0;
        }

        public Iterator<T> iterator() {
            return new DataIterator<T>(data, ofs);
        }

        public boolean remove(T obj) {
            throw new UnsupportedOperationException();
        }

        public int size() {
            return used;
        }
    }

    public static class DataIterator<T> implements Iterator<T> {
        private final Object[] data;
        int ofs;

        public DataIterator(Object[] data, int ofs) {
            this.data = data;
            this.ofs = ofs;
            skip();
        }

        public boolean hasNext() {
            return ofs < data.length;
        }
        
        public T next() {
            T result;
            
            result = (T) data[ofs];
            ofs += 2;
            skip();
            return result; 
        }
        
        public void remove() {
            throw new UnsupportedOperationException();
        }
        
        private void skip() {
            while (ofs < data.length && data[ofs] == null) {
                ofs += 2;
            }
        }
    }
}
