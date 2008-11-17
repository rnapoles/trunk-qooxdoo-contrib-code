package org.qooxdoo.sushi.life;

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
        assertNull(life.lookup("foo", "bar", "bar"));
        life.jars().add(new Jar("a", "b", "c", "d"));
        file = new IO().getTemp().createTempFile();
        life.save(file);
        life = Life.load(file);
        assertNotNull(life.lookup("a", "b", "c"));
        assertNull(life.lookup("a", "b", "d"));
    }
}
