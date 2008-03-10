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

package org.qooxdoo.toolkit.compiler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.sushi.cli.ArgumentException;
import org.qooxdoo.sushi.cli.Cli;
import org.qooxdoo.sushi.cli.Command;
import org.qooxdoo.sushi.cli.Option;
import org.qooxdoo.sushi.cli.Remaining;
import org.qooxdoo.sushi.io.ExistsException;
import org.qooxdoo.sushi.io.Node;

public class Main extends Cli implements Command {
    public static void main(String[] args) {
        System.exit(new Main().run(args));
    }

    @Override
    public void printHelp() {
        console.info.println("usage:");
        console.info.println("  rc [opts] source+");
        console.info.println("where");
        console.info.println("  source           directory with java/js files");
        console.info.println("options");
        console.info.println("  -cp path         classpath: repository jar or directory, separated by :");
        console.info.println("  -d node          destination: directory where to save resulting js files");
        console.info.println("java: java file or directory with java files");
    }
    
    private Node dest;
    private List<? extends Node> classpath;
    private final List<Node> sourcepath;
    
    public Main() {
        this.dest = console.io.node("dest");
        this.classpath = new ArrayList<Node>();
        this.sourcepath = new ArrayList<Node>();
    }

    @Option("cp")
    public void classpath(String cp) throws IOException {
        classpath = console.io.classpath(cp);
    }
    
    @Option("d")
    public void dest(Node dest) {
        this.dest = dest;
    }

    @Remaining(name="source")
    public void file(Node node) throws ExistsException {
        if (!node.isDirectory()) {
            throw new ArgumentException("no such directory: " + node);
        }
        sourcepath.add(node);
    }

    public void invoke() throws IOException {
        Task task;
        Repository result;

        if (sourcepath.size() == 0) {
            throw new ArgumentException("no sources");
        }
        task = new Task(console.io);
        task.classpath(classpath);
        task.sourcepath(sourcepath);
        try {
            result = task.invoke();
        } catch (CompilerException e) {
            for (Problem problem : e.problems()) {
                System.err.println(problem.toString());
            }
            throw new ArgumentException(e.problems().size() + " compile error(s).");
        }
        result.save(dest);
        console.info.println("wrote " + result.size() + " unit(s) to " + dest);
    }
}
