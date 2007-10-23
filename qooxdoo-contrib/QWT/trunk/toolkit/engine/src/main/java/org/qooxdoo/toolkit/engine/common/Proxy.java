package org.qooxdoo.toolkit.engine.common;

public class Proxy {
    public final int id;
    public final String type;
    
    public Proxy(int id, String type) {
        this.id = id;
        this.type = type;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Proxy) {
            return ((Proxy) obj).id == id;
        } else {
            return false;
        }
    }
}
