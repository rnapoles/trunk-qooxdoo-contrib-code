// §{{header}}:
//
// This is file src/de/mlhartme/mork/xml/XmlScannerFactory.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.xml;

import de.mlhartme.mork.scanner.Position;
import de.mlhartme.mork.scanner.Scanner;
import de.mlhartme.mork.scanner.ScannerFactory;
import de.mlhartme.mork.util.StringArrayList;
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
