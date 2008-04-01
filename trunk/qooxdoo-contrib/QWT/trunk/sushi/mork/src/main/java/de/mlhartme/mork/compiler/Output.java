// §{{header}}:
//
// This is file src/de/mlhartme/mork/compiler/Output.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.mapping.PrintStreamErrorHandler;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;

/**
 * Global IO configuration. Public fields - global variables, to allow modifiction at any time.
 * Modification is necessary for file-specific settings, e.g. the listing stream.
 *
 * No code other than this class and the Main class should use System.out or System.err.
 */
public class Output extends PrintStreamErrorHandler {
    public PrintStream normal;
    public PrintStream verbose;
    public PrintStream verboseParsing;
    public PrintStream verboseAttribution;
    public PrintStream verboseTranslation;

    public PrintStream statistics;

    /**
     * A print-stream version the listing file for the current job --
     * null for no listing.
     */
    public PrintStream listing;

    public Output() {
        this(System.err);
    }

    public Output(PrintStream errors) {
        super(errors);

        normal = System.out;
        verbose = null;
        verboseParsing = null;
        verboseAttribution = null;
        verboseTranslation = null;

        statistics = null;
        listing = null;
    }

    //-----------------------------------------------------------
    // error and warning messages

    public void normal(String str) {
        if (normal != null) {
            normal.println(str);
        }
    }

    public void verbose(String str) {
        if (verbose != null) {
            verbose.println(str);
        }
    }

    public void statistics() {
        statistics("");
    }

    public void statistics(String str) {
        if (statistics != null) {
            statistics.println(str);
        }
    }

    //----------------------------------------------------------------
    // listing

    public void openListing(File listingFile) {
        if (listingFile != null) {
            try {
                listing = new PrintStream(new FileOutputStream(listingFile));
            } catch (FileNotFoundException e) {
                error(listingFile.getName(), "can't open listing file - listing disabled");
                listing = null;
            }
        } else {
            listing = null;
        }
    }

    public void listing(String str) {
        if (listing != null) {
            listing.println(str);
        }
    }
}
