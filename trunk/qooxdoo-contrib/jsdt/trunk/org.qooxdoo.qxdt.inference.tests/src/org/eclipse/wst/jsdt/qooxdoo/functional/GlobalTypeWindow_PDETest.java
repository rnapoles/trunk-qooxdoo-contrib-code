package org.eclipse.wst.jsdt.qooxdoo.functional;

import org.eclipse.wst.jsdt.qooxdoo.functional.util.AbstractFileContentsValidates_PDETest;

public class GlobalTypeWindow_PDETest
  extends AbstractFileContentsValidates_PDETest
{

  private final String fileContents = "new Window()\n"
                                      + "qx.Class.define(\"my.Window\", {});\n";

  @Override
  protected String getFileContents() {
    // to really run the test, return field "fileContents"
    return fileContents;
  }
}
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
