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

package org.qooxdoo.sushi.mapping;

import org.qooxdoo.sushi.reflect.Composition;
import org.qooxdoo.sushi.reflect.Function;
import org.qooxdoo.sushi.reflect.Method;
import org.qooxdoo.sushi.reflect.Option;
import org.qooxdoo.sushi.semantics.Attribute;
import org.qooxdoo.sushi.semantics.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Singleton class (one instance per Mapping) to create functions for transport attribution.
 */
public class Transport {
    private final Function fnCopy;
    private final Function fnCreateOption;
    private final Function fnCreateSequence;
    private final Function fnCreateSequenceValue;
    private final Function fnCreateSequenceOption;
    private final Function fnSequenceAndValue;
    private final Function fnSequenceAndOption;
    private final Function fnSequenceAndSequence;

    public Transport() {
        fnCreateOption = get("createOption");
        fnCreateSequence = get("createSequence");
        fnCreateSequenceValue = get("createSequenceValue");
        fnCreateSequenceOption = get("createSequenceOption");
        fnSequenceAndValue = get("sequenceAndValue");
        fnSequenceAndOption = get("sequenceAndOption");
        fnSequenceAndSequence = get("sequenceAndSequence");
        fnCopy = get("copy");
    }

    private static Function get(String name) {
        Function fn;

        fn = Method.forName(Transport.class, name).getFunction();
        if (fn == null) {
            throw new RuntimeException("not found: " + name);
        }
        return fn;
    }

    //----------------------------------------------------------------

    /**
     * @param src   list of attributes
     */
    public Function getTransportFn(List<Attribute> src, int destCard) {
        Function tmp;
        int i, max, srcCard;
        String msg;

        switch (destCard) {
            case Type.OPTION:
                switch (src.size()) {
                    case 0:
                        return fnCreateOption;
                    case 1:
                        return fnCopy;
                    default:
                        msg = "no optional transport for this number of arguments: " + src.size();
                        throw new RuntimeException(msg);
                }
            case Type.VALUE:
                if (src.size() != 1) {
                    msg = "no value transport for this number of arguments: " + src.size();
                    throw new RuntimeException(msg);
                }
                return fnCopy;
            case Type.SEQUENCE:
                max = src.size();
                if (max == 0) {
                    return fnCreateSequence;
                } else {
                    srcCard = src.get(0).type.card;
                    tmp = getInitialSequence(srcCard);
                    for (i = 1; i < max; i++) {
                        srcCard = src.get(i).type.card;
                        tmp = Composition.create(getSequenceAnd(srcCard), 0, tmp);
                    }
                    return tmp;
                }
            default:
                throw new RuntimeException();
        }
    }

    private Function getInitialSequence(int cardinality) {
        switch (cardinality) {
            case Type.VALUE:
                return fnCreateSequenceValue;
            case Type.OPTION:
                return fnCreateSequenceOption;
            case Type.SEQUENCE:
                return fnCopy;
            default:
                throw new RuntimeException();
        }
    }

    private Function getSequenceAnd(int card) {
        switch (card) {
            case Type.VALUE:
                return fnSequenceAndValue;
            case Type.OPTION:
                return fnSequenceAndOption;
            case Type.SEQUENCE:
                return fnSequenceAndSequence;
            default:
                throw new RuntimeException();
        }
    }

    //-----------------------------------------------------------------
    // static functions for transport attribution

    public static Object createOption() {
        return Option.TAG;
    }
    public static Object createSequence() {
        return new ArrayList();
    }

    public static Object createSequenceOption(Object obj) {
        List result;

        result = new ArrayList();
        if (obj != Option.TAG) {
            result.add(obj);
        }
        return result;
    }

    public static Object createSequenceValue(Object obj) {
        List result;

        result = new ArrayList();
        result.add(obj);
        return result;
    }

    /** Copy anything, option, value or sequence. */
    public static Object copy(Object obj) {
        return obj;
    }

    public static Object sequenceAndOption(Object list, Object obj) {
        if (obj != Option.TAG) {
            ((List) list).add(obj);
        }
        return list;
    }
    public static Object sequenceAndValue(Object list, Object obj) {
        ((List) list).add(obj);
        return list;
    }
    public static Object sequenceAndSequence(Object list, Object operand) {
        ((List) list).addAll((List) operand);
        return list;
    }
}
