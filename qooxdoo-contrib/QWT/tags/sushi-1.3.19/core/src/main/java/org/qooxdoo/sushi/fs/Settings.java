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

package org.qooxdoo.sushi.fs;

import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;

import org.qooxdoo.sushi.io.OS;
import org.qooxdoo.sushi.util.Strings;

/**
 * <p>Immutable. </p>
 */
public class Settings {
    public static final String UTF_8 = "UTF-8";
    public static final String ISO8859_1 = "ISO8859_1";

    public static final String DEFAULT_LINESEPARATOR = OS.CURRENT.lineSeparator;

    private static final byte[] BYTES = { 65 };
    
    public final String encoding;
    public final String lineSeparator;

    /** Create a Buffer with UTF-8 encoding */
    public Settings() {
        this(UTF_8);
    }

    public Settings(String encoding) {
        this(encoding, DEFAULT_LINESEPARATOR);
    }

    public Settings(String encoding, String lineSeparator) {
        try {
            new String(BYTES, encoding);
        } catch (UnsupportedEncodingException e) {
            throw new IllegalArgumentException(encoding, e);
        }
        this.encoding = encoding;
        this.lineSeparator = lineSeparator;
    }
    
    public String join(String ... lines) {
        return Strings.join(lineSeparator, lines);
    }

    public String string(byte[] bytes) {
        try {
            return new String(bytes, encoding);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public String string(ByteArrayOutputStream stream) {
        try {
            return stream.toString(encoding);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        
    }

    public byte[] bytes(String str) {
        try {
            return str.getBytes(encoding);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
