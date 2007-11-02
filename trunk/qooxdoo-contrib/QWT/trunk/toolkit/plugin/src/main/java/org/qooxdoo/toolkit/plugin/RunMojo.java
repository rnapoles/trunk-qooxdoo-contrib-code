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

package org.qooxdoo.toolkit.plugin;

import java.io.IOException;
import java.net.InetAddress;

import org.apache.catalina.Context;
import org.apache.catalina.Engine;
import org.apache.catalina.Host;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.core.StandardContext;
import org.apache.catalina.startup.Embedded;
import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.io.FileNode;

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
        tomcat = io.node(str);
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
        engine.setParentClassLoader(getClass().getClassLoader());
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

        if (!webapp.isDirectory()) {
            webapp();
        }
        context = (StandardContext) embedded.createContext(contextPath, webapp.getAbsolute());
        context.setAllowLinking(true);
        context.setReloadable(true);
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
        info("");
        return embedded;
    }

    private synchronized void run(final Embedded tomcat) throws MojoExecutionException {
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
        try {
            wait();
        } catch (InterruptedException exception) {
            throw new MojoExecutionException("interrupted", exception);
        }
    }
}
