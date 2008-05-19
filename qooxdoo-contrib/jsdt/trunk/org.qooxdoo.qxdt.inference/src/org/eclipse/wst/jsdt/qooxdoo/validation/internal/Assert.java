package org.eclipse.wst.jsdt.qooxdoo.validation.internal;


public class Assert {

  public static void isNotNull( Object argument ) {
    if( argument == null ) {
      throw new IllegalArgumentException( "Argument must not be null" );
    }
  }
}
