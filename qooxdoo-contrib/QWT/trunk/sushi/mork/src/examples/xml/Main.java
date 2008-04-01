// §{{header}}:
//
// This is file examples/xml/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package xml;

import de.mlhartme.mork.mapping.Mapper;

/**
 * This is a kind of XML scanner. It does not read external entities; in fact, entities are
 * not processed at all ...
 */

public class Main {
    public static void main(String[] args) {
        int i;
        int ok;
        long tmp;

        if (args.length == 0) {
            System.out.println("XML Parser");
            System.out.println("usage: xml.Main <filename>+");
        } else {
            load();
            tmp = System.currentTimeMillis();
            ok = 0;
            for (i = 0; i < args.length; i++) {
                if (parse(args[i])) {
                    ok++;
                }
            }
            System.out.println(ok + "/" + args.length + " parsed successfully.");
            System.out.println((System.currentTimeMillis() - tmp) + " ms");
        }
    }

    private static Mapper mapper;

    private static void load() {
        long tmp;

        System.out.print("loading mapper ... ");
        tmp = System.currentTimeMillis();
        mapper = new Mapper("xml.Mapper");
        System.out.println("done (" + (System.currentTimeMillis() - tmp) + " ms)");
        if ("true".equals(System.getProperty("mork.verbose"))) {
            mapper.setLogging(System.out, null);
        }
    }

    private static boolean parse(String name) {
        return mapper.run(name) != null;
    }
}
