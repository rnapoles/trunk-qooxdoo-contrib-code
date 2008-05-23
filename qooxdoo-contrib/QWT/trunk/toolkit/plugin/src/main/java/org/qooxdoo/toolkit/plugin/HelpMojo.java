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

/**
 * QWT Help.
 * 
 * @requiresProject false
 * @goal help
 */
public class HelpMojo extends Base {
    @Override
    public void doExecute() throws IOException, MojoExecutionException {
        info("QWT commands");
        info("  mvn qx:new -Dpackage=foo.bar.baz     create new hello world application");
        info("  mvn qx:run                           start application");
        info("");
        info("Standard Maven commands");
        info("  mvn clean                            remove generated files");
        info("  mvn compile                          compile application");
        info("  mvn test                             compile and test application");
        info("  mvn package                          compile, test and build war");
        info("  mvn eclipse:eclipse                  generate eclipse files");
        info("");
        info("Misc");
        info("  jconsole                             admin console for running application");
        info("");
        info("Qooxdoo Plugin version: " + getVersion());
        info("");
        info("See also: http://qooxdoo.org/documentation/contrib/contributions/qwt");
    }
}
