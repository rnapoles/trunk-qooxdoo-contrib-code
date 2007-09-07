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
import org.apache.catalina.loader.WebappLoader;
import org.apache.catalina.startup.Embedded;
import org.apache.maven.plugin.MojoExecutionException;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;

/**
 * Starts Qwt application in an embedded Tomcat. 
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
        run(info(createEmbedded()));
    }

    private Embedded createEmbedded() throws IOException, MojoExecutionException {
        String tomcatHome;
        
        Embedded embedded;
        Engine engine;
        Host host;

        tomcatHome = tomcat.getAbsolute();
        tomcat.mkdirsOpt();
        embedded = new Embedded();
        embedded.setCatalinaHome(tomcatHome);
        embedded.setCatalinaBase(tomcatHome);
        host = embedded.createHost("host", tomcatHome);
        host.setAutoDeploy(false);
        host.setDeployOnStartup(true);
        host.setXmlValidation(false);
        host.addChild(createContext(embedded));
        engine = embedded.createEngine();
        engine.setName("engine");
        engine.addChild(host);
        engine.setDefaultHost(host.getName());
        embedded.addEngine(engine);
        embedded.addConnector(embedded.createConnector((InetAddress) null, port, false));
        return embedded;
    }

    private Context createContext(Embedded embedded) throws MojoExecutionException, IOException {
        WebappLoader loader;
        Context context;

        if (!webapp.isDirectory()) {
            webapp();
        }
        loader = new WebappLoader(this.getClass().getClassLoader());
        loader.setReloadable(true);
        loader.addRepository(uri(webapp.join("WEB-INF/classes")));
        for (Node jar : webapp.find("WEB-INF/lib/*.jar")) {
            debug("adding jar " + jar);
            loader.addRepository(uri(jar));
        }
        context = embedded.createContext("/" + id, webapp.getAbsolute());
        context.setLoader(loader);
        context.setReloadable(true);
        return context;
    }

    private String uri(Node node) {
        return ((FileNode) node).toURI().toString();
    }
    
    private Embedded info(Embedded embedded) {
        info("");
        info("Starting embedded Tomcat for application '" + id + "' - press ctrl-c to quit ");
        info("  CATALINA_HOME: " + embedded.getCatalinaHome());
        info("  CATALINA_BASE: " + embedded.getCatalinaBase());
        info("  URL: http://localhost:" + port + "/" + id);
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
