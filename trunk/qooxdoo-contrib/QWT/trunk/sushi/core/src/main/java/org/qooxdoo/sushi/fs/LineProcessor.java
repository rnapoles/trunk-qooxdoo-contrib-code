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

import java.io.IOException;
import java.io.Reader;

public abstract class LineProcessor {
    public static final int INITIAL_BUFFER_SIZE = 2;
    
    private char[] buffer;
    
    private boolean trim;
    private boolean empty;
    
    private int start;
    private int end;
    
    private Node node;
    private int line;
    
    public LineProcessor() {
        this(false, true);
    }

    public LineProcessor(boolean trim, boolean empty) {
        this(INITIAL_BUFFER_SIZE, trim, empty);
    }

    public LineProcessor(int bufferSize, boolean trim, boolean empty) {
        this.buffer = new char[bufferSize];
        this.trim = trim;
        this.empty = empty;
    }
    
    public int run(Node node) throws IOException {
        return run(node, node.getIO().getSettings().lineSeparator);
    }

    public int run(Node node, String separator) throws IOException {
        Reader src;

        src = node.createReader();
        run(node, 1, src, separator);
        src.close();
        return line;
    }

    public void run(Node node, int startLine, Reader src, String separator) throws IOException {
        int sepLen;
        int len;
        int idx;
        char[] newBuffer;
        
        sepLen = separator.length();
        this.node = node;
        this.line = startLine;
        
        start = 0;
        end = 0;
        while (true) {
            len = src.read(buffer, end, buffer.length - end);
            if (len == -1) {
                if (start != end) {
                    doLine(new String(buffer, start, end - start));
                }
                return;
            } else {
                end += len;
            }
            while (true) {
                idx = next(separator);
                if (idx == -1) {
                    break;
                }
                doLine(new String(buffer, start, idx - start));
                start = idx + sepLen;
            }
            if (end == buffer.length) {
                if (start == 0) {
                    newBuffer = new char[buffer.length * 3 / 2 + 10];
                    System.arraycopy(buffer, 0, newBuffer, 0, end);
                    buffer = newBuffer;
                } else {
                    System.arraycopy(buffer, start, buffer, 0, end - start);
                    end -= start;
                    start = 0;
                }
            }
        }
    }

    private int next(String separator) {
        int j;
        int max;
        
        max = separator.length();
        for (int i = start; i <= end - max; i++) {
            for (j = 0; j < max; j++) {
                if (separator.charAt(j) != buffer[i + j]) {
                    break;
                }
            }
            if (j == max) {
                return i;
            }
        }
        return -1;
    }

    private void doLine(String str) throws IOException {
        if (trim) {
            str = str.trim();
        }
        if (empty || str.length() > 0) {
            line(str);
        }
        line++;
    }
    
    public abstract void line(String line) throws IOException;
    
    public Node getNode() {
        return node;
    }
    
    public int getLine() {
        return line;
    }
}
