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

package org.qooxdoo.toolkit.repository;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

import org.junit.Test;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.graph.CyclicDependency;

public class RepositoryTest {
    private static final IO IO_OBJ = new IO();

    @Test
    public void empty() {
        Repository repository;
        
        repository = new Repository();
        assertEquals(0, repository.size());
        assertNull(repository.lookup("nosuchmodule"));
    }

    @Test
    public void twoEmpty() {
        Repository repository;
        
        repository = new Repository();
        repository.addAll(new Repository());
        repository.addAll(new Repository());
        assertEquals(0, repository.size());
        assertNull(repository.lookup("nosuchmodule"));
    }

    @Test
    public void withSimple() {
        Repository simple;
        Repository repository;
        
        simple = new Repository();
        simple.add(new Module("foo"));
        repository = new Repository();
        repository.addAll(new Repository());
        repository.addAll(simple);
        assertEquals(1, repository.size());
        assertNotNull(repository.get("foo"));
        assertNull(repository.lookup("nosuchmodule"));
    }

    @Test
    public void ambiguous() {
        Repository repository;

        repository = new Repository();
        repository.add(new Module("p1.foo"));
        repository.add(new Module("p2.foo"));
        assertEquals("p1", repository.get("p1.foo").getPackage());
        try {
            repository.get("foo");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void duplicate() {
        Repository repository;

        repository = new Repository();
        repository.add(new Module("p1.foo"));
        repository.add(new Module("p2.foo"));
        try {
            repository.add(new Module("p2.foo"));
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void notFound() {
        Repository repository;

        repository = new Repository();
        assertNull(repository.lookup("notfound"));
        try {
            repository.get("notfound");
            fail();
        } catch (IllegalArgumentException e) {
            // ok
        }
    }

    @Test
    public void load() throws IOException {
        Repository repository;
        Node tmp;

        repository = checkRepo(IO_OBJ.guessProjectHome(getClass()).join("src", "test", "repository"));
        tmp = IO_OBJ.getTemp().createTempDirectory();
        repository.save(tmp);
        checkRepo(tmp);
    }

    private Repository checkRepo(Node dir) throws IOException {
        Repository repository;
        Module src;

        repository = load(dir);
        assertEquals(3, repository.size());
        src = repository.get("first");
        assertEquals("first", src.getName());
        assertEquals("a", src.getCode());
        assertEquals("[]", src.head().deps.toString());
        src = repository.getSimple("Second");
        assertEquals("sub.Second", src.getName());
        assertEquals("b", src.getCode());
        assertEquals("[first]", src.head().deps.toString());
        src = repository.getSimple("3");
        assertEquals("sub.subSub.3", src.getName());
        assertEquals("c", src.getCode());
        return repository;
    }

    private Repository load(Node dir) throws IOException {
        Repository repository;

        repository = new Repository();
        repository.load(dir);
        return repository;
    }
    
    //-- dependencies

    @Test
    public void directCycle() {
        Module s;
        
        s = new Module("pkg.foo");
        s.head().deps.names().add(s.getName());
        try {
            new Repository(s).executable(s);
            fail();
        } catch (CyclicDependency e) {
            // ok
        }
    }

    @Test
    public void indirectCycle() {
        Module derived;
        Module base;
        
        base = new Module("pkg.base");
        derived = new Module("pkg.derived");
        derived.add(new Chunk(derived.getName(), ""));
        derived.head().deps.names().add(base.getName());
        base.add(new Chunk(derived.getName(), ""));
        base.head().deps.names().add(derived.getName());
        try {
            new Repository(base, derived).executable(derived);
            fail();
        } catch (CyclicDependency e) {
            // ok
        }
    }

    @Test
    public void sequenceSimple() {
        Module s;
        
        s = new Module("foo");
        check(s, "foo");
    }

    private void check(Module s, String... names) {
        List<Module> lst;
        
        try {
            lst = new Repository(s).executable(new StringWriter(), false, s);
        } catch (CyclicDependency e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        assertEquals(names.length, lst.size());
        for (int i = 0; i < names.length; i++) {
            assertEquals(names[i], lst.get(i).getSimpleName());
        }
    }
}
