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

package org.qooxdoo.toolkit.plugin.qul;

import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.SAXParser;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.xml.SAXLoaderException;
import org.qooxdoo.sushi.util.Strings;
import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.binding.java.Field;
import org.qooxdoo.toolkit.plugin.binding.java.Method;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.qooxdoo.toolkit.plugin.binding.java.Type;
import org.qooxdoo.toolkit.plugin.qul.css.Css;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

public class Loader extends DefaultHandler {
    private Locator locator;
    private final SAXParser parser;
    private List<SAXException> exceptions;
    private final Set doctree;
    private String className;
    private String pkg;
    private Writer output;
    private int var;
    private List<String> stack;
    private Css css;
    
    public static Loader create(IO io, Set doctree) {
        try {
            return new Loader(doctree, Builder.createSAXParser());
        } catch (SAXException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Loader(Set doctree, SAXParser parser) {
        this.var = 0;
        this.doctree = doctree;
        this.parser = parser;
        this.stack = new ArrayList<String>();
    }

    public void run(Node src, Node dest, String pkg, Css css) throws IOException {
        InputStream stream;

        stream = src.createInputStream();
        this.css = css;
        run(new InputSource(stream), dest.createWriter(), pkg, dest.getName().replace(".java", ""));
        output.close();
        stream.close();
    }

    /** does not close anything */
    public void run(InputSource src, Writer output, String pkg, String className) throws IOException {
        this.className = className;
        this.pkg = pkg;
        this.output  = output;
        locator = null;
        exceptions = new ArrayList<SAXException>();
        try {
            parser.parse(src, this);
        } catch (SAXParseException e) {
            exceptions.add(e);
        } catch (SAXException e) {
            exceptions.add(e);
        }
        if (stack.size() != 0) {
            throw new IllegalStateException(stack.toString());
        }
    }

    //-- SAX parser implementation
    
    @Override
    public void setDocumentLocator(Locator locator) {
        this.locator = locator;
    }
      
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attrs) throws SAXLoaderException {
        Clazz clazz;
        String v;
        String fullName;
        
        check(uri, localName);
        clazz = doctree.getSimple(qName.replace('_', '.'));
        fullName = clazz.getFullName();
        if (stack.size() == 0) {
            head(fullName);
        }
        v = var();
        line(fullName, " ", v, " = new ", fullName, "();");
        if (css != null) {
            css.run(qName, clazz, v, this);
        }
        for (int i = 0, max = attrs.getLength(); i < max; i++) {
            setter(clazz, v, attrs.getQName(i), attrs.getValue(i));
        }
        stack.add(v);
    }
    
    public void setter(Clazz clazz, String v, String name, String value) {
        String methodName;
        Type type;
        
        methodName = "set" + Strings.capitalize(name);
        type = lookup(clazz, name, methodName);
        if (type == null) {
            throw new RuntimeException("unkown property: " + name);
        }
        // TODO: property types
        line(v, ".", methodName, "(", quote(value), ");");
        
    }

    private Type lookup(Clazz clazz, String name, String methodName) {
        Field field;
        Method method;
        Clazz s;
        
        field = clazz.findField(name);
        if (field != null) {
            return field.getType();
        }
        method = clazz.findMethod(methodName, false);
        if (method != null && method.params().size() == 1) {
            // TODO: overloaded method ...
            return method.params().get(0).getType();
        }
        s = clazz.getSuperClass();
        if (s != null) {
            return lookup(s, name, methodName);
        } else {
            return null;
        }
    }
    
    public static String quote(String str) {
        return '"' + str + '"'; // TODO
    }

    @Override
    public void endElement(String uri, String localName, String qName) {
        String v;
        
        check(uri, localName);
        
        v = stack.remove(stack.size() - 1);
        if (stack.size() == 0) {
            tail();
        } else {
            line(stack.get(stack.size() - 1), ".add(", v, ");");
        }
    }
    
    @Override
    public void characters(char[] ch, int start, int end) {
    }

    @Override
    public void ignorableWhitespace(char[] ch, int start, int end) {
        // ignore
    }

    
    //-- exception handling
    
    @Override
    public void warning(SAXParseException e) {
        exceptions.add(e);
    }

    /** called if the document is not valid */
    @Override
    public void error(SAXParseException e) {
        exceptions.add(e);
    }

    /** called if the document is not well-formed. Clears all other exceptions and terminates parsing */
    @Override
    public void fatalError(SAXParseException e) throws SAXParseException {
        // clear all other exceptions an terminate
        exceptions.clear();
        throw e;
    }

    private void check(String uri, String localName) {
        if (!"".equals(uri)) {
            loaderException("unexpected uri: " + uri);
        }
        if (!"".equals(localName)) {
            loaderException("unexpected localName: " + localName);
        }
    }
    
    /** called for loader exceptions */
    private void loaderException(String msg) {
        exceptions.add(new SAXLoaderException(msg, locator));
    }
    
    //--

    private void head(String type) {
        if (pkg != null) {
            line(0, "package ", pkg, ";");
            line(0);
        }
        line(0, "public class ", className, " {");
        line(1, "public static ", type, " create() {");
    }
    
    public void tail() {
        line("return v0;");
        line(1, "}");
        line(0, "}");
    }

    private void line(String ... args) {
        line(2, args);
    }

    private void line(int indent, String ... args) {
        while (indent-- > 0) {
            write("    ");
        }
        for (String arg : args) {
            write(arg);
        }
        write("\n");
    }

    private void write(String str) {
        try {
            output.write(str);
        } catch (IOException e) {
            throw new RuntimeException("todo", e);
        }
    }

    private String var() {
        return "v" + var++;
    }

}
