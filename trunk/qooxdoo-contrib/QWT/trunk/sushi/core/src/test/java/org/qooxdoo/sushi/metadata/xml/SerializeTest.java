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

package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;

import org.junit.Test;

import org.qooxdoo.sushi.metadata.model.Car;
import org.qooxdoo.sushi.metadata.model.Engine;
import org.qooxdoo.sushi.metadata.model.Kind;
import org.qooxdoo.sushi.metadata.model.ModelBase;
import org.qooxdoo.sushi.xml.Builder;

import static org.junit.Assert.*;

public class SerializeTest extends ModelBase {
    @Test
    public void string() {
        assertEquals("<string></string>\n", run(""));
        assertEquals("<string>&lt;&gt;&amp;</string>\n", run("<>&"));
        assertEquals("<string>ab</string>\n", run("ab"));
    }
    
    @Test
    public void integer() {
        assertEquals("<int>9</int>\n", run(9));
    }

    @Test
    public void enm() {
        assertEquals("<kind>van</kind>\n", run(Kind.VAN));
    }
    
    @Test
    public void engine() throws IOException {
        assertEquals("<engine>\n  <turbo>true</turbo>\n  <ps>1</ps>\n</engine>\n", run(new Engine(true, 1)));
    }

    @Test
    public void car() throws IOException {
        assertEquals(
                "<car>\n  <name></name>\n  <kind>normal</kind>\n  <seats>0</seats>\n" +
                "  <engine>\n    <turbo>false</turbo>\n    <ps>0</ps>\n  </engine>\n" +
                "</car>\n", run(new Car()));
    }

    @Test
    public void carDom() throws IOException {
        org.w3c.dom.Element root;
        
        root = new Builder().createDocument("root").getDocumentElement();
        METADATA.instance(new Car()).toXml(root);
        assertEquals(
                "<root>\n" +
                "<car>\n" +
                "<name/>\n" +
                "<kind>normal</kind>\n" +
                "<seats>0</seats>\n" +
                "<engine>\n" +
                "<turbo>false</turbo>\n" +
                "<ps>0</ps>\n" +
                "</engine>\n" +
                "</car>\n" +
                "</root>\n", 
                new org.qooxdoo.sushi.xml.Serializer().serialize(root));        
    }

    private String run(Object obj) {
        return METADATA.instance(obj).toXml();
    }
}
