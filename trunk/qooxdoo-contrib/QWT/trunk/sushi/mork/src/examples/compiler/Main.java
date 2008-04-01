// §{{header}}:
//
// This is file examples/compiler/Main.java,
// Mork version 0.6  Copyright § 1998-2002  Michael Hartmeier
//
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package compiler;

import de.mlhartme.mork.classfile.Access;
import de.mlhartme.mork.classfile.ClassDef;
import de.mlhartme.mork.classfile.ClassRef;
import de.mlhartme.mork.classfile.MethodDef;
import de.mlhartme.mork.classfile.Output;
import de.mlhartme.mork.mapping.Mapper;
import java.io.File;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        int i;
        int ok;
        long tmp;

        if (args.length == 0) {
            System.out.println("Example compiler");
            System.out.println("usage: compiler.Main <filename>+");
        } else {
            System.out.print("loading mapper ... ");
            tmp = System.currentTimeMillis();
            mapper = new Mapper("compiler.Mapper");
            System.out.println("done (" + (System.currentTimeMillis() - tmp)
                             + " ms)");
            tmp = System.currentTimeMillis();
            ok = 0;
            for (i = 0; i < args.length; i++) {
                if (compile(args[i])) {
                    ok++;
                }
            }
            System.out.println(ok + "/" + args.length +
                               " compiled successfully.");
            System.out.println((System.currentTimeMillis() - tmp) + " ms");
        }
    }

    private static Mapper mapper;

    private static boolean compile(String fileName) throws IOException {
        Object[] result;
        Program program;
        ClassDef c;
        MethodDef m;
        String n;

        System.out.println(fileName + ":");
        result = mapper.run(fileName);
        if (result == null) {
            return false;
        }
        program = (Program) result[0];
        c = new ClassDef(new ClassRef(getClassName(fileName)), ClassRef.OBJECT);
        m = new MethodDef();
        m.name = "main";
        m.accessFlags = Access.PUBLIC | Access.STATIC;
        m.attributes.add(program.translate());
        m.argumentTypes =
            new ClassRef[] { new ClassRef("java.lang.String", 1) };
        m.returnType = ClassRef.VOID;
        c.methods.add(m);
        if (fileName.endsWith(".prog")) {
            n = fileName.substring(0, fileName.length() - 5);
        } else {
            n = fileName;
        }
        Output.save(c, new File(n + ".class"));
        return true;
    }

    private static String getClassName(String fileName) {
        String name;
        int idx;

        name = new File(fileName).getName();
        idx = name.indexOf('.');
        if (idx == -1) {
            return name;
        } else {
            return name.substring(0, idx);
        }
    }
}
