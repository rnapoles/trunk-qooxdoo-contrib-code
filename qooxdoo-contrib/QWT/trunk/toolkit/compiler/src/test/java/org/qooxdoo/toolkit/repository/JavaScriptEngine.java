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

import java.util.ArrayList;
import java.util.List;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.RhinoException;
import org.mozilla.javascript.ScriptableObject;
import org.qooxdoo.sushi.graph.CyclicDependency;

/** 
 * I use Rhino directly, not via javax.script from Java 6 because I want:
 * o tight control about the version I use
 * o more error details than exposed java javax.script
 */
public class JavaScriptEngine {
    public static final Object UNDEFINED = Context.getUndefinedValue();

    private final Repository repository;
    /** not a set because I want sequence information */
    private final List<Module> loaded;
    private final Context context;
    private final ScriptableObject scope;

    public final Console console;

    public JavaScriptEngine(Repository repository) {
        this.repository = repository;
        this.loaded = new ArrayList<Module>();
        this.context = Context.enter();
        this.scope = context.initStandardObjects();
        this.console = new Console();
        put("console", console);
    }
    
    public Repository getRepository() {
        return repository;
    }
    
    protected void put(String name, Object obj) {
        ScriptableObject.putProperty(scope, name, Context.javaToJS(obj, scope));
    }

    /** load once */
    public void load(String ... name) throws JavaScriptException, CyclicDependency {
        load(repository.getAll(name));
    }

    public void load(List<Module> modules) throws JavaScriptException, CyclicDependency {
        Module[] array;
        
        array = new Module[modules.size()];
        modules.toArray(array);
        load(array);
    }

    public void load(Module ... modules) throws JavaScriptException, CyclicDependency {
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
    
    public Object eval(String filename, String script) throws JavaScriptException {
        try {
            return context.evaluateString(scope, script, filename, 1, null);
        } catch (RhinoException e) {
            throw JavaScriptException.create(filename, e.lineNumber(), e.columnNumber(), e.getMessage(), script, e, "");
        }
    }
}
