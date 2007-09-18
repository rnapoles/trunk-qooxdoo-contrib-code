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

/**
 * @description QWT Help.
 * @requiresProject false
 * @goal help
 */
public class HelpMojo extends Base {
    @Override
    public void doExecute() throws IOException, MojoExecutionException {
        info("QWT Cheat Sheet");
        info("  create new application               mvn qwt:new -Dpackage=foo.bar.Baz");
        info("  remove generated files               mvn clean");
        info("  compile application                  mvn compile");
        info("  compile and test application         mvn test");
        info("  compile, test and build war          mvn package");
        info("  generate eclipse files               mvn eclipse:eclipse");
        info("  start compiled application           mvn qwt:run");
        info("  jmx console for running application  jconsole");
        info("");
        info("  add Maven user setting for Qwt       mvn qwt:install");
        info("  remove Maven user settings for Qwt   mvn qwt:uninstall");
        info("See also: http://qooxdoo.org/documentation/contrib/contributions/qwt");
    }
}
