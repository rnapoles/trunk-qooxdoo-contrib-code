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

package org.qooxdoo.sushi.cli;

import java.io.IOException;
import java.io.PrintStream;
import java.util.Scanner;

import org.qooxdoo.sushi.fs.IO;
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
    public final Scanner input;
    
    private final MultiOutputStream verboseSwitch;
    
    public Console(IO io, PrintStream info, PrintStream error) {
        this.io = io;
        this.info = info;
        this.verboseSwitch = MultiOutputStream.createNullStream();
        this.verbose = new PrintStream(verboseSwitch);
        this.error = error;
        this.input = new Scanner(System.in);
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
        readline("Press return to continue, ctrl-C to abort.\n");
    }

    public String readline(String message) throws IOException {
        return readline(message, "");
    }

    public String readline(String message, String dflt) throws IOException {
        String str;
        
        info.print(message);
        str = input.nextLine();
        if (str.length() == 0) {
            return dflt;
        } else {
            return str;
        }
    }
}
