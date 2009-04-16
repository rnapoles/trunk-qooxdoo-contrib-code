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

    private static final String PREFIX = "context";
    
    public Template() {
        String name;
        char c;
        
        contextConstructors = new HashMap<Character, Method>();
        for (Method m : getClass().getDeclaredMethods()) {
            name = m.getName();
            if (name.startsWith(PREFIX)) {
                c = Character.toUpperCase(name.substring(PREFIX.length()).charAt(0));                
                if (contextConstructors.put(c, m) != null) {
                    throw new IllegalArgumentException("duplicate context character: " + c);
                }
            }
        }
    }
    
    public void applyDirectory(Node src, Node dest, Map<String, String> context) throws IOException, TemplateException {
        String template;
        String srcname;
        List<Map<String, String>> children;
        Substitution s;
        Node destfile;
        
        for (Node srcfile : src.list()) {
            srcname = srcfile.getName();
            children = new ArrayList<Map<String, String>>();
            srcname = split(srcfile.getName(), context, children);
            for (Map<String, String> child : children) {
                s =  new Substitution("${{", "}}", '\\', child);
                try {
                    destfile = dest.join(s.apply(srcname)); 
                } catch (SubstitutionException e) {
                    throw new TemplateException(srcfile.getPath() + ": cannot subsitute name:" + e.getMessage(), e);
                }
                if (srcfile.isDirectory()) {
                    destfile.mkdir();
                    applyDirectory(srcfile, destfile, child);
                } else {
                    template = srcfile.readString();
                    try {
                        destfile.writeString(s.apply(template));
                    } catch (SubstitutionException e) {
                        throw new TemplateException(srcfile.getPath() + ": cannot subsitute:" + e.getMessage(), e);
                    }
                }
            }                
        }
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
            invoke(m, map, contexts);
        }
    }

    private void invoke(Method m, Map<String, String> parent, List<Map<String, String>> result) throws TemplateException {
        try {
            result.addAll((List<Map<String, String>>) m.invoke(this, parent));
        } catch (InvocationTargetException e) {
            throw new TemplateException("context method failed", e.getTargetException());
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (IllegalAccessException e) {
            throw new IllegalStateException(e);
        }
    }
}
