package org.qooxdoo.sushi.life;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
 
public class LifeTest {
    @Test
    public void normal() throws IOException {
        Life life;
        Node file;
        
        life = new Life();
        assertNull(life.lookup(new Id("foo", "bar", "bar")));
        life.jars().add(new Jar(new Id("a", "b", "c")));
        file = new IO().getTemp().createTempFile();
        life.save(file);
        life = Life.load(file);
        assertNotNull(life.lookup(new Id("a", "b", "c")));
        assertNull(life.lookup(new Id("a", "b", "d")));
    }
    
    @Test
    public void fromString() {
        check("1:2:3");
        check("de.schlund.tariff:tariff:1-SNAPSHOT");
    }
    
    private void check(String id) {
        assertEquals(id, Id.fromString(id).toString());
    }
}
