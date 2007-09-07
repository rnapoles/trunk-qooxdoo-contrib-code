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

package org.qooxdoo.toolkit.server;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.toolkit.compiler.Naming;
import org.qooxdoo.toolkit.repository.JavaScriptEngine;
import org.qooxdoo.toolkit.repository.Repository;

@Ignore
public class SerializationJsTest {
    // TODO: using a static ENGINE fails when running the tests in surefire ...
    private JavaScriptEngine engine;

    @Before
    public void setUp() throws Exception {
        IO io;
        Repository repository;
        
        io = new IO();
        repository = Naming.createRootRepository(io);
        repository.loadAll(Unit.classpath(io));
        engine = new JavaScriptEngine(repository);
        engine.load(Parser.class.getName(), Serializer.class.getName());
    }

    @Test
    public void nulL() throws Exception {
        check("null");
    }

    @Test
    public void truE() throws Exception {
        check("true");
    }

    @Test
    public void integer() throws Exception {
        check("#1");
    }

    @Test
    public void lonG() throws Exception {
        check("&-1");
    }

    @Test
    public void string() throws Exception {
        check("''");
        check("'abc'");
    }

    @Test
    public void list() throws Exception {
        check("[]");
        check("['a','b']");
        check("[null,'1']");
    }

    @Test
    public void set() throws Exception {
        check("{}");
        check("{'abc'}");
    }

    @Test
    public void map() throws Exception {
        check("()");
        check("('a':'b')");
        check("('a':null)");
        // TODO: works, but the ordering changes:
        // check("('a':'1','b':'2')");
        check("('a':[])");
        check("([]:[null])");
    }

    private void check(String str) throws Exception {
        assertEquals(str, engine.eval(
                "var obj = org.qooxdoo.toolkit.server.Parser.run(\"" + str + "\");" +
                "org.qooxdoo.toolkit.server.Serializer.run(obj).toString()"
                ));
    }
}
