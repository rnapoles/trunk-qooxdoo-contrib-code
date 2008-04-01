// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/Specification.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.mapping.Definition;
import de.mlhartme.mork.mapping.Mapper;
import de.mlhartme.mork.mapping.Path;
import de.mlhartme.mork.mapping.Transport;
import de.mlhartme.mork.parser.Parser;
import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.Oag;
import de.mlhartme.mork.semantics.Ag;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.IntBitSet;
import java.util.ArrayList;
import java.util.List;

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

    private final List mainDefs;

    public Specification(String mapperName, Syntax syntax, Definition[] definitions) {
        int i;
        Definition d;
        Attribute a;

        this.mapperName = mapperName;
        this.definitions = definitions;
        this.syntax = syntax;
        this.transport = new Transport();
        this.mainBorder = new IntBitSet();
        this.mainDefs = new ArrayList();
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
    private List getDefinitionAttrs(int symbol) {
        List lst;
        Attribute a;
        int i;

        lst = new ArrayList();
        for (i = 0; i < definitions.length; i++) {
            a = definitions[i].getAttribute();
            if (a.symbol == symbol) {
                lst.add(a);
            }
        }
        return lst;
    }
}
