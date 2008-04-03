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
import org.qooxdoo.sushi.parser.ParserTable;
import org.qooxdoo.sushi.scanner.GrammarScanner;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.sushi.scanner.GrammarScannerFactory;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.io.StringReader;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * State shared by (recursive) EntityBuilder invokations.
 * Holds entities, parserTable and scannerTable (obtained from the DTDMapper).
 */
public class DocumentBuilder {
    public static final URL DEFAULT_BASE_URL;

    static {
        try {
            DEFAULT_BASE_URL = new URL("file://localhost/");
        } catch (MalformedURLException e) {
            throw new IllegalStateException("" + e);
        }
    }

    private ParserTable parserTable;
    private GrammarScannerFactory scannerTable;
    private int eofSymbol;
    private PrintStream log;

    private Entities general;
    private Entities parameter;

    /**
     * @param parserTable of the a grammar parser of xml.grm
     * @param scannerTable of the grammar scanner of xml.grm
     */
    public DocumentBuilder(
        ParserTable parserTable, GrammarScannerFactory scannerTable, int eofSymbol, PrintStream log)
    {
        this.parserTable = parserTable;
        this.scannerTable = scannerTable;
        this.eofSymbol = eofSymbol;
        this.log = log;
        this.parameter = new Entities();
        this.general = new Entities();
        this.general.addDefaults();
    }

    public static DocumentBuilder create(PrintStream log) throws IOException {
        Mapper mapper;

        mapper = new Mapper("org.qooxdoo.sushi.xml.DtdMapper");
        return create(log, mapper.getParser());
    }

    /**
     * @param  parser for xml.grm, referencing the appropriate grammar scanner
     */
    public static DocumentBuilder create(PrintStream log, Parser parser) throws IOException {
        GrammarScanner scanner;

        throw new RuntimeException("TODO"); 
        /*
        scanner = (GrammarScanner) parser.getScanner();
        return
         new DocumentBuilder(parser.getTable(), scanner.getTable(), scanner.getEofSymbol(), log);*/
    }

    public Entities getGeneralEntities() {
        return general;
    }

    public Entities getParameterEntities() {
        return parameter;
    }

    public PrintStream getLogging() {
        return log;
    }

    //-----------------------------------------------------

    public Parser createParser() {
        PEScanner scanner;

        throw new RuntimeException("TODO");
        /*
        scanner = new PEScanner(this, scannerTable, eofSymbol, false);
         return new Parser(parserTable, scanner);*/
    }

    public PrintStream getLog() {
        return log;
    }

    public void defineEntity(
        String name, String entityValue, Position entityValuePosition,
        URL systemLiteral, URL baseUrl, boolean generalEntity)
            throws IOException {
        Object replacement;

        if (entityValue != null) {
            replacement = internalReplacement(entityValue, entityValuePosition, baseUrl,
                                              generalEntity);
        } else {
            replacement = externalReplacement(systemLiteral, generalEntity);
        }

        if (generalEntity) {
            general.define(name, replacement);
        } else {
            parameter.define(name, replacement);
        }
    }

    private Object internalReplacement(
        String entityValue, Position entityValuePosition, URL baseUrl, boolean generalEntity)
            throws IOException {
        String literalStr;
        Object replacement;
        Position pos;

        literalStr = entityValue.substring(1, entityValue.length() - 1);
        if (generalEntity) {
            pos = new Position();
            pos.set(entityValuePosition);
            replacement = EntityBuilder.runGeneral(this, baseUrl, pos,
                                                   new StringReader(literalStr), false);
        } else {
            // PE structure is not known until actually used -- store the string.
            replacement = literalStr;
        }
        return replacement;
    }

    private Buffer externalReplacement(URL systemLiteral, boolean generalEntity) throws IOException {
        Buffer replacement;

        if (log != null) {
            log.println("open: " + systemLiteral);
        }
        if (generalEntity) {
            replacement = EntityBuilder.runGeneral(this, systemLiteral, new Position(systemLiteral),
                                   new InputStreamReader(systemLiteral.openStream()), true);
        } else {
            replacement = EntityBuilder.runPE(this, systemLiteral);
        }
        if (log != null) {
            log.println("done: " + systemLiteral);
        }

        return replacement;
    }
}
