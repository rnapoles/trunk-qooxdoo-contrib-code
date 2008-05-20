package org.eclipse.wst.jsdt.qooxdoo.tolerance;

import java.util.List;

import org.eclipse.core.resources.IMarker;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.AbstractFileContentsValidates_PDETest;

import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class PrivateUnusedMethod_PDETest
  extends AbstractFileContentsValidates_PDETest
{

  private final String fileContents = "qx.Class.define(\"qx.Class\",\n"
                                      + "{\n"
                                      + "  statics :  {\n"
                                      + "    __privateMethod : function() {\n"
                                      + "    }\n"
                                      + "  }\n"
                                      + "});\n";

  @Override
  protected String getFileContents() {
    return fileContents;
  }

  @Override
  protected List<IMarker> getErrorMarkers( TextEditorOperator teo )
    throws CoreException
  {
    return teo.getMarkers( IMarker.SEVERITY_ERROR );
  }

}
