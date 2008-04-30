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

import org.junit.Before;

import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.annotation.AnnotationSchema;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;

public abstract class ModelBase {
    public static final Schema MODEL = new AnnotationSchema();

    public static final Schema LISTMODEL = new ReflectSchema();

    protected Vendor vendor;
    protected Car audi;
    protected Car bmw;
    
    @Before
    public void setUp() {
        audi = new Car("audi", Kind.NORMAL, 4, new Engine(false, 90), new Radio());
        bmw = new Car("bmw", Kind.SPORTS, 2, new Engine(true, 200), null);
        vendor = new Vendor(audi, bmw);
    }
}
