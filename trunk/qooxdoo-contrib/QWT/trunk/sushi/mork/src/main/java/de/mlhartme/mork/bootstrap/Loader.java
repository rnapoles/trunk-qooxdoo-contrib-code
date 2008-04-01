// §{{header}}:
//
// This is file src/de/mlhartme/mork/bootstrap/Loader.java,
// Mork version 0.6 Copyright (c) 1998-2002  Michael Hartmeier
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
//
// §.

package de.mlhartme.mork.bootstrap;

import de.mlhartme.mork.compiler.GrammarSyntax;
import de.mlhartme.mork.compiler.Specification;
import de.mlhartme.mork.reflect.Constructor;
import de.mlhartme.mork.reflect.Function;
import de.mlhartme.mork.reflect.Method;
import de.mlhartme.mork.reflect.Selection;
import de.mlhartme.mork.util.Util;
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
        return (Specification) load("de.mlhartme.mork.bootstrap.MapperMapper", file);
    }

    public static GrammarSyntax loadGrammar(String file) {
        File absolute;

        absolute = Util.absoluteFile(new File(mapperFile).getParentFile(), file);
        return (GrammarSyntax) load("de.mlhartme.mork.bootstrap.GrammarMapper", absolute.getPath());
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
