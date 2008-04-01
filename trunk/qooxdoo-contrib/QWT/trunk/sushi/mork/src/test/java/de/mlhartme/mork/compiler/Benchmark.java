// §{{header}}:
//
// This is file tests/junit/de/mlhartme/mork/compiler/Benchmark.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.util.GenericException;
import de.mlhartme.mork.mapping.Mapper;
import java.io.File;
import java.io.IOException;
import junit.framework.TestCase;

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

    public static void run(boolean verbose, int count, Mapper mapper, String[] files)
        throws IOException
    {
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
