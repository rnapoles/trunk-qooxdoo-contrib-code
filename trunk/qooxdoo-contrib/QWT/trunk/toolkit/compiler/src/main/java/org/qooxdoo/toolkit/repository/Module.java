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

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.toolkit.compiler.Naming;

/**
 * <p>A piece of JavaScript code with a unique name and it's dependencies. </p>
 * 
 * <p>The module name has the same syntax as a Java class name. </p>
 * 
 * <p>Importing a JavaScript directory tree results in one module per file.
 * The compiler translates every type into one module (caution: a module is *not* 
 * a Java compilation unit, a single compilation unit may define multiple types).</p> 
 */
public class Module {
    /** separates type and member in Chunk names/references */
    public static final String SEP = ":";
    
    public static final String SUFFIX = ".js";
    private static final String DIRECT = "@";

    private boolean direct;
    
    private final List<Chunk> chunks;

    public Module(String name) {
        this(new Chunk(name, ""));
    }
    
    public Module(Chunk chunk) {
        this(lst(chunk));
    }
    
    private static List<Chunk> lst(Chunk chunk) {
        List<Chunk> lst;
        
        lst = new ArrayList<Chunk>();
        lst.add(chunk);
        return lst;
    }
    
    public Module(List<Chunk> chunks) {
        if (chunks.size() == 0) {
            throw new IllegalArgumentException();
        }
        this.direct = false;
        this.chunks = chunks;
    }

    //--

    /** @return always > 0 */
    public int size() {
        return chunks.size();
    }

    /** @return never null */
    public Chunk head() {
        return chunks.get(0);
    }
    
    public String getName() {
        return head().name;
    }

    // TODO: move naming stuff into Chunk class

    public Node getNode(Node dir) {
        return getNode(dir, getName());
    }

    public String getSimpleName() {
        String name;
        
        name = getName();
        return name.substring(name.lastIndexOf('.') + 1);
    }
    public String getPackage() {
        String name;
        int idx;
        
        name = getName();
        idx = name.lastIndexOf('.');
        return idx == -1 ? "" : name.substring(0, idx);
    }

    public boolean getDirect() {
        return direct;
    }

    public void setDirect(boolean direct) {
        this.direct = direct;
    }
    
    public String getCode() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        for (Chunk chunk : chunks) {
            builder.append(chunk.getCode());
        }
        return builder.toString();
    }

    public void add(Chunk chunk) {
        chunks.add(chunk);
    }

    public Chunk lookup(String name) {
        for (Chunk chunk : chunks) {
            if (chunk.name.equals(name)) {
                return chunk;
            }
        }
        return null;
    }
    
    // TODO
    protected List<Chunk> chunks() {
        return chunks;
    }
    
    //--

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Module) {
            return getName().equals(((Module) obj).getName());
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return getName().hashCode();
    }

    //--

    public static Module fromString(String all) {
        boolean augmenting;
        Module module;
        
        augmenting = all.startsWith(DIRECT);
        if (augmenting) {
            all = all.substring(DIRECT.length());
        }
        module = new Module(Chunk.fromString(all));
        module.setDirect(augmenting);
        return module;
    }

    @Override
    public String toString() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        if (getDirect()) {
            builder.append(DIRECT);
        }
        for (Chunk chunk : chunks) {
            builder.append(chunk.toString());
        }
        return builder.toString();
    }

    //--
    
    public static Node getNode(Node dir, String name) {
        return dir.join(name.replace('.', dir.getRoot().getFilesystem().getSeparatorChar()) + SUFFIX);
    }
    
    public Chunk createCinit() {
        return new Chunk(head().name + Module.SEP + Naming.CINIT, "");
    }

    public Chunk getCinit() {
        return lookup(head().name + Module.SEP + Naming.CINIT);
    }

    //--

    // graph with method- or constructor nodes
    public void callGraph(DependencyGraph graph, Repository repository) {
        String from;

        for (Chunk chunk : chunks) {
            from = chunk.name;
            graph.addNode(from);
            for (String to : chunk.deps.names()) {
                graph.addEdge(from, to);
            }
        }
    }

    // graph with head nodes
    public void loadGraph(DependencyGraph graph) {
        Chunk head;
        String from;
        
        head = head();
        from = head.name;
        graph.addNode(from);
        for (String to : head.deps.names()) {
            graph.addEdge(from, to);
        }
    }
    
    public static String modulename(String chunkname) {
        int idx;
        
        idx = chunkname.lastIndexOf(Module.SEP);
        return idx == -1 ? chunkname : chunkname.substring(0, idx);  
    }
    
    //--
    
    public int addVirtuals(DependencyGraph calls) {
        int count;
        
        count = 0;
        for (Chunk chunk : chunks) {
            for (String vname : chunk.vnames) {
                if (calls.contains(vname)) {
                    if (calls.addEdge(vname, chunk.name)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}
