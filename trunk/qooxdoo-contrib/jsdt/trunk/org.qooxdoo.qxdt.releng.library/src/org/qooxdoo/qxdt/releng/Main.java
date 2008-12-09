package org.qooxdoo.qxdt.releng;

import java.io.File;

/**
 * Fixes "@type" parameter of qooxdoo versions 0.7.3 and older to comply with
 * JSDoc. The first argument to this program has to be a directory that contains
 * only the qooxdoo classes and no subdirectories.<br/> These bash commands can
 * construct such a directory:</br> <code>FILES=`find . -name "*.js"`</code><br/>
 * <code>for II in $FILES; do NEWNAME=`echo ${II} | sed 's/\//_/g' | sed 's/^\._//'`; echo "${II} -> ${NEWNAME}"; cp ${II} /tmp/qxclasses/${NEWNAME}; done</code>
 * 
 * @version $Id: Main.java,v 1.0 May 7, 2008 5:59:00 PM user Exp $
 */
public class Main {

  /**
   * @param args
   */
  public static void main( String[] args ) {
    if( args.length != 1 ) {
      throw new IllegalArgumentException( "Expected directory as parameter" );
    }
    File directory = new File( args[ 0 ] );
    if( !directory.isDirectory() ) {
      throw new IllegalArgumentException( "Given argument is not a valid directory: "
                                          + args[ 0 ] );
    }
    new DirectoryContentsReplacer( new QooxdooDoc2JsDocConverter() ).handle( directory );
  }
}
