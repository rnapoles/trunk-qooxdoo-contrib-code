package org.eclipse.wst.jsdt.qooxdoo.validation.internal;

import org.eclipse.wst.jsdt.core.ast.IReference;
import org.eclipse.wst.jsdt.internal.compiler.ast.MethodDeclaration;
import org.eclipse.wst.jsdt.internal.compiler.classfmt.ClassFileConstants;

public class MethodCreator {

  // FIXME c&p from PropertiesModifier
  public static MethodDeclaration createFakeMethodNoArgs( IReference name,
                                                          char[] methodName )
  {
    Assert.isNotNull( methodName );
    MethodDeclaration fakeMd = new MethodDeclaration( null );
    fakeMd.sourceStart = name.sourceStart();
    fakeMd.sourceEnd = name.sourceEnd();
    fakeMd.bodyEnd = name.sourceEnd();
    fakeMd.bodyStart = name.sourceStart();
    fakeMd.selector = methodName;
    // @see SourceElementParser#notifySourceElementRequestor( InferredType type
    // );
    fakeMd.modifiers = ClassFileConstants.AccPublic;
    return fakeMd;
  }
}
