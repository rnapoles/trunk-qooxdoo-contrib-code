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
}
