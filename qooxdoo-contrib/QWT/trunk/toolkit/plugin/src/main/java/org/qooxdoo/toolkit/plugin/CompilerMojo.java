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

package org.qooxdoo.toolkit.plugin;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.maven.artifact.DependencyResolutionRequiredException;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;

import org.qooxdoo.toolkit.compiler.CompilerException;
import org.qooxdoo.toolkit.compiler.Naming;
import org.qooxdoo.toolkit.compiler.Problem;
import org.qooxdoo.toolkit.compiler.Task;
import org.qooxdoo.toolkit.repository.MissingIndexException;
import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.Node;

/**
 * Compiles Java to JavaScript
 *
 * @goal compile
 * @phase compile
 * @requiresDependencyResolution
 */
public class CompilerMojo extends Base {
    private Filter javaFilter = io.filter().include("**/*.java");
    
    /**
     * Internal parameter.
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    private MavenProject project;

    /**
     * Source directory path. Contained js files are copied, contained java files are compiled. 
     * Path separator is ":". Defaults to source roots defined for the project.
     *
     * @parameter
     */
    private List<Node> sourcepath;
    
    public void setSourcepath(String path) {
        sourcepath = (List) io.path(path);
    }
    
    /**
     * Where to save classes.
     *
     * @parameter expression="${project.build.directory}/classes"
     * @required
     */
    private Node output;
    
    public void setOutput(String dir) throws IOException {
        output = io.node(dir);
    }
    
    /**
     * Source files to include.
     *
     * @parameter expression=""
     */
    private String includes; // TODO: needed to tell maven the parameter name
    
    public void setIncludes(String in) throws IOException {
        // TODO: removes **/*.java default include ...
        javaFilter = io.filter(); 
        javaFilter.include(Base.split(in));
    }

    /**
     * Source files to exclude
     *
     * @parameter expression=""
     */
    private String excludes; // TODO: needed to tell maven the property name

    public void setExcludes(String ex) throws IOException {
        javaFilter.exclude(Base.split(ex));
    }

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        Task task;
        Repository compiled;
        long started;
        
        started = System.currentTimeMillis();
        task = new Task(io, Naming.createRootRepository(io), javaFilter);
        try {
            task.classpath(classpath());
        } catch (MissingIndexException e) {
            // TODO
            info("TODO: classpath items without index: " + e.lst);
        }
        if (sourcepath == null) {
            sourcepath = new ArrayList<Node>();
            for (Object obj : project.getCompileSourceRoots()) {
                info("source directory: " + obj);
                // TODO:
                sourcepath.add(io.node((String) obj));
            }
        }
        task.sourcepath(sourcepath);
        if (task.sources.size() == 0) {
            throw new MojoExecutionException("no Java files in sourcepath " + sourcepath);
        }
        info("compiling: " + task.toString());
        try {
            compiled = task.invoke();
        } catch (CompilerException e) {
            for (Problem p : e.problems()) {
                getLog().error(p.toString());
            }
            throw new MojoExecutionException(e.problems().size() + " errors");
        }
        output.mkdirsOpt();
        compiled.save(output);
        info("repository written to " + output + ", "
                + compiled.size() + " module(s), "
                + (System.currentTimeMillis() - started) + " ms");
    }

    private List<Node> classpath() {
        List<Node> cp;
        List<?> artifacts;
        String str;
        
        cp = new ArrayList<Node>();
        try {
            artifacts = project.getCompileClasspathElements();
        } catch (DependencyResolutionRequiredException e) {
            throw new RuntimeException("TODO", e);
        }
        for (Object obj : artifacts) {
            str = (String) obj;
            if (str.equals(project.getBuild().getOutputDirectory())) {
                // ignored -- I don't know why, but Maven 2.0.7 adds target/classes to it's output directory
            } else {
                cp.add(io.node(str));
            }
        }
        return cp;
    }
}

