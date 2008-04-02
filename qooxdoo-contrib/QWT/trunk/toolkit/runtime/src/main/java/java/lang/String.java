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

package java.lang;

/**
 * @augment String
 */
public final class String implements CharSequence {
    // TODO: not inherited
    /**
     * @native 
        if (typeof obj === 'string') {
            return this == obj;
        } else {
            return false;
        }
     */
     @Override
    public native boolean equals(Object obj);

     // TODO: not inherited
     /**
      * @native 
        java.lang.String.prototype.getJsClass = java.lang.Object.prototype.getJsClass; 
        return java.lang.Object.prototype.getClass.apply(this);
      */
    @Override
    public native Class<?> getClass();
     
    public String(String original) {
    }
    public String(char[] original) {
    }

    /**
     * @native return this.length;
     */
    public native int length();

    /**
     * @alias
     */
    public native char charAt(int index);
    
    /**
     * @alias
     */
    public native char charCodeAt(int index);

    /**
     * @alias
     */
    public native int indexOf(int ch);

    /**
     * @alias
     */
    public native int indexOf(int ch, int fromIndex);

    /**
     * @alias
     */
    public native int lastIndexOf(int ch);

    /**
     * @alias
     */
    public native int lastIndexOf(int ch, int fromIndex);

    /**
     * @alias
     */
    public native int indexOf(String str);

    /**
     * @alias
     */
    public native int indexOf(String str, int fromIndex);

    /**
     * @alias
     */
    public native int lastIndexOf(String str);

    /**
     * @alias
     */
    public native int lastIndexOf(String str, int fromIndex);

    /**
     * @alias
     */
    @Override
    public native String toString();

    
    // TODO: not inherited
    @Override
    public int hashCode() { return 2; }
    
    // TODO
    public boolean startsWith(String str) {
        return myIndexOf(str, 0) == 0;
    }

    // TODO
    public boolean endsWith(String end) {
        int ofs;
        
        ofs = length() - end.length();
        if (ofs < 0) {
            return false;
        }
        return myIndexOf(end, ofs) == ofs;
    }

    // TODO
    public int myIndexOf(String str, int ofs) {
        int max;
        
        max = ofs + str.length();
        if (max > length()) {
            return -1;
        }
        for (int i = ofs; i < max; i++) {
            if (charCodeAt(i) != str.charCodeAt(i - ofs)) {
                return -1;
            }
        }
        return ofs;
    }

    /** @alias */
    public native String substring(int start, int end);

    /** @alias */
    public native String substring(int start);

    public java.lang.CharSequence subSequence(int start, int end) {
        return substring(start, end);
    }
}
