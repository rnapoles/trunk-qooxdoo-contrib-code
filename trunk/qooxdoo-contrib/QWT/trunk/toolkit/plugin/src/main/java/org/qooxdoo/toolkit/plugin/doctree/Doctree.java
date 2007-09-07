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

package org.qooxdoo.toolkit.plugin.doctree;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import org.qooxdoo.toolkit.compiler.Util;
import org.qooxdoo.toolkit.plugin.patch.PatchException;
import org.qooxdoo.sushi.filter.Filter;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.ResourceNode;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.sushi.xml.XmlException;

/** Arbitrary collection of classes. */ 
public class Doctree {
    public static Doctree loadAll(Node src, Node output, Node jsroot, Filter undocumented) throws IOException, SAXException, XmlException {
        Doctree doctree;

        doctree = loadRaw(src);
        doctree.addUndocumented(jsroot, undocumented);
        doctree.addNatives(jsroot);
        doctree.addDependencies(output.readString());
        return doctree;
    }
    
    public static Doctree loadRaw(Node src) throws IOException, SAXException, XmlException {
        Parser parser;
        Builder builder;
        Document doc;
        Doctree doctree;
        
        parser = new Parser();
        builder = new Builder(new ResourceNode(src.io, "doctree.xsd"));
        doc = builder.parse(src);
        doctree = new Doctree();
        for (Element e : parser.selector.elements(doc.getDocumentElement(), "//class")) {
            doctree.add(Clazz.fromXml(parser, e));
        }
        doctree.link();
        return doctree;
    }
    
    //--
    
    public final List<Clazz> clazzes;
    
    public Doctree() {
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
    
    public void link() {
        String fullName;

        for (Clazz c : clazzes) {
            fullName = c.getSuperClassFullName();
            if (fullName != null) {
                c.setSuperClass(get(fullName));
            }
            for (String s : c.getInterfaceNames()) {
                c.addInterface(get(s));
            }
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
    
    public void addDependencies(String output) {
        String file;
        Type type;
        Clazz clazz;
        
        file = null;
        type = null;
        for (String line : Strings.split("\n", cut(output))) {
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
    
    public static String cut(String all) {
        return cut(all,
                " OUTPUT OF DEPENDENCIES:\n" +
                "-+\n" + 
                "  \\* These are all included files with their dependencies:\n" +
                "(.*)\n" +
                "\n" +
                "  GENERATION OF API:\n");
    }
    
    public static String cut(String all, String pattern) {
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
        fullName = fullName.replace('/', '.');
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
