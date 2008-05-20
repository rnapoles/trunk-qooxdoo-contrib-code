package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.core.ast.IObjectLiteralField;

public interface IClassModifier {

  void visit( IObjectLiteralField field );

  void endVisit( IObjectLiteralField field );

  /**
   * Example: The modifier is the PropertiesModifier reacts on a property. To
   * really add the methods, it is necessary to know the type of a property,
   * since Boolean types get different method names than Integer types. This
   * information is in the object literal fields of a property. The
   * ClassModifier that can handle this information is a details modifier.
   */
  IClassModifier getDetailsModifier( IObjectLiteralField field );

}
