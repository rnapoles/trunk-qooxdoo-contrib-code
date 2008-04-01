/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.metadata.xml;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.SimpleTypeException;
import org.qooxdoo.sushi.metadata.Type;
import org.qooxdoo.sushi.metadata.Variable;
import org.qooxdoo.sushi.metadata.model.Car;
import org.qooxdoo.sushi.metadata.model.Engine;
import org.qooxdoo.sushi.metadata.model.ModelBase;
import org.qooxdoo.sushi.metadata.model.Vendor;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;
import org.xml.sax.SAXException;

public class LoaderTest extends ModelBase {
    // primitives
    
    @Test
    public void string() throws LoaderException {
        assertEquals("", str("<string></string>"));
        assertEquals("", str("<string/>"));
        assertEquals("a", str("<string>a</string>"));
        assertEquals("<>", str("<string>&lt;&gt;</string>"));
    }

    @Test
    public void integer() throws LoaderException {
        assertEquals(0, integer("<int>0</int>"));
        assertEquals(1, integer("<int>1</int>"));
        assertEquals(42, integer("<int>42</int>"));
        try {
            integer("<int></int>");
            fail();
        } catch (LoaderException e) {
            one(e, "''");
        }
        try {
            integer("<int>4a</int>");
            fail();
        } catch (LoaderException e) {
            one(e, "'4a'");
        }
    }

    @Test
    public void bool() throws LoaderException {
        assertEquals(true, bool("<boolean>true</boolean>"));
        assertEquals(false, bool("<boolean>false</boolean>"));
        try {
            bool("<boolean></boolean>");
            fail();
        } catch (LoaderException e) {
            one(e, "''");
        }
        try {
            bool("<boolean>yes</boolean>");
            fail();
        } catch (LoaderException e) {
            one(e, "'yes'");
        }
    }

    @Test
    public void lng() throws LoaderException {
        assertEquals((long) -2, loadXml(new ReflectSchema().type(Long.class), "<long>-2</long>").get());
    }

    //-- complex types
    
    @Test
    public void engine() throws LoaderException {
        Engine engine;
        
        engine = engine("<engine><turbo>true</turbo><ps>12</ps></engine>");
        assertEquals(true, engine.getTurbo());
        assertEquals(12, engine.getPs());
    }

    @Test
    public void vendor() throws LoaderException {
        Vendor vendor;
        Car car;
        
        vendor = (Vendor) loadXml(METADATA.type(Vendor.class), "<vendor>" +
        "  <id>100</id>" +
        "  <car><name>m3</name><kind>sports</kind><seats>2</seats>" +
        "    <engine><turbo>true</turbo><ps>200</ps></engine>" +
        "  </car>" +
        "  <car><name>golf</name><kind>normal</kind><seats>4</seats>" +
        "    <engine><turbo>false</turbo><ps>50</ps></engine>" +
        "    <radio><cd>true</cd><speaker>2</speaker></radio>" +
        "  </car>" +
        "</vendor>").get();
        assertEquals(100L, vendor.getId());
        assertEquals(2, vendor.cars().size());
        car = vendor.cars().get(0);
        assertEquals("m3", car.getName());
        assertNull(car.getRadio());
        car = vendor.cars().get(1);
        assertEquals("golf", car.getName());
        assertNotNull(car.getRadio());
        assertEquals(2, car.getRadio().getSpeaker());
    }

    @Test
    public void id() throws LoaderException {
        Vendor vendor;
        
        vendor = (Vendor) loadXml(METADATA.type(Vendor.class), "<vendor>" +
        "  <id>100</id>" +
        "  <car id='foo'><name>m3</name><kind>sports</kind><seats>2</seats>" +
        "    <engine><turbo>true</turbo><ps>200</ps></engine>" +
        "  </car>" +
        "  <car idref='foo'/>" +
        "</vendor>").get();
        assertEquals(100L, vendor.getId());
        assertEquals(2, vendor.cars().size());
        assertSame(vendor.cars().get(0), vendor.cars().get(1));
    }

    @Test(expected=LoaderException.class)
    public void idNotFound() throws LoaderException {
        Vendor vendor;
        
        vendor = (Vendor) loadXml(METADATA.type(Vendor.class), "<vendor>" +
        "  <id>100</id>" +
        "  <car idref='foo'/>" +
        "</vendor>").get();
        assertEquals(100L, vendor.getId());
        assertEquals(2, vendor.cars().size());
        assertSame(vendor.cars().get(0), vendor.cars().get(1));
    }
    
    @Test(expected=LoaderException.class)
    public void idDuplicate() throws LoaderException {
        Vendor vendor;
        
        vendor = (Vendor) loadXml(METADATA.type(Vendor.class), "<vendor>" +
        "  <id>100</id>" +
        "  <car id='foo'><name>m3</name><kind>sports</kind><seats>2</seats>" +
        "    <engine><turbo>true</turbo><ps>200</ps></engine>" +
        "  </car>" +
        "  <car id='foo'><name>m3</name><kind>sports</kind><seats>2</seats>" +
        "    <engine><turbo>true</turbo><ps>200</ps></engine>" +
        "  </car>" +
        "</vendor>").get();
        assertEquals(100L, vendor.getId());
        assertEquals(2, vendor.cars().size());
        assertSame(vendor.cars().get(0), vendor.cars().get(1));
    }

    @Test(expected=LoaderException.class)
    public void idUnexpectedContent() throws LoaderException {
        Vendor vendor;
        
        vendor = (Vendor) loadXml(METADATA.type(Vendor.class), "<vendor>" +
        "  <id>100</id>" +
        "  <car id='foo'><name>m3</name><kind>sports</kind><seats>2</seats>" +
        "    <engine><turbo>true</turbo><ps>200</ps></engine>" +
        "  </car>" +
        "  <car idref='foo'><name>m3</name><kind>sports</kind><seats>2</seats>" +
        "    <engine><turbo>true</turbo><ps>200</ps></engine>" +
        "  </car>" +
        "</vendor>").get();
        assertEquals(100L, vendor.getId());
        assertEquals(2, vendor.cars().size());
        assertSame(vendor.cars().get(0), vendor.cars().get(1));
    }
    //-- 
    
    @Test
    public void whitespaceBetweenElements() throws LoaderException {
        assertEquals(1, engine("<engine>\t\n<turbo>true</turbo> <ps>1</ps></engine>").getPs());
    }

    //--
    
    @Test
    public void malformed() throws LoaderException {
        try {
            str("<string>");
        } catch (LoaderException e) {
            one(e, "must start");
        }
    }

    @Test
    public void errorPosition() throws LoaderException {
        try {
            engine("<engine>\n<turbo>\n");
            fail();
        } catch (LoaderException e) {
            one(e, ":3:1");
        }
    }

    @Test
    public void mixedContent() {
        try {
            str("<string><ele/></string>");
            fail();
        } catch (LoaderException e) {
            oneLoader(e, "unknown element 'ele'");
        }
    }

    @Test
    public void contentBetweenElements() {
        try {
            engine("<engine><turbo>true</turbo>  abc  <ps>1</ps></engine>");
            fail();
        } catch (LoaderException e) {
            oneLoader(e, "unexpected content");
        }
    }
    
    @Test
    public void unkownField() {
        try {
            engine("<engine><turbo>true</turbo><ps>1</ps><unknown/></engine>");
            fail();
        } catch (LoaderException e) {
            oneLoader(e, "unknown element 'unknown'");
        }
    }
    
    @Test
    public void missingField() throws SimpleTypeException {
        Variable<Boolean> v;
        Engine engine;
        
        try {
            engine("<engine><ps>12</ps></engine>");
            fail();
        } catch (LoaderException e) {
            v = (Variable) oneVariable(e, "turbo").variable;
            assertEquals("turbo", v.item.getName());
            engine = (Engine) e.getLoaded();

            assertEquals(12, engine.getPs());
            assertEquals(false, engine.getTurbo());
            assertEquals(false, v.getOne());
            
            v.set(true);
            assertEquals(true, engine.getTurbo());
            assertEquals(true, v.getOne());
        }
    }

    //--
    
    private Object str(String str) throws LoaderException {
        return loadXml(new ReflectSchema().type(String.class), str).get();
    }

    private Object integer(String str) throws LoaderException {
        return loadXml(new ReflectSchema().type(Integer.class), str).get();
    }

    private Object bool(String str) throws LoaderException {
        return loadXml(new ReflectSchema().type(Boolean.class), str).get();
    }

    private Engine engine(String str) throws LoaderException {
        return (Engine) loadXml(METADATA.type(Engine.class), str).get();
    }
    
    //--
    
    private SAXLoaderException oneLoader(LoaderException e, String contains) {
        return (SAXLoaderException) one(e, contains);
    }

    private SAXVariableException oneVariable(LoaderException e, String contains) {
        return (SAXVariableException) one(e, contains);
    }
    
    private SAXException one(LoaderException e, String contains) {
        assertEquals(1, e.causes().size());
        assertTrue(e.getMessage(), e.getMessage().contains(contains));
        return e.causes().get(0);
    }

    private static final IO IO_OBJ = new IO();
    
    private static Instance<?> loadXml(Type type, String str) throws LoaderException {
        try {
            return type.loadXml(IO_OBJ.stringNode(str));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
