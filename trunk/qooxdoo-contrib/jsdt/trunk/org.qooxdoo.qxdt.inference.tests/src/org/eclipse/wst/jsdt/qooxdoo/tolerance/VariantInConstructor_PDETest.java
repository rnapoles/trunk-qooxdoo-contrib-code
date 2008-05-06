package org.eclipse.wst.jsdt.qooxdoo.tolerance;

import junit.framework.Assert;

import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTParser;
import org.junit.Test;

public class VariantInConstructor_PDETest extends Assert {

  private String fileContents = "qx.Class.define(\"my.cool.Class\", \n"
                                + "{\n"
                                + "  construct : qx.core.Variant.select(\"qx.client\", {\n"
                                + "                 \"gecko\": function() {  },\n"
                                + "                 \"mshtml|opera\": function() { },\n"
                                + "                 \"default\": function() { }\n"
                                + "              })\n"
                                + "});\n";

  @Test
  public void resolvedInFoo() throws Exception {
    ASTParser newParser = ASTParser.newParser( AST.JLS3 );
    newParser.setSource( fileContents.toCharArray() );
    newParser.createAST( new NullProgressMonitor() );
  }
}
