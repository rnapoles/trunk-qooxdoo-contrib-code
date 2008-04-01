// §{{header}}:
//
// This is file examples/jp/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package jp;

import de.mlhartme.mork.mapping.Mapper;

public class Main {
    public static void main(String[] args) {
        int i;
        int ok;
        long tmp;

        if (args.length == 0) {
            System.out.println("Java Parser");
            System.out.println("usage: jp.Main <filename>+");
        } else {
            load();
            // mapper.log(System.out, null);
            tmp = System.currentTimeMillis();
            ok = 0;
            for (i = 0; i < args.length; i++) {
                if (parse(args[i])) {
                    ok++;
                }
            }
            System.out.println(ok + "/" + args.length + " parsed successfully.");
            System.out.println((System.currentTimeMillis() - tmp) + " ms");
            System.exit(args.length - ok);
        }
    }

    private static Mapper mapper;

    private static void load() {
        long tmp;

        System.out.print("loading mapper ... ");
        tmp = System.currentTimeMillis();
        mapper = new Mapper("jp.Mapper");
        System.out.println("done (" + (System.currentTimeMillis() - tmp) + " ms)");
    }

    private static boolean parse(String name) {
        System.out.println(name + ":");
        return mapper.run(name) != null;
    }
}
