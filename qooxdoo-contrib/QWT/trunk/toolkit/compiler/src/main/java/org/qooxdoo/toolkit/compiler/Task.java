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

package org.qooxdoo.toolkit.compiler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.AstLoader;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.internal.compiler.problem.AbortCompilation;
import org.eclipse.jdt.internal.core.BasicCompilationUnit;

import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.filter.Filter;

/** Collects arguments, invokes the compiler, and provides additional results */
public class Task {
    public final Repository repository;
    public final List<Node> classpath;
    public final List<Node> sources;
    public final Filter sourceFilter;
    
    public Task(IO io) {
        this(io, Naming.createRootRepository(io));
    }
    
    public Task(IO io, Repository repository) {
        this(io, repository, io.filter().include("**/*.java"));
    }
    
    public Task(IO io, Repository repository, Filter sourceFilter) {
        this.repository = repository;
        this.sourceFilter = sourceFilter;
        this.classpath = new ArrayList<Node>();
        this.sources = new ArrayList<Node>();
    }

    public void classpath(List<? extends Node> path) throws IOException {
        classpath.addAll(path);
        repository.loadAll(path);
    }

    public void sourcepath(Node ... nodes) throws IOException {
        sourcepath(Arrays.asList(nodes));
    }
    
    public void sourcepath(List<Node> sourcepath) throws IOException {
        for (Node source : sourcepath) {
            source.checkExists();
            if (source.isDirectory()) {
                sources.addAll(source.find(sourceFilter));
            } else {
                sources.add(source);
            }
        }
    }

    public Repository invoke() throws IOException {
        return run(repository, classpath, sources);
    }
    
    @Override
    public String toString() {
        return "classpath=" + classpath + ", sources=" + sources.size(); 
    }
    
    //--
    
    /**
     * @param classpath has to include some kind of rt.jar 
     * @param units Node or String with Java Source
     * @return index where compiled units start
     */
    private static Repository run(Repository repository, List<Node> classpath, 
            List<? extends Node> units) throws IOException {
        Context context;
        List<CompilationUnit> all;
        BasicCompilationUnit tmp;

        context = new Context(repository);
        try {
            // pass 1: create all modules
            all = AstLoader.run(classpath, units);
            context.createModules(all);

            if (context.problems.size() == 0) {
                // pass 2: generate module content
                for (CompilationUnit cu : all) {
                    if (Problem.forMessages(cu, context.problems) == 0) {
                        for (Object obj : cu.types()) {
                            TypeCompiler.run(context, (AbstractTypeDeclaration) obj);
                        }
                        context.problems.addAll(Problem.getProblems(cu));
                    } else {
                        // don't try to compile, some types might be unresolved
                    }
                }
            }
        } catch (AbortCompilation e) {
            // thrown e.g. if java.lang.Object cannot be resolved
            tmp = (BasicCompilationUnit) e.compilationResult.compilationUnit;
            context.problems.add(new Problem(new String(tmp.getMainTypeName()), e.problem.toString()));
        }
        if (context.problems.size() > 0) {
            throw new CompilerException(context.problems);
        }
        return context.getCompiled();
    }
}
