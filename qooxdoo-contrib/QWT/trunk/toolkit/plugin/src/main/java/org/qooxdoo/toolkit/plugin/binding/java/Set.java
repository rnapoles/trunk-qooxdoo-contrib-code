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

package org.qooxdoo.toolkit.plugin.binding.java;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.filter.Filter;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.compiler.Util;
import org.qooxdoo.toolkit.plugin.binding.patch.PatchException;
import org.qooxdoo.toolkit.plugin.binding.qx.Doctree;
import org.xml.sax.SAXException;

/** Arbitrary collection of classes. */ 
public class Set implements Serializable {
    public static Set loadAll(Node src, Node output, Node jsroot, Filter undocumented) 
    throws IOException, SAXException, LoaderException, XmlException {
        Set set;

        set = loadRaw(src);
        set.addUndocumented(jsroot, undocumented);
        set.addNatives(jsroot);
        set.addDependencies(output.getIO().getSettings().lineSeparator, output.readString());
        return set;
    }
    
    public static Set loadRaw(Node src) throws IOException, SAXException, LoaderException, XmlException {
        return Doctree.load(src).createJava();
    }
    
    //--
    
    public final List<Clazz> clazzes;
    
    public Set() {
        this.clazzes = new ArrayList<Clazz>();
    }
    
    public void add(Clazz clazz) {
        if (lookup(clazz.getFullName()) != null) {
            throw new IllegalArgumentException("duplicate class: " + clazz.getFullName());
        }
        clazzes.add(clazz);
    }
    
    public int size() {
        return clazzes.size();
    }
    
    public Clazz get(String fullName) {
        Clazz clazz;
        
        clazz = lookup(fullName);
        if (clazz == null) {
            throw new IllegalArgumentException("no such class: " + fullName);
        }
        return clazz;
    }
    
    public Clazz lookup(String fullName) {
        for (Clazz c : clazzes) {
            if (c.getFullName().equals(fullName)) {
                return c;
            }
        }
        return null;
    }
    
    public Clazz getSimple(String name) {
        Clazz result;
        
        result = null;
        for (Clazz c : clazzes) {
            if (c.getFullName().endsWith(name)) {
                if (result != null) {
                    throw new IllegalArgumentException("ambiguous: " + name);
                }
                result = c;
            }
        }
        if (result == null) {
            throw new IllegalArgumentException("not found: " + name);
        }
        return result;
    }
    

    public void link() {
        for (Clazz c : clazzes) {
            c.link(this);
        }
        for (Clazz c : clazzes) {
            c.addBaseConstructors();
        }
    }
    
    public void toJava(Node dir) throws IOException {
        for (Clazz clazz : clazzes) {
            if (clazz.getNative() == null) {
                throw new IOException(clazz.getFullName());
            }
            try {
                clazz.toJava(dir);
            } catch (PatchException e) {
                throw new PatchException(clazz.getName() + ": " + e.getMessage(), e);
            }
        }
    }

    public List<Clazz> clazzes() {
        return Collections.unmodifiableList(clazzes);
    }
    
    //--
    // dependencies
    
    public void addDependencies(String separator, String output) {
        String file;
        Type type;
        Clazz clazz;
        
        file = null;
        type = null;
        for (String line : Strings.split(separator, cut(separator, output))) {
            if (line.startsWith(FILE_START)) {
                file = line.substring(FILE_START.length());
                type = null;
            } else if (line.startsWith(ITEM_START)) {
                if (file == null) {
                    throw new IllegalArgumentException("missing file");
                }
                if (type == null) {
                    throw new IllegalArgumentException("missing type");
                }
                clazz = get(file);
                addDependency(clazz, type, line.substring(ITEM_START.length()));
            } else {
                type = Type.get(line);
            }
        }
    }

    private static void addDependency(Clazz clazz, Type type, String right) {
        switch (type) {
        case LOADTIME:
            clazz.loadtime.add(right);
            break;
        case RUNTIME:
            clazz.runtime.add(right);
            break;
        case OPTIONL: 
            // models advanced features like drag&drop - ignored 
            break;
        default:
            throw new IllegalArgumentException();
        }
    }

    private static final String FILE_START    = "    - ";
    private static final String ITEM_START    = "        - ";
    
    public String cut(String lf, String all) {
        return cutPattern(all,
                " OUTPUT OF DEPENDENCIES:" + lf +
                "-+" + lf + 
                "  \\* These are all included files with their dependencies:" + lf +
                "(.*)" + lf +
                lf +
                "  GENERATION OF API:" + lf);
    }
    
    public static String cutPattern(String all, String pattern) {
        Pattern p;
        Matcher m;
        String result;
        
        p = Pattern.compile(pattern, Pattern.DOTALL);
        m = p.matcher(all);
        if (!m.find()) {
            throw new IllegalArgumentException(pattern + ": not found");
        }
        result = m.group(1);
        if (m.find()) {
            throw new IllegalArgumentException(pattern + ": ambiguous");
        }
        return result;
    }

    private static enum Type {
        RUNTIME("      - Runtime: "),
        LOADTIME("      - Loadtime: "),
        OPTIONL("      - Optional: ");
        
        private String prefix;
        
        public static Type get(String line) {
            for (Type type : values()) {
                if (type.prefix.equals(line)) {
                    return type;
                }
            }
            throw new IllegalArgumentException(line);
        }
        Type(String prefix) {
            this.prefix = prefix;
        }
    }
    
    //--

    private static String fullName(Node file, Node root) {
        String fullName;
        
        fullName = file.getRelative(root);
        fullName = fullName.replace(file.getRoot().getFilesystem().getSeparatorChar(), '.');
        fullName = fullName.substring(0, fullName.length() - 3);
        return fullName;
    }
    
    private void addUndocumented(Node jsroot, Filter filter) throws IOException {
        List<Node> jslst;
        Clazz clazz;
        
        jslst = jsroot.find(filter);
        for (Node js : jslst) {
            clazz = new Clazz(ClazzType.CLASS, fullName(js, jsroot), null, null);
            add(clazz);
        }
    }

    private void addNatives(Node jsroot) throws IOException {
        Clazz clazz;
        String code;
        
        for (Node js : jsroot.find("**/*.js")) {
            clazz = get(fullName(js, jsroot));
            code = js.readString();
            if (code.length() == 0) {
                throw new IOException("file is empty: " + js);
            }
            clazz.setNative(Util.annotationEscape(code));
        }
    }
}
