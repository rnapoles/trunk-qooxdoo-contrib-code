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

package org.qooxdoo.toolkit.server;

import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import qx.ui.core.Widget;
import org.qooxdoo.toolkit.compiler.CompilerException;
import org.qooxdoo.toolkit.compiler.Naming;
import org.qooxdoo.toolkit.compiler.Problem;
import org.qooxdoo.toolkit.compiler.Task;
import org.qooxdoo.toolkit.repository.Repository;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Strings;

/**
 * Building block of an application, defines how do generate Index.html 
 */
public class Unit implements UnitMBean {
    public static Unit create(ServletConfig config, Application application) throws IOException, ServletException {
        ServletContext context;
        String name;
        String title;    
        String client;
        FileNode dest;
        
        context = config.getServletContext();
        name = "main";
        title = context.getServletContextName();
        client = getParam(config, "application");
        dest = application.createUnitDirectory(name);
        return new Unit(
                application.log,
                application.getDocroot().join("WEB-INF/src"), 
                getSplitParam(config, "includes"), 
                getSplitParam(config, "excludes"),
                name, title, client, getDeclarations(client), dest);
    }

    private static String[] getSplitParam(ServletConfig config, String name) throws ServletException {
        return Strings.toArray(Strings.trim(Strings.split(",", getParam(config, name))));
    }

    private static String getParam(ServletConfig config, String name) throws ServletException {
        String value;

        value = config.getInitParameter(name);
        if (value == null) {
            throw new ServletException("missing init parameter: " + name);
        }
        return value;
    }

    private static Map<String, Class<?>> getDeclarations(String application) throws ServletException {
        final String prefix = "init";
        Class<?> cl;
        Map<String, Class<?>> result;
        
        result = new HashMap<String, Class<?>>();
        try {
            cl = Class.forName(application);
        } catch (ClassNotFoundException e) {
            throw new ServletException("application not found: " + application, e);
        }
        for (Method m : cl.getDeclaredMethods()) {
            if (m.getName().startsWith(prefix)) {
                if (!Void.TYPE.equals(m.getReturnType())) {
                    if (m.getParameterTypes().length != 1) {
                        throw new ServletException(m + ": return type void expected, got " + m.getReturnType());
                    }
                }
                if (m.getParameterTypes().length != 1) {
                    throw new ServletException(m + ": expected 1 argument, got " + m.getParameterTypes().length);
                }
                result.put(m.getName().substring(prefix.length()), m.getParameterTypes()[0]);
            }
        }
        return result;
    }

    public Object createServiceObject(String name, Class<?> ifc) throws IOException, ServletException {
        String pkg;
        
        pkg = packageName(ifc.getName());
        if (pkg.endsWith(".common")) {  // TODO
            pkg = pkg.substring(0, pkg.length() - 7) + ".server";
        }
        return createObject(pkg + "." + Strings.capitalize(name));
    }

    private Object createObject(String className) throws ServletException {
        Class<?> cfg;
        Constructor<?> constr;
        
        try {
            cfg = Class.forName(className);
        } catch (ClassNotFoundException e) {
            throw new ServletException("class not found: " + className);
        }
        try {
            constr = cfg.getDeclaredConstructor(new Class[] { Unit.class });
        } catch (SecurityException e) {
            throw new ServletException("cannot instantiate class " + className, e);
        } catch (NoSuchMethodException e) {
            try {
                constr = cfg.getDeclaredConstructor(new Class[] {});
            } catch (SecurityException e2) {
                throw new ServletException("cannot instantiate class " + className, e2);
            } catch (NoSuchMethodException e2) {
                throw new ServletException("cannot instantiate class " + className, e2);
            }
            try {
                return constr.newInstance();
            } catch (IllegalAccessException e2) {
                throw new ServletException("cannot instantiate class " + className, e2);
            } catch (IllegalArgumentException e2) {
                throw new ServletException("cannot instantiate class " + className, e2);
            } catch (InstantiationException e2) {
                throw new ServletException("cannot instantiate class " + className, e2);
            } catch (InvocationTargetException e2) {
                throw new ServletException("cannot instantiate class " + className, e2.getTargetException());
            }
        }
        try {
            return constr.newInstance(this);
        } catch (IllegalAccessException e) {
            throw new ServletException("cannot instantiate class " + className, e);
        } catch (IllegalArgumentException e) {
            throw new ServletException("cannot instantiate class " + className, e);
        } catch (InstantiationException e) {
            throw new ServletException("cannot instantiate class " + className, e);
        } catch (InvocationTargetException e) {
            throw new ServletException("cannot instantiate class " + className, e.getTargetException());
        }
    }

    private static String packageName(String className) {
        int idx;
        
        idx = className.lastIndexOf('.');
        if (idx == -1) {
            throw new IllegalArgumentException();
        }
        return className.substring(0, idx);
    }

    //--

    // CAUTION: not static!
    private final Logger log;
    private final Node src;
    private final String[] includes;
    private final String[] excludes;
    private final List<Node> classpath;
    
    private final String name;
    private final String title;

    /** first JavaScript class */
    private final String client;
    
    /** server object declarations */
    private final Map<String, Class<?>> declarations;
    
    private int nextSessionId;
    private final FileNode index;
    private boolean linked;
    private boolean compress;
    
    //--
    
    public Unit(Logger log, Node src, String[] includes, String[] excludes,   
            String name, String title, String client, Map<String, Class<?>> declarations, FileNode dir) 
    throws IOException {
        this.log = log;
        this.src = src;
        this.includes = includes;
        this.excludes = excludes;
        this.classpath = classpath(src.io);
        this.name = name;
        this.title = title;
        this.client = client;
        this.declarations = declarations;

        this.nextSessionId = 0;
        
        this.index = (FileNode) dir.join("index.html");
        index.writeBytes();
        this.linked = false;
        this.compress = false;
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

    public FileNode getIndex() throws IOException, ServletException {
        Qooxdoo qooxdoo;
        Index idx;

        if (!linked) {
            qooxdoo = compile();
            idx = new Index(compress, this.index, qooxdoo);
            idx.generate(title, client, declarations);
            log.info(this.index.length() + " bytes written to " + index);
            linked = true;
        }
        return index;
    }
    
    public FileNode getIndexGz() throws IOException, ServletException {
        FileNode gz;
        
        gz = (FileNode) index.getParent().join(index.getName() + ".gz");
        if (!gz.isFile() || (index.lastModified() > gz.lastModified())) {
            index.gzip(gz);
        }
        return gz;
    }

    public String getClient() {
        return client;
    }
    
    public synchronized Session createSession(Application server) throws IOException, ServletException {
        ResourceManager rm;
        Session session;
        String name;
        Object obj;
        Class<?> clazz;
        
        rm = server.createResourceManager(getIndex(), getIndexGz());
        session = new Session(this, rm, nextSessionId++);
        for (Map.Entry<String, Class<?>> entry : declarations.entrySet()) {
            name = entry.getKey();
            clazz = entry.getValue();
            obj = createServiceObject(name, clazz);
            session.addObject(name, obj);
        }
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
        log.info("qooxdoo: " + qooxdoo);
        log.info("compiling: " + task.toString());
        try {
            compiled = task.invoke();
        } catch (CompilerException e) {
            for (Problem p : e.problems()) {
                log.severe(p.toString());
            }
            throw new ServletException(e.problems().size() + " errors", e);
        }
        tmp = index.getParent().join("repository");
        if (tmp.isDirectory()) {
            tmp.delete();
        }
        tmp.mkdir();
        compiled.save(tmp);
        log.info("done: " + compiled.size() + " file(s) written to " + tmp);
        return qooxdoo;
    }
    
    public static List<Node> classpath(IO io) {
        List<Node> cp;
        
        cp = new ArrayList<Node>();
        cp.add(io.locateClasspathItem("/java/lang/Object.js"));
        cp.add(io.locateClasspathItem(Widget.class));
        cp.add(io.locateClasspathItem(Servlet.class));
        return cp;
    }
}
