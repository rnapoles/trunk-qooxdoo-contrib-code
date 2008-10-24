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

package org.qooxdoo.sushi.io;

import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.MessageDigest;

import org.qooxdoo.sushi.fs.Node;

/**
 * <p>Buffer to access streams. </p>
 */
public class Buffer {
    public static final int DEFAULT_SIZE = 8192;

    private final byte[] buffer;

    /** Create a Buffer with UTF-8 encoding */
    public Buffer() {
        this(DEFAULT_SIZE);
    }

    public Buffer(int bufferSize) {
        this.buffer = new byte[bufferSize];
    }

    public Buffer(Buffer orig) {
        this(orig.buffer.length);
    }

    //--
    
    public int size() {
        return buffer.length;
    }
    
    public int fill(InputStream in) throws IOException {
        return fill(in, buffer);
    }

    public static int fill(InputStream in, byte[] buffer) throws IOException {
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

    public String readLine(InputStream src, String encoding) throws IOException {
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
    
    public String readString(InputStream src, String encoding) throws IOException {
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
