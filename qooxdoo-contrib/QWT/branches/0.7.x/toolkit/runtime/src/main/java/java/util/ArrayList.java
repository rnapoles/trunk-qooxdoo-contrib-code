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

public class ArrayList<T> implements List<T> {
    private static final int CHUNK = 16;
    
    private T[] data;
    private int used;
    
    public ArrayList() {
        this(CHUNK);
    }

    public ArrayList(int initialSize) {
        data = (T[]) new Object[initialSize];
        used = 0;
    }
    
    public T get(int idx) {
        return data[idx];
    }

    public void set(int idx, T obj) {
        data[idx] = obj;
    }
    
    public void add(T obj) {
        if (used == data.length) {
            ensureCapacity(used + CHUNK);
        }
        data[used++] = obj;
    }

    public void addAll(Collection<? extends T> collection) {
        ensureCapacity(used + collection.size());
        for (T obj : collection) {
            data[used++] = obj;
        }
    }

    public boolean isEmpty() {
        return used == 0;
    }

    public int indexOf(Object obj) {
        for (int i = 0; i < used; i++) {
            if (data[i].equals(obj)) {
                return i;
            }
        }
        return -1;
    }

    public int lastIndexOf(Object obj) {
        for (int i = used - 1; i >= 0; i--) {
            if (data[i].equals(obj)) {
                return i;
            }
        }
        return -1;
    }

    public Iterator<T> iterator() {
        return new ArrayListIterator<T>(this);
    }

    public boolean contains(T obj) {
        return index(obj) != -1;
    }

    public T remove(int idx) {
        T result;
        
        result = data[idx];
        System.arraycopy(data, idx + 1, data, idx, used - (idx + 1));
        used--;
        return result;
    }

    public boolean remove(T obj) {
        int idx;
        
        idx = index(obj);
        if (idx == -1) {
            return false;
        } else {
            remove(idx);
            return true;
        }
    }
    
    public void clear() {
        used = 0;
    }

    public int size() {
        return used;
    }
    
    @Override
    public int hashCode() {
        return used;
    }
    
    @Override
    public boolean equals(Object obj) {
        Collection<? extends T> c;
        int idx;
        
        if (obj instanceof Collection) {
            c = (Collection) obj;
            if (c.size() != size()) {
                return false;
            }
            idx = 0;
            for (T ele : c) {
                if (!data[idx].equals(ele)) {
                    return false;
                }
            }
            return true;
        } 
        return false;
    }
    
    //--
    
    private static class ArrayListIterator<T> implements Iterator<T> {
        private final ArrayList<T> dest;
        private int pos;

        ArrayListIterator(ArrayList<T> dest) {
            this.dest = dest;
            this.pos = 0;
        }

        public boolean hasNext() {
            return pos < dest.size();
        }

        public T next() {
            return dest.get(pos++);
        }

        public void remove() {
            pos--;
            dest.remove(pos);
        }
    }
    
    //--
    
    private int index(T obj) {
        for (int i = 0; i < used; i++) {
            if (data[i].equals(obj)) {
                return i;
            }
        }
        return -1;
    }
    
    private void ensureCapacity(int newSize) {
        T[] newData;

        if (newSize > used) {
            newData = (T[]) new Object[newSize];
            System.arraycopy(data, 0, newData, 0, used);
            data = newData;
        }
    }
}
