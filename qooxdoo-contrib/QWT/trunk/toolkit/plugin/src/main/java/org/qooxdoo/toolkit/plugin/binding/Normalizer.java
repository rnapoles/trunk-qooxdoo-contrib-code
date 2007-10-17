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

package org.qooxdoo.toolkit.plugin.binding;

import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.SAXParser;

import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.sushi.xml.Serializer;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

public class Normalizer extends DefaultHandler {
    private Writer out;
    private final List<String> removes;
    private final Map<String, String> renames;
    
    public Normalizer() {
        this(new ArrayList<String>(), new HashMap<String, String>());
    }
    
    public Normalizer(List<String> removes, Map<String, String> renames) {
        this.removes = removes;
        this.renames = renames;
    }

    public Normalizer rename(String in, String out) {
        renames.put(in, out);
        return this;
    }
     
    public Normalizer removes(String ... elements) {
        for (String element : elements) {
            removes.add(element);
        }
        return this;
    }

    public void run(Node src, Node dest) throws IOException, SAXException {
        SAXParser parser;
        InputStream in;
        
        parser = Builder.createSAXParser();
        out = dest.createWriter();
        in = src.createInputStream();
        parser.parse(in, this);
        in.close();
        out.close();
    }

    //-- SAX parser implementation

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attrs) throws SAXException {
        String name;
        
        check(uri, localName);

        if (removes.contains(qName)) {
            return;
        }
        write('<');
        write(renamed(qName));
        write('>');
        for (int i = 0, max = attrs.getLength(); i < max; i++) {
            name = attrs.getQName(i);
            if (removes.contains(name)) {
                continue;
            }
            name = renamed(name);
            write('<');
            write(name);
            write('>');
            write(Serializer.escapeEntities(attrs.getValue(i)));
            write("</");
            write(name);
            write('>');
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        check(uri, localName);
        
        if (removes.contains(qName)) {
            return;
        }
        write("</");
        write(renamed(qName));
        write('>');
    }

    @Override
    public void characters(char[] ch, int start, int end) {
        write(Serializer.escapeEntities(new String(ch, start, end)));
    }

    @Override
    public void ignorableWhitespace(char[] ch, int start, int end) {
        // ignore
    }
    
    private void write(String str) {
        try {
            out.write(str);
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        }
    }
    
    private void write(char c) {
        try {
            out.write(c);
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        }
    }
    

    //-- exception handling

    @Override
    public void warning(SAXParseException e) throws SAXParseException {
        throw e;
    }

    /** called if the document is not valid */
    @Override
    public void error(SAXParseException e) throws SAXParseException {
        throw e;
    }

    /** called if the document is not well-formed. Clears all other exceptions an terminates parsing */
    @Override
    public void fatalError(SAXParseException e) throws SAXParseException {
        throw e;
    }

    private String renamed(String name) {
        String mapped;
        
        mapped = renames.get(name);
        return mapped == null ? name : mapped;
    }
    
    private void check(String uri, String localName) throws SAXException {
        if (!"".equals(uri)) {
            throw new SAXException("unexpected uri: " + uri);
        }
        if (!"".equals(localName)) {
            throw new SAXException("unexpected localName: " + localName);
        }
    }
}
