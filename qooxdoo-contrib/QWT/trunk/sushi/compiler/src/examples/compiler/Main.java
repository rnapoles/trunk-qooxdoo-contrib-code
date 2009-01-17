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

package compiler;

import java.io.File;
import java.io.IOException;

import org.qooxdoo.sushi.classfile.Access;
import org.qooxdoo.sushi.classfile.ClassDef;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.MethodDef;
import org.qooxdoo.sushi.classfile.Output;

import org.qooxdoo.sushi.mapping.Mapper;

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
        m.accessFlags = Access.fromArray(Access.PUBLIC, Access.STATIC);
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
