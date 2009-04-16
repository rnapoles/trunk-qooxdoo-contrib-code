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

package org.qooxdoo.sushi.fs;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.util.Substitution;
import org.qooxdoo.sushi.util.SubstitutionException;

public abstract class Template {
    private final Map<Character, Method> contextConstructors;
    private final Map<String, Method> calls;
    
    private static final String CONTEXT = "context";
    private static final String CALL = "call";
    
    public Template() {
        String name;
        char c;
        
        contextConstructors = new HashMap<Character, Method>();
        calls = new HashMap<String, Method>();
        for (Method m : getClass().getDeclaredMethods()) {
            name = m.getName();
            if (name.startsWith(CONTEXT)) {
                c = Character.toUpperCase(name.substring(CONTEXT.length()).charAt(0));                
                if (contextConstructors.put(c, m) != null) {
                    throw new IllegalArgumentException("duplicate context character: " + c);
                }
            } else if (name.startsWith(CALL)) {
            	name = name.substring(CALL.length()).toLowerCase();
            	if (calls.put(name, m) != null) {
                    throw new IllegalArgumentException("duplicate call: " + name);
            	}
            }
        }
    }
    
    public void applyDirectory(Node srcdir, Node dest, Map<String, String> context) throws IOException, TemplateException {
        String template;
        String srcname;
        List<Map<String, String>> children;
        Substitution s;
        Node destfile;
        
        for (Node srcfile : srcdir.list()) {
            srcname = srcfile.getName();
            if (".svn".equals(srcname)) { // TODO
            	continue;
            }
            children = new ArrayList<Map<String, String>>();
            if (srcname.startsWith("!")) {
            	call(srcname.substring(1), srcdir, context);
            } else {
                srcname = split(srcfile.getName(), context, children);
                for (Map<String, String> child : children) {
                    s =  new Substitution("${{", "}}", '\\', child);
                    try {
                        destfile = dest.join(s.apply(srcname)); 
                    } catch (SubstitutionException e) {
                        throw new TemplateException(srcfile.getPath() + ": cannot substitute name:" + e.getMessage(), e);
                    }
                    if (srcfile.isDirectory()) {
                        destfile.mkdir();
                        applyDirectory(srcfile, destfile, child);
                    } else {
                        template = srcfile.readString();
                        try {
                            destfile.writeString(s.apply(template));
                        } catch (SubstitutionException e) {
                            throw new TemplateException(srcfile.getPath() + ": cannot substitute:" + e.getMessage(), e);
                        }
                    }
                }
            }                
        }
    }

    private void call(String name, Node parent, Map<String, String> context) throws TemplateException {
    	Method m;
    	
    	m = calls.get(name);
    	if (m == null) {
    		throw new TemplateException("unknown call: " + name);
    	}
        doInvoke(m, parent, context);
    }

    private String split(String name, Map<String, String> parent, List<Map<String, String>> result) throws TemplateException {
        int idx;
        char c;
        Method m;
        
        idx = name.indexOf(':');
        result.add(parent);
        if (idx == -1) {
            return name;
        }
        for (int i = 0; i < idx; i++) {
            c = name.charAt(i);
            m = contextConstructors.get(name.charAt(i));
            if (m == null) {
                throw new TemplateException("unkown context: " + c);
            }
            apply(m, result);
        }
        return name.substring(idx + 1);
    }
    
    private void apply(Method m, List<Map<String, String>> contexts) throws TemplateException {
        List<Map<String, String>> tmp;
        
        tmp = new ArrayList<Map<String, String>>(contexts);
        contexts.clear();
        for (Map<String, String> map : tmp) {
            context(m, map, contexts);
        }
    }

    private void context(Method m, Map<String, String> parent, List<Map<String, String>> result) throws TemplateException {
        result.addAll((List<Map<String, String>>) doInvoke(m, parent));
    }

    private Object doInvoke(Method m, Object ... args) throws TemplateException {
        try {
            return m.invoke(this, args);
        } catch (InvocationTargetException e) {
            throw new TemplateException(m.getName() + " failed", e.getTargetException());
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (IllegalAccessException e) {
            throw new IllegalStateException(e);
        }
    }
}
