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

import java.io.File;
import java.io.IOException;

import org.qooxdoo.sushi.mapping.Mapper;

public class Benchmark {
    public static void main(String[] args) {
        System.exit(run(args));
    }

    public static int run(String[] args) {
        try {
            runUnchecked(args);
            return 0;
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return -1;
        }
    }

    public static void runUnchecked(String[] args) throws IOException {
        int num;
        Mapper mapper;
        String[] files;

        if (args.length < 3) {
            throw new IOException("usage: \"benchmark\" count mapper file+");
        }
        try {
            num = Integer.parseInt(args[0]);
        } catch (NumberFormatException e) {
            throw new IOException("not a number: " + args[0]);
        }
        mapper = new Mapper(args[1]);
        files = new String[args.length - 2];
        System.arraycopy(args, 2, files, 0, files.length);
        run(false, num, mapper, files);
    }

    public static void run(boolean verbose, int count, Mapper mapper, String[] files) throws IOException {
        int i;
        int j;
        Object[] result;

        for (i = 0; i < count; i++) {
            if (verbose) {
                System.out.print("" + i);
            }
            for (j = 0; j < files.length; j++) {
                if (verbose) {
                    System.out.print(".");
                }
                result = mapper.run(new File(files[j]));
                if (result == null) {
                    throw new IOException("error mapping " + files[j]);
                }
            }
            if (verbose) {
                System.out.println();
            }
        }
    }
}
