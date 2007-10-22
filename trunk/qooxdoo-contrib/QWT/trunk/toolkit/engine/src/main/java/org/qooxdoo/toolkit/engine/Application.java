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
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;

import org.codehaus.groovy.control.CompilationFailedException;

import qx.ui.basic.Image;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;

/**
 * A server, a list of clients, plus some Jmx services. 
 * Currently, there's always exactly 1 client.
 * Every initialized engine has exactly one application.
 */
public class Application implements ApplicationMBean {
    public static Application create(ServletConfig config) throws IOException, ServletException {
        IO io;
        File docroot;
        FileNode node;
        Application application;
        
        io = new IO();
        docroot = new File(config.getServletContext().getRealPath("/"));
        if (!docroot.isDirectory()) {
            throw new IllegalStateException(docroot.toString());
        }
        docroot = docroot.getAbsoluteFile().getCanonicalFile();
        node = io.node(docroot);
        application = new Application(config.getServletName(), node, MimeTypes.create());
        application.add(Client.create(config, application));
        return application;
    }
    
    public final Logger log;
    private final String name;
    private final FileNode docroot;
    
    private final MimeTypes mimeTypes;
    private final Map<String, Client> clients;
    private int nextMbeanId;
    private final MBeanServer mbeanServer;
    private final Map<MBean, ObjectName> mbeans;
    private String first;

    private final GroovyShell shell;
    
    public Application(String name, FileNode docroot, MimeTypes mimeTypes) throws IOException {
        Binding binding;

        this.log = createLogger(name, docroot);
        
        this.name = name;
        this.docroot = docroot;
        this.mimeTypes = mimeTypes;
        this.nextMbeanId = 0;
        this.mbeanServer = ManagementFactory.getPlatformMBeanServer();
        this.mbeans = new HashMap<MBean, ObjectName>();
        this.clients = new HashMap<String, Client>();
        this.first = null;
        
        binding = new Binding();
        binding.setVariable("application", this);

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

    public String getName() {
        return name;
    }
    
    public void add(Client client) {
        String name;
        
        name = client.getName();
        if (clients.containsKey(name)) {
            throw new IllegalArgumentException("duplicate client: " + name);
        }
        if (first == null) {
            first = name;
        }
        clients.put(name, client);
    }

    public Client lookup(String id) {
        return clients.get(id);
    }
    
    public String getFirstApplication() {
        return first;
    }
    
    
    public void startup() {
        register(this);
        for (Client client : clients.values()) {
            register(client);
        }
        log.info("startup done");
    }

    public void shutdown() {
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
