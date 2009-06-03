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

import org.qooxdoo.sushi.misc.StringArrayList;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.sushi.scanner.Scanner;
import org.qooxdoo.sushi.scanner.ScannerFactory;
import java.io.IOException;
import java.io.Reader;

public class XmlScannerFactory implements ScannerFactory {
    private final StringArrayList symbolTable;

    /** indexed by elements (not start- or end-tags) */
    private final Attribute[][] attrs;

    private final int eofSymbol;

    public XmlScannerFactory(StringArrayList symbolTable, int eofSymbol, Attribute[][] attrs) {
        this.symbolTable = symbolTable;
        this.eofSymbol = eofSymbol;
        this.attrs = attrs;
    }

    public Scanner newInstance(Position pos, Reader src) throws IOException {
        XmlScanner scanner;

        scanner = new XmlScanner(symbolTable, eofSymbol, attrs);
        scanner.open(pos, src);
        return scanner;
    }
}
