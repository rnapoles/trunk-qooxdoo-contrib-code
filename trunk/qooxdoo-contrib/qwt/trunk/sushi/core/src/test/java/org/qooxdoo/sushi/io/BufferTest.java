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

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.io.InputStream;

import org.junit.Test;

import static org.junit.Assert.*;

public class BufferTest {
    @Test
    public void invalidEncoding() {
        try {
            new Buffer("nosuchencoding");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }
    
    @Test
    public void encoding() {
        Buffer buffer;
        
        buffer = new Buffer();
        assertEquals("", buffer.string(buffer.bytes("")));
        assertEquals("abc", buffer.string(buffer.bytes("abc")));
    }

    @Test
    public void readLine() throws IOException {
        Buffer buffer;
        InputStream src;
        
        buffer = new Buffer();

        src = new ByteArrayInputStream(new byte[] { });
        assertNull(buffer.readLine(src));
        
        src = new ByteArrayInputStream(new byte[] { 'a', 'b', 'c', '\n', 'a', '\n', '\n', 'x', 'x' });
        assertEquals("abc", buffer.readLine(src));
        assertEquals("a", buffer.readLine(src));
        assertEquals("", buffer.readLine(src));
        try {
            assertEquals("", buffer.readLine(src));
            fail();
        } catch (EOFException e) {
            // ok
        }
    }

    @Test
    public void copy() throws IOException {
        copy(bytes(), bytes(), 100);
        copy(bytes(0, 1, 2, 3, 4), bytes(0, 1, 2, 3, 4), 100);
        copy(bytes(), bytes(0), 0);
        copy(bytes(0), bytes(0, 1, 2, 3, 4), 1);
    }

    private byte[] bytes(int ... data) {
        byte[] result;
        
        result = new byte[data.length];
        for (int i = 0; i < data.length; i++) {
            result[i] = (byte) data[i];
        }
        return result;
    }
    
    private void copy(byte[] expected, byte[] data, int max) throws IOException {
        Buffer buffer;
        InputStream src;
        ByteArrayOutputStream dest;
        int length;
        byte[] found;
        
        buffer = new Buffer(1, Buffer.UTF_8, "\n");
        src = new ByteArrayInputStream(data);
        dest = new ByteArrayOutputStream();
        length = buffer.copy(src, dest, max);
        found = dest.toByteArray();
        assertEquals(length, found.length);
        assertEquals(expected.length, found.length);
        for (int i = 0; i < expected.length; i++) {
            assertEquals(expected[i], found[i]);
        }
    }
}
