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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.qooxdoo.sushi.fs.GetLastModifiedException;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.fs.filter.Filter;
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
    public static Client create(ServletContext context, Application application, FileNode dest) throws IOException, ServletException {
        String title;
        String client;
        Client result;
        
        title = context.getServletContextName();
        client = getParam(context, "client");
        result = new Client(application,
                application.getDocroot().join("WEB-INF/src"), 
                getSplitParam(context, "includes"),
                getSplitParam(context, "excludes"),
                title, client, dest);
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
    private final Node sources;
    private final String[] includes;
    private final String[] excludes;
    private final List<Node> classpath;
    
    private final String title;

    /** first JavaScript class */
    private final String main;
    
    private int nextSessionId;
    private final FileNode index;
    private boolean minimize;
    private final Map<Integer, Session> sessions;
    
    //--
    
    public Client(Application application, Node sources, String[] includes, String[] excludes,   
            String title, String main, FileNode dir) {
        this.application = application;
        this.sources = sources;
        this.includes = includes;
        this.excludes = excludes;
        this.classpath = classpath(sources.getIO());
        this.title = title;
        this.main = main;
        this.nextSessionId = 0;
        this.index = (FileNode) dir.join("index.html");
        this.minimize = false;
        this.sessions = new HashMap<Integer, Session>();
    }

    public Application getApplication() {
        return application;
    }
    
    public void setMinimize(boolean minimize) throws IOException, ServletException {
        this.minimize = minimize;
        try {
            this.link();
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        } catch (ServletException e) {
            throw new RuntimeException("TODO", e);
        }
    }
    
    public boolean getMinimize() {
        return minimize;
    }
    
    public FileNode getIndex() {
        return index;
    }
    
    public void link() throws IOException, ServletException {
        Qooxdoo qooxdoo;
        Index idx;
        FileNode gz;
        
        qooxdoo = compile();
        idx = new Index(minimize, this.index, qooxdoo);
        idx.generate(title, main); 
        gz = (FileNode) index.getParent().join(index.getName() + ".gz");
        index.gzip(gz);
        application.log.info(this.index.length() + " bytes written to " + index);
    }
    
    public String getMain() {
        return main;
    }
    
    public String getName() {
        return "client";
    }
    
    public Date getCreated() throws GetLastModifiedException {
        return new Date(index.getLastModified());
    }

    public long getSize() {
        return index.length();
    }

    public Session startSession(HttpServletResponse response) throws IOException, ServletException {
        Session session;
        Writer writer;
        Object argument;

        argument = application.getServer().clientStart();
        session = new Session(this, nextSessionId++, argument);
        writer = Servlet.createTextWriter(response);
        writer.write(session.getId() + "\n");
        writer.write(Serializer.run(application.getRegistry(), session.argument));
        writer.close();
        if (sessions.put(session.getId(), session) != null) {
            throw new IllegalStateException("" + session.getId());
        }
        application.register(session);
        return session;
    }
    
    // only for session.stop
    protected void stopped(Session session) {
        if (!sessions.values().remove(session)) {
            throw new IllegalArgumentException(session.toString());
        }
    }
    
    /** TODO: start() method preforming application.register() */
    public void stop() {
        for (Session session : sessions.values()) {
            session.stop();
        }
        if (sessions.size() != 0) {
            throw new IllegalStateException(sessions.toString());
        }
        application.unregister(this);
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
        
        io = sources.getIO();
        srcFilter = io.filter();
        srcFilter.include(includes);
        srcFilter.exclude(excludes);
        task = new Task(io, Naming.createRootRepository(io), srcFilter);
        task.classpath(classpath);
        task.sourcepath(sources.find("*"));
        if (task.sources.size() == 0) {
            throw new ServletException("no Java files in directory " + sources.getAbsolute());
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
        cp.add(io.locateClasspathItem(ResourceServlet.class));
        return cp;
    }
}
