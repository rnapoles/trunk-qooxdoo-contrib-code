package org.eclipse.wst.jsdt.qooxdoo.functional.mixins;

public class MixinMembers_PDETest extends AbstractMixin_PDETest {

  private final String fileContents = "qx.Mixin.define(\"MyMixin\", {\n"
                                      + "    members : {\n"
                                      + "        mixedInMethod : function() {\n"
                                      + "        },\n"
                                      + "        mixedInAttribute : \"foo\"\n"
                                      + "    }\n"
                                      + "})\n"
                                      + "qx.Class.define(\"my.cool.Class\", {\n"
                                      + "    include :MyMixin\n"
                                      + "});\n"
                                      + "var b = new my.cool.Class()\n"
                                      + "b.mixedInAttribute;\n"
                                      + "b.mixedInMethod();\n\n\n"
                                      + "qx.Mixin.define(\"my.namespaced.Mixin\", {\n"
                                      + "    members : {\n"
                                      + "        mixedInMethodFromNamespace : function() {\n"
                                      + "        }\n"
                                      + "    }\n"
                                      + "})\n"
                                      + "qx.Class.define(\"my.cool.Class2\", {\n"
                                      + "    include :my.namespaced.Mixin\n"
                                      + "});\n"
                                      + "var c = new my.cool.Class2()\n"
                                      + "c.mixedInMethodFromNamespace();";

  @Override
  protected String getFileContents() {
    return fileContents;
  }
}
