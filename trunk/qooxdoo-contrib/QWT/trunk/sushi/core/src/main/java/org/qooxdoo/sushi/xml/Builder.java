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

package org.qooxdoo.sushi.xml;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.w3c.dom.Text;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

/** Wraps xml parser to implement the method signatures we need */

public class Builder {
    private final DocumentBuilder builder;

    /** Create a non-validating builder */
    public Builder() {
        this.builder = createDocumentBuilder();
    }

    /** Create a validating builder */
    public Builder(org.qooxdoo.sushi.fs.Node schema) throws IOException, SAXException {
        this.builder = createValidatingDocumentBuilder(schema);
    }

    /** This method is not called "parse" to avoid confusion with file parsing methods */
    public Document parseString(String text) throws SAXException {
        try {
            return parse(new InputSource(new StringReader(text)));
        } catch (IOException e) {
            throw new RuntimeException("unexpected io exception while reading memory stream", e);
        }
    }

    /** asserts a valid document */
    public Document literal(String text) {
        try {
            return parseString(text);        
        } catch (SAXException e) {
            throw new RuntimeException(text, e);
        }
    }

    public Document parse(org.qooxdoo.sushi.fs.Node node) throws SAXException, IOException {
        InputStream stream;
        InputSource src;
        Document doc;
        
        stream = node.createInputStream();
        src = new InputSource();
        src.setSystemId(node.toString());
        src.setByteStream(stream);
        doc = parse(src);
        stream.close();
        return doc;
    }
    
    public Document parse(Reader reader) throws SAXException, IOException {
        return parse(new InputSource(reader));
    }

    public Document parse(InputStream stream) throws SAXException, IOException {
        return parse(new InputSource(stream));
    }

    public Document parse(InputSource src) throws SAXException, IOException {
        return builder.parse(src);
    }

    //--
    
    public Document createDocument() {
        return builder.newDocument();
    }

    public Document createDocument(String name) {
        Document doc;
        Element result;
        
        doc = createDocument();
        result = doc.createElement(name);
        doc.appendChild(result);
        return doc;
    }
    
    //-- create methods 
    
    public static void add(Element parent, NodeList list) {
        int size;
        int i;

        size = list.getLength();
        for (i = 0; i < size; i++) {
            addNode(parent, list.item(i));
        }
        
    }
    
    public static Element add(Element parent, Element child) {
        return (Element) addNode(parent, child);
    }

    public static Node addNode(Element parent, Node child) {
        Document doc;
        
        doc = parent.getOwnerDocument();
        child = doc.importNode(child, true);
        parent.appendChild(child);
        return child;
    }
    
    public static Element element(Element parent, String name) {
        Document doc;
        Element result;
        
        doc = parent.getOwnerDocument();
        result = doc.createElement(name);
        parent.appendChild(result);
        return result;
    }
    
    public static Text text(Element parent, String content) {
        Document doc;
        Text result;
        
        doc = parent.getOwnerDocument();
        result = doc.createTextNode(content);
        parent.appendChild(result);
        return result;
    }

    public static Text textElement(Element parent, String name, String content) {
        return text(element(parent, name), content);
    }

    public static void clear(Element root) {
        Node child;
        
        while (true) {
            child = root.getFirstChild();
            if (child == null) {
                break;
            }
            root.removeChild(child);
        }
    }
    
    //-- document builder
    
    public static synchronized DocumentBuilder createDocumentBuilder() {
        DocumentBuilder result;
        try {
            result = FACTORY_NON_VALIDATING.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            throw new RuntimeException("createDocumentBuilder failed", e);
        }
        result.setErrorHandler(ERROR_HANDLER);
        return result;
    }

    public static DocumentBuilder createValidatingDocumentBuilder(org.qooxdoo.sushi.fs.Node schema) throws IOException, SAXException {
        DocumentBuilderFactory factory;
        DocumentBuilder builder;

        factory = Factories.document(schema);
        try {
            builder = factory.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        }
        builder.setErrorHandler(ERROR_HANDLER);
        return builder;
    }

    public static SAXParser createValidatingSAXParser(org.qooxdoo.sushi.fs.Node schema) throws IOException, SAXException {
        return Factories.saxParser(schema);
    }

    public static SAXParser createSAXParser() throws IOException, SAXException {
        return Factories.saxParser();
    }

    // TODO: avoid problems with old xerces versions in classpath
    private static final DocumentBuilderFactory FACTORY_NON_VALIDATING;
    private static final ErrorHandler ERROR_HANDLER;
    
    static {
        FACTORY_NON_VALIDATING = Factories.document();
        if (!FACTORY_NON_VALIDATING.isNamespaceAware()) {
            FACTORY_NON_VALIDATING.setNamespaceAware(true);
        }
        if (FACTORY_NON_VALIDATING.isValidating()) {
            FACTORY_NON_VALIDATING.setValidating(false);
        }
        
        ERROR_HANDLER = new ErrorHandler() {
            public void error(SAXParseException exception) throws SAXException {
                report(exception);
            }
            public void fatalError(SAXParseException exception) throws SAXException {
                report(exception);
            }
            public void warning(SAXParseException exception) throws SAXException {
                report(exception);
            }
            private void report(SAXParseException exception) throws SAXException {
                throw exception;
            }
        };
    }
}
