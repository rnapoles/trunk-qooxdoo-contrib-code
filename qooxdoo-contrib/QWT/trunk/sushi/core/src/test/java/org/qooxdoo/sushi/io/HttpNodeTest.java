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

package org.qooxdoo.sushi.io;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URL;

import org.junit.Ignore;
import org.junit.Test;

public class HttpNodeTest {
    private IO io = new IO();
    
    @Test
    public void jarUrl() {
        URL url;
        HttpNode node;
        
        url = getClass().getResource("/java/lang/Object.class");
        assertEquals("jar", url.getProtocol());
        node = new HttpNode(io, url);
        // TODO !?
        assertEquals(url.toString(), "jar:" + node.getPath());
        assertTrue(node.exists());
        assertTrue(node.isFile());
        assertTrue(node.getParent().getPath().endsWith("/java/lang"));
        node = (HttpNode) node.getParent().join("Object.class");
        // TODO: 
        // assertTrue(node.exists());
    }
    
    @Ignore
    public void todo() throws IOException {
        URL url;
        
        url = new URL("jar:file:/usr/home/mhm/Projects/pfixentertainment/projects/servletconf/tomcat/shared/lib/de.schlund.pfixschlund.order-modules+stageassistent+1.0.6.jar!/script/main.js");
        assertTrue(new HttpNode(io, url).exists()); 
        url = new URL("jar:file:/usr/home/mhm/Projects/pfixentertainment/projects/servletconf/tomcat/shared/lib/de.schlund.pfixschlund.order-modules+stageassistent+1.0.6.jar!/");
        System.out.println(new HttpNode(io, url).join("script/main.js").readString()); 
    }

    @Ignore // TODO: fails behind proxy
    public void ampersand() throws IOException {
        URL url;
        
        url = new URL("http://www.heise.de/?b=1&c=d");
        assertTrue(new HttpNode(io, url).readString().length() > 1); 
    }
}

