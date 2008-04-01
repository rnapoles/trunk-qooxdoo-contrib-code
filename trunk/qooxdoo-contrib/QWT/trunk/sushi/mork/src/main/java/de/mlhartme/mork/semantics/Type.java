// §{{header}}:
//
// This is file src/de/mlhartme/mork/semantics/Type.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.semantics;

import org.qooxdoo.sushi.classfile.ClassRef;

/**
 * Type of an attribute. Immutable, can safely be shared.
 */

public class Type {
    // Cardinality. Decodes priorities when alternating variables
    public static final int VALUE = 0;
    public static final int OPTION = 1;
    public static final int SEQUENCE = 2;

    //----------------------------------------------------------------

    public final Class type; // non-primitive types only
    public final int card;

    //-----------------------------------------------------------------

    public Type(Class type) {
        this(type, VALUE);
    }

    public Type(Class type, int card) {
        if (type.isPrimitive()) {
            throw new IllegalArgumentException();
        }
        this.type = type;
        this.card = card;
    }

    public static int cardCard(int first, int second) {
        if (first == SEQUENCE || second == SEQUENCE) {
            return SEQUENCE;
        }
        if (first == OPTION || second == OPTION) {
            return OPTION;
        }
        return VALUE;
    }

    public boolean equals(Object obj) {
        Type operand;

        if (obj instanceof Type) {
            operand = (Type) obj;
            return
                (card == operand.card) && (type.equals(operand.type));
        } else {
            return false;
        }
    }

    public Type option() {
        if (card >= OPTION) {
            return this;
        } else {
            return new Type(type, OPTION);
        }
    }

    public Type sequence() {
        return new Type(type, SEQUENCE);
    }

    public Type alternate(Type operand) {
        Class tmp;

        tmp = ClassRef.commonBase(type, operand.type);
        return new Type(tmp, Math.max(card, operand.card));
    }

    public String toString() {
        return type.getName() + cardString();
    }

    public String cardString() {
        switch (card) {
        case VALUE:
            return "";
        case OPTION:
            return "?";
        case SEQUENCE:
            return "*";
        default:
            throw new RuntimeException();
        }
    }
}
