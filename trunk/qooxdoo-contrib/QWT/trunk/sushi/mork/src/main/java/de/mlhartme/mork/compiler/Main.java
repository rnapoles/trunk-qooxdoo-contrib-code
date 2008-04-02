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

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.util.GenericException;
import java.util.Arrays;

/**
 * Kick off code for the compiler, connects the Mork class with the operating system's command line.
 * I.e it defines the main method. Knowledge about command line syntax goes here, not into the Mork
 * class.
 */
public class Main {
    /**
     * Parse command-line and compile the specified files. Use <code>mainWithoutExit</code>
     * instead if you want to avoid <code>System.exit()</code>
     */
    public static void main(String[] args) {
        Main main;
        int result;

        main = new Main(new Output());
        result = main.run(args);
        System.exit(result);
    }

    // global options.
    private Output output;
    private Function mapperFn;

    public Main(Output output) {
        this.output = output;
        this.mapperFn = null;
    }

    // some exit codes
    public static final int INTERNAL_ERROR = -42;
    public static final int COMMANDLINE_ERROR = -43;
    public static final int COMPILE_ERROR = -44;
    public static final int HELP = -45;

    /**
     * Wraps <code>runCore</code> to catch unchecked exceptions and report them
     * as internal errors.
     */
    public int run(String[] args) {
        try {
            return runCore(args);
        } catch (Throwable e) {
            printInternalError(args, e);
            return INTERNAL_ERROR;
        }
    }

    /** does not catch Throwable **/
    public int runCore(String[] args) throws Throwable {
        Mork mork;
        Job[] jobs;
        int i;

        jobs = parseOptions(args);
        if (jobs == null) {
            return COMMANDLINE_ERROR;
        }
        if (jobs.length == 0) {
            printHelp();
            return HELP;
        }
        mork = new Mork(output, mapperFn);
        for (i = 0; i < jobs.length; i++) {
            if (!mork.compile(jobs[i])) {
                return COMPILE_ERROR;
            }
        }
        return 0;
    }

    /**
     * @return null if errors have been reported
     */
    public Job[] parseOptions(String[] args) {
        int i;
        String opt;
        Job[] jobs;
        // global options propagated into all jobs:
        boolean touch;
        String outputPath;
        boolean listing;
        String ERROR_POS = "mork";

        touch = false;
        outputPath = null;
        listing = false;
        for (i = 0; i < args.length; i++) {
            opt = args[i];
            if (opt.equals("-help") || opt.equals("-h")) {
                return new Job[0];
            }
            if (opt.equals("-quiet")) {
                output.verbose = null;
            } else if (opt.equals("-verbose")) {
                output.verbose = System.out;
            } else if (opt.equals("-verbose:parsing")) {
                output.verboseParsing = System.out;
            } else if (opt.equals("-verbose:attribution")) {
                output.verboseAttribution = System.out;
            } else if (opt.equals("-verbose:translation")) {
                output.verboseTranslation = System.out;
            } else if (opt.equals("-lst")) {
                listing = true;
            } else if (opt.equals("-stat")) {
                output.statistics = System.out;
            } else if (opt.equals("-d")) {
                if (i + 1 >= args.length) {
                    output.error(ERROR_POS, "missing directory name");
                    return null;
                }
                i++;
                outputPath = args[i];
            } else if (opt.equals("-mapper")) {
                if (i + 1 >= args.length) {
                    output.error(ERROR_POS, "missing function mapper name");
                    return null;
                }
                i++;
                try {
                    mapperFn = MorkMapper.lookupMapperFn(args[i], Specification.class);
                } catch (GenericException e) {
                    output.error(ERROR_POS, e);
                }
            } else if (opt.startsWith("-")) {
                output.error(ERROR_POS, "unkown option: " + opt);
                return null;
            } else {
                break;
            }
        }

        jobs = new Job[args.length - i];
        for (int j = i; j < args.length; j++) {
            try {
                jobs[j - i] = new Job(outputPath, listing, args[j]);
            } catch (GenericException e) {
                output.error(ERROR_POS, e);
                return null;
            }
        }
        return jobs;
    }

    public static final String USAGE =
      "usage: \"mork\" option* mapfile*\n"
    + "option:\n"
    + " -help                 print this message and quit\n"
    + " -stat                 print mapper statistics\n"
    + " -lst                  generate mapper listing\n"
    + " -d directory          sets the destination directory for class files\n"
    + " -quiet                suppress normal progress information\n"
    + " -verbose              issue overall progress information\n"
    + " -verbose:parsing      issue scanner and parsing progress information\n"
    + " -verbose:attribution  issue attribution progress information\n";

    public void printHelp() {
        output.normal("Mork compiler tool. ");
        output.normal("Version " + getVersion());
        output.normal("Copyright (C) Michael Hartmeier 1998-2002");
        output.normal("");
        output.normal(USAGE);
    }

    /* TODO: conditional compilation -- Package is not available when compiling with gcj, use:
       public String getVersion() {
           return null;
       }
     */
    public String getVersion() {
        Package p;

        p = getClass().getPackage();
        if (p == null) {
            // mork has not been started from a jar file
            return "(unkown)";
        } else {
            return p.getSpecificationVersion()  + " (" + p.getImplementationVersion() + ")";
        }
    }

    // this should be the only method writing directly to System.err. All other code throught
    // all packages should use configurable PrintWriters
    private void printInternalError(String[] args, Throwable e) {
        System.err.println("Internal error. ");
        System.err.print("Please visit http://sourceforge.net/projects/mork and ");
        System.err.println("report the problem (Bugs -> Create New).");
        System.err.println("Include the following information:");
        printSystemProperty("os.name");
        printSystemProperty("os.version");
        printSystemProperty("java.version");
        printSystemProperty("java.vendor");
        printSystemProperty("java.vm.version");
        printSystemProperty("java.vm.vendor");
        printSystemProperty("java.vm.name");
        printSystemProperty("java.class.path");
        printProperty("Mork version", getVersion());
        printProperty("command-line arguments", Arrays.asList(args).toString());
        printProperty("exception type", e.getClass().getName());
        printProperty("exception message", e.getMessage());
        printProperty("exception toString", e.toString());
        printProperty("exception stacktrace", "");
        e.printStackTrace();
    }

    private void printSystemProperty(String name) {
        printProperty(name, System.getProperty(name));
    }

    private static final int WIDTH = 24;

    private void printProperty(String name, String value) {
        int i;

        for (i = name.length(); i < WIDTH; i++) {
            System.err.print(' ');
        }
        System.err.print(name);
        System.err.print(": ");
        System.err.println(value);
    }
}
