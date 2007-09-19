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
import java.util.ArrayList;
import java.util.List;

import org.apache.maven.artifact.Artifact;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;

import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Strings;

public abstract class WebappBase extends Base {
    /**
     * Web.xml servlet name for this application.
     * 
     * @parameter expression="${project.artifactId}"
     * @required
     */
    protected String id;

    /**
     * Web.xml Display-name for this application.
     * 
     * @parameter expression="${project.name}"
     * @required
     */
    private String name;

    /**
     * Web.xml description for this application.
     * 
     * @parameter expression="${project.description}"
     * @required
     */
    private String description;

    /**
     * Name of the Application class.
     *
     * @parameter expression="${project.groupId}.${project.artifactId}.Main"
     * @required
     */
    private String main;

    /**
     * Java files to include in JavaScript compilation. Ant-like patterns, separated by ','.
     *
     * @parameter expression=""
     */
    private List<String> includes = new ArrayList<String>();
    
    /**
     * Java files to exclude from JavaScript compilation. Ant-like patterns, separated by ','.
     *
     * @parameter expression=""
     */
    private List<String> excludes = new ArrayList<String>();
    
    /**
     * Images.
     *
     * @parameter expression="${basedir}/src/main/images"
     * @required
     */
    private FileNode images;

    public void setImages(String path) {
        images = io.node(path);
    }
    
    /**
     * The Maven project.
     *
     * @parameter expression="${project}"
     * @required
     * @readonly
     */
    protected MavenProject project;

    /**
     * The directory containing generated classes.
     *
     * @parameter expression="${project.build.outputDirectory}"
     * @required
     * @readonly
     */
    private FileNode classesDirectory;

    public void setClassesDirectory(String path) {
        classesDirectory = io.node(path);
    }

    /**
     * The directory containing generated classes.
     *
     * @parameter expression="${basedir}/src/main/java"
     * @required
     * @readonly
     */
    private FileNode sourceDirectory;

    public void setSourceDirectory(String dir) {
        sourceDirectory = io.node(dir);
    }

    /**
     * Directory where the web application is built.
     *
     * @parameter expression="${project.build.directory}/webapp"
     * @required
     */
    protected FileNode webapp;

    public void setWebapp(String path) {
        webapp = io.node(path);
    }
    
    private static final String WEB_INF = "WEB-INF";

    //--

    public void webapp() throws MojoExecutionException, IOException {
        info("Building webapp...");

        FileNode webinf;
        FileNode lib;
        Artifact artifact;
        String name;
        
        webinf = (FileNode) webapp.join(WEB_INF);
        lib = (FileNode) webinf.join("lib");
        webapp.deleteOpt();
        webapp.mkdir();
        webinf.mkdir();
        lib.mkdir();
        webXml(webinf.join("web.xml"));

        if (images.exists()) {
            images.link((FileNode) webapp.join(images.getName()));
        } else {
            info("no images: " + images);
        }

        if (!classesDirectory.exists()) {
            throw new MojoExecutionException("missing " + classesDirectory + " - did you compile?");
        }
        classesDirectory.link((FileNode) webinf.join(classesDirectory.getName()));
        sourceDirectory.link((FileNode) webinf.join("src"));
        for (Object obj : project.getArtifacts()) {
            artifact = (Artifact) obj;
            name = getLibName(artifact);
            if (name != null) {
                debug("link " + artifact.getFile());
                new FileNode(io, artifact.getFile()).link((FileNode) lib.join(name));
            }
        }
    }

    public void webXml(Node webXml) throws MojoExecutionException {
        String str;

        str = WEB_XML.replace("${id}", id);
        str = str.replace("${name}", name);
        str = str.replace("${description}", description);
        str = str.replace("${main}", main);
        str = str.replace("${includes}", Strings.join(",", includes));
        str = str.replace("${excludes}", Strings.join(",", excludes));
        generate(webXml, str);
    }

    private static String getLibName(Artifact artifact) {
        String scope;

        scope = artifact.getScope();
        if ("test".equals(scope) || "provided".equals(scope)) {
            // skip
            return null;
        }
        // prefix with group to avoid name clashes (e.g. log4j.log4j vs org.apache.log4j)
        return artifact.getGroupId() + "-" + artifact.getFile().getName();
    }

    //--
    
    private void generate(Node file, String str) throws MojoExecutionException {
        info("generating " + file);
        try {
            file.writeString(str);
        } catch (IOException e) {
            throw new MojoExecutionException("cannot write " + file, e);
        }
    }

    private static final String ENCODING = "UTF-8";
    private static final String WEB_XML = 
        "<?xml version='1.0' encoding='" + ENCODING + "'?>\n" + 

        "<web-app xmlns='http://java.sun.com/xml/ns/j2ee'\n" + 
        "    xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\n" + 
        "    xsi:schemaLocation='http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd'\n" + 
        "    version='2.4'>\n" +
        
        "   <display-name>${name}</display-name>\n" + 
        "   <description>${description}</description>\n" + 
        "   <servlet>\n" + 
        "      <servlet-name>${id}</servlet-name>\n" + 
        "      <servlet-class>org.qooxdoo.toolkit.server.Servlet</servlet-class>\n" + 
        "      <init-param>\n" + 
        "          <param-name>main</param-name>\n" + 
        "          <param-value>${main}</param-value>\n" + 
        "      </init-param>\n" + 
        "      <init-param>\n" + 
        "          <param-name>includes</param-name>\n" + 
        "          <param-value>${includes}</param-value>\n" + 
        "      </init-param>\n" + 
        "      <init-param>\n" + 
        "          <param-name>excludes</param-name>\n" + 
        "          <param-value>${excludes}</param-value>\n" + 
        "      </init-param>\n" + 
        "   </servlet>\n" + 
        "   <servlet-mapping>\n" + 
        "      <servlet-name>${id}</servlet-name>\n" + 
        "      <url-pattern>/*</url-pattern>\n" + 
        "   </servlet-mapping>\n" + 
        "</web-app>\n";
}
