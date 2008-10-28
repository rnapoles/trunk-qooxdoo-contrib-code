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

package org.qooxdoo.toolkit.repository;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.qooxdoo.sushi.fs.LineProcessor;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.graph.CyclicDependency;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.toolkit.compiler.Naming;

/**
 * Container for modules with unique names, manages dependencies.
 * Comparable to a classpath, but it actually stores the contents. 
 */
public class Repository implements Iterable<Module> {
    private static final String INDEX_TXT = "index.txt";
    
    /** used for index on *every* platform */ 
    private static final String LF = "\n";

    //--

    private final List<Module> modules;

    public Repository(Module ... modules) {
        this(new ArrayList<Module>(Arrays.asList(modules)));
    }
    
    public Repository(List<Module> modules) {
        this.modules = modules;
    }

    public Iterator<Module> iterator() {
        return modules.iterator();
    }

    // TODO: dump?
    public List<Module> modules() {
        return modules;
    }

    public int size() {
        return modules.size();
    }
    
    public void add(Module module) {
        if (lookup(module.getName()) != null) {
            throw new IllegalArgumentException("duplicate module: " + module.getName());
        }
        modules.add(module);
    }

    public void addAll(Repository repository) {
        for (Module module : repository) {
            add(module);
        }
    }

    public Module get(String name) {
        Module found;

        found = lookup(name);
        if (found == null) {
            throw new IllegalArgumentException("no such module: '" + name + "'");
        }
        return found;
    }

    public Module[] getAll(String ... names) {
        return getAll(Arrays.asList(names));
    }
    
    public Module[] getAll(List<String> names) {
        Module[] modules;
        
        modules = new Module[names.size()];
        for (int i = 0; i < modules.length; i++) {
            modules[i] = get(names.get(i));
        }
        return modules;
    }

    public Module lookup(String name) {
        Module found;

        found = null;
        for (Module module : this) {
            if (module.getName().equals(name)) {
                if (found != null) {
                    throw new IllegalArgumentException("module ambiguous: " + name);
                }
                found = module;
            }
        }
        return found;
    }

    public Module getSimple(String simpleName) {
        Module found;

        if (simpleName.lastIndexOf('.') != -1) {
            throw new IllegalArgumentException(simpleName);
        }
        found = null;
        for (Module module : this) {
            if (module.getSimpleName().equals(simpleName)) {
                if (found != null) {
                    throw new IllegalArgumentException("module ambiguous: " + simpleName);
                }
                found = module;
            }
        }
        if (found == null) {
            throw new IllegalArgumentException("unkown module: " + simpleName);
        }
        return found;
    }

    //--
    
    public void save(Node dir) throws IOException {
        Node dest;
        List<String> index;
        
        dir.checkDirectory();
        index = new ArrayList<String>();
        for (Module module : this) {
            index.add(module.getName());
            dest = module.getNode(dir);
            dest.getParent().mkdirsOpt();
            dest.writeString(module.toString());
        }
        Collections.sort(index);
        dir.join(INDEX_TXT).writeString(Strings.join(LF, index));
    }
    
    public void loadAll(List<? extends Node> path) throws IOException {
        MissingIndexException first;
        
        first = null;
        for (Node node : path) {
            try {
                load(node);
            } catch (MissingIndexException e) {
                if (first == null) {
                    first = e;
                } else {
                    first.lst.addAll(e.lst);
                }
            }
        }
        if (first != null) {
            throw first;
        }
    }

    public void load(Node node) throws IOException {
        if (node.isDirectory()) {
            loadDir(node);
        } else {
            node.checkFile();
            loadFile(node);
        }
    }
    
    public void loadDir(Node dir) throws IOException {
        doLoad(dir);
    }
    
    public void loadFile(Node file) throws IOException {
        doLoad(((FileNode) file).openZip());
    }

    public void doLoad(final Node src) throws IOException {
        Node index;
        
        index = src.join(INDEX_TXT);
        if (!index.exists()) {
            throw new MissingIndexException(this, src);
        }
        new LineProcessor(true, false, null) {
            @Override
            public void line(String line) throws IOException {
                add(Module.fromString(Module.getNode(src, line).readString()));
            }
        }.run(index, LF);
    }
    
    //--
    
    private static final String ROOT = "_root_";
    
    public String executable(Module ... mains) throws CyclicDependency {
        StringWriter dest;
        
        dest = new StringWriter();
        try {
            executable(dest, false, mains);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return dest.toString();
    }
    
    public List<Module> executable(Writer dest, boolean compress, Module ... mains) throws IOException, CyclicDependency {
        return executable(dest, compress, Collections.<Module>emptyList(), mains);
    }

    public List<Module> executable(Writer dest, boolean compress, List<Module> done, Module ... mains) throws IOException, CyclicDependency {
        List<Module> lst;
        
        lst = sequence(done, mains);
        writeContent(lst, compress, dest);
        dest.write(cinitCalls(lst));
        return lst;
    }

    /**
     * @param done modules already loaded; they won't be loaded again
     * @param mains  methods that my be invoked (its more than one because a compilation unit might yield
     *               multiple modules)
     * @return modules actually loaded; never contains done modules
     */
    public List<Module> sequence(List<Module> done, Module ... mains) throws CyclicDependency {
        DependencyGraph calls;
        DependencyGraph loads;
        List<String> called;
        Module used;
        String init;
        boolean changed;
        List<String> sequence;
        List<Module> result;
        
        loads = loadGraph();
        calls = callGraph();
        calls.node(ROOT);
        for (Module main : mains) {
            for (Chunk chunk : main.chunks()) {
                calls.edge(ROOT, chunk.name);
            }
        }
        do {
            changed = false;
            called = calledmodules(calls, loads);
            for (String name : called) {
                if (!name.equals(ROOT)) {
                    used = get(name);
                    if (!name.equals(used.getName())) {
                        throw new IllegalStateException("module name expected: " + name + "!=" + used.getName());
                    }
                    if (used.addVirtuals(calls) > 0) {
                        changed = true;
                    }
                    init = name + Module.SEP + Naming.CINIT;
                    if (used.lookup(init) != null) {
                        if (calls.edge(ROOT, init)) {
                            changed = true;
                        }
                    }
                }
            }
        } while (changed);
        
        loads.retain(called);
        sequence = loads.sort();
        if (loads.size() != 0) {
            throw new IllegalStateException();
        }
        Collections.reverse(sequence);
        result = new ArrayList<Module>();
        for (String name : sequence) {
            if (name.lastIndexOf(Module.SEP) != -1) {
                throw new IllegalStateException(name);
            }
            used = get(name);
            if (!done.contains(used)) {
                result.add(used);
            }
        }
        return result;
    }

    public static void writeContent(List<Module> modules, boolean compress, Writer dest) throws IOException {
        for (Module module : modules) {
            if (compress) {
                dest.write(Compressor.run(module.getCode()));
                dest.write("\n");
            } else {
                dest.write(module.getCode());
            }
        }
    }

    public static String cinitCalls(List<Module> modules) {
        StringBuilder builder;
        
        builder = new StringBuilder();
        for (Module module : modules) {
            String name = module.getName();
            String init = name + Module.SEP + Naming.CINIT;
            Chunk cinit = module.lookup(init); 
            if (cinit != null && cinit.getCode().trim().length() > 0) {
                builder.append(Naming.module(name) + "." + Naming.CINIT + "();\n");
            }
        }
        return builder.toString();
    }

    private static List<String> calledmodules(DependencyGraph calls, DependencyGraph loads) {
        List<String> names;
        List<String> result;
        
        names = calls.closure(ROOT);
        result = new ArrayList<String>();
        for (String name : names) {
            name = Module.modulename(name);
            if (!result.contains(name)) {
                result.add(name);
            }
        }
        result.remove(ROOT);
        loads.closure(result);
        result.add(ROOT);
        return result;
    }

    private DependencyGraph callGraph() {
        DependencyGraph g;
        
        g = new DependencyGraph();
        for (Module module : modules) {
            module.callGraph(g, this);
        }
        return g;
    }

    private DependencyGraph loadGraph() {
        DependencyGraph g;
        
        g = new DependencyGraph();
        for (Module module : modules) {
            module.loadGraph(g);
        }
        return g;
    }
}
