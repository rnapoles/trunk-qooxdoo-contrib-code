package org.eclipse.wst.jsdt.qooxdoo.validation;

import junit.framework.Assert;

import org.eclipse.wst.jsdt.internal.compiler.ast.DoubleLiteral;
import org.eclipse.wst.jsdt.internal.compiler.ast.Expression;
import org.eclipse.wst.jsdt.internal.compiler.ast.ObjectLiteralField;
import org.junit.Test;


public class ObjectLiteralBuilders_Test extends Assert {
  
  @Test
  public void buildObjectLiteralField() throws Exception {
    ObjectLiteralField literal = buildStaticsWithPI();
    assertEquals( "statics : {\n  PI : 3.14\n}", literal.toString());
  }

  private ObjectLiteralField buildStaticsWithPI() {
    ObjectLiteralFieldBuilder builder = new ObjectLiteralFieldBuilder();
    builder.setFieldName("statics");
    ObjectLiteralBuilder ebuilder = new ObjectLiteralBuilder();
    ebuilder.add( getPiField() );
    Expression expression = ebuilder.getExpression();
    builder.setFieldValue( expression );
    ObjectLiteralField literal = builder.getObjectLiteralField();
    return literal;
  }

  private ObjectLiteralField getPiField() {
    ObjectLiteralFieldBuilder pibuilder = new ObjectLiteralFieldBuilder();
    pibuilder.setFieldName( "PI" );
    pibuilder.setFieldValue( new DoubleLiteral("3.14".toCharArray(), 0, 3 ));
    return pibuilder.getObjectLiteralField();
  }
}
