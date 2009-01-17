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
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

import org.qooxdoo.sushi.classfile.Access;
import org.qooxdoo.sushi.classfile.Bytecodes;
import org.qooxdoo.sushi.classfile.ClassDef;
import org.qooxdoo.sushi.classfile.ClassRef;
import org.qooxdoo.sushi.classfile.Code;
import org.qooxdoo.sushi.classfile.Output;

import org.qooxdoo.sushi.mapping.Mapper;
import org.qooxdoo.sushi.misc.GenericException;


public class MapperCompiler implements Bytecodes {
    private org.qooxdoo.sushi.compiler.Output output;

    public MapperCompiler(org.qooxdoo.sushi.compiler.Output output) {
        this.output = output;
    }

    /**
     * @param mapperName      mapper name as specified in the map file.
     * @param specFile        file that specified the mapper
     * @param outputDir       "-d", points to a directory or null.
     */
    public void run(Mapper mapper, String mapperName, File src, File explicitOutputDir) throws GenericException {
        String baseName;
        File outputDir;  // directory to write all class files to

        String mapperClassName;
        File mapperFile;
        String functionClassName;
        String functionFileBase;

        ClassDef c;
        FunctionCompiler fc;

        baseName = mapperName.substring(mapperName.lastIndexOf('.') + 1);
          // also ok of idx -1
        outputDir = outputDir(src, explicitOutputDir, mapperName);

        mapperClassName = mapperName;
        mapperFile = new File(outputDir, baseName + ".class");
        functionClassName = mapperName + "Functions";
        functionFileBase = new File(outputDir, baseName + "Functions").getPath();

        fc = new FunctionCompiler(functionClassName);
        customs[0] = fc;
        output.verbose("translating " + mapperClassName);
        c = translate(mapper, mapperClassName);

        output.verbose("writing " + mapperFile);
        try {
            Output.save(c, mapperFile);
        } catch (IOException e) {
            output.error(mapperFile.toString(), "write failed: " + e);
        }
        try {
            fc.save(functionFileBase);
        } catch (IOException e) {
            output.error(functionFileBase.toString(), "write failed: " + e);
        }
        output.verbose("done");
    }

    /** creates new directory if necessary. */
    public File outputDir(File src, File explicitOutputDir, String mapperName) throws GenericException {
        File outputDir;
        int prev;
        int idx;
        File subDir;

        if (explicitOutputDir == null) {
            outputDir = src.getParentFile();
        } else {
            outputDir = explicitOutputDir;
            idx = mapperName.indexOf('.');
            prev = 0;
            while (idx != -1) {
                subDir = new File(outputDir, mapperName.substring(prev, idx));
                if (!subDir.isDirectory()) {
                    if (!subDir.mkdir()) {
                        throw new GenericException("cannot create directory: " + subDir);
                    }
                }
                prev = idx + 1;
                idx = mapperName.indexOf('.', prev);
                outputDir = subDir;
            }
        }
        return outputDir;
    }

    private ClassDef translate(Mapper mapper, String className) {
        ClassDef result;
        ObjectCompiler compiler;
        Code code;

        code = new Code();
        code.locals = 1; // this
        result = createClass(className, code);
        compiler = new ObjectCompiler(code, code.allocate(ClassRef.INT), customs, result);
        code.emit(LDC, 2);
        code.emit(ANEWARRAY, ClassRef.OBJECT); // this, the new Mapper
        code.emit(DUP);
        code.emit(LDC, 0);
        compiler.run(mapper.getParser());
        code.emit(AASTORE);
        code.emit(DUP);
        code.emit(LDC, 1);
        compiler.run(mapper.getSemantics());
        code.emit(AASTORE);
        code.emit(ARETURN);
        return result;
    }

    private ClassDef createClass(String className, Code code) {
        ClassDef result;

        result = new ClassDef(new ClassRef(className), ClassRef.OBJECT);
        result.addMethod(Access.fromArray(Access.PUBLIC, Access.STATIC),
                         ClassRef.OBJECT, "load", ClassRef.NONE, code);
        return result;
    }

    //------------------------------------------------------------------
    // declarations how to compile the various classes

    private static CustomCompiler[] customs = {
        null,  // reserved for function compiler
        new GenericCompiler(org.qooxdoo.sushi.grammar.Rule.class,
            new String[] { "left", "right" }),
        new GenericCompiler(org.qooxdoo.sushi.parser.ParserTable.class,
            new String[] { "startState", "symbolCount", "getStateCount",
                           "packValues", "lengths", "lefts", "modes" }),
        new GenericCompiler(org.qooxdoo.sushi.semantics.Attribution.class,
            new String[] { "function", "resultOfs", "resultAttr", "argsOfs", "argsAttr"}),
        new GenericCompiler(org.qooxdoo.sushi.semantics.Oag.class,
            new String[] { "visits", "internalAttrs" }),
        new GenericCompiler(org.qooxdoo.sushi.semantics.Visits.class,
            new String[] { "visits" }),
        new GenericCompiler(org.qooxdoo.sushi.parser.Parser.class,
            new String[] { "table", "scannerFactory"}),
        new GenericCompiler(org.qooxdoo.sushi.scanner.GrammarScannerFactory.class,
            new String[] { "start", "modeCount", "eofSymbol", "data" }),
        new GenericCompiler(org.qooxdoo.sushi.xml.XmlScannerFactory.class,
            new String[] { "symbolTable", "eofSymbol", "attrs"}),
        new GenericCompiler(org.qooxdoo.sushi.xml.Attribute.class,
            new String[] { "element", "attributeName", "terminal", "defaultMode", "defaultValue" }),
        new GenericCompiler(org.qooxdoo.sushi.util.IntBitSet.class,
            new String[] { "data" }),
        new GenericCompiler(org.qooxdoo.sushi.util.IntArrayList.class,
            new String[] { "size", "data" }),
        new GenericCompiler(org.qooxdoo.sushi.misc.StringArrayList.class,
            new String[] { "size", "data" }),
        new GenericCompiler(java.lang.Integer.class,
            new String[] {
                "org.qooxdoo.sushi.compiler.MapperCompiler.saveInteger" },
                "org.qooxdoo.sushi.compiler.MapperCompiler.loadInteger"),
        new GenericCompiler(java.lang.Class.class,
            new String[] {
                "org.qooxdoo.sushi.compiler.MapperCompiler.saveClass" },
                "org.qooxdoo.sushi.compiler.MapperCompiler.loadClass"),
        new GenericCompiler(java.lang.reflect.Constructor.class,
            new String[] { "getDeclaringClass", "getParameterTypes" },
            "org.qooxdoo.sushi.compiler.MapperCompiler.loadConstructor"),
        new GenericCompiler(java.lang.reflect.Method.class,
            new String[] { "getDeclaringClass", "getName", "getParameterTypes" },
            "org.qooxdoo.sushi.compiler.MapperCompiler.loadMethod"),
        new GenericCompiler(java.lang.reflect.Field.class,
            new String[] { "getDeclaringClass", "getName" },
            "org.qooxdoo.sushi.compiler.MapperCompiler.loadField")
    };

    //----------------------------------------------------------------
    // static "constructor" code for various GenericCompiler

    public static int saveInteger(Integer i) {
        return i.intValue();
    }

    public static Integer loadInteger(int i) {
        return new Integer(i);
    }

    public static String saveClass(Class<?> c) {
        return new ClassRef(c).toFieldDescriptor();
    }

    public static Class<?> loadClass(String name) {
        return ClassRef.forFieldDescriptor(name).lookup();
    }

    public static Field loadField(Class<?> type, String name) throws NoSuchFieldException {
        return type.getDeclaredField(name);
    }

    public static Constructor<?> loadConstructor(Class<?> type, Class<?>[] args) throws NoSuchMethodException {
        return type.getDeclaredConstructor(args);
    }

    public static Method loadMethod(Class<?> type, String name, Class<?>[] args) throws NoSuchMethodException {
        return type.getDeclaredMethod(name, args);
    }
}
