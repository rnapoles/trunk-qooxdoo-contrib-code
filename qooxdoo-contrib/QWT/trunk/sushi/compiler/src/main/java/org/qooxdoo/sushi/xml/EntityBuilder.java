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

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PushbackReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;

import org.qooxdoo.sushi.parser.Parser;
import org.qooxdoo.sushi.parser.ParserTable;
import org.qooxdoo.sushi.parser.TreeBuilder;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.sushi.scanner.Scanner;

/**
 * Build buffer for a given entity, feeds grammar token obtained from
 * a PEScanner into a Buffer. Has some internal state to control the necessary
 * preprocessing.
 */

public class EntityBuilder implements Symbols, TreeBuilder {
    private static final char MAGIC_GENERAL = '1';
    private static final char MAGIC_PARAMETER = '2';

    /** the context this BufferBuilder is invokation */
    private DocumentBuilder context;

    /** external entities are relative to this URL */
    private URL baseUrl;

    /** buffer to feed the resulting grammar token to. */
    private Buffer buffer;

    private ParserTable table;

    /**
     * If true, the builser add the replecement text for general entity references into the buffer.
     * If false, the builder add the entity reference.
     */
    private boolean expandGE;

    /**
     * True while reading the internal subset, i.e. between [ and ]. False otherwise.
     */
    private boolean internalSubset;

    /** DTD specified in the entity. */
    private URL dtdSystemLiteral;

    private String lastName;
    private URL lastSystemLiteral;
    private String lastEntityValue;
    private Position lastEntityValuePosition;

    private Parser parser;
    private Scanner scanner;

    public EntityBuilder(URL baseUrl, Buffer buffer, DocumentBuilder context, boolean expandGE) {
        this.baseUrl = baseUrl;
        this.buffer = buffer;
        this.context = context;
        this.expandGE = expandGE;

        this.internalSubset = false;
        this.lastName = null;
        this.lastSystemLiteral = null;
        this.lastEntityValue = null;
        this.lastEntityValuePosition = null;
    }

    public static Buffer runDTD(DocumentBuilder context, Position position, Reader src) throws IOException {
        Buffer buffer;

        buffer = runMagic(MAGIC_PARAMETER, context, null, position, src, false);
        buffer.prepend(PE_TEXT_DECL, "" + MAGIC_PARAMETER, new Position("foo"));
        return buffer;
    }

    public static Buffer runPE(DocumentBuilder context, URL url) throws IOException {
        return runMagic(MAGIC_PARAMETER, context, url, new Position(url),
                        new InputStreamReader(url.openStream()), false);
    }

    public static Buffer runGeneral(
        DocumentBuilder context, URL url, Position pos, Reader src, boolean expandGE) throws IOException {
        return runMagic(MAGIC_GENERAL, context, url, pos, src, expandGE);
    }

    private static Buffer runMagic(
        char magic, DocumentBuilder context, URL baseUrl, Position pos, Reader src, boolean expandGE) 
    throws IOException {
        PushbackReader pushback;

        pushback = new PushbackReader(src);
        pushback.unread(magic);
        return run(context, baseUrl, pos, pushback, expandGE);
    }

    /** @param baseUrl may be null **/
    public static Buffer run(
        DocumentBuilder context, URL baseUrl, Position position, Reader src, boolean expandGE)
            throws IOException {
        EntityBuilder builder;
        Parser parser;
        Buffer buffer;
        Object positionContext;

        if (baseUrl == null) {
            positionContext = position.getContext();
            if (positionContext instanceof URL) {
                baseUrl = (URL) positionContext;
            } else {
                baseUrl = DocumentBuilder.DEFAULT_BASE_URL;
            }
        }
        buffer = new Buffer();
        builder = new EntityBuilder(baseUrl, buffer, context, expandGE);
        parser = context.createParser();
        parser.run(position, src, builder, context.getLog());  // TODO: new exception handling
        return buffer;
    }

    public void open(Scanner scanner, Parser parser) {
        this.scanner = scanner;
        this.parser = parser;
    }

    public Object createTerminal(int terminal) throws IllegalToken, IOException {
        String text;
        Position pos;
        URL url;

        text = scanner.getText();
        pos = new Position();
        scanner.getPosition(pos);
        switch (terminal) {
            case OPEN_ARRAY_BRACKET:
                // also matched for include/ignore section, but they are part of
                // the internal subset anyway
                internalSubset = true;
                break;
            case CLOSE_ARRAY_BRACKET:
                // TODO: also matched by my current hack for closing "]]>" token ...
                internalSubset = false;
                // TODO: fall though?!
            case ENTITY_VALUE:
                lastEntityValue = text;
                lastEntityValuePosition = pos;
                break;
            case SYSTEM_LITERAL:
                url = getSystemLiteral(text.substring(1, text.length() - 1), pos);
                if (internalSubset) {
                    lastSystemLiteral = url;
                } else {
                    // the DTD system literal is the only SYSTEM_LITERAL outside
                    // the internalSubset
                    dtdSystemLiteral = url;
                }
                break;
            case PE_REFERENCE:
                // PE scanner has to consume all PEReferences
                throw new IllegalArgumentException();
            case REFERENCE:
                if (expandGE) {
                    context.getGeneralEntities().insert(scanner.getText(), pos, buffer);
                    return null;
                } else {
                    break;
                }
            case NAME:
                lastName = text;
                break;
            case PE_TEXT_DECL:
            case PARSED_ENT_TEXT_DECL:
                // magic numbers with textdecl - ignore
                return null;
            default:
                throw new RuntimeException("unexpected: " + terminal);
        }
        buffer.add(terminal, text, pos);
        return null;
    }

    private URL getSystemLiteral(String uri, Position position) throws IllegalToken {
        try {
            // TODO: xml spec allows URIs -- which is not necessarily an URL
            return new URL(baseUrl, uri);
        } catch (MalformedURLException e) {
            throw new IllegalToken(position, "malformed url: " + uri);
        }
    }

    public Object createNonterminal(int production) throws IOException {
        int nonterminal;
        int count;

        count = parser.getTable().getLength(production);
        while (count-- > 0) {
            parser.pop();
        }
        nonterminal = parser.getLeft(production);
        switch (nonterminal) {
            case DOCTYPE_DECL:
                if (dtdSystemLiteral != null) {
                    EntityBuilder.runPE(context, dtdSystemLiteral);
                    // dismiss result - I got what I need: the entity definitions in the context
                }
                break;
            case GE_DECL:
                context.defineEntity(lastName, lastEntityValue, lastEntityValuePosition,
                                     lastSystemLiteral, baseUrl, true);
                lastEntityValue = null;
                lastEntityValuePosition = null;
                lastSystemLiteral = null;
                break;
            case PE_DECL:
                context.defineEntity(lastName, lastEntityValue, lastEntityValuePosition,
                                     lastSystemLiteral, baseUrl, false);
                lastEntityValue = null;
                lastEntityValuePosition = null;
                lastSystemLiteral = null;
                break;
            default:
                throw new RuntimeException("unexpected " + nonterminal);
        }
        return null;
    }
}
