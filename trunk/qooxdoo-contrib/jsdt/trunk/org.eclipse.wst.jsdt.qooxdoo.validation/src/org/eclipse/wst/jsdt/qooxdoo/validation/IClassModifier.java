package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;


public interface IClassModifier {

  void add( IObjectLiteralField field );

  IClassModifier getDetailsModifier( IObjectLiteralField field );

}
