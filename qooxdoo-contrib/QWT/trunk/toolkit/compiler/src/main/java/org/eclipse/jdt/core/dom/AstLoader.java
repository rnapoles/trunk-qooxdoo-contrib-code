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

package org.eclipse.jdt.core.dom;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.eclipse.jdt.internal.compiler.batch.FileSystem;
import org.eclipse.jdt.internal.compiler.env.INameEnvironment;
import org.eclipse.jdt.internal.compiler.impl.CompilerOptions;
import org.eclipse.jdt.internal.core.BasicCompilationUnit;

import org.qooxdoo.sushi.fs.Node;

public class AstLoader {
    public static List<CompilationUnit> run(List<Node> classpath, List<? extends Node> sources) throws IOException {
        BasicCompilationUnit[] units;
        int i;
        Map<String, String> options;
        AstCompiler compiler;
        
        units = new BasicCompilationUnit[sources.size()];
        i = 0;
        for (Node node : sources) {
            units[i++] = new BasicCompilationUnit(node.readString().toCharArray(), null, node.toString());
        }
        options = options();
        compiler = new AstCompiler(environment(classpath), AstLoader.compilerOptions(options));
        return compiler.resolve(units, AST.JLS3, options);
    }

    //-- 
    
    public static INameEnvironment environment(List<Node> classpath) throws IOException {
        String[] cp;
        int i;
        
        cp = new String[classpath.size()];
        i = 0;
        for (Node node : classpath) {
            node.checkExists();
            cp[i++] = node.getAbsolute();
        }
        return new FileSystem(cp, new String[] {}, null);
    }

    public static Map<String, String> options() {
        Properties props;
        Map<String, String> map;
        
        props = new Properties();
        try {
            props.load(AstLoader.class.getResourceAsStream("/options.properties"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        map = new HashMap<String, String>();
        for (Object key : props.keySet()) {
            map.put((String) key, (String) props.get(key));
        }
        return map;
    }

    private static CompilerOptions compilerOptions(Map<?, ?> options) {
        CompilerOptions compilerOptions = new CompilerOptions(options);
        compilerOptions.performStatementsRecovery = false;
        compilerOptions.parseLiteralExpressionsAsConstants = false;
        compilerOptions.storeAnnotations = true /*store annotations in the bindings*/;
        return compilerOptions;
    }
}
