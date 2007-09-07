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

package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.SAXParser;

import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.Locator;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.xml.Builder;

public class Loader extends DefaultHandler {
    private Locator locator;
    private final Type type;
    private final SAXParser parser;
    private final List<Element> elements;
    private Object result;
    private List<SAXException> exceptions;
    
    public Loader(Type type) {
        Node xsd;
        
        this.type = type;
        try {
            xsd = new IO().stringNode(type.createSchema());
            this.parser = Builder.createValidatingSAXParser(xsd);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        this.elements = new ArrayList<Element>();
        this.result = null;
    }

    public Object run(InputSource src) throws IOException, LoaderException {
        elements.clear();

        locator = null;
        exceptions = new ArrayList<SAXException>();
        try {
            parser.parse(src, this);
        } catch (SAXParseException e) {
            exceptions.add(e);
        } catch (SAXException e) {
            exceptions.add(e);
        }
        LoaderException.check(exceptions, src, result);
        if (elements.size() != 0) {
            throw new RuntimeException();
        }
        return result;
    }

    //-- SAX parser implementation
    
    @Override
    public void setDocumentLocator(Locator locator) {
        this.locator = locator;
    }
      
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attrs) throws SAXLoaderException {
        Element parent;
        Item child;

        check(uri, localName);
        if (attrs.getLength() != 0) {
            loaderException("unexpected attribute(s)");
        }
        if (elements.size() == 0) {
            // this is the root element - the element name doesn't matter
            elements.add(Element.create(null, type));
        } else {
            parent = peek();
            child = parent.lookup(qName);
            if (child == null) {
                // cannot recover
                throw new SAXLoaderException("unknown element '" + qName + "'", locator);
            }
            elements.add(Element.create(child, child.getType()));
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) {
        Element child;
        Object childObject;

        check(uri, localName);
        child = elements.remove(elements.size() - 1);
        childObject = child.done(exceptions, locator);
        if (elements.size() == 0) {
            result = childObject;
        } else {
            peek().addChild(child.getOwner(), childObject);
        }
    }
    
    @Override
    public void characters(char[] ch, int start, int end) {
        if (!peek().addContent(ch, start, end)) {
            loaderException("unexpected content");
        }
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

    /** called if the document is not well-formed. Clears all other exceptions an terminates parsing */
    @Override
    public void fatalError(SAXParseException e) throws SAXParseException {
        // clear all other exceptions an termina
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

    private Element peek() {
        return elements.get(elements.size() - 1);
    }
}
