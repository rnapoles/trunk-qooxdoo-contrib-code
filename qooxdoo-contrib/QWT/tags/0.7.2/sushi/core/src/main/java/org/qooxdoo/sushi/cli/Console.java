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

package org.qooxdoo.sushi.cli;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.MultiOutputStream;

/**
 * Configurable replacement for System.out, System.err and System.in. 
 * TODO: name clash with java.io.Console in Java 6. 
 */
public class Console {
    public static Console create(IO io) {
        return new Console(io, System.out, System.err);
    }
    
    public final IO io;
    public final PrintStream info;
    public final PrintStream verbose;
    public final PrintStream error;
    
    private final MultiOutputStream verboseSwitch;
    
    public Console(IO io, PrintStream info, PrintStream error) {
        this.io = io;
        this.info = info;
        this.verboseSwitch = MultiOutputStream.createNullStream();
        this.verbose = new PrintStream(verboseSwitch);
        this.error = error;
    }
    
    public boolean getVerbose() {
        return verboseSwitch.dests().size() == 1;
    }
    
    public void setVerbose(boolean verbose) {
        verboseSwitch.dests().clear();
        if (verbose) {
            verboseSwitch.dests().add(info);
        }
    }
    
    public void pressReturn() throws IOException {
        info.println("Press return to continue, ctrl-C to abort.");
        new BufferedReader(new InputStreamReader(System.in)).readLine();
    }
}
