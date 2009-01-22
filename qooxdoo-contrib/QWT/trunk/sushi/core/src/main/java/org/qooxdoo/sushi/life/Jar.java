package org.qooxdoo.sushi.life;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Jar {
    public static String hash(Node node) throws IOException {
        return node.sha();
    }
    
    //--
    
    @Value
    private Id id;

    @Sequence(String.class)
    private List<String> directories;
    
    public Jar() {
        this(new Id());
    }
    
    public Jar(Id id) {
        this.id = id;
        this.directories = new ArrayList<String>();
    }
    
    public Id getId() {
        return id;
    }

    public void setId(Id id) {
        this.id = id;
    }
    
    public List<String> directories() {
        return directories;
    }
}
