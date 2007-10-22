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

package org.qooxdoo.sushi.io;

import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;

/**
 * <p>Buffer to access streams. </p>
 */
public class Buffer {
    public static final int DEFAULT_SIZE = 8192;
    public static final String DEFAULT_LINESEPARATOR = "\n";

    private static final byte[] BYTES = { 65 };
    
    public static final String UTF_8 = "UTF-8";
    public static final String ISO8859_1 = "ISO8859_1";


    private final byte[] buffer;
    private final String encoding;
    private final String lineSeparator;

    /** Create a Buffer with UTF-8 encoding */
    public Buffer() {
        this(UTF_8);
    }

    public Buffer(String encoding) {
        this(DEFAULT_SIZE, encoding, DEFAULT_LINESEPARATOR);
    }

    public Buffer(Buffer orig) {
        this(orig.buffer.length, orig.encoding, orig.lineSeparator);
    }

    public Buffer(int bufferSize, String encoding, String lineSeparator) {
        try {
            new String(BYTES, encoding);
        } catch (UnsupportedEncodingException e) {
            throw new IllegalArgumentException(encoding, e);
        }
        this.buffer = new byte[bufferSize];
        this.encoding = encoding;
        this.lineSeparator = lineSeparator;
    }

    public int size() {
        return buffer.length;
    }
    
    public String getEncoding() {
        return encoding;
    }

    public String getLineSeparator() {
        return lineSeparator;
    }
    
    //--
    
    public String string(byte[] bytes) {
        try {
            return new String(bytes, encoding);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public String string(ByteArrayOutputStream bytes) {
        try {
            return bytes.toString(encoding);
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

    //--
    
    public int fill(InputStream in) throws IOException {
        int chunk;
        int ofs;
        
        for (ofs = 0; ofs < buffer.length; ofs += chunk) {
            chunk = in.read(buffer, ofs, buffer.length - ofs);
            if (chunk < 0) {
                break;
            }
        }
        return ofs;
    }

    public boolean diff(Buffer cmp, int length) {
        for (int i = 0; i < length; i++) {
            if (buffer[i] != cmp.buffer[i]) {
                return true;
            }
        }
        return false;
    }

    //--
    
    public void digest(InputStream src, MessageDigest digest) throws IOException {
        int numRead;
        
        while (true) {
            numRead = src.read(buffer);
            if (numRead < 0) {
                break;
            }
            digest.update(buffer, 0, numRead);
        }
    }

    //--

    public byte[] readBytes(InputStream src) throws IOException {
        ByteArrayOutputStream dest;
        
        dest = new ByteArrayOutputStream();
        copy(src, dest);
        return dest.toByteArray();
    }

    public String readLine(InputStream src) throws IOException {
        ByteArrayOutputStream tmp;
        int c;
        
        tmp = new ByteArrayOutputStream();
        while (true) {
            c = src.read();
            if (c < 0) {
                if (tmp.size() > 0) {
                    throw new EOFException();
                }
                return null;
            } else if (c == '\n') {
                return tmp.toString(encoding);
            } else {
                tmp.write(c);
            }
        }
    }
    
    public String readString(InputStream src) throws IOException {
        byte[] bytes;
        
        bytes = readBytes(src);
        return new String(bytes, encoding);
    }
    
    /** 
     * Copies all bytes.
     * 
     * @return number of bytes actually copied
     */
    public int copy(InputStream in, Node dest) throws IOException {
        OutputStream out;
        int result;
        
        out = dest.createOutputStream();
        result = copy(in, out);
        out.close();
        return result;
    }
    
    /** 
     * Copies all bytes.
     * 
     * @return number of bytes actually copied
     */
    public int copy(InputStream in, OutputStream out) throws IOException {
        return copy(in, out, Integer.MAX_VALUE);
    }
    
    /**
     * Copies up to max bytes.
     * 
     * @return number of bytes actually copied
     */
    public int copy(InputStream in, OutputStream out, int max) throws IOException {
        int chunk;
        int all;
        int remaining;
        
        remaining = max;
        all = 0;
        while (remaining > 0) {
            chunk = in.read(buffer, 0, Math.min(remaining, buffer.length));
            if (chunk < 0) {
                break;
            }
            out.write(buffer, 0, chunk);
            all += chunk;
            remaining -= chunk;
        }
        out.flush();
        return all;
    }
}
