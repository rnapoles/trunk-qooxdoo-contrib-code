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
        ensureCapacity(length);
        used = length;
    }
    
    public int capacity() {
        return data.length;
    }
    
    public char charAt(int idx) {
        return data[idx];
    }

    //--
    
    public void append(boolean b) {
        append(b ? "true" : "false");
    }

    public void append(char c) {
        ensureCapacity(used + 1);
        data[used++] = c;
    }
    
    public void append(int n) {
        append(Integer.toString(n));
    }
    
    public void append(long n) {
        append(Long.toString(n));
    }

    public void append(float d) {
        append(Float.toString(d));
    }

    public void append(double d) {
        append(Double.toString(d));
    }

    public void append(char[] c) {
        append(c, 0, c.length);
    }

    public void append(char[] c, int start, int end) {
        ensureCapacity(used + start - end);
        for (int i = start; i < end; i++) {
            data[used++] = c[i];
        }
    }

    public void append(String str) {
        int max;
        
        max = str.length();
        ensureCapacity(used + max);
        for (int i = 0; i < max; i++) {
            data[used + i] = str.charAt(i);
        }
        used += max;
    }
    
    public void append(StringBuffer buffer) {
        append(buffer.data, 0, buffer.used);
    }

    public void append(Object obj) {
        append(obj.toString());
    }
    
    public void append(CharSequence cs) {
        append(cs, 0, cs.length());
    }

    public void append(CharSequence cs, int start, int end) {
        for (int i = start; i < end; i++) {
            append(cs.charAt(i));
        }
    }


    public void trimToSize() {
    }
    
    @Override
    public String toString() {
        return new String(data);
    }
    
    //--
    
    private void ensureCapacity(int newSize) {
        char[] newData;

        if (used > newSize) {
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
