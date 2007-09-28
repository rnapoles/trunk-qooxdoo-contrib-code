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
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.svn.SvnNode;
import org.tmatesoft.svn.core.SVNException;

/**
 * @description Create an examples directory
 * @requiresProject false
 * @goal examples
 */
public class ExamplesMojo extends Base {
    @Override
    public void doExecute() throws IOException, MojoExecutionException {
        SvnNode src;
        Node dest;
        
        dest = io.getWorking().join("examples");
        dest.mkdir();
        try {
            src = SvnNode.create(io, "https://qooxdoo-contrib.svn.sourceforge.net/svnroot/qooxdoo-contrib/trunk/qooxdoo-contrib/QWT/trunk/examples");
            src.export(dest);
        } catch (SVNException e) {
            throw new MojoExecutionException("svn failure", e);
        }
        info("created directory " + dest);
    }
}
