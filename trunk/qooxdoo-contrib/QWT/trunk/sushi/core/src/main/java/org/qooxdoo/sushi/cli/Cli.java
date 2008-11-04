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

import java.util.Arrays;
import java.util.Locale;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;

/** 
 * Base class for classes with main methods. The command line is defined by annotating
 * derived classes as described for the parser class.
 */
public abstract class Cli {
    protected final Console console;
    protected final Schema schema;
    
    @Option("-pretend")
    protected boolean pretend;

    @Option("v")
    public void setVerbose(boolean v) {
        console.setVerbose(v);
    }

    public Cli() {
        this(new IO());
    }
    
    public Cli(IO io) {
        this.console = Console.create(io);
        this.schema = new ReflectSchema(io);
    }

    public abstract void printHelp();
    
    public int run(String... args) {
        Parser parser;
        Command command;
        
        parser = Parser.create(schema, getClass());
        try {
            command = (Command) parser.run(this, args);
            console.verbose.println("command line: " + Arrays.asList(args));
            if (pretend) {
                console.info.println("pretend-only, command " + command + " is not executed");
            } else {
                command.invoke();
            }
        } catch (ArgumentException e) {
            console.error.println(e.getMessage());
            console.info.println("Specify 'help' to get a usage message.");
            e.printStackTrace(console.verbose);
            return -1;
        } catch (RuntimeException e) {
            console.error.println(e.getMessage());
            e.printStackTrace(console.error);
            return -1;
        } catch (Exception e) {
            console.error.println(e.getMessage());
            e.printStackTrace(console.verbose);
            return -1;
        }
        return 0;
    }  
    
    @Child("help")
    public Command help() {
        return new Command() {
            public void invoke() throws Exception {
                printHelp();
            }
        };
    }
    
    @Child("version")
    public Command version() {
        return new Command() {
            public void invoke() throws Exception {
                Package pkg;
                
                pkg = getClass().getPackage();
                if (pkg == null) {
                    console.info.println("unkown version");
                } else {
                    console.info.println(pkg.getName());
                    console.info.println("  specification title: " + pkg.getSpecificationTitle());
                    console.info.println("  specification version: " + pkg.getSpecificationVersion());
                    console.info.println("  specification vendor: " + pkg.getSpecificationVendor());
                    console.info.println("  implementation title: " + pkg.getImplementationTitle());
                    console.info.println("  implementation version: " + pkg.getImplementationVersion());
                    console.info.println("  implementation vendor: " + pkg.getImplementationVendor());
                }
                console.verbose.println("Platform encoding: " + System.getProperty("file.encoding"));
                console.verbose.println("Default Locale: " + Locale.getDefault());
                console.verbose.println("Scanner Locale: " + console.input.locale());
            }
        };
    }
}
