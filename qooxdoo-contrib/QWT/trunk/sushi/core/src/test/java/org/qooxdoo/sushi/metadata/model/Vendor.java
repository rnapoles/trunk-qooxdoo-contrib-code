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

import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;

@Type
public class Vendor {
    @Value private long id;
    @Sequence(Car.class) private List<Car> cars;
    
    public Vendor() {
        this(new Car[] {});
    }
    
    public Vendor(Car ... cars) {
        this.cars = new ArrayList<Car>();
        for (Car c : cars) {
            this.cars.add(c);
        }
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }
    
    public List<Car> cars() {
        return cars;
    }
}
