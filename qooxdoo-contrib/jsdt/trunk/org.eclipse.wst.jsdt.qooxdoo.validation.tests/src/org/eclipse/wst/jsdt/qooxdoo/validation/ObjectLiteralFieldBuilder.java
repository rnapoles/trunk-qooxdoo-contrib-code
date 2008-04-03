package org.eclipse.wst.jsdt.qooxdoo.validation;

import org.eclipse.wst.jsdt.internal.compiler.ast.Expression;
import org.eclipse.wst.jsdt.internal.compiler.ast.ObjectLiteralField;
import org.eclipse.wst.jsdt.internal.compiler.ast.SingleNameReference;


public class ObjectLiteralFieldBuilder {

  private Expression value;
  private Expression field;

  public void setFieldName( String string ) {
    this.field = new SingleNameReference(string.toCharArray(), 0L);
  }

  public void setFieldValue( Expression expression ) {
    this.value = expression;
  }

  public ObjectLiteralField getObjectLiteralField() {
    ObjectLiteralField result = new ObjectLiteralField(field, value, 0, 1);
    return result;
  }
}
