// §{{header}}:
//
// This is file src/de/mlhartme/mork/scanner/Buffer.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.scanner;

import de.mlhartme.mork.util.GenericException;
import java.io.IOException;
import java.io.Reader;

/**
 * Connection between Scanner and Reader. This class is kind of a
 * StringBuilder optimized for deleting at the beginning and appending at the
 * end. In addition, appending is done buffered from a Reader. The buffer
 * behaves as if the reader is filled in completely at the beginning, but
 * this is done in steps.
 *
 * Mark() is used to mark the complete token; get/setPos() is used in between by ScannerTable.
 *
 * Buffer dtorage is devided into pages.
 */

public class Buffer {
    /** this object is thrown to indicate the end of the input stream */
    public static final GenericException EOF = new GenericException("eof");

    /**
     * True if src.read() has returned -1. Does not necessarily meant that this buffer
     * is EOF as well.
     */
    private boolean srcEof;

    /**
     * Marked offset from start. Always an index in the first page.
     */
    private int mark;

    /** tracks the position of the mark. */
    private Position position;

    private final Pages pages;

    /** Index of the current page. pageData == pages.get(pageIdx), pageIdx < pages.size() */
    private int pageNo;

    /** Current page. pages.get(pageNo) */
    private char[] pageData;

    /** Ofset in the current page. */
    private int pageOfs;

    /** Size of the current page. pageData[pageOfs] is valid if pageOfs < pageUsed */
    private int pageUsed;

    private final int PAGE_SIZE;

    public Buffer() {
        this(8192);
    }

    public Buffer(int pageSize) {
        PAGE_SIZE = pageSize;
        if (pageSize == 0) {
            throw new IllegalArgumentException();
        }
        this.pages = new Pages(pageSize);
    }

    public void open(Position position, Reader src) {
        this.position = position;
        this.srcEof = false;
        this.mark = 0;
        this.pages.open(src);
        this.pageData = pages.get(0);
        this.pageNo = 0;
        this.pageOfs = 0;
        this.pageUsed = pages.getUsed(0);
    }

    //----------------------------------------------------------------------


    public void assertInvariant() {
        if (mark > pages.getSize()) {
            throw new IllegalStateException();
        }
        if (mark > PAGE_SIZE) {
            throw new IllegalStateException();
        }
        if (mark > getOfs()) {
            throw new IllegalStateException();
        }
        if (pageOfs > pageUsed) {
            throw new IllegalStateException();
        }
        if (pageData != pages.get(pageNo)) {
            throw new IllegalStateException();
        }
    }

    public int getOfs() {
        return pageNo * PAGE_SIZE + pageOfs;
    }

    /**
     * Reset the current position.
     *
     * @param  ofs  offset from the current mark; must be smaller than the current position
     */
    public void reset(int ofs) {
        // make ofs absolute
        ofs += mark;
        if (pageNo == 0) {
            // because a precondition is that ofs is left of the
            // current position
            pageOfs = ofs;
        } else {
            pageNo = ofs / PAGE_SIZE;
            pageOfs = ofs % PAGE_SIZE;
            if (pageOfs == 0 && pages.getLastNo() == pageNo) {
                // this happens if getOfs() was called after the last character of a page was read
                pageOfs += PAGE_SIZE;
                pageNo--;
            }
            pageData = pages.get(pageNo);
            pageUsed = pages.getUsed(pageNo);
        }
    }

    /**
     * Returns true if the end of file has been seen and the buffer is at it's end.
     * Does *not* try to read in order to check for an end-of-file.
     */
    public boolean wasEof() {
        return srcEof && (getOfs() == pages.getSize());
    }

    /** @throws Buffer.EOF for to indicate eof */
    public int read() throws IOException, GenericException {
        if (pageOfs == pageUsed) {
            switch (pages.read(pageNo, pageUsed)) {
                case -1:
                    srcEof = true;
                    throw EOF;
                case 0:
                    pageUsed = pages.getUsed(pageNo);
                    break;
                case 1:
                    pageNo++;
                    pageOfs = 0;
                    pageData = pages.get(pageNo);
                    pageUsed = pages.getUsed(pageNo);
                    break;
                default:
                    throw new RuntimeException();
            }
        }
        return pageData[pageOfs++];
    }

    // this method is more expensive than plain read()
    public int readOrEof() throws IOException {
        try {
            return read();
        } catch (GenericException e) {
            if (e != Buffer.EOF) {
                throw new RuntimeException("unexpected GenericException " + e);
            }
            return -1;
        }
    }

    //-------------------------------

    /**
     * Mark the current position as the maximum position to reset to.
     */
    public void mark() {
        int i;

        if (pageNo == 0) {
            position.update(pageData, mark, pageOfs);
            mark = pageOfs;
        } else {
            position.update(pages.get(0), mark, PAGE_SIZE);
            for (i = 1; i < pageNo; i++) {
                position.update(pages.get(i), 0, PAGE_SIZE);
            }
            pages.remove(pageNo);
            pageNo = 0;
            pageData = pages.get(0);
            mark = pageOfs;
            position.update(pageData, 0, mark);
        }
    }

    /**
     * Returns the string between mark and the current position.
     */
    public String createString() {
        int i;
        int count;

        if (pageNo == 0) {
            // speedup the most frequent situation
            return new String(pageData, mark, pageOfs - mark);
        } else {
            char[] buffer;

            buffer = new char[pageNo * PAGE_SIZE + pageOfs - mark];
            count = PAGE_SIZE - mark;
            System.arraycopy(pages.get(0), mark, buffer, 0, count);
            for (i = 1; i < pageNo; i++) {
                System.arraycopy(pages.get(i), 0, buffer, count, PAGE_SIZE);
                count += PAGE_SIZE;
            }
            System.arraycopy(pages.get(pageNo), 0, buffer, count, pageOfs);
            return new String(buffer);
        }
    }

    public void getPosition(Position result) {
        result.set(position);
    }

    //-----------------------------------------------------------------------

    @Override
    public String toString() {
        StringBuilder buf;

        buf = new StringBuilder();
        buf.append("buffer {");
        buf.append("\n  srcEof   = " + srcEof);
        buf.append("\n  mark     = " + mark);
        buf.append("\n  pageNo   = " + pageNo);
        buf.append("\n  pageOfs  = " + pageOfs);
        buf.append("\n  pageHigh = " + pageUsed);
        buf.append(pages.toString());
        buf.append("\n}");
        return buf.toString();
    }
}
