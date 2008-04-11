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

package org.qooxdoo.sushi.fs;

import static org.junit.Assert.assertEquals;

import java.io.IOException;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;

import org.junit.Test;

import org.qooxdoo.sushi.fs.memory.MemoryNode;

public class NodeXmlTest {
    private static final IO IO_OBJ = new IO();

    @Test
    public void xslt() throws IOException, TransformerException {
        Transformer t;
        MemoryNode src;
        MemoryNode dest;
        
        t = IO_OBJ.stringNode(
                "<xsl:stylesheet xmlns:xsl='http://www.w3.org/1999/XSL/Transform' version='1.0'>" +
                "  <xsl:output method='xml' indent='yes'/>" +
                "  <xsl:template match='/' ><out/></xsl:template>" +
                "</xsl:stylesheet>").readXsl();
        src = IO_OBJ.stringNode("<foo><bar/></foo>");
        dest = IO_OBJ.stringNode("");
        src.xslt(t, dest);
        assertEquals(IO_OBJ.getSettings().join("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<out/>", ""), 
                dest.readString());
    }
}
