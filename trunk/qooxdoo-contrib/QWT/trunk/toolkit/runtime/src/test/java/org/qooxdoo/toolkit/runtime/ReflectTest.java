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

package org.qooxdoo.toolkit.runtime;

import org.junit.Test;

public class ReflectTest extends Base2 {
    @Test
    public void forName() throws Exception {
        expr("Class.forName(\"java.lang.String\")", ANY, ANY,
                "x instanceof java.lang.Class",
                "x.getName().toString() == 'java.lang.String'"
                );
    }
    
    @Test
    public void forNameNotFound() throws Exception {
        stmt("try {\n" +
             "  Class.forName(\"java.lang.String\");\n" +
             "  throw new RuntimeException();\n" +
             "} catch (ClassNotFoundException e) {\n" +
             "  // ok\n" +
             "}", ANY);
    }

    @Test
    public void getSuperclass() throws Exception {
        expr("new java.util.ArrayList().getClass().getSuperclass()", ANY, ANY,
                "x instanceof java.lang.Class",
                "x.getName().toString() == 'java.lang.Object'"
                );
    }
    
    @Test
    public void getInterfaces() throws Exception {
        expr("new java.lang.Object().getClass().getInterfaces().length", ANY, 0.0);
        expr("new java.util.ArrayList().getClass().getInterfaces().length", ANY, 1.0);
        expr("new java.util.ArrayList().getClass().getInterfaces()[0].getName()", ANY, "java.util.List");
    }
    
    @Test
    public void newInstance() throws Exception {
        expr("Class.forName(\"java.lang.String\").newInstance()", ANY, ANY,
                "x instanceof java.lang.String",
                "x == ''");
    }

    @Test
    public void field() throws Exception {
        unit("import java.lang.reflect.Field;\n" +
             "\n" +
             "class Empty {\n" +
             "  String a = \"2\";\n" +
             "  String b = \"3\";\n" +
             "  public static void run() throws Exception {\n" +
             "    Field[] fields;\n" +
             "    fields = Class.forName(\"Empty\").getDeclaredFields();\n" +
             "    if (fields.length != 2) {" +
             "      throw new RuntimeException(\"fields\");\n" +
             "    }\n" +
             "    Empty empty = new Empty();\n" +
             "    for (Field f : fields) {\n" +
             "      f.set(empty, f.getName());\n" +
             "      if (!f.get(empty).equals(f.getName())) {" +
             "        throw new RuntimeException(f.getName());\n" +
             "      }\n" +
             "    }\n" +
             "  }\n" +
             "}", ANY, "Empty.run()", ANY);
    }

    @Test
    public void method() throws Exception {
        unit("import java.lang.reflect.Method;\n" +
             "\n" +
             "class Meths {\n" +
             "  public void foo() {}\n" +
             "  public void bar() {}\n" +
             "  public static void run() throws Exception {\n" +
             "    Method[] methods;\n" +
             "    methods = Class.forName(\"Meths\").getDeclaredMethods();\n" +
             "    if (methods.length < 2) {" +
             "       throw new RuntimeException();\n" +
             "    }\n" +
             "  }\n" +
             "}", ANY, "Meths.run()", ANY);
    }
}
