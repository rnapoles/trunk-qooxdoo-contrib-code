// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/Pages.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

import java.io.IOException;
import java.io.Reader;

public class Pages {
    private final int PAGE_SIZE;

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
        this.PAGE_SIZE = pageSize;
        this.pages = new char[2][];
        this.pages[0] = new char[PAGE_SIZE];
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
            return PAGE_SIZE;
        }
    }

    /** number of pages used. */
    public int getLastNo() {
        return lastNo;
    }

    public int getSize() {
        return PAGE_SIZE * lastNo + lastUsed;
    }

    /**
     * @return -1  eof   0: current page grown   1: new page
     */
    public int read(int pageNo, int pageUsed) throws IOException {
        if (pageUsed < PAGE_SIZE) {
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

        if (lastUsed == PAGE_SIZE) {
            throw new IllegalStateException();
        }
        count = src.read(pages[lastNo], lastUsed, PAGE_SIZE - lastUsed);
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

        if (lastUsed != PAGE_SIZE) {
            throw new IllegalStateException();
        }
        lastNo++;
        if (lastNo >= pages.length) {
            newPages = new char[lastNo * 5 / 2][];
            System.arraycopy(pages, 0, newPages, 0, lastNo);
            pages = newPages;
        }
        if (newPage == null) {
            p = new char[PAGE_SIZE];
        } else {
            p = newPage;
            newPage = null;
        }
        pages[lastNo] = p;
        count = src.read(p, 0, PAGE_SIZE);
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

    public String toString() {
        StringBuilder buf;
        int i, p;
        char[] pg;

        buf = new StringBuilder();
        buf.append("pages {");
        for (p = 0; p <= lastNo; p++) {
            pg = get(p);
            buf.append("\n  page " + p + ":");
            for (i = 0; i < PAGE_SIZE; i++) {
                buf.append(pg[i]);
            }
            buf.append("\n    ");
            for (i = 0; i < PAGE_SIZE; i++) {
                buf.append(" " + ((int) pg[i]));
            }
        }
        buf.append("\n}");

        return buf.toString();
    }
}
