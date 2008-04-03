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

package org.qooxdoo.sushi.bootstrap;

import org.qooxdoo.sushi.compiler.GrammarSyntax;
import org.qooxdoo.sushi.compiler.Specification;
import org.qooxdoo.sushi.reflect.Constructor;
import org.qooxdoo.sushi.reflect.Function;
import org.qooxdoo.sushi.reflect.Method;
import org.qooxdoo.sushi.reflect.Selection;
import org.qooxdoo.sushi.util.Util;
import java.io.File;

/**
 * Loads an 0.4 mapper and runs it. Uses reflection, otherwise, I'd always need bsMork in my
 * classpath. Caution: this class is *not* for stub code to map to!
 */
public class Loader {
    // holds the last mapper file name loaded;  this is kind of ugly, but setting up/using
    // "[env]" is tedious since I'd have to use reflection ...
    private static String mapperFile;

    public static Specification loadMapper(String file) {
        mapperFile = file;
        return (Specification) load("org.qooxdoo.sushi.bootstrap.MapperMapper", file);
    }

    public static GrammarSyntax loadGrammar(String file) {
        File absolute;

        absolute = Util.absoluteFile(new File(mapperFile).getParentFile(), file);
        return (GrammarSyntax) load("org.qooxdoo.sushi.bootstrap.GrammarMapper", absolute.getPath());
    }

    // returns null if an error has been reported
    private static Object load(String mapperName, String file) {
        Selection selection;
        Function loader;
        Object mapper;
        Function fn;
        Object[] objs;
        String name;

        name = "de.mlhartme.mxxx.mapping.Mapper";
        selection = Constructor.forName(name);
        selection = selection.restrictArgumentType(0, String.class);
        selection = selection.restrictArgumentCount(1);
        if (selection.size() != 1) {
            System.err.println("constructor not found: " + name);
            return null;
        }
        loader = selection.getFunction();
        try {
            mapper = loader.invokeN(mapperName);
        } catch (Exception e) {
            System.err.println("loading " + mapperName + " failed: " +
                               e.getClass().getName() + " " + e.getMessage());
            e.printStackTrace();
            return null;
        }
        try {
            selection = Method.forName(name + ".run");
            selection = selection.restrictArgumentType(1, String.class);
            selection = selection.restrictArgumentCount(2);
            fn = selection.getFunction();
            objs = (Object[]) fn.invokeN(mapper, file);
        } catch (Exception e) {
            System.err.println("running " + mapperName + " failed: " +
                            e.getClass().getName() + " " + e.getMessage());
            e.printStackTrace();
            return null;
        }
        if (objs == null) {
            return null;
        } else {
            return objs[0];
        }
    }
}
