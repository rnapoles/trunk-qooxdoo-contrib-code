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

import org.qooxdoo.sushi.misc.GenericException;
import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.scanner.Position;

public class Attribute {
    // coding for defaultMode
    public static final int REQUIRED = 0;
    public static final int IMPLIED = 1;
    public static final int FIXED = 2;
    public static final int NONE = 3;

    private int element;
    private String attributeName; // name without element name prefix
    private int terminal;

    private int defaultMode;

    /** only defined for defaultMode FIXED and NONE. */
    private String defaultValue;

    public Attribute(
        int element, String attributeName, int terminal, int defaultMode, String defaultValue)
    {
        this.element = element;
        this.attributeName = attributeName;
        this.terminal = terminal;
        this.defaultMode = defaultMode;
        this.defaultValue = defaultValue;
    }

    /** @return true if the parser sees this attribute optionally. */
    public boolean isOptional() {
        return (defaultMode == IMPLIED);
    }

    public String setDefault(Position pos, String supplied) throws IllegalToken {
        switch (defaultMode) {
            case REQUIRED:
                if (supplied == null) {
                    throw new IllegalToken(pos, "missing attribute");
                }
                return supplied;
            case IMPLIED:
                return supplied;
            case FIXED:
                if (!defaultValue.equals(supplied)) {
                    throw new IllegalToken(pos, "invalue fixed value: " +
                                           supplied + " != " + defaultValue);
                }
                return supplied;
            case NONE:
                if (supplied != null) {
                    return supplied;
                } else {
                    return defaultValue;
                }
            default:
                throw new RuntimeException();
        }
    }

    public Attribute(String elementName, String attributeName,
                     String defaultValue, StringArrayList symbolTable, Object type, int defaultMode)
        throws GenericException {
        String tmp;

        this.attributeName = attributeName;
        this.defaultMode = defaultMode;
        this.defaultValue = defaultValue;

        element = symbolTable.indexOf(elementName);
        if (element == -1) {
            throw new GenericException("undefined element: " + elementName);
        }
        tmp = XmlSyntax.toAttribute(elementName, attributeName);
        if (symbolTable.indexOf(tmp) != -1) {
            throw new GenericException("duplicate definition: " +
                                           attributeName);
        }
        terminal = symbolTable.size();
        symbolTable.add(tmp);
    }

    public String getName() {
        return attributeName;
    }

    public int getElement() {
        return element;
    }

    public int getTerminal() {
        return terminal;
    }
}
