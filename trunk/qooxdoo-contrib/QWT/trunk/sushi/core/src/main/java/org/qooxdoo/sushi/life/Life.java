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

    /** Creates the file if it does not yet exist */
    public static Life load(IO io) throws IOException, LoaderException {
        Node file;
        Life life;
        
        file = file(io);
        if (file.isFile()) {
            life = load(file);
        } else {
            life = new Life();
            life.save(file);
        }
        return life;
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
    
    public List<Jar> lookupWithoutVersion(Id id) {
        List<Jar> result;
        
        result = new ArrayList<Jar>();
        for (Jar jar : jars) {
            if (jar.getId().equalsWithoutVersion(id)) {
                result.add(jar);
            }
        }
        return result;
    }
    
    public Jar lookup(Node node) throws IOException {
        return lookup(Id.fromNode(node));
    }

    public void save(Node file) throws IOException {
        file.writeString(TYPE.instance(this).toXml());
    }
}
