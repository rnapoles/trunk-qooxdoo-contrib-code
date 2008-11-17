package org.qooxdoo.sushi.life;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Jar {
    @Value
    private String groupId;
    @Value
    private String artifactId;
    @Value
    private String version;

    @Value
    private String sha;
    
    @Sequence(String.class)
    private List<String> directories;
    
    public Jar() {
        this("unkown.group", "unkown-artifact", "unkown-version", "");
    }
    
    public Jar(String groupId, String artifactId, String version, String sha) {
        this.groupId = groupId;
        this.artifactId = artifactId;
        this.version = version;
        this.sha = sha;
        this.directories = new ArrayList<String>();
    }
    
    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }
    
    public String getArtifactId() {
        return artifactId;
    }
    public void setArtifactId(String artifactId) {
        this.artifactId = artifactId;
    }
    
    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
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
    
    public String toId() {
        return groupId + ":" + artifactId + ":" + version;
    }
}
