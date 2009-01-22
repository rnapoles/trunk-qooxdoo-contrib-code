package org.qooxdoo.sushi.life;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.util.List;

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
    public void lookupWithoutVersionl() throws IOException {
        Jar one;
        Jar two;
        Life life;
        List<Jar> lst;

        one = new Jar("a:b:1");
        two = new Jar("a:b:2");
        life = new Life();
        life.jars().add(one);
        life.jars().add(two);
        life.jars().add(new Jar("a:c:2"));
        lst = life.lookupWithoutVersion(Id.fromString("a:b:2"));
        assertEquals(2, lst.size());
        assertTrue(lst.contains(one));
        assertTrue(lst.contains(two));
    }
}
