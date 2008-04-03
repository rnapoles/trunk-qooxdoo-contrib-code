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

import org.qooxdoo.sushi.mapping.PrintStreamErrorHandler;
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
