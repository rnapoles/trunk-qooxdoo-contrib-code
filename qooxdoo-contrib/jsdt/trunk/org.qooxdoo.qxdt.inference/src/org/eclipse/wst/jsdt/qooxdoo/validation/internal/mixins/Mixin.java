package org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.wst.jsdt.core.infer.InferredAttribute;
import org.eclipse.wst.jsdt.core.infer.InferredMethod;
import org.eclipse.wst.jsdt.core.infer.InferredType;

public class Mixin {

  private final InferredType type;
  private List<InferredType> mixedInTypes = new ArrayList<InferredType>();

  public Mixin( InferredType type ) {
    this.type = type;
  }

  public InferredType getType() {
    return type;
  }

  public void mixedIn( InferredType classDefinition ) {
    mixedInTypes.add( classDefinition );
  }

  public void addMethod( InferredMethod method ) {
    for( InferredType each : mixedInTypes ) {
      each.addMethod( method.name, method.getFunctionDeclaration(), false );
    }
  }

  public void addAttribute( InferredAttribute result ) {
    for( InferredType each : mixedInTypes ) {
      each.addAttribute( result );
    }
  }
}
