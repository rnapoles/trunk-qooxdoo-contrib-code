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
    public static final int DEFAULT_BUFFER_SIZE = 16384;
    
    private final char[] buffer;
    
    protected Node node;
    protected int line;
    
    public LineProcessor() {
        this(DEFAULT_BUFFER_SIZE);
    }

    public LineProcessor(int bufferSize) {
        this(new char[bufferSize]);
    }
    
    public LineProcessor(char[] buffer) {
        this.buffer = buffer;
    }
    
    public int run(Node node) throws IOException {
        Reader src;

        src = node.createReader();
        run(node, 1, src, node.getIO().getSettings().lineSeparator);
        src.close();
        return line;
    }

    public void run(Node node, int startLine, Reader src, String separator) throws IOException {
        int sepLen;
        int len;
        StringBuilder working;
        int idx;
        
        sepLen = separator.length();
        this.node = node;
        this.line = startLine;
        working = new StringBuilder();
        while (true) {
            len = src.read(buffer);
            if (len == -1) {
                if (working.length() > 0) {
                    line(working.toString());
                }
                return;
            }
            working.append(buffer, 0, len);
            idx = working.indexOf(separator);
            while (idx != -1) {
                line(working.substring(0, idx));
                working.delete(0, idx + sepLen);
                line++;
                idx = working.indexOf(separator);
            }
        }
    }

    public abstract void line(String str) throws IOException;
}
