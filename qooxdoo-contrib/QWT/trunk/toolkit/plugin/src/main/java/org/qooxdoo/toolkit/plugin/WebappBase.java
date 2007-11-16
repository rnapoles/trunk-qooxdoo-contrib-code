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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.maven.artifact.Artifact;
import org.apache.maven.artifact.factory.ArtifactFactory;
import org.apache.maven.artifact.metadata.ArtifactMetadataSource;
import org.apache.maven.artifact.repository.ArtifactRepository;
import org.apache.maven.artifact.resolver.ArtifactNotFoundException;
import org.apache.maven.artifact.resolver.ArtifactResolutionException;
import org.apache.maven.artifact.resolver.ArtifactResolutionResult;
import org.apache.maven.artifact.resolver.ArtifactResolver;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProject;
import org.qooxdoo.sushi.io.FileNode;
import org.qooxdoo.sushi.io.Node;

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
     * Name of the server class.
     *
     * @parameter expression="${project.groupId}.${project.artifactId}.server.Main"
     * @required
     */
    private String server;

    /**
     * Name of the client class.
     *
     * @parameter expression="${project.groupId}.${project.artifactId}.client.Main"
     * @required
     */
    private String client;


    /**
     * Java files to include in JavaScript compilation. Ant-like patterns, separated by ','.
     *
     * @parameter
     */
    private String includes = "**/*.java";
    
    /**
     * Java files to exclude from JavaScript compilation. Ant-like patterns, separated by ','.
     *
     * @parameter
     */
    private String excludes = "**/server/**/*.java";
    
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

        List<Artifact> projectDependencies;
        List<Artifact> systemDependencies;
        FileNode webinf;
        FileNode lib;
        String name;
        
        webinf = (FileNode) webapp.join(WEB_INF);
        lib = (FileNode) webinf.join("lib");
        webapp.deleteOpt();
        webapp.mkdir();
        webinf.mkdir();
        lib.mkdir();
        webXml(webinf.join("web.xml"));

        projectDependencies = project.getRuntimeArtifacts();
        if (images.exists()) {
            linkOrCopy(images, (FileNode) webapp.join(images.getName()));
        } else {
            info("no images: " + images);
        }

        if (!classesDirectory.exists()) {
            throw new MojoExecutionException("missing " + classesDirectory + " - did you compile?");
        }
        linkOrCopy(classesDirectory, (FileNode) webinf.join(classesDirectory.getName()));
        linkOrCopy(sourceDirectory, (FileNode) webinf.join("src"));
        for (Artifact artifact : projectDependencies) {
            name = getLibName(artifact);
            if (name != null) {
                debug("project link " + artifact.getFile());
                linkOrCopy(new FileNode(io, artifact.getFile()), (FileNode) lib.join(name));
            }
        }
        try {
            systemDependencies = systemDependencies();
        } catch (ArtifactResolutionException e) {
            throw new MojoExecutionException("cannot resolve system dependencies", e);
        } catch (ArtifactNotFoundException e) {
            throw new MojoExecutionException("cannot resolve system dependencies", e);
        }
        info("adding systemdependencies: " + systemDependencies);
        for (Artifact artifact : systemDependencies) {
            if (contains(projectDependencies, artifact)) {
                debug("already project dependency: " + artifact);
            } else {
                name = getLibName(artifact);
                if (name != null) {
                    debug("system link " + artifact.getFile());
                    linkOrCopy(new FileNode(io, artifact.getFile()), (FileNode) lib.join(name));
                }
            }
        }
    }

    private static boolean contains(List<Artifact> lst, Artifact artifact) throws MojoExecutionException {
        for (Artifact ele : lst) {
            if (ele.getGroupId().equals(artifact.getGroupId()) && ele.getArtifactId().equals(artifact.getArtifactId())) {
                if (ele.getVersion().equals(artifact.getVersion())) {
                    return true;
                } else {
                    throw new MojoExecutionException("project dependency conflicts with system dependency: " + ele + " vs. " + artifact);
                }
            }
        }
        return false;
    }

    public void webXml(Node webXml) throws MojoExecutionException {
        String str;

        str = WEB_XML.replace("${id}", id);
        str = str.replace("${name}", name);
        str = str.replace("${description}", description);
        str = str.replace("${server}", server);
        str = str.replace("${client}", client);
        str = str.replace("${includes}", includes);
        str = str.replace("${excludes}", excludes);
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
        "<web-app xmlns='http://java.sun.com/xml/ns/javaee'\n" +
        "   xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'\n" +
        "   xsi:schemaLocation='http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd'\n" +
        "   version='2.5'>\n" +
        "   <display-name>${name}</display-name>\n" + 
        "   <description>${description}</description>\n" + 
        "   <context-param>\n" +
        "      <param-name>server</param-name>\n" +
        "      <param-value>${server}</param-value>\n" +
        "   </context-param>\n" +
        "   <context-param>\n" +
        "      <param-name>client</param-name>\n" +
        "      <param-value>${client}</param-value>\n" +
        "   </context-param>\n" +
        "   <context-param>\n" +
        "      <param-name>includes</param-name>\n" +
        "      <param-value>${includes}</param-value>\n" +
        "   </context-param>\n" +
        "   <context-param>\n" +
        "      <param-name>excludes</param-name>\n" +
        "      <param-value>${excludes}</param-value>\n" +
        "   </context-param>\n" +
        "   <servlet>\n" +
        "      <servlet-name>resource</servlet-name>\n" +
        "      <servlet-class>org.qooxdoo.toolkit.engine.ResourceServlet</servlet-class>\n" + 
        "   </servlet>\n" +
        "   <servlet>\n" +
        "      <servlet-name>method</servlet-name>\n" +
        "      <servlet-class>org.qooxdoo.toolkit.engine.MethodServlet</servlet-class>\n" + 
        "   </servlet>\n" +
        "   <servlet>\n" + 
        "      <servlet-name>session</servlet-name>\n" +
        "      <servlet-class>org.qooxdoo.toolkit.engine.SessionServlet</servlet-class>\n" + 
        "   </servlet>\n" + 
        "   <servlet-mapping>\n" +
        "      <servlet-name>resource</servlet-name>\n" +
        "      <url-pattern>/*</url-pattern>\n" +
        "   </servlet-mapping>\n" +
        "   <servlet-mapping>\n" +
        "      <servlet-name>method</servlet-name>\n" +
        "      <url-pattern>/method/*</url-pattern>\n" +
        "   </servlet-mapping>\n" +
        "   <servlet-mapping>\n" +
        "      <servlet-name>session</servlet-name>\n" +
        "      <url-pattern>/session/*</url-pattern>\n" +
        "   </servlet-mapping>\n" +
        "</web-app>\n";
    
    //-- resolve engine dependencies
    
    /**
     * Used to look up Artifacts in the remote repository.
     * 
     * @parameter expression="${component.org.apache.maven.artifact.factory.ArtifactFactory}"
     * @required
     * @readonly
     */
    private ArtifactFactory artifactFactory;

    /**
     * Used to look up Artifacts in the remote repository.
     * 
     * @parameter expression="${component.org.apache.maven.artifact.resolver.ArtifactResolver}"
     * @required
     * @readonly
     */
    private ArtifactResolver artifactResolver;

    /**
     * @parameter expression="${localRepository}"
     * @readonly
     * @required
     */
    private ArtifactRepository localRepository;

    /**
     * @parameter expression="${project.remoteArtifactRepositories}"
     * @readonly
     * @required
     */
    private List<ArtifactRepository> remoteRepositories;
   
    /**
     * @component role="org.apache.maven.artifact.metadata.ArtifactMetadataSource"
     *            hint="maven"
     * @required
     * @readonly
     */
    protected ArtifactMetadataSource artifactMetadataSource;
   
    private List<Artifact> systemDependencies() throws ArtifactResolutionException, ArtifactNotFoundException {
        Set<Artifact> artifacts;
        List<Artifact> result;
        ArtifactResolutionResult resolutionResult;
        Artifact artifact;
        
        artifacts = new HashSet<Artifact>();
        artifacts.add(artifactFactory.createArtifact("org.qooxdoo.toolkit", "engine", getVersion(), null, "jar"));
        resolutionResult = artifactResolver.resolveTransitively(artifacts, project.getArtifact(), 
                remoteRepositories, localRepository, artifactMetadataSource);
        result = new ArrayList<Artifact>();
        for (Object obj : resolutionResult.getArtifacts()) {
            artifact = (Artifact) obj;
            if (!"test".equals(artifact.getScope()) && !"provided".equals(artifact.getScope())) {
                result.add(artifact);
            }
        }
        return result;
    }
}
