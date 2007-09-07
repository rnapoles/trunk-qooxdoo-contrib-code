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

package org.qooxdoo.toolkit.repository;

import java.util.ArrayList;
import java.util.List;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class JavaScriptEngine {
    private static final ScriptEngineManager FACTORY = new ScriptEngineManager();
    
    private final Repository repository;
    /** not a set because I want sequence information */
    private final List<Module> loaded;
    private final ScriptEngine engine;

    public final Console console;

    public JavaScriptEngine(Repository repository) {
        this.repository = repository;
        this.loaded = new ArrayList<Module>();
        this.engine = FACTORY.getEngineByName("JavaScript");
        this.console = new Console();
        put("console", console);
    }

    public Repository getRepository() {
        return repository;
    }
    
    protected void put(String name, Object obj) {
        engine.getBindings(ScriptContext.GLOBAL_SCOPE).put(name, obj);
    }

    /** load once */
    public void load(String ... name) throws JavaScriptException {
        load(repository.getAll(name));
    }

    public void load(List<Module> modules) throws JavaScriptException {
        Module[] array;
        
        array = new Module[modules.size()];
        modules.toArray(array);
        load(array);
    }

    public void load(Module ... modules) throws JavaScriptException {
        List<Module> added;
        
        added = repository.sequence(loaded, modules);
        loaded.addAll(added);
        for (Module add : added) {
            eval(add.getName(), add.getCode());
        }
        eval("cinit", Repository.cinitCalls(added));
    }

    public Object eval(String script) throws JavaScriptException {
        return eval("noname", script);
    }
    
    // see http://blogs.sun.com/sundararajan/entry/more_javascript_debugging_tips_mustang
    // CAUTION: no line breaks to leave line numbers unchanged
    private static final String HEAD = "try { "; 
    private static final String TAIL = 
        "} catch (e) {" +
        "  if (typeof e.rhinoException != 'undefined') {" +
        "    rhinoException = e.rhinoException;" + 
        "  } else {" +
        "    /* for (a in e) { println(a + ':' + e[a]); } */" +
        "    rhinoMessage = e.message;" +
        "  } " +
        "  throw e;" +
        "}";
    
    public Object eval(String filename, String script) throws JavaScriptException {
        Throwable rhinoException;
        
        engine.getBindings(ScriptContext.ENGINE_SCOPE).put(ScriptEngine.FILENAME, filename);
        try {
            return engine.eval(HEAD + script + TAIL);
        } catch (ScriptException e) {
            rhinoException = (Throwable) engine.getBindings(ScriptContext.ENGINE_SCOPE).get("rhinoException");
            if (rhinoException != null) {
                throw JavaScriptException.create(e, rhinoException, script);
            } else {
                throw JavaScriptException.create(e,
                        (String) engine.getBindings(ScriptContext.ENGINE_SCOPE).get("rhinoMessage"),
                        script);
            }
        }
    }
}
