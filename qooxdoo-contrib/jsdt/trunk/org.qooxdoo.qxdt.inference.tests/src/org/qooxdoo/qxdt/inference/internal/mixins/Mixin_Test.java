package org.qooxdoo.qxdt.inference.internal.mixins;

import static org.junit.Assert.*;

import org.eclipse.wst.jsdt.core.ast.IFunctionDeclaration;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.core.infer.InferredType;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins.Mixin;
import org.junit.Test;

public class Mixin_Test {

  @Test
  public void addMethod() throws Exception {
    InferredType mixinType = new InferredType( "mixinType".toCharArray() );
    Mixin mixin = new Mixin( mixinType );
    InferredType classType = new InferredType( "classType".toCharArray() );
    mixin.mixedIn( classType );
    assertNull( classType.methods );
    char[] expectedName = "methodName".toCharArray();
    IFunctionDeclaration expectedMD = new MethodDeclaration( null );
    mixin.addMethod( new InferredMethod( expectedName, expectedMD, mixinType ) );
    assertEquals( 1, classType.methods.size() );
    InferredMethod actualMethod = ( InferredMethod )classType.methods.get( 0 );
    assertEquals( expectedName, actualMethod.name );
    assertEquals( expectedMD, actualMethod.getFunctionDeclaration() );
  }
}
