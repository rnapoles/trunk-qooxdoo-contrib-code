package org.qooxdoo.sushi.life;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class IdTest {
    @Test
    public void fromString() {
        check("1:2:3");
        check("de.schlund.tariff:tariff:1-SNAPSHOT");
    }
    
    private void check(String id) {
        assertEquals(id, Id.fromString(id).toString());
    }

    @Test
    public void formRepoNode() throws Exception {
        IO io;
        Node junit;
        
        io = new IO();
        junit = io.locateClasspathItem(Test.class);
        junit.checkFile();
        assertEquals(Id.fromString("junit:junit:4.4"), Id.fromNode(junit));
    }

    @Test
    public void formBillyboyNode() throws Exception {
        IO io;
        Node jar;
        
        io = new IO();
        jar = io.getWorking().join("a+bc+def.jar");
        jar.writeBytes();
        try {
            assertEquals(Id.fromString("a:bc:def"), Id.fromNode(jar));
        } finally {
            jar.delete();
        }
    }
}
