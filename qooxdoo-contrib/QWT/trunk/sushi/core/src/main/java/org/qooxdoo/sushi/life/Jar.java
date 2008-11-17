package org.qooxdoo.sushi.life;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Jar {
    @Value
    private Id id;

    @Value
    private String sha;
    
    @Sequence(String.class)
    private List<String> directories;
    
    public Jar() {
        this(new Id(), "");
    }
    
    public Jar(Id id, String sha) {
        this.id = id;
        this.sha = sha;
        this.directories = new ArrayList<String>();
    }
    
    public Id getId() {
        return id;
    }

    public void setId(Id id) {
        this.id = id;
    }
    
    public String getSha() {
        return sha;
    }
    public void setSha(String sha) {
        this.sha = sha;
    }
    
    public List<String> directories() {
        return directories;
    }
}
