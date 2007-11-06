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

import groovy.lang.Binding;
import groovy.lang.GroovyShell;

import java.io.File;
import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.FileHandler;
import java.util.logging.Formatter;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.LogRecord;
import java.util.logging.Logger;

import javax.management.InstanceAlreadyExistsException;
import javax.management.InstanceNotFoundException;
import javax.management.MBeanRegistrationException;
import javax.management.MBeanServer;
import javax.management.MalformedObjectNameException;
import javax.management.NotCompliantMBeanException;
import javax.management.ObjectName;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.codehaus.groovy.control.CompilationFailedException;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.toolkit.engine.common.Registry;
import org.qooxdoo.toolkit.qooxdoo.Server;

import qx.ui.basic.Image;

/**
 * A server, a client, some Jmx services. Every initialized webapp has exactly one application.
 */
public class Application implements ApplicationMBean {
    public static synchronized Application get(ServletContext context) throws ServletException {
        final String attribute = "qwt_application";
        Application application;

        application = (Application) context.getAttribute(attribute);
        if (application == null) {
            try {
                application = create(context);
            } catch (IOException e) {
                throw new ServletException("cannot create application", e);
            }
            context.setAttribute(attribute, application);
        }
        return application;
    }

    private static Application create(ServletContext context) throws IOException, ServletException {
        IO io;
        File docroot;
        FileNode node;
        Application application;
        
        io = new IO();
        docroot = new File(context.getRealPath("/"));
        if (!docroot.isDirectory()) {
            throw new IllegalStateException(docroot.toString());
        }
        docroot = docroot.getAbsoluteFile().getCanonicalFile();
        node = io.node(docroot);
        application = new Application(context.getServletContextName(), node, Client.getParam(context, "server"), MimeTypes.create());
        application.client = Client.create(context, application);
        return application;
    }
    
    public final Logger log;

    /** unique identifier */
    private final String name;
    
    private final FileNode docroot;
    
    private final String serverClass;
    private Server server;

    /** assigned once */
    private Client client;
    private final MimeTypes mimeTypes;
    private int nextMbeanId;
    private final MBeanServer mbeanServer;
    private final Map<MBean, ObjectName> mbeans;
    private final Registry registry;
    private final GroovyShell shell;
    
    public Application(String name, FileNode docroot, String server, MimeTypes mimeTypes) throws IOException {
        Binding binding;

        this.log = createLogger(name, docroot);
        this.name = name;
        this.docroot = docroot;
        this.serverClass = server;
        this.server = null;
        this.mimeTypes = mimeTypes;
        this.nextMbeanId = 0;
        this.mbeanServer = ManagementFactory.getPlatformMBeanServer();
        this.mbeans = new HashMap<MBean, ObjectName>();
        this.client = null;
        
        binding = new Binding();
        binding.setVariable("application", this);

        this.registry = new Registry();
        this.shell = new GroovyShell(binding);
    }
    
    private static Logger createLogger(final String name, Node docroot) throws IOException {
        Logger logger;
        Handler handler;
        Formatter f;
        
        f = new Formatter() {
            @Override
            public String format(LogRecord record) {
                return '[' + time() + ' ' + record.getLevel().getName() + "] " +  
                    record.getMessage() + '\n';
            }
        };
        handler = new FileHandler(docroot.getAbsolute() + "/qwt.log", true);
        handler.setFormatter(f);
        logger = Logger.getLogger("org.qooxdoo.toolkit." + name);
        logger.addHandler(handler);
        logger.setLevel(Level.INFO);
        logger.setUseParentHandlers(false);
        return logger;
    }
    
    private static final SimpleDateFormat FMT = new SimpleDateFormat("HH.mm.ss");

    private static String time() {
        return FMT.format(new Date());
    }

    public FileNode getDocroot() {
        return docroot;
    }

    public File getDocrootFile() {
        return getDocroot().getFile();
    }
    
    public List<String> listJars() throws IOException {
        List<String> result;
        
        result = new ArrayList<String>();
        for (Node file : docroot.find("WEB-INF/lib/*.jar")) {
            result.add(file.getName());
        }
        return result;
    }
    
    public Object groovy(String str) {
        try {
            return shell.evaluate(str);
        } catch (CompilationFailedException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Registry getRegistry() {
        return registry;
    }
    
    public String getName() {
        return name;
    }

    public void startup() throws ServletException {
        register(this);
        register(client);
        server = (Server) createInstance(serverClass);
        log.info("startup done");
    }

    public Client getClient() {
        return client;
    }
    
    public Server getServer() {
        return server;
    }
    
    private static Object createInstance(String className) throws ServletException {
        Class<?> cfg;
        Constructor<?> constr;
        
        try {
            cfg = Class.forName(className);
        } catch (ClassNotFoundException e) {
            throw new ServletException("class not found: " + className);
        }
        try {
            constr = cfg.getDeclaredConstructor(new Class<?>[] {});
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


    public void shutdown() {
        server.stop();
        for (ObjectName name : mbeans.values()) {
            try {
                mbeanServer.unregisterMBean(name);
            } catch (MBeanRegistrationException e) {
                throw new RuntimeException(name.toString(), e);
            } catch (InstanceNotFoundException e) {
                throw new RuntimeException(name.toString(), e);
            } 
        }
        log.info("shotdown done");
        for (Handler h : log.getHandlers()) {
            h.close();
            log.removeHandler(h);
        }
    }
    
    public synchronized void register(MBean mbean) {
        String str;
        ObjectName objectName;
        
        nextMbeanId++;
        str = "org.qooxdoo.toolkit.engine." + name + ":type=" + getName(mbean.getClass()) + ",name=" + mbean.getName();
        try {
            objectName = new ObjectName(str);
        } catch (MalformedObjectNameException e) {
            throw new RuntimeException(str, e);
        } 
        try {
            mbeanServer.registerMBean(mbean, objectName);
        } catch (InstanceAlreadyExistsException e) {
            throw new RuntimeException(e);
        } catch (MBeanRegistrationException e) {
            throw new RuntimeException(e);
        } catch (NotCompliantMBeanException e) {
            throw new RuntimeException(e.getClass().getName(), e);
        }
        mbeans.put(mbean, objectName);
    }

    public synchronized void unregister(MBean mbean) {
        ObjectName name;
        
        name = mbeans.remove(mbean);
        if (name == null) {
            throw new IllegalArgumentException("" + mbean);
        }
        try {
            mbeanServer.unregisterMBean(name);
        } catch (InstanceNotFoundException e) {
            throw new RuntimeException(e);
        } catch (MBeanRegistrationException e) {
            throw new RuntimeException(e);
        }
    }

    private static String getName(Class<?> clazz) {
        String name;
        
        name = clazz.getName();
        return name.substring(name.lastIndexOf('.') + 1);
    }
    
    public FileNode createClientDirectory(String client) throws IOException {
        return (FileNode) docroot.join(client).mkdirOpt();
    }

    public ResourceManager createResourceManager(Node index, Node indexGz) throws IOException {
        ResourceManager rm;

        rm = ResourceManager.create(docroot, mimeTypes);
        rm.addStatic(index.getName(), index, indexGz);
        rm.addFilePrefix(Image.PREFIX);
        rm.addResourcePrefix("resource/");
        return rm;
    }
}
