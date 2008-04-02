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

package org.qooxdoo.sushi.metadata.model;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Option;
import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Car {
    @Value private String name;
    @Value private Kind kind;
    @Value private int seats;
    @Value private Engine engine;
    @Option private Radio radio;
    @Sequence(String.class) private final List<String> commentList;
    
    public Car() {
        this("", Kind.NORMAL, 0, new Engine(), null);
    }

    public Car(String name, Kind kind, int seats, Engine engine, Radio radio) {
        this.name = name;
        this.kind = kind;
        this.seats = seats;
        this.engine = engine;
        this.radio = radio;
        this.commentList = new ArrayList<String>();
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public Kind getKind() {
        return kind;
    }
    public void setKind(Kind kind) {
        this.kind = kind;
    }

    public int getSeats() {
        return seats;
    }

    public void setSeats(int seats) {
        this.seats = seats;
    }
    
    /** @return never null */
    public Engine getEngine() {
        return engine;
    }
    
    public void setEngine(Engine engine) {
        this.engine = engine;
    }
    
    public Radio getRadio() {
        return radio;
    }
    
    public void setRadio(Radio radio) {
        this.radio = radio;
    }
    
    public List<String> commentList() {
        return commentList;
    }
}
