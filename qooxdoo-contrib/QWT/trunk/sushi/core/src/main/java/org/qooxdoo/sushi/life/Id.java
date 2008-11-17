package org.qooxdoo.sushi.life;

import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Id {
    public static Id fromString(String str) {
        int idx;
        String group;
        String artifact;
        String version;
        
        idx = str.indexOf(':');
        if (idx == -1) {
            throw new IllegalArgumentException(str);
        }
        group = str.substring(0, idx);
        idx = str.indexOf(':', idx + 1);
        if (idx == -1) {
            throw new IllegalArgumentException(str);
        }
        artifact = str.substring(group.length() + 1, idx);
        if (str.indexOf(':', idx + 1) != -1) {
            throw new IllegalArgumentException(str);
        }
        version = str.substring(idx + 1);
        return new Id(group, artifact, version);
    }
    
    @Value
    private String group;
    @Value
    private String artifact;
    @Value
    private String version;

    public Id() {
        this("unkown.group", "unkown-artifact", "unkown-version");
    }
    
    public Id(String group, String artifact, String version) {
        this.group = group;
        this.artifact = artifact;
        this.version = version;
    }
    
    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }
    
    public String getArtifact() {
        return artifact;
    }
    public void setArtifact(String artifact) {
        this.artifact = artifact;
    }
    
    public String getVersion() {
        return version;
    }
    public void setVersion(String version) {
        this.version = version;
    }

    @Override
    public int hashCode() {
        return artifact.hashCode();
    }
    
    @Override
    public boolean equals(Object obj) {
        Id id;
        
        if (obj instanceof Id) {
            id = (Id) obj;
            return group.equals(id.group) && artifact.equals(id.artifact) && version.equals(id.version); 
        } else {
            return false;
        }
    }
    
    @Override
    public String toString() {
        return group + ":" + artifact + ":" + version;
    }
    
}
