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

package java.lang;

/** TODO: toString is very expensive */
public class StringBuilder implements Appendable, CharSequence {
    private static final int CHUNK = 16;
    
    protected char[] data;
    protected int used;

    public StringBuilder() {
        this(CHUNK);
    }

    public StringBuilder(String str) {
        this(str.length());
        append(str);
    }

    public StringBuilder(CharSequence cs) {
        this(cs.toString());
    }

    public StringBuilder(int capacity) {
        this(new char[capacity], 0);
    }

    private StringBuilder(char[] data, int size) {
        this.data = data;
        this.used = size;
    }
    
    public int length() {
        return used;
    }
    
    public void setLength(int length) {
        if (length < used) {
            ensureCapacity(length);
            used = length;
        }
    }
    
    public int capacity() {
        return data.length;
    }
    
    public char charAt(int idx) {
        return data[idx];
    }

    //--
    
    public StringBuilder append(String str) {
        int max;
        
        max = str.length();
        ensureCapacity(used + max);
        for (int i = 0; i < max; i++) {
            data[used + i] = str.charCodeAt(i);
        }
        used += max;
        return this;
    }
    
    public StringBuilder append(boolean b) {
        return append(b ? "true" : "false");
    }

    public StringBuilder append(char c) {
        ensureCapacity(used + 1);
        data[used++] = c;
        return this;
    }
    
    public StringBuilder append(int n) {
        return append(Integer.toString(n));
    }
    
    public StringBuilder append(long n) {
        return append(Long.toString(n));
    }

    public StringBuilder append(float d) {
        return append(Float.toString(d));
    }

    public StringBuilder append(double d) {
        return append(Double.toString(d));
    }

    public StringBuilder append(char[] c) {
        return append(c, 0, c.length);
    }

    public StringBuilder append(char[] c, int start, int count) {
        ensureCapacity(used + count);
        for (int i = start; i < start + count; i++) {
            data[used++] = c[i];
        }
        return this;
    }

    public StringBuilder append(StringBuffer buffer) {
        return append(buffer.data, 0, buffer.used);
    }

    public StringBuilder append(Object obj) {
        return append(obj.toString());
    }
    
    public StringBuilder append(CharSequence cs) {
        return append(cs, 0, cs.length());
    }

    public StringBuilder append(CharSequence cs, int start, int end) {
        for (int i = start; i < end; i++) {
            append(cs.charAt(i));
        }
        return this;
    }


    public void trimToSize() {
    }
    
    @Override
    public String toString() {
        String result = "";

        for (int i = 0; i < used; i++) {
            result = result + data[i];
        }
        return result;
    }
    
    //--
    
    private void ensureCapacity(int newSize) {
        char[] newData;

        if (newSize > data.length) {
            newData = new char[newSize];
            System.arraycopy(data, 0, newData, 0, used);
            data = newData;
        }
    }

    public java.lang.CharSequence subSequence(int start, int end) {
        int len;
        char[] newData;
        
        len = end - start + 1;
        newData = new char[len];
        System.arraycopy(data, start, newData, 0, len);
        return new StringBuilder(newData, len);
    }
}
