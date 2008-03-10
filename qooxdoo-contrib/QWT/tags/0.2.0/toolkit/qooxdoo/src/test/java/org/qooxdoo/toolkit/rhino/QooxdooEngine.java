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

package org.qooxdoo.toolkit.rhino;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.xml.Xml;
import org.qooxdoo.toolkit.qooxdoo.Qooxdoo;
import org.qooxdoo.toolkit.repository.JavaScriptEngine;
import org.qooxdoo.toolkit.repository.Repository;

public class QooxdooEngine extends JavaScriptEngine {
    public final Xml xml;
    public final Document doc;

    public QooxdooEngine(IO io) {
        this(Qooxdoo.load(io).repository);
    }

    public QooxdooEngine(Repository repository) {
        super(repository);
        
        xml = new Xml();
        doc = new Document(xml, 
                "<html>" +
                "  <head></head>" +
                "  <body></body>" +
                "</html>");
        try {
            put("document", doc);
            eval(
                "_isrhino = true;" +
                "window = this;" +
                "window.location = new Object();" +
                "window.controllers = new Object();" +
                "window.location.protocol = 'http:';" +
                "window.addEventListener = function() {}; " +
                "window.qxsettings = {\n" +
                "  'qx.propertyDebugLevel' : 10\n" +
                "};" +
                "navigator = new Object();" +
                "navigator.vendor = 'QWT'; " +
                "navigator.userAgent = 'rv:1.0;'; " +
                "navigator.product = 'Gecko';" +
                "navigator.platform = 'java';" +
                "navigator.language = 'EN';" +
                "navigator.userLanguage = 'EN';"
                );
        } catch (Exception e) {
            throw new RuntimeException("cannot create qooxdoo engine", e);
        }
    }
}
