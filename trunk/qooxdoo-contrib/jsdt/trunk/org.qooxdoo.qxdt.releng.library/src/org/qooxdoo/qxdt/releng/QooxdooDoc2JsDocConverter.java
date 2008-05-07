package org.qooxdoo.qxdt.releng;

import java.util.Scanner;

public class QooxdooDoc2JsDocConverter implements IConverter {

  private static final String LINE_DELIMITER = System.getProperty( "line.separator" );
  private boolean jsDocMode = false;

  /**
   * This method assumes that the file contains a docs similar to JSDoc, only
   * with the statement "@type" containing some random string instead of the
   * return type for a method. Further, it assumes that the "@return" statement
   * contains the type in curly braces '{' and '}'. It throws away all
   * containing "@type" lines and adds new ones that contain the type as
   * extracted from "@return" statements.<br>
   * 
   * @param a string containing JavaScript
   * @return The string given in the parameter orig, but with "@type" statements
   *         that are accepted from JSDoc Parsers.
   */
  public String applyRules( String orig ) {
    StringBuilder result = new StringBuilder();
    String[] lines = orig.split( LINE_DELIMITER );
    for( String each : lines ) {
      findJSDocMode( each );
      handlePossibleReturnStatement( result, each );
      copyLine( result, each );
    }
    return result.toString();
  }

  private void copyLine( StringBuilder result, String line ) {
    if( !throwLineAway( line ) ) {
      result.append( line + LINE_DELIMITER );
    }
  }

  private void handlePossibleReturnStatement( StringBuilder result, String line )
  {
    if( isInJSDoc() ) {
      if( line.contains( "@return" ) ) {
        insertTypeStatementBasedOnReturn( result, line );
      }
    }
  }

  private void findJSDocMode( String each ) {
    if( isInJSDoc() && endsJSDoc( each ) ) {
      leaveJSDocMode();
    } else if( startsJSDoc( each ) ) {
      enterJSDocMode();
    }
  }

  private boolean throwLineAway( String each ) {
    return isInJSDoc() && each.contains( "@type" );
  }

  private void enterJSDocMode() {
    jsDocMode = true;
  }

  private void leaveJSDocMode() {
    jsDocMode = false;
  }

  private boolean isInJSDoc() {
    return jsDocMode;
  }

  private boolean startsJSDoc( String each ) {
    return each.contains( "/**" );
  }

  private boolean endsJSDoc( String each ) {
    return each.contains( "*/" );
  }

  private void insertTypeStatementBasedOnReturn( StringBuilder result,
                                                 String line )
  {
    String type = getType( line );
    int whitespaces = line.indexOf( '*' );
    for( int i = 0; i < whitespaces; i++ ) {
      result.append( ' ' );
    }
    result.append( "* @type " + type + LINE_DELIMITER );
  }

  private String getType( String each ) {
    String remainder = each.substring( each.indexOf( "@return" ) );
    Scanner sc = new Scanner( remainder );
    sc.useDelimiter( "\\{" );
    sc.next();
    sc.useDelimiter( "\\}" );
    String type = sc.next(); // still contains the leading '{'
    return type.substring( 1 );
  }
}
