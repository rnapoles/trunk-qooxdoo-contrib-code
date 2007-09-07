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

public class HashSet<T> implements Set<T> {
    private static final int CHUNK = 32; 
    private T[] data;
    private int used;
    
    public HashSet() {
        this(CHUNK);
    }
    
    public HashSet(int initialSize) {
        this((T[]) new Object[initialSize], 0);
    }
    
    private HashSet(T[] data, int used) {
        this.data = data;
        this.used = used;
    }

    public void add(T obj) {
        int idx;
        T current;

        grow(used + 1);
        idx = hashCode(obj);
        while (true) {
            current = data[idx];
            if (current == null) {
                data[idx] = obj;
                used++;
                return;
            } else if (obj.equals(current)) {
                return;
            } else {
                idx = (idx + 1) % data.length;
            }
        }
    }

    public void addAll(Collection<? extends T> collection) {
        for (T obj : collection) {
            add(obj);
        }
    }

    public void clear() {
        for (int i = 0; i < data.length; i++) {
            data[i] = null;
        }
    }

    public boolean isEmpty() {
        return used == 0;
    }

    public Iterator<T> iterator() {
        return new HashSetIterator<T>(data);
    }

    public boolean remove(T obj) {
        int idx;
        
        idx = index(obj);
        if (idx == -1) {
            return false;
        } else {
            data[idx] = null;
            return true;
        }
    }

    public int size() {
        return used;
    }

    //--
    
    private int hashCode(T obj) {
        return obj.hashCode() % data.length;        
    }
    
    private void grow(int minSize) {
        HashSet<T> old;
        int add;
        
        if (minSize > data.length * 3 / 5) {
            old = new HashSet(data, used);
            add = Math.max(CHUNK, data.length * 3 / 2);
            data = (T[]) new Object[Math.max(minSize, add)];
            addAll(old);
        }
    }

    private int index(T obj) {
        int idx;
        T current;
        
        idx = hashCode(obj);
        while (true) {
            current = data[idx];
            if (current == null) {
                return -1;
            } else if (obj.equals(current)) {
                return idx;
            } else {
                idx = idx + 1 % data.length;
            }
        }
    }
    
    public static class HashSetIterator<T> implements Iterator<T> {
        private final T[] data;
        private int ofs;
        
        public HashSetIterator(T[] data) {
            this.data = data;
            skip();
        }

        public boolean hasNext() {
            return ofs < data.length;
        }

        public T next() {
            T result;
            
            result = data[ofs++];
            skip();
            return result;
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }

        private void skip() {
            while (ofs < data.length && data[ofs] == null) {
                ofs++;
            }
        }
    }
}
