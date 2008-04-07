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

package org.qooxdoo.toolkit.plugin;

import java.io.IOException;
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.Context;
import org.apache.catalina.Engine;
import org.apache.catalina.Host;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.loader.WebappLoader;
import org.apache.catalina.startup.Embedded;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.shared.invoker.DefaultInvocationRequest;
import org.apache.maven.shared.invoker.InvocationResult;
import org.apache.maven.shared.invoker.Invoker;
import org.apache.maven.shared.invoker.MavenInvocationException;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;

/**
 * Starts QWT application in an embedded Tomcat.
 *  
 * @goal run
 * @requiresDependencyResolution runtime
 */
public class RunMojo extends WebappBase {
    /**
     * Port served by Tomcat.
     * 
     * @parameter
     */
    private int port = 8080;

    /**
     * Context path
     * 
     * @parameter expression = "/";
     */
    private String contextPath;
    
    /**
     * The directory to create Tomcat home.
     * 
     * @parameter expression = "${project.build.directory}/tomcat"
     */
    private FileNode tomcat;

    public void setTomcat(String str) {
        tomcat = io.file(str);
    }

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        if (!contextPath.startsWith("/")) {
            throw new MojoExecutionException("contextPath does not start with '/': " + contextPath);
        }
        run(info(create()));
    }

    private Embedded create() throws IOException, MojoExecutionException {
        Embedded embedded;
        Engine engine;
        Host host;

        embedded = createEmbedded();
        host = embedded.createHost("host", embedded.getCatalinaHome());
        host.setAutoDeploy(false);
        host.setDeployOnStartup(true);
        host.setXmlValidation(false);
        host.addChild(createContext(embedded));
        engine = embedded.createEngine();
        engine.setName("engine");
        engine.addChild(host);
        engine.setDefaultHost(host.getName());
        engine.setBackgroundProcessorDelay(2);
        embedded.addEngine(engine);
        embedded.addConnector(embedded.createConnector((InetAddress) null, port, 
                "org.apache.coyote.http11.Http11NioProtocol"));
        return embedded;
    }

    private Embedded createEmbedded() throws IOException, MojoExecutionException {
        String tomcatHome;
        Embedded embedded;
 
        tomcatHome = tomcat.getAbsolute();
        tomcat.mkdirsOpt();

        // avoid "no default web.xml warning
        tomcat.join("conf").mkdirOpt(); 
        tomcat.join("conf/web.xml").writeString("<web-app />");
        
        embedded = new Embedded();
        embedded.setCatalinaHome(tomcatHome);
        embedded.setCatalinaBase(tomcatHome);
        return embedded;
    }

    private Context createContext(Embedded embedded) throws MojoExecutionException, IOException {
        StandardContext context;
        WebappLoader loader;

        if (!webapp.isDirectory()) {
            webapp();
        }
        context = (StandardContext) embedded.createContext(contextPath, webapp.getAbsolute());
        context.setAllowLinking(true);
        context.setReloadable(true);
        loader = new MyWebappLoader(webapp.join("WEB-INF", "classes"), System.currentTimeMillis());
        context.setLoader(loader);
        return context;
    }

    private Embedded info(Embedded embedded) {
        info("");
        info("Starting embedded Tomcat - press ctrl-c to quit ");
        debug("  CATALINA_HOME: " + embedded.getCatalinaHome());
        debug("  CATALINA_BASE: " + embedded.getCatalinaBase());
        info("  application: " +  id);
        info("  url: http://localhost:" + port + contextPath);
        info("  log: " + webapp.join("qwt.log"));
        info("  admin: jconsole " + getPid());
        info("");
        return embedded;
    }

    // TODO: move to Sushi
    /** See http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4244896 */
    public static String getPid() {
        String name;
        int idx;
        
        name = ManagementFactory.getRuntimeMXBean().getName();
        idx = name.indexOf('@');
        if (idx == -1) {
            throw new IllegalStateException(name);
        }
        return name.substring(0, idx);
    }
    
    private synchronized void run(final Embedded tomcat) throws MojoExecutionException, IOException {
        try {
            tomcat.start();
            Runtime.getRuntime().addShutdownHook(new Thread() {
                @Override
                public void run() {
                    try {
                        tomcat.stop();
                    } catch (LifecycleException e) {
                        warn("stop failed", e);
                    }
                    info("shutdown");
                }
            });
        } catch (LifecycleException exception) {
            throw new MojoExecutionException("tomcat startup failed", exception);
        }

        List<Node> files;
        long started;
        long modified;
        
        files = io.getWorking().find("src/main/java/**/*.qul");
        files.addAll(io.getWorking().find("src/main/**/*.css"));
        started = Long.MIN_VALUE;
        for (Node file : files) {
            info("watching " + file);
            started = Math.max(started, file.getLastModified());
        }
        try {
            while (true) {
                Thread.sleep(2000);
                
                modified = Long.MIN_VALUE;
                for (Node file : files) {
                    modified = Math.max(modified, file.getLastModified());
                }
                if (modified > started) {
                    started = modified;
                    qulUpdate();
                }
            }
        } catch (InterruptedException exception) {
            throw new MojoExecutionException("interrupted", exception);
        }
    }

    /** TODO: Tomcat 6.0.13 and 6.0.14 doesn't seem to check the classes directory. 
        It checks everything in WebappClassLoader.getClassLoader().path, but I didn't find
        a way to get the classes directory there. */
    public static class MyWebappLoader extends WebappLoader {
        private final Node classes;
        private long started;
        
        public MyWebappLoader(Node classes, long started) {
            super(RunMojo.class.getClassLoader());
            setDelegate(false);
            this.classes = classes;
            this.started = started;
        }
        
        @Override
        public boolean modified() {
            long modified;
            
            if (super.modified()) {
                return true;
            }
            try {
                modified = Long.MIN_VALUE;
                for (Node file : classes.find("**/*.class")) {
                    modified = Math.max(modified, file.getLastModified());
                }
                if (modified > started) {
                    started = modified;
                    return true;
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return false;
        }
    }
    
    //--
    
    /**
     * @component
     */
    private Invoker invoker;

    private void qulUpdate() throws MojoExecutionException {
        DefaultInvocationRequest request;
        InvocationResult result;
        List<String> goals;
        
        info("rebuild qul ...");
        request = new DefaultInvocationRequest();
        goals = new ArrayList<String>();
        goals.add("qx:qul");
        goals.add("compile");
        request.setGoals(goals);
        request.setInteractive(false);
        try {
            result = invoker.execute(request);
        } catch (MavenInvocationException e) {
            throw new MojoExecutionException("cannot build qul file", e);
        }
        info("done: exit code=" + result.getExitCode());
    }
}
