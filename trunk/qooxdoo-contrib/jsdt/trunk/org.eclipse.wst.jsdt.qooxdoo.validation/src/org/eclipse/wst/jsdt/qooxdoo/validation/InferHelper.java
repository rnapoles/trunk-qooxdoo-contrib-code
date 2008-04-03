/******************************************************************************
 * Deutsche Post Com GmbH
 * Tulpenfeld 9
 * 53113 Bonn
 * Germany
 *
 * (c) Copyright 2008 by Deutsche Post Com GmbH
 * ALL RIGHTS RESERVED
 *
 * -----------------------------------------------------------------------------
 *
 * $Id: InferHelpers.java,v 1.0 Feb 12, 2008 user Exp $
 ******************************************************************************/
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

/******************************************************************************
 * $Log: InferHelpers.java,v $
 *
 ******************************************************************************/
