// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Main.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class Main {
    private static final String usage =
     "class file utility\n" +
     "usage: " +
     "java de.mlhartme.mork.classfile.Main (-test|-dump|-replace) file*\n" +
     "note: file is file name, not a class name\n";

    private static final int DUMP = 0;
    private static final int TEST = 1;
    private static final int REPLACE = 2;

    public static void main(String[] args) throws IOException {
        int i;
        String cmd;
        List errors;
        List exceptions;
        int mode;
        boolean result;

        if (args.length > 0) {
            cmd = args[0];
        } else {
            cmd = "none";
        }
        if (cmd.equals("-test")) {
            mode = TEST;
        } else if (cmd.equals("-replace")) {
            mode = REPLACE;
        } else if (cmd.equals("-dump")) {
            mode = DUMP;
        } else {
            mode = 0; // definite assignment
            System.out.println(usage);
            System.exit(-1);
        }

        errors = new ArrayList();
        exceptions = new ArrayList();
        for (i = 1; i < args.length; i++) {
            System.out.print(args[i]);
            try {
                switch (mode) {
                case DUMP:
                    result = dump(args[i]);
                    break;
                case TEST:
                    result = test(args[i]);
                    break;
                case REPLACE:
                    result = replace(args[i]);
                    break;
                default:
                    throw new RuntimeException("unkown mode: " + mode);
                }
                if (result) {
                    System.out.println(" \t ok");
                } else {
                    errors.add(args[i]);
                    System.out.println(" \t error");
                }
            } catch (Throwable e) {
                exceptions.add(args[i]);
                System.out.println(" \t exception: " + e);
                e.printStackTrace(System.out);
            }
        }
        System.out.println("files processed: " + (args.length - 1));
        System.out.println("errors: " + errors.size());
        System.out.println(errors.toString());
        System.out.println("exceptions: " + exceptions.size());
        System.out.println(exceptions.toString());
        System.exit(errors.size() + exceptions.size());
    }

    /**
     * Print the class file.
     */
    public static boolean dump(String name) throws IOException {
        System.out.println(listing(name));
        return true;
    }

    public static boolean replace(String name) throws IOException {
        ClassDef c;

        c = scan(name);
        Output.save(c, new File(name));
        return true;
    }


    /**
     * Test by semantically cloning. Reads specified class file, saves it
     * into another file and compares the listings of both files.
     * @return true for equals listings.
     */
    public static boolean test(String name)
        throws IOException
    {
        ClassDef c;
        String clonedName;
        String lst, clonedLst;

        c = Input.load(name);
        clonedName = name + ".cloned";
        Output.save(c, new File(clonedName));

        // verify

        lst = c.toString();
        clonedLst = listing(clonedName);
        if (lst.equals(clonedLst)) {
            if (!new File(clonedName).delete()) {
                throw new RuntimeException("can't delete " + clonedLst);
            }
            return true;
        } else {
            System.out.println(" diffs");
            log(name + ".lst" , lst);
            log(clonedName + ".lst" , clonedLst);
            return false;
        }
    }

    //--------------------------------------------------------------------

    public static String listing(String name) throws IOException {
        ClassDef c;

        c = scan(name);
        return c.toString();
    }

    public static ClassDef scan(String name) throws IOException {
        return Input.load(name);
    }

    public static void log(String fileName, String text) throws IOException {
        FileOutputStream dest;

        dest = new FileOutputStream(fileName);
        dest.write(text.getBytes());
        dest.close();
    }
}
