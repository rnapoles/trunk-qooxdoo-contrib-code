package org.qooxdoo.sushi.life;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.annotation.AnnotationSchema;
import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.xml.LoaderException;

@Type
public class Life {
    public static Node file(IO io) {
        return io.getHome().join(".m2/life.xml");
    }

    public static Life load(IO io) throws IOException, LoaderException {
        Node file;
        
        file = file(io);
        if (file.exists()) {
            return load(file);
        } else {
            return new Life();
        }
    }

    public static Life load(Node file) throws IOException, LoaderException {
        return (Life) TYPE.loadXml(file).get();
    }
    
    public static final Schema SCHEMA = new AnnotationSchema();
    public static final ComplexType TYPE = SCHEMA.complex(Life.class); 

    @Sequence(Jar.class) 
    private final List<Jar> jars;
    
    public Life() {
        this.jars = new ArrayList<Jar>();
    }
    
    public List<Jar> jars() {
        return jars;
    }

    public Jar lookup(Id id) {
        for (Jar jar : jars) {
            if (id.equals(jar.getId())) {
                return jar;
            }
        }
        return null;
    }
    
    public Jar lookup(Node node) throws IOException {
        return lookup(Jar.hash(node));
    }

    public Jar lookup(String hash) {
        for (Jar jar : jars) {
            if (hash.equals(jar.getHash())) {
                return jar;
            }
        }
        return null;
    }
    
    public void save(Node file) throws IOException {
        file.writeString(TYPE.instance(this).toXml());
    }
}
