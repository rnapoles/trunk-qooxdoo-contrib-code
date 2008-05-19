package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.infer.IInferenceFile;
import org.eclipse.wst.jsdt.core.infer.InferEngine;
import org.eclipse.wst.jsdt.core.infer.InferrenceProvider;
import org.eclipse.wst.jsdt.core.infer.RefactoringSupport;
import org.eclipse.wst.jsdt.core.infer.ResolutionConfiguration;

public class QxInferenceProvider implements InferrenceProvider {

  public int applysTo( IInferenceFile scriptFile ) {
    char[] fileNameChars = scriptFile.getFileName();
    if( fileNameChars != null ) {
      // String inferenceID = compilationUnit.getInferenceID();
      // if (ID.equals(inferenceID))
      // return InferrenceProvider.ONLY_THIS;

      String fileName = new String( fileNameChars );
      if( fileName.indexOf( "org.eclipse.wst.jsdt.qooxdoo.validation/libraries" ) >= 0 )
      {
        return InferrenceProvider.ONLY_THIS;
      }
    }
    return InferrenceProvider.MAYBE_THIS;
  }

  public InferEngine getInferEngine() {
    return new QooxdooInferrenceSupport();
  }

  public String getID() {
    return getClass().getName();
  }

  public ResolutionConfiguration getResolutionConfiguration() {
    return new ResolutionConfiguration();
  }

  public RefactoringSupport getRefactoringSupport() {
    return null;
  }
}
