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

package org.qooxdoo.sushi.compiler;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntBitSet;

import org.qooxdoo.sushi.mapping.Definition;
import org.qooxdoo.sushi.mapping.Mapper;
import org.qooxdoo.sushi.mapping.Path;
import org.qooxdoo.sushi.mapping.Transport;
import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.parser.Parser;
import org.qooxdoo.sushi.semantics.Ag;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.Oag;

/**
 * Specifies a mapper, thus, a Mapping object is a Mapper before translation.
 * Represents a map file.
 */
public class Specification {
    private final Syntax syntax;

    private final Transport transport;

    private final Definition[] definitions;

    private final IntBitSet mainBorder; // set of symbols

    private final String mapperName;

    private final List<Definition> mainDefs;

    public Specification(String mapperName, Syntax syntax, Definition[] definitions) {
        int i;
        Definition d;
        Attribute a;

        this.mapperName = mapperName;
        this.definitions = definitions;
        this.syntax = syntax;
        this.transport = new Transport();
        this.mainBorder = new IntBitSet();
        this.mainDefs = new ArrayList<Definition>();
        for (i = 0; i < definitions.length; i++) {
            d = definitions[i];
            a = d.getAttribute();
            mainBorder.add(a.symbol);
            if (d.isMain()) {
                mainDefs.add(d);
            }
        }
    }

    public Syntax getSyntax() {
        return syntax;
    }

    public Transport getTransport() {
        return transport;
    }

    public void translateDefaultPushPath(Definition seed) throws GenericException {
        Path.translate(syntax, seed, Path.UPS, mainBorder, mainDefs, Path.MERGEABLE);
    }

    public Definition lookup(String name) {
        return lookup(-1, name);
    }

    public Definition lookup(int symbol, String name) {
        Definition d;
        Attribute a;
        int i;

        for (i = 0; i < definitions.length; i++) {
            d = definitions[i];
            a = d.getAttribute();
            if (name.equals(a.name)) {
                if ((a.symbol == symbol) || (symbol == -1)) {
                    return d;
                }
            }
        }
        return null;
    }

    public String getMapperName() {
        return mapperName;
    }

    /**
     * @return != null
     */
    public Mapper translate(Output output) throws GenericException {
        Ag semanticsBuffer;
        Oag oag;
        Parser parser;
        int i;
        Definition def;

        parser = syntax.translate(output);
        output.verbose("processing mapping section");
        semanticsBuffer = new Ag(syntax.getGrammar());
        for (i = 0; i < definitions.length; i++) {
            def = definitions[i];
            if (output.verboseTranslation != null) {
                output.verboseTranslation.println("translating " + def.getName());
            }
            definitions[i].translate(semanticsBuffer, transport, syntax.getGrammar());
        }
        output.verbose("computing oag");
        oag = semanticsBuffer.createSemantics(
                getDefinitionAttrs(syntax.getGrammar().getStart()));
        output.verbose("oag done");
        output.statistics();
        output.statistics("Semantics statistics");
        output.statistics("  semantics: TODO"); /* mapping.getSize()); */
        if (output.listing != null) {
            output.listing("\n\nAttribute Grammar\n");
            output.listing(semanticsBuffer.toString());
            output.listing.println("Visit sequences");
            oag.printVisits(output.listing);
        }
        return new Mapper(mapperName, parser, oag);
    }

    /**
     * @return list of attributes defined for the specfied symbol (in order of definition)
     */
    private List<Attribute> getDefinitionAttrs(int symbol) {
        List<Attribute> lst;
        Attribute a;
        int i;

        lst = new ArrayList<Attribute>();
        for (i = 0; i < definitions.length; i++) {
            a = definitions[i].getAttribute();
            if (a.symbol == symbol) {
                lst.add(a);
            }
        }
        return lst;
    }
}
