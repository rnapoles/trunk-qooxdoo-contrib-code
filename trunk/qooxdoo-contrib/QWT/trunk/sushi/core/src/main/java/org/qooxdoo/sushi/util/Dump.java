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

package org.qooxdoo.sushi.util;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Item;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;

/** Readable object output. Implementation uses metadata, but that's hidden from the caller. */
public class Dump {
    public static final int DEFAULT_DEPTH = 2;

    public static String dump(Object obj) {
        return dump(obj, DEFAULT_DEPTH);
    }

    public static String dump(Object obj, int maxDepth) {
        StringWriter dest;
        
        dest = new StringWriter();
        try {
            dump(new IO(), obj, dest, maxDepth);
        } catch (IOException e) {
            throw new RuntimeException("unexected io exception from StringWriter: " + e.getMessage(), e);
        }
        return dest.toString();
    }

    public static void dump(Object obj, Node dest) throws IOException {
        dump(obj, dest, DEFAULT_DEPTH);
    }
    
    public static void dump(Object obj, Node dest, int maxDepth) throws IOException {
        Writer writer;

        writer = dest.createWriter();
        dump(dest.getIO(), obj, writer, maxDepth);
        writer.close();
    }

    public static void dump(IO io, Object obj, Writer dest, int maxDepth) throws IOException {
        new Dump(new ReflectSchema(io), dest, maxDepth).run(obj);
    }

    private final Schema metadata;
    private final Writer dest;
    private final int maxDepth;
    private final List<Object> stack;
    
    public Dump(Schema metadata, Writer dest) {
        this(metadata, dest, Integer.MAX_VALUE);
    }
    
    public Dump(Schema metadata, Writer dest, int maxDepth) {
        this.metadata = metadata;
        this.dest = dest;
        this.maxDepth = maxDepth;
        this.stack = new ArrayList<Object>();
    }
    
    public void run(Object obj) throws IOException {
        if (stack.size() != 0) {
            throw new IllegalStateException();
        }
        run(null, obj);
        if (stack.size() != 0) {
            throw new IllegalStateException();
        }
    }
    
    public void run(String name, Object obj) throws IOException {
        run(name, metadata.type(obj == null ? Void.TYPE : obj.getClass()), obj);
    }

    private void run(String name, Type type, Object obj) throws IOException {
        if (type instanceof SimpleType) {
            header(obj, name, toDump((SimpleType) type, obj), false);
        } else {
            if (header(obj, name, type.getName(), true)) {
                fields((ComplexType) type, obj);
                pop();
            }
        }
    }

    /** Override this for custom formats */
    protected String toDump(SimpleType simpleType, Object obj) {
        Class<?> type;
        
        type = simpleType.getType();
        if (type == String.class) {
            return '"' + ((String) obj) + '"'; 
        } else if (type == Character.class) {
            return "'" + ((Character) obj) + "'"; 
        } else {
            return simpleType.valueToString(obj);
        }
    }

    private void pop() {
        stack.remove(stack.size() - 1);
    }
    
    private boolean header(Object obj, String name, String value, boolean hasBody) throws IOException {
        int depth;
        
        depth = stack.size();
        for (int i = 0; i < depth; i++) {
            dest.write("  ");
        }
        if (name != null) {
            dest.write(name);
            dest.write(": ");
        }
        dest.write(value);
        if (!hasBody) {
            dest.write('\n');
            return false;
        }
        if (depth >= maxDepth) {
            dest.write(" [...]\n");
            return false;
        }
        for (Object s : stack) {
            if (obj == s) {
                dest.write(" [" + obj.hashCode() + "]\n");
                return false;
            }
        }
        dest.write('\n');
        stack.add(obj);
        return true;
    }

    //-- "body" methods 
    
    public void fields(ComplexType type, Object obj) throws IOException {
        String name;
        int idx;
        
        for (Item<?> item : type.items()) {
            idx = 0;
            for (Object child : item.get(obj)) {
                name = item.getName();
                if (item.getCardinality().max > 1) {
                    name = name + '[' + idx++ + ']';
                }
                run(name, child);
            }
        }
    }
}
