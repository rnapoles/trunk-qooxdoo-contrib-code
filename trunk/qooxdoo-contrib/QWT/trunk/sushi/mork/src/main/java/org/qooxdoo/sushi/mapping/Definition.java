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

package de.mlhartme.mork.mapping;

import de.mlhartme.mork.grammar.Grammar;
import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.reflect.Selection;
import de.mlhartme.mork.semantics.Attribute;
import de.mlhartme.mork.semantics.AttributeOccurrence;
import de.mlhartme.mork.semantics.AttributionBuffer;
import de.mlhartme.mork.semantics.Ag;
import de.mlhartme.mork.semantics.Type;
import de.mlhartme.mork.util.GenericException;
import java.util.ArrayList;
import java.util.List;

/**
 * Definition of an attribute,
 * Other possible names: seed, join, attachment, association, representation.
 */
public class Definition {
    public final String name;
    public final int symbol;
    private final boolean main;

    /** constructor reference. */
    public final Object constructor;

    private Attribute attribute;

    private List isolated;
    private List mergeable;

    // TODO: use {1}, {2} if GenericException support it
    public static final String ARGUMENT_NOT_ASSIGNABLE =
        "Attribute A is visible to attribute B, but B has no formal argument A is assignable to.";

    /**
     * @param constructor  Internal or Selection
     */
    public Definition(boolean main, Grammar grm, int symbol, String name, Object constructor) throws GenericException {
        Internal var;
        Type type;
        Selection sel;

        this.main = main;
        this.name = name;
        this.symbol = symbol;
        this.constructor = constructor;
        this.isolated = new ArrayList();
        this.mergeable = new ArrayList();

        if (constructor instanceof Internal) {
            var = (Internal) constructor;
            attribute = var.translate(symbol, grm);
        } else {
            sel = (Selection) constructor;
            type = new Type(sel.calcResult(), Type.VALUE);
            attribute = new Attribute(symbol, name, type);
        }
    }

    public void addArgument(Argument arg, Definition src) throws GenericException {
        Selection selection;
        Type type;

        type = arg.getAttribute().type;
        if (!Conversion.hasFormalArgument(getSelection(), type)) {
            throw new GenericException(ARGUMENT_NOT_ASSIGNABLE, "A=" + src.name + ", B=" + name
                                    + ", type of A=" + src.getAttribute().type.toString());
        }
        if (arg.getModifier() == Path.ISOLATED) {
            isolated.add(arg);
        } else {
            mergeable.add(arg);
        }
    }

    public boolean isMain() {
        return main;
    }

    public String getName() {
        return name;
    }

    public Attribute getAttribute() {
        return attribute;
    }

    public Selection getSelection() {
        if (constructor instanceof Selection) {
            return (Selection) constructor;
        } else {
            return null;
        }
    }

    /**
     * @param args  list of Arguments
     */
    public void translate(Ag semantics, Transport transport, Grammar grammar) throws GenericException {
        Selection selection;
        Function fn;
        int prod, alt, maxAlt;
        int user, maxUser;
        List args;
        List argAttrs;  // attributes from args, but re-arranged

        selection = getSelection();
        if (selection == null) {
            // Internal constructor, do nothing
            ((Internal) constructor).declare(attribute, semantics);
            return;
        }
        args = new ArrayList();
        translateArguments(transport, semantics, args);
        argAttrs = new ArrayList();
        fn = Conversion.find(selection, this, args, argAttrs);
        if (grammar.isTerminal(attribute.symbol)) {
            // inherited attributes
            maxUser = grammar.getUserCount(attribute.symbol);
            for (user = 0; user < maxUser; user++) {
                prod = grammar.getUser(attribute.symbol, user);
                maxAlt = grammar.getUserOfsCount(attribute.symbol, user);
                for (alt = 0; alt < maxAlt; alt++) {
                    semantics.add(createAB(attribute, prod,
                            grammar.getUserOfs(attribute.symbol, user, alt), fn, argAttrs));
                }
            }
        } else {
            // synthesized attributes
            maxAlt = grammar.getAlternativeCount(attribute.symbol);
            for (alt = 0; alt < maxAlt; alt++) {
                semantics.add(createAB(attribute, grammar.getAlternative(attribute.symbol, alt), -1,
                                       fn, argAttrs));
            }
        }
    }

    private static AttributionBuffer createAB(Attribute result, int prod, int ofs, Function fn, List argAttrs) {
        AttributionBuffer ab;
        int i;

        ab = new AttributionBuffer(prod, fn, new AttributeOccurrence(result, ofs));
        for (i = 0; i < argAttrs.size(); i++) {
            ab.add(new AttributeOccurrence((Attribute) argAttrs.get(i), ofs));
        }
        return ab;
    }

    private void translateArguments(Transport transport, Ag semantics, List args) throws GenericException {
        List sorted;
        int i;
        int max;
        Argument arg;

        max = mergeable.size();
        sorted = Argument.sortAndMergeArgs(this, mergeable);
        max = isolated.size();
        for (i = 0; i < max; i++) {
            arg = (Argument) isolated.get(i);
            arg.createTransport(semantics, transport);
            args.add(arg);
        }
        max = sorted.size();
        for (i = 0; i < max; i++) {
            arg = (Argument) sorted.get(i);
            arg.createTransport(semantics, transport);
            args.add(arg);
        }
    }

    @Override
    public String toString() {
        return "Definition " + name + " " + attribute;
    }
}
