package org.eclipse.wst.jsdt.qooxdoo.validation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.eclipse.wst.jsdt.internal.compiler.ast.ObjectLiteral;
import org.eclipse.wst.jsdt.internal.compiler.ast.ObjectLiteralField;

public class ObjectLiteralBuilder {

  private ObjectLiteral result = new ObjectLiteral();

  public ObjectLiteral getExpression() {
    return result;
  }

  public void add( ObjectLiteralField piField ) {
    List<ObjectLiteralField> fields = new ArrayList<ObjectLiteralField>();
    if( result.fields != null ) {
      fields = new ArrayList<ObjectLiteralField>( Arrays.asList( result.fields ) );
    }
    fields.add( piField );
    result.fields = fields.toArray( new ObjectLiteralField[ 0 ] );
  }
}
