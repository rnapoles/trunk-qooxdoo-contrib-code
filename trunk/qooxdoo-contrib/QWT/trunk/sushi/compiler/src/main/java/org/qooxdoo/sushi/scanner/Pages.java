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

package org.qooxdoo.sushi.scanner;

import java.io.IOException;
import java.io.Reader;

public class Pages {
    private final int pageSize;

    private Reader src;

    /** Index of the last page */
    private int lastNo;

    /** Number of bytes on the last page */
    private int lastUsed;

    /** @inv pages.length > 0 &&
        i: 0..lastNo: (pages[i] != null && pages.get(i).length == PAGE_SIZE) */
    private char[][] pages;

    private char[] newPage;

    public Pages(int pageSize) {
        if (pageSize == 0) {
            throw new IllegalArgumentException();
        }
        this.pageSize = pageSize;
        this.pages = new char[2][];
        this.pages[0] = new char[pageSize];
        this.newPage = null;
    }

    public void open(Reader src) {
        this.src = src;
        this.lastUsed = 0;
        this.lastNo = 0;
    }

    public char[] get(int no) {
        return pages[no];
    }

    /** @return number of bytes used on the specified page */
    public int getUsed(int no) {
        if (no == lastNo) {
            return lastUsed;
        } else {
            return pageSize;
        }
    }

    /** number of pages used. */
    public int getLastNo() {
        return lastNo;
    }

    public int getSize() {
        return pageSize * lastNo + lastUsed;
    }

    /**
     * @return -1  eof   0: current page grown   1: new page
     */
    public int read(int pageNo, int pageUsed) throws IOException {
        if (pageUsed < pageSize) {
            // assert pageNo == lastNo
            if (!fill()) {
                return -1;
            }
            return 0;
        } else {
            if (pageNo == lastNo) {
                if (!append()) {
                    return -1;
                }
            }
            if (getUsed(pageNo + 1) == 0) {
                if (!fill()) {
                    return -1;
                }
            }
            return 1;
        }
    }

    private boolean fill() throws IOException {
        int count;

        if (lastUsed == pageSize) {
            throw new IllegalStateException();
        }
        count = src.read(pages[lastNo], lastUsed, pageSize - lastUsed);
        if (count <= 0) {
            if (count == 0) {
                throw new RuntimeException();
            }
            return false;
        }
        lastUsed += count;
        return true;
    }

    private boolean append() throws IOException {
        char[] p;
        int count;
        char[][] newPages;

        if (lastUsed != pageSize) {
            throw new IllegalStateException();
        }
        lastNo++;
        if (lastNo >= pages.length) {
            newPages = new char[lastNo * 5 / 2][];
            System.arraycopy(pages, 0, newPages, 0, lastNo);
            pages = newPages;
        }
        if (newPage == null) {
            p = new char[pageSize];
        } else {
            p = newPage;
            newPage = null;
        }
        pages[lastNo] = p;
        count = src.read(p, 0, pageSize);
        if (count <= 0) {
            if (count == 0) {
                throw new RuntimeException();
            }
            lastUsed = 0;
            return false;
        }
        lastUsed = count;
        return true;
    }

    public void remove(int count) {
        newPage = pages[0];
        lastNo -= count;
        if (lastNo < 0) {
            throw new IllegalStateException();
        }
        System.arraycopy(pages, count, pages, 0, lastNo + 1);
    }

    @Override
    public String toString() {
        StringBuilder buf;
        int i, p;
        char[] pg;

        buf = new StringBuilder();
        buf.append("pages {");
        for (p = 0; p <= lastNo; p++) {
            pg = get(p);
            buf.append("\n  page " + p + ":");
            for (i = 0; i < pageSize; i++) {
                buf.append(pg[i]);
            }
            buf.append("\n    ");
            for (i = 0; i < pageSize; i++) {
                buf.append(" " + ((int) pg[i]));
            }
        }
        buf.append("\n}");

        return buf.toString();
    }
}
