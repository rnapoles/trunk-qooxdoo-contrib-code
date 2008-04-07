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

import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.project.MavenProjectHelper;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.fs.file.FileNode;

/**
 * Packages an application into a War file.
 * @goal war
 * @phase package
 * @requiresDependencyResolution runtime
 */
public class WarMojo extends WebappBase {
    /**
     * WAR file to be generated.
     *
     * @parameter expression="${project.build.directory}/${project.artifactId}-${project.version}.war"
     * @required
     */
    private FileNode war;
    
    public void setWar(String path) {
        war = io.file(path);
    }

    /**
     * Used for attaching the source jar to the project.
     *
     * @component
     */
    private MavenProjectHelper projectHelper;

    //--

    @Override
    public void doExecute() throws MojoExecutionException, IOException {
        webapp();
        war();
    }
    
    private void war() throws IOException {
        Archive archive;
        
        info("Generating war " + war.getPath());
        archive = Archive.createJar(io);
        webapp.copyDirectory(archive.data);
        archive.save(war);
        projectHelper.attachArtifact(project, "war", war.getFile());
    }
}
