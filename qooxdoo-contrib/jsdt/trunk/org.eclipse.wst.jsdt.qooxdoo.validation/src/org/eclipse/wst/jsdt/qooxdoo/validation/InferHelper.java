package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.ast.IFunctionDeclaration;
import org.eclipse.wst.jsdt.core.ast.ISingleNameReference;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.core.infer.InferredType;


public class InferHelper {

  public static InferredMethod addMethodToType( InferredType theType,
                                          ISingleNameReference fieldName,
                                          IFunctionDeclaration methodDeclaration, boolean isConstructor )
  {
    InferredMethod result = null;
    if( isConstructor ) {
      result = theType.addMethod( theType.getName(), methodDeclaration, isConstructor );
    } else {
      result = theType.addMethod( fieldName.getToken(), methodDeclaration, isConstructor );
    }
    return result;
  }
  
}
