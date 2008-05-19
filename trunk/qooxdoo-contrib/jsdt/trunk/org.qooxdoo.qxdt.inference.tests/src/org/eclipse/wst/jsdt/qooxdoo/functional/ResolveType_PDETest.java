package org.eclipse.wst.jsdt.qooxdoo.functional;

import org.eclipse.wst.jsdt.qooxdoo.functional.util.AbstractFileContentsValidates_PDETest;

public class ResolveType_PDETest extends AbstractFileContentsValidates_PDETest {

  private final String fileContents = "qx.Class.define(\"Application\", {\n"
                                      + "type : \"static\",\n"
                                      + "statics : {\n"
                                      + "    PI : 3.1415,\n"
                                      + "    foo : function(x) {\n"
                                      + "    }\n"
                                      + "  }\n"
                                      + "});\n"
                                      + "\n"
                                      + " Application.PI\n";

  @Override
  protected String getFileContents() {
    return fileContents;
  }
}
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
