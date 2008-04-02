/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package de.mlhartme.mork.xml;

import de.mlhartme.mork.regexpr.Choice;
import de.mlhartme.mork.regexpr.Loop;
import de.mlhartme.mork.regexpr.RegExpr;
import de.mlhartme.mork.regexpr.Symbol;
import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.util.StringArrayList;

/** Helper methods used by DtdMapper.map. */
public class Stubs {
    public static final int NOP = 0;
    public static final int OPTION = 1;
    public static final int STAR = 2;
    public static final int PLUS = 3;

    //--
    public static Object rule(String name, RegExpr content) {
        return new Object[] { name, content };
    }

    public static StringArrayList symbolTable(String[] names) {
        StringArrayList table;
        int i;

        table = new StringArrayList();
        table.add(XmlScanner.PCTEXT_NAME);
        for (i = 0; i < names.length; i++) {
            table.add(names[i]);
        }

        return table;
    }

    //--

    public static RegExpr unary(RegExpr re, int op) {
        switch (op) {
        case NOP:
            return re;
        case OPTION:
            return Choice.createOption(re);
        case STAR:
            return Loop.createStar(re);
        case PLUS:
            return new Loop(re);
        default:
            throw new IllegalArgumentException("unkown op: " + op);
        }
    }

    public static RegExpr mixed(int i) throws GenericException {
        if (i == -1) {
            throw new GenericException("mixed content not supported");
        }
        return Choice.createOption(new Symbol(XmlScanner.PCTEXT));
    }

    public static Symbol lookup(StringArrayList symbolTable, String name)
        throws GenericException
    {
        int idx;

        idx = symbolTable.indexOf(name);
        if (idx == -1) {
            throw new GenericException("undefined element: " + name);
        }
        return new Symbol(idx);
    }

    public static String removeQuotes(String str) {
        if (str == null) {
            return null;
        }
        return str.substring(1, str.length() - 1);
    }
}
