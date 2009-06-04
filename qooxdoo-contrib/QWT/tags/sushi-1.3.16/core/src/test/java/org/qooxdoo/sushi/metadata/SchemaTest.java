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

package org.qooxdoo.sushi.metadata;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.IOException;

import org.junit.Test;
import org.xml.sax.SAXException;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.metadata.annotation.AnnotationSchema;
import org.qooxdoo.sushi.metadata.model.Engine;
import org.qooxdoo.sushi.metadata.reflect.ReflectSchema;
import org.qooxdoo.sushi.xml.Builder;

public class SchemaTest {
    private static final IO IO_OBJ = new IO();

    @Test
    public void simple() throws SAXException, IOException {
        String schema;

        schema = new ReflectSchema().type(String.class).createSchema();
        assertEquals(Type.SCHEMA_HEAD + 
                "  <xs:element name='string' type='xs:string'/>\n" +
                "</xs:schema>",
                schema);
        validate(schema,  "<string>abc</string>");
        validate(schema,  "<string/>");
        try {
            validate(schema,  "<nosuchelement/>");
            fail();
        } catch (SAXException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("nosuchelement"));
        }
    }

    @Test
    public void complex() throws SAXException, IOException {
        String schema;

        schema = new AnnotationSchema().type(Engine.class).createSchema();
        assertEquals(Type.SCHEMA_HEAD + 
                "  <xs:element name='engine' type='engine'/>\n" +
                "  <xs:complexType name='engine'>\n" +
                "    <xs:sequence minOccurs='0'>\n" +
                "      <xs:element name='turbo' type='xs:boolean'/>\n" +
                "      <xs:element name='ps' type='xs:int'/>\n" +
                "    </xs:sequence>\n" +
                "    <xs:attributeGroup ref='ids'/>\n" +
                "  </xs:complexType>\n"+
                "</xs:schema>",
                schema);
        validate(schema, "<engine><turbo>true</turbo><ps>2</ps></engine>");
    }

    private static void validate(String schema, String content) throws IOException, SAXException {
        FileNode schemaFile;
        Builder builder;

        schemaFile = IO_OBJ.getTemp().createTempFile();
        schemaFile.writeString(schema);
        builder = new Builder(schemaFile);
        builder.parseString(content);
    }
}
