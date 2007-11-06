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
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

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
    public static Client create(ServletContext context, Application application) throws IOException, ServletException {
        String name;
        String title;    
        String client;
        FileNode dest;
        Client result;
        
        name = "main";
        title = context.getServletContextName();
        client = getParam(context, "client");
        dest = application.createClientDirectory(name);
        result = new Client(application,
                application.getDocroot().join("WEB-INF/src"), 
                getSplitParam(context, "includes"),
                getSplitParam(context, "excludes"),
                name, title, client, dest);
        result.link();
        return result;
    }

    private static String[] getSplitParam(ServletContext context, String name) throws ServletException {
        return Strings.toArray(Strings.trim(Strings.split(",", getParam(context, name))));
    }

    public static String getParam(ServletContext context, String name) throws ServletException {
        String value;

        value = context.getInitParameter(name);
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
    private boolean compress;
    private final ArrayBlockingQueue<ResourceManager> rms;

    private final Map<Integer, Session> sessions;
    
    private static final int RM_COUNT = 10;
    
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
        this.compress = false;
        this.rms = new ArrayBlockingQueue<ResourceManager>(RM_COUNT);
        this.sessions = new HashMap<Integer, Session>();
    }

    public ResourceManager allocate() {
        try {
            return rms.take();
        } catch (InterruptedException e) {
            throw new RuntimeException(e); // TODO
        }
    }
    public void free(ResourceManager rm) {
        rms.add(rm);
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
    
    public FileNode getIndex() {
        return index;
    }
    
    public void link() throws IOException, ServletException {
        Qooxdoo qooxdoo;
        Index idx;
        
        qooxdoo = compile();
        idx = new Index(compress, this.index, qooxdoo);
        idx.generate(title, main); 
        application.log.info(this.index.length() + " bytes written to " + index);
        for (int i = 0; i < RM_COUNT; i++) {
            rms.add(application.createResourceManager(getIndex(), getIndexGz()));
        }
    }
    
    public FileNode getIndexGz() throws IOException {
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
    
    public String getName() {
        return name;
    }
    
    public Date getCreated() {
        return new Date(index.lastModified());
    }

    public long getSize() {
        return index.length();
    }

    public Session start(HttpServletResponse response) throws IOException, ServletException {
        Session session;
        Writer writer;
        Object argument;

        argument = application.getServer().clientStart();
        session = new Session(this, nextSessionId++, argument);
        writer = Engine.createTextWriter(response);
        writer.write(session.getId() + "\n");
        writer.write(Serializer.run(application.getRegistry(), session.argument));
        writer.close();
        if (sessions.put(session.getId(), session) != null) {
            throw new IllegalStateException("" + session.getId());
        }
        application.register(session);
        return session;
    }

    public Session lookup(int id) {
        return sessions.get(id);
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
