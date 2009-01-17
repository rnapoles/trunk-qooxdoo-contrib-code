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

package xml;

import org.qooxdoo.sushi.mapping.Mapper;

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
