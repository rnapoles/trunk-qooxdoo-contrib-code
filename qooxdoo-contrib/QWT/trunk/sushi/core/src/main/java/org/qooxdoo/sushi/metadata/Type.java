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

package org.qooxdoo.sushi.metadata;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.store.PropertyStore;
import org.qooxdoo.sushi.metadata.xml.Loader;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.xml.sax.InputSource;

public abstract class Type {
    public static final String SCHEMA_HEAD = 
        "<?xml version='1.0' encoding='UTF-8'?>\n" + 
        "<xs:schema xmlns:xs='http://www.w3.org/2001/XMLSchema'>\n" +
        "  <xs:attributeGroup name='ids'>\n" +
        "    <xs:attribute name='id' type='xs:string'/>\n" +
        "    <xs:attribute name='idref' type='xs:string'/>\n" +
        "  </xs:attributeGroup>\n";
        
    protected final Schema schema;
    protected final Class<?> type;
    protected final String name;

    public Type(Schema schema, Class<?> type, String name) {
        if (type.isPrimitive()) {
            throw new IllegalArgumentException(type.getName());
        }
        if (type.isArray()) {
            throw new IllegalArgumentException(type.getName());
        }
        if (Collection.class.isAssignableFrom(type)) {
            throw new IllegalArgumentException(type.getName());
        }
        this.schema = schema;
        this.type = type;
        this.name = name;
    }

    public Schema getSchema() {
        return schema;
    }
    
    public Class<?> getType() {
        return type;
    }
    
    public String getName() {
        return name;
    }

    
    public abstract Object newInstance();

    public <T> Instance<T> instance(T obj) {
        return new Instance<T>(this, obj);
    }
    
    //--
    
    public <T> Instance<T> loadXml(Node node) throws IOException, LoaderException {
        Reader src;
        Instance<T> result;
        
        src = node.createReader();
        result = loadXml(node.getIO(), node.getPath(), src);
        src.close();
        return result;
    }

    public <T> Instance<T> loadXml(IO io, String systemId, Reader src) throws IOException, LoaderException {
        InputSource input;
        
        input = new InputSource(src);
        input.setSystemId(systemId);
        return loadXml(io, input);
    }

    public <T> Instance<T> loadXml(IO io, InputSource src) throws IOException, LoaderException {
        Loader loader;
        T obj;
        
        loader = Loader.create(io, this);
        obj = (T) loader.run(src);
        return instance(obj);
    }

    public <T> Instance<T> loadProperties(Properties props) {
        return loadProperties(props, "");
    }
    
    public <T> Instance<T> loadProperties(Properties props, String name) {
        T obj;
        
        obj = (T) new org.qooxdoo.sushi.metadata.store.Reader(new PropertyStore(props)).read(name, this);
        return instance(obj);
    }
    
    //--

    
    public List<Type> closure() {
        List<Type> result;
        ComplexType complex;
        Type type;
        
        result = new ArrayList<Type>();
        result.add(this);
        for (int i = 0; i < result.size(); i++) { // result grows!
            type = result.get(i);
            if (type instanceof ComplexType) {
                complex = (ComplexType) type;
                for (Item<?> item : complex.items()) {
                    if (!result.contains(item.getType())) {
                        result.add(item.getType());
                    }
                }
            }
        }
        return result;
    }

    //-- xsd schema generation
    public String createSchema() {
        StringBuilder schema;
        Set<Type> types;

        schema = new StringBuilder();

        schema.append(SCHEMA_HEAD);
        schema.append("  <xs:element name='" + getName() + "' type='" + getSchemaTypeName() + "'/>\n");

        types = new HashSet<Type>();
        addSchemaType(types, schema);

        schema.append("</xs:schema>");
        return schema.toString();
    }

    public abstract String getSchemaTypeName();
    public abstract void addSchemaType(Set<Type> done, StringBuilder dest);
    
}
