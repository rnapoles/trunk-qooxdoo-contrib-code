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

package org.qooxdoo.sushi.xml;

import org.qooxdoo.sushi.mapping.Mapper;
import org.qooxdoo.sushi.parser.Parser;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.sushi.scanner.Scanner;
import java.io.IOException;
import java.io.Reader;

/**
 * Scanner for DtdMapper. This scanner is similar to XmlScanner, but is does not transform
 * grammar token into Xml token -- instead, it delivers token unmodified. This is used by
 * to map DTD files.  The set method is used to replace the normal scanner of the DtdMapper
 * generated in stage 3 of the bootstrapping.
 * TODO: remove this class, add an Scanner interface implementation to Buffer instead?
 * TODO: rename if to RawScanner or GrammarScanner?
 */
public class DtdScanner implements Scanner, Symbols {
    private Buffer buffer;
    private int eofSymbol;
    private Parser parser;

    public static void set(Mapper mapper) {
        Parser parser;
        DtdScanner dtdScanner;
        Scanner grammarScanner;

        throw new RuntimeException("TODO");
        /*
        parser = mapper.getParser();
        grammarScanner = parser.getScanner();
        dtdScanner = new DtdScanner(grammarScanner.getEofSymbol(), parser.newInstance());
         parser.setScanner(dtdScanner);*/
    }

    public DtdScanner(int eofSymbol, Parser parser) {
        this.eofSymbol = eofSymbol;
        this.parser = parser;
        this.buffer = null;
    }

    public DtdScanner(int eofSymbol, Buffer buffer) {
        this.eofSymbol = eofSymbol;
        this.parser = null;
        this.buffer = buffer;
    }

    public Scanner newInstance() {
        return new DtdScanner(eofSymbol, parser);
    }

    public void open(Position position, Reader src) throws IOException {
        if (buffer != null) {
            throw new IllegalStateException();
        }
        buffer = EntityBuilder.runDTD(DocumentBuilder.create(null, parser), position, src);
    }

    public void close() {
        buffer = null;
    }

    //----------------------------------------------------------------------
    // query state

    public String getText() {
        return buffer.getPreviousText();
    }

    public void getPosition(Position pos) {
        pos.set(buffer.getPreviousPosition());
    }

    public int getEofSymbol() {
        return eofSymbol;
    }

    public int eat(int mode) throws IOException, IllegalToken {
        int result;

        if (buffer.isEof()) {
            result = eofSymbol;
        } else {
            result = buffer.getTerminal();
            buffer.next();
        }
        return result;
    }
}
