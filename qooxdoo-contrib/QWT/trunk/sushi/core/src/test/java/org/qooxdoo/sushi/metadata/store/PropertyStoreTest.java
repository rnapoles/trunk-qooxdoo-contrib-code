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

package org.qooxdoo.sushi.metadata.store;

import static org.junit.Assert.assertEquals;

import java.util.Properties;

import org.junit.Test;

import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.model.Engine;
import org.qooxdoo.sushi.metadata.model.ModelBase;
import org.qooxdoo.sushi.metadata.model.Vendor;

public class PropertyStoreTest extends ModelBase {
    @Test
    public void readEngine() {
        Properties p;
        Engine engine;
        
        p = new Properties();
        p.put("", Engine.class.getName());
        p.put("turbo", "true");
        p.put("ps", "12");
        engine = MODEL.type(Engine.class).<Engine>loadProperties(p).get();
        assertEquals(12, engine.getPs());
        assertEquals(true, engine.getTurbo());
    }
    
    @Test
    public void readPrefixedEngine() {
        Properties p;
        Engine engine;
        
        p = new Properties();
        p.put("foo", Engine.class.getName());
        p.put("foo/turbo", "true");
        p.put("foo/ps", "12");
        engine = MODEL.type(Engine.class).<Engine>loadProperties(p, "foo").get();
        assertEquals(12, engine.getPs());
        assertEquals(true, engine.getTurbo());
    }
    
    @Test
    public void vendor() throws Exception {
        Instance<Vendor> i;
        Instance<Vendor> clone;
        Properties p;

        i = MODEL.instance(vendor);
        p = new Properties();
        i.toProperties(p, "foo");
        clone = MODEL.type(Vendor.class).loadProperties(p, "foo");
        assertEquals(2, clone.get().cars().size());
    }
}
