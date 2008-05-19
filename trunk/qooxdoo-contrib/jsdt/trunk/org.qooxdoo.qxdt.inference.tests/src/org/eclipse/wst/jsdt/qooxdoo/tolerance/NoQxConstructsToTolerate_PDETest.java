package org.eclipse.wst.jsdt.qooxdoo.tolerance;

import java.util.Arrays;
import java.util.Collection;

import junit.framework.Assert;

import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.wst.jsdt.core.dom.AST;
import org.eclipse.wst.jsdt.core.dom.ASTParser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

/*
 * When run as PDE test, the QooxooInferrenceSupport is used as part of building
 * the AST. The test cases in this class check certain input where no runtime
 * exception must occur.
 */
@RunWith(Parameterized.class)
public class NoQxConstructsToTolerate_PDETest extends Assert {

  // test input data
  // ///////////////////
  private static final String VARIANT_IN_CONSTRUCTOR = "qx.Class.define(\"my.cool.Class\", \n"
                                                       + "{\n"
                                                       + "  construct : qx.core.Variant.select(\"qx.client\", {\n"
                                                       + "                 \"gecko\": function() {  },\n"
                                                       + "                 \"mshtml|opera\": function() { },\n"
                                                       + "                 \"default\": function() { }\n"
                                                       + "              })\n"
                                                       + "});\n";
  private static final String WRONG_NUMBER_OF_ARGUMENTS = "qx.Class.define();\n";
  private static final String SINGLE_NAME_REFERENCE = "qx.Class.define(name, config);\n";
  private static final String MIXIN_WITHOUT_METHODS = "qx.Mixin.define(\"MyMixin\", {})\n"
                                                      + "qx.Class.define(\"my.cool.Class\", {\n"
                                                      + "    include :MyMixin\n"
                                                      + "});\n";

  // methods for parameterized test
  // //////////////////////////////
  public NoQxConstructsToTolerate_PDETest( final String fileContents ) {
    super();
    this.fileContents = fileContents;
  }

  @Parameters
  public static Collection<Object[]> parameters() {
    return Arrays.asList( new Object[][]{
      {
        VARIANT_IN_CONSTRUCTOR
      }, {
        WRONG_NUMBER_OF_ARGUMENTS
      }, {
        SINGLE_NAME_REFERENCE
      }, {
        MIXIN_WITHOUT_METHODS
      }
    } );
  }
  // fields
  // //////////
  private String fileContents;

  // test methods
  // //////////////////
  @Test
  public void parsingSucceeds() throws Exception {
    ASTParser newParser = ASTParser.newParser( AST.JLS3 );
    newParser.setSource( fileContents.toCharArray() );
    newParser.createAST( new NullProgressMonitor() );
  }
}
