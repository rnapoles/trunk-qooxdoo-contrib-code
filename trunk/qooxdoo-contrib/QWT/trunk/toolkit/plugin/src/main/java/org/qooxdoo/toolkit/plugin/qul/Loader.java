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

package org.qooxdoo.toolkit.plugin.qul;

import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.SAXParser;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.metadata.xml.SAXLoaderException;
import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
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
    }

    public void run(Node src, Node dest, String pkg) throws IOException {
        InputStream stream;

        stream = src.createInputStream();
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
        tail();
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
        clazz = doctree.getSimple(qName);
        fullName = clazz.getFullName();
        if (var == 0) {
            head(fullName);
        }
        v = var();
        write("        ");
        write(fullName + " " + v + " = new ");
        write(fullName);
        write("();\n");
    }

    @Override
    public void endElement(String uri, String localName, String qName) {
        check(uri, localName);
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
            write("package ");
            write(pkg);
            write(";\n\n");
        }
        write("public class ");
        write(className);
        write(" {\n");
        write("    public static ");
        write(type);
        write(" create() {\n");
    }
    
    public void tail() {
        write("        return v0;\n");
        write("    }\n");
        write("}\n");
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
