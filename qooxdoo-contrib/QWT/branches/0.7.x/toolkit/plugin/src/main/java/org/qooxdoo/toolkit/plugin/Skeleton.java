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

import org.apache.maven.plugin.MojoExecutionException;
import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.svn.SvnNode;

public class Skeleton {
    public static final String NAME = "skel.zip";
    public static final String PACKAGE = "%PACKAGE%";
    public static final String GROUP = "%GROUP%";
    public static final String ARTIFACT = "%ARTIFACT%";
    public static final String TOOLKIT_VERSION = "%TOOLKIT_VERSION%";
    
    private static final IO IO_OBJ = new IO();

    private static final String PREFIX = "scm:svn:";
    
    public static void main(String[] args) throws Exception {
        String url;
        SvnNode src;
        Archive zip;
        Node data;
        Node dest;
        
        if (args.length != 2) {
            throw new IllegalArgumentException();
        
        }
        zip = Archive.createZip(IO_OBJ);
        url = getUrl(args[1]);

        
        // TODO
        url = "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/branches";
        data = IO_OBJ.createTempDirectory();
        
        System.out.println("svn export " + url);
        src = SvnNode.create(IO_OBJ, url);
        src.export(data);
        data.join("0.7.x/application").copyDirectory(zip.data);
        for (Node application : zip.data.children()) {
            if (application.isDirectory()) {
                System.out.println("adding application " + application.getName());
                fix(application);
            } else {
                System.out.println("deleting " + application);
            }
        }
        dest = IO_OBJ.node(args[0]).join(NAME);
        System.out.println("creating archive: " + dest);
        zip.save(dest);
    }
    
    private static String getUrl(String svn) {
        int idx;
        
        if (!svn.startsWith(PREFIX)) {
            throw new IllegalArgumentException(svn);
        }
        svn = svn.substring(PREFIX.length());
        idx = svn.indexOf("toolkit/plugin");
        if (idx == -1) {
            throw new IllegalArgumentException(svn);
        }
        return svn.substring(0, idx) + "application";
    }

    private static final String PARENT = 
        "  <parent>\n" +
        "    <groupId>org.qooxdoo</groupId>\n" + 
        "    <artifactId>qooxdoo</artifactId>\n" + 
        "    <version>2-SNAPSHOT</version>\n" + 
        "  </parent>\n";
    private static final String MARK = "##parent##";
    
    private static void fix(Node application) throws IOException, MojoExecutionException {
        Node pom;
        String str;
     
        
        fix(application, "java");
        fix(application, "test");
        pom = application.join("pom.xml");
        str = pom.readString();
        str = replace1(str, PARENT, MARK);
        str = replaceTag(str, "artifactId", application.getName(), ARTIFACT);
        str = replaceTag(str, "groupId", "org.qooxdoo", GROUP);
        str = replaceTag(str, "toolkit.version", Base.getVersion(application.io), TOOLKIT_VERSION);
        str = replace1(str, MARK, PARENT);
        pom.writeString(str);
    }
    
    private static void fix(Node application, String part) throws IOException, MojoExecutionException {
        Node src;
        Node dest;
        String relative;
        String str;
        String pkg;
        
        pkg = "org.qooxdoo." + application.getName();
        src = application.join("src/main", part);
        if (!src.exists()) {
            return;
        }
        dest = application.join("src/main", part, "PACKAGE");
        dest.mkdir();
        for (Node java : src.find("**/*.java")) {
            relative = java.getParent().getRelative(src);
            if (!relative.equals("org/qooxdoo/" + application.getName())) {
                throw new MojoExecutionException("unexpected source file location: " + relative);
            }
            str = java.readString();
            str = replace1(str, "package " + pkg + ";", "package " + PACKAGE + ";");
            dest.join(java.getName()).writeString(str);
        }
        src.join("org").delete();
    }
    
    private static String replaceTag(String str, String tag, String from, String to) throws MojoExecutionException {
        return replace1(str, '<' + tag + '>' + from + "</" + tag + '>',
                             '<' + tag + '>' + to + "</" + tag + '>');
    }
    
    private static String replace1(String str, String from, String to) throws MojoExecutionException {
        int idx;
        
        idx = str.indexOf(from);
        if (idx == -1) {
            throw new MojoExecutionException("substring not found: " + from);
        }
        if (str.indexOf(from, idx + 1) != -1) {
            throw new MojoExecutionException("substring ambiguous: '" + from + "'");
        }
        return str.substring(0, idx) + to + str.substring(idx + from.length());
    }
}
