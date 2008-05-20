
package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;


public class ClassModifier implements IClassModifier {

  public void visit( IObjectLiteralField field ) {
  }

  public void endVisit( IObjectLiteralField field ) {
  }

  public IClassModifier getDetailsModifier( IObjectLiteralField field ) {
    return new ClassModifier();
  }

}

