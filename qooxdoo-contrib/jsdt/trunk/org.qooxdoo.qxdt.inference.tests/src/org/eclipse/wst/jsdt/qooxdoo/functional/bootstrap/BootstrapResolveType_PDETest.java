package org.eclipse.wst.jsdt.qooxdoo.functional.bootstrap;

public class BootstrapResolveType_PDETest extends AbstractBootstrap_PDETest {

  private final String fileContents = "qx.Bootstrap.define(\"MyBootstrap\",  {\n"
                                      + "   members : {\n"
                                      + "   myfunc : function() {\n"
                                      + "},\n"
                                      + "myAttribute : \"foo\"\n"
                                      + "},\n"
                                      + "statics : {\n"
                                      + "LOADSTART : new Date,\n"
                                      + "HOME : \"/home/user\"\n"
                                      + "}\n"
                                      + "});\n"
                                      + "\n"
                                      + "new MyBootstrap().myfunc();";
    
  @Override
  protected String getFileContents() {
    return fileContents;
  }
}
