package org.eclipse.wst.jsdt.qooxdoo.validation;


public class PleaseOpenBugException extends RuntimeException {

  private static final long serialVersionUID = 2054888308645043907L;

  public PleaseOpenBugException( String message, Throwable cause ) {
    super( constructMessage( message ), cause );
  }


  public PleaseOpenBugException( String message ) {
    super( constructMessage( message ) );
  }

  private static String constructMessage( String message ) {
    return message+ "\nPlease post a bug report against QXDT on http://bugzilla.qooxdoo.org/";
  }
  
  
}

