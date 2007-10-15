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

package org.qooxdoo.sushi.xml;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.SchemaFactory;

import org.qooxdoo.sushi.io.Node;
import org.xml.sax.SAXException;

/**
 * Create SaxParser- and DocumentBuilder Factories. 
 * Kind of a FactoryFactory to encapsulates xml parser selection.
 * 
 * I have to use jaxp 1.2 (in particular: I cannot use setSchema from jaxp 1.3) because 
 * old Jaxp and Xerces Parsers from JBoss and Tariff/Castor pollute our classpath. 
 * I wasn't able to force Jdk's built-in xerces by directly instantiating the respective 
 * Factory because JBoss didn't find the getSchema method in its endorsed xpi-apis.jar. 
 */
public class Factories {
    private static final Logger LOG = Logger.getLogger(Factories.class.getName());
    
    public static SAXParser saxParser(Node schema) throws IOException, SAXException {
        SAXParserFactory factory;
        SAXParser parser;
        
        factory = sax();
        factory.setValidating(true);
        factory.setNamespaceAware(false);
        try {
            parser = factory.newSAXParser();
            parser.setProperty(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
            parser.setProperty(JAXP_SCHEMA_SOURCE, new ByteArrayInputStream(schema.readBytes()));
            return parser;
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }
    }

    public static SAXParser saxParser() throws IOException, SAXException {
        SAXParserFactory factory;
        
        factory = sax();
        factory.setValidating(false);
        factory.setNamespaceAware(false);
        try {
            return factory.newSAXParser();
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }
    }

    public static SAXParserFactory sax() {
        return SAXParserFactory.newInstance();
    }

    
    public static DocumentBuilderFactory document(Node schema) throws IOException, SAXException {
        DocumentBuilderFactory factory;
        Throwable throwable;
        
        factory = document();
        try {
            setJaxp13Validating(factory, schema);
            throwable = null;
        } catch (UnsupportedOperationException e) {
            throwable = e;
        } catch (Error e) {
            throwable = e;
        }
        if (throwable != null) {
            LOG.log(Level.FINEST, factory.getClass().getName() + ": JAXP 1.3 validation failed, using 1.2", throwable);
            setJaxp12Validating(factory, schema);
        }
        return factory;
    }

    private static void setJaxp13Validating(DocumentBuilderFactory factory, Node schema) throws IOException, SAXException {
        SchemaFactory sf;
        Source src;
        
        sf = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
        src = new StreamSource(schema.createInputStream());
        factory.setSchema(sf.newSchema(src));
    }

    private static void setJaxp12Validating(DocumentBuilderFactory factory, Node schema) throws IOException {
        factory.setNamespaceAware(true);
        factory.setValidating(true);
        try {
            factory.setAttribute(JAXP_SCHEMA_LANGUAGE, W3C_XML_SCHEMA);
        } catch (IllegalArgumentException x) {
            throw new RuntimeException(factory.getClass().getName() + ": parser does not support JAXP 1.2", x);
        }
        factory.setAttribute(JAXP_SCHEMA_SOURCE, new ByteArrayInputStream(schema.readBytes()));
        
    }
    public static DocumentBuilderFactory document() {
        return DocumentBuilderFactory.newInstance(); 
    }

    //--
    
    private static final String JAXP_SCHEMA_LANGUAGE = "http://java.sun.com/xml/jaxp/properties/schemaLanguage";
    private static final String W3C_XML_SCHEMA = "http://www.w3.org/2001/XMLSchema";
    private static final String JAXP_SCHEMA_SOURCE = "http://java.sun.com/xml/jaxp/properties/schemaSource";

}
