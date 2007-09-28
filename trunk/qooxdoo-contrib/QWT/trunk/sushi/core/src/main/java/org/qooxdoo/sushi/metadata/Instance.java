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

package org.qooxdoo.sushi.metadata;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

import org.qooxdoo.sushi.csv.Csv;
import org.qooxdoo.sushi.csv.View;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.io.NodeWriter;
import org.qooxdoo.sushi.metadata.store.PropertyStore;
import org.qooxdoo.sushi.metadata.xml.DomTree;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.qooxdoo.sushi.metadata.xml.Serializer;
import org.qooxdoo.sushi.metadata.xml.WriterTree;
import org.w3c.dom.Element;

/** Some object and its type. TODO: toCsv, fromCsv. */
public class Instance<T> {
    private final Type type;
    private final T instance;
    
    public Instance(Type type, T instance) {
        this.type = type;
        this.instance = instance;
    }

    public Type getType() {
        return type;
    }
    
    public T get() {
        return instance;
    }
    
    @Override
    public Instance<T> clone() {
        Type type;
        StringWriter tmp;
        
        type = getType();
        tmp = new StringWriter();
        try {
            toXml(tmp);
            return type.loadXml(tmp.getBuffer().toString());
        } catch (IOException e) {
            throw new RuntimeException("io exception from memory!?", e);
        } catch (LoaderException e) {
            throw new RuntimeException("invalid!?", e);
        }
    }

    @Override
    public String toString() {
        return toXml();
    }
    
    public String valueToString() {
        Type type;
        
        type = getType();
        if (!(type instanceof SimpleType)) {
            throw new IllegalArgumentException("simple type expected: " + type);
        }
        return ((SimpleType) type).valueToString(get());
    }

    //--

    public String toXml() {
        StringWriter writer;
        
        writer = new StringWriter();
        try {
            toXml(writer);
        } catch (IOException e) {
            throw new RuntimeException("unexected", e);
        }
        return writer.toString();
    }

    public void toXml(Node dest) throws IOException {
        NodeWriter writer;
        
        writer = dest.createWriter();
        writer.write("<?xml version='1.0' encoding='");
        writer.write(writer.getEncoding());
        writer.write("'?>\n");
        toXml(writer);
        writer.close();
    }
    
    public void toXml(Element parent) throws IOException {
        DomTree tree;
        
        tree = new DomTree(parent);
        new Serializer(tree).run(type.getName(), type, get());
        tree.done();
    }
    
    public void toXml(Writer dest) throws IOException {
        WriterTree tree;
        
        tree = new WriterTree(dest);
        new Serializer(tree).run(type.getName(), type, get());
        tree.done();
    }

    public Properties toProperties(String name) {
        Properties props;
        
        props = new Properties();
        toProperties(props, name);
        return props;
    }
    
    public void toProperties(Properties props, String name) {
        org.qooxdoo.sushi.metadata.store.Writer.write(getType(), get(), name, new PropertyStore(props));
    }
    
    public void exportCsv(View view, Csv dest, String ... selection) {
        exportCsv(view, dest, Arrays.asList(selection));
    }

    public void exportCsv(View view, Csv dest, List<String> selection) {
        view.toCsv(this, dest, selection);
    }

    public void importCsv(View view, Csv csv) throws SimpleTypeException {
        view.fromCsv(csv,  this);
    }
}
