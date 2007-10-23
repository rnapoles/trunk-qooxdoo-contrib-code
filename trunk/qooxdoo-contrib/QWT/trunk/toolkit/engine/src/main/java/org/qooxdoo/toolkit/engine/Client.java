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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.toolkit.compiler.CompilerException;
import org.qooxdoo.toolkit.compiler.Naming;
import org.qooxdoo.toolkit.compiler.Problem;
import org.qooxdoo.toolkit.compiler.Task;
import org.qooxdoo.toolkit.engine.common.Serializer;
import org.qooxdoo.toolkit.repository.Repository;

import qx.ui.core.Widget;

/**
 * Building block of an application, defines how do generate Index.html 
 */
public class Client implements ClientMBean {
    public static Client create(ServletConfig config, Application application) throws IOException, ServletException {
        ServletContext context;
        String name;
        String title;    
        String client;
        FileNode dest;
        
        context = config.getServletContext();
        name = "main";
        title = context.getServletContextName();
        client = getParam(config, "client");
        dest = application.createClientDirectory(name);
        return new Client(application,
                application.getDocroot().join("WEB-INF/src"), 
                getSplitParam(config, "includes"), 
                getSplitParam(config, "excludes"),
                name, title, client, dest);
    }

    private static String[] getSplitParam(ServletConfig config, String name) throws ServletException {
        return Strings.toArray(Strings.trim(Strings.split(",", getParam(config, name))));
    }

    public static String getParam(ServletConfig config, String name) throws ServletException {
        String value;

        value = config.getInitParameter(name);
        if (value == null) {
            throw new ServletException("missing init parameter: " + name);
        }
        return value;
    }

    //--

    // CAUTION: not static!
    private final Application application;
    private final Node src;
    private final String[] includes;
    private final String[] excludes;
    private final List<Node> classpath;
    
    private final String name;
    private final String title;

    /** first JavaScript class */
    private final String main;
    
    private int nextSessionId;
    private final FileNode index;
    private boolean linked;
    private boolean compress;
    
    //--
    
    public Client(Application application, Node src, String[] includes, String[] excludes,   
            String name, String title, String main, FileNode dir) 
    throws IOException {
        this.application = application;
        this.src = src;
        this.includes = includes;
        this.excludes = excludes;
        this.classpath = classpath(src.io);
        this.name = name;
        this.title = title;
        this.main = main;
        this.nextSessionId = 0;
        
        this.index = (FileNode) dir.join("index.html");
        index.writeBytes();
        this.linked = false;
        this.compress = false;
    }

    public Application getApplication() {
        return application;
    }
    
    public void setCompress(boolean compress) {
        this.compress = compress;
    }
    
    public boolean getCompress() {
        return compress;
    }
    
    public void reload() {
        linked = false;
    }

    public FileNode getIndex() {
        return index;
    }
    
    public void update(String serialized) throws IOException, ServletException {
        Qooxdoo qooxdoo;
        Index idx;
        
        if (!linked) {
            qooxdoo = compile();
            idx = new Index(compress, this.index, qooxdoo);
            idx.generate(title, main, serialized); 
            application.log.info(this.index.length() + " bytes written to " + index);
            linked = true;
        }
    }
    
    public FileNode getIndexGz() throws IOException, ServletException {
        FileNode gz;
        
        gz = (FileNode) index.getParent().join(index.getName() + ".gz");
        if (!gz.isFile() || (index.lastModified() > gz.lastModified())) {
            index.gzip(gz);
        }
        return gz;
    }

    public String getMain() {
        return main;
    }
    
    public synchronized Session start(Application application) throws IOException, ServletException {
        ResourceManager rm;
        Session session;
        Object obj;
        String serialized;
        
        obj = application.getServer().clientStart();
        if (obj == null) {
            serialized = null;
        } else {
            serialized = Serializer.run(application.getRegistry(), obj);
        }
        update(serialized);
        rm = application.createResourceManager(getIndex(), getIndexGz());
        session = new Session(this, rm, nextSessionId++);
        return session;
    }

    //--
    
    public String getName() {
        return name;
    }
    
    public Date getCreated() {
        return new Date(index.lastModified());
    }

    public long getSize() {
        return index.length();
    }

    //--
    
    private Qooxdoo compile() throws IOException, ServletException {
        IO io;
        Filter srcFilter;
        Task task;
        Repository compiled;
        Node tmp;
        Qooxdoo qooxdoo;
        
        io = src.io;
        srcFilter = io.filter();
        srcFilter.include(includes);
        srcFilter.exclude(excludes);
        task = new Task(io, Naming.createRootRepository(io), srcFilter);
        task.classpath(classpath);
        task.sourcepath(src);
        if (task.sources.size() == 0) {
            throw new ServletException("no Java files in directory " + src.getAbsolute());
        }
        qooxdoo = Qooxdoo.create(io, task.repository);
        application.log.info("qooxdoo: " + qooxdoo);
        application.log.info("compiling: " + task.toString());
        try {
            compiled = task.invoke();
        } catch (CompilerException e) {
            for (Problem p : e.problems()) {
                application.log.severe(p.toString());
            }
            throw new ServletException(e.problems().size() + " errors", e);
        }
        tmp = index.getParent().join("repository");
        if (tmp.isDirectory()) {
            tmp.delete();
        }
        tmp.mkdir();
        compiled.save(tmp);
        application.log.info("done: " + compiled.size() + " file(s) written to " + tmp);
        return qooxdoo;
    }
    
    public static List<Node> classpath(IO io) {
        List<Node> cp;
        
        cp = new ArrayList<Node>();
        cp.add(io.locateClasspathItem("/java/lang/Object.js"));
        cp.add(io.locateClasspathItem(Widget.class));
        cp.add(io.locateClasspathItem(Engine.class));
        return cp;
    }
}
