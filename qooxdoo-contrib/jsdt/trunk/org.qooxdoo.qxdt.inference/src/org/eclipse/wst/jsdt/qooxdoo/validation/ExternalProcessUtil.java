package org.eclipse.wst.jsdt.qooxdoo.validation;

// Copyright (c) 2004-2007 by Innoopract Informationssysteme GmbH.
// All rights reserved.
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * <p>
 * helper for running native tools in an external process.
 * </p>
 */
public class ExternalProcessUtil {

  public static final String CMD_ZIP = "/usr/bin/zip";
  public static final String CMD_TAR = "/bin/tar";
  public static final String CMD_CHMOD = "/bin/chmod";
  public static final String CMD_LN = "/bin/ln";
  private String output;
  private String errors;

  public int execute( final String[] cmdArray, final File workingDir )
    throws IOException
  {
    final Process proc = Runtime.getRuntime().exec( cmdArray, null, workingDir );
    // final BufferedWriter defaultIn = new BufferedWriter(
    // new OutputStreamWriter( proc.getOutputStream() ) );
    final BufferedReader defaultOut = new BufferedReader( new InputStreamReader( proc.getInputStream() ) );
    final BufferedReader error = new BufferedReader( new InputStreamReader( proc.getErrorStream() ) );
    Thread outputCollector = getOutputCollector( defaultOut );
    outputCollector.start();
    Thread errorCollector = getErrorCollector( error );
    errorCollector.start();
    boolean interrupted = true;
    while( interrupted ) {
      try {
        proc.waitFor();
        outputCollector.join();
        errorCollector.join();
        interrupted = false;
      } catch( InterruptedException e ) {
        // ignore
      }
    }
    // defaultIn.close();
    proc.getOutputStream().close();
    return proc.exitValue();
  }

  private Thread getOutputCollector( final BufferedReader defaultOut ) {
    return new Thread() {

      @Override
      public void run() {
        try {
          ExternalProcessUtil.this.output = getContents( defaultOut );
        } catch( IOException ex ) {
          throw new RuntimeException( ex );
        }
      }
    };
  }

  private Thread getErrorCollector( final BufferedReader error ) {
    Thread errorCollector = new Thread() {

      @Override
      public void run() {
        try {
          ExternalProcessUtil.this.errors = getContents( error );
        } catch( IOException ex ) {
          throw new RuntimeException( ex );
        }
      }
    };
    return errorCollector;
  }

  String getContents( final BufferedReader defaultOut ) throws IOException {
    String line = defaultOut.readLine();
    StringBuilder sbOut = new StringBuilder();
    while( line != null ) {
      sbOut.append( line + System.getProperty( "line.separator" ) );
      line = defaultOut.readLine();
    }
    defaultOut.close();
    String out = sbOut.toString();
    return out;
  }

  public String getErrors() {
    return errors;
  }

  public String getOutput() {
    return output;
  }
}
