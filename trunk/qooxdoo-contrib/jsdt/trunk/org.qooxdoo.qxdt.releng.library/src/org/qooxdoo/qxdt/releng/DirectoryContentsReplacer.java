package org.qooxdoo.qxdt.releng;

import java.io.File;

public class DirectoryContentsReplacer {

  private final IConverter converter;

  public DirectoryContentsReplacer( IConverter converter ) {
    this.converter = converter;
  }

  public void handle( File directory ) {
    System.out.println( "Converting files in " + directory.getAbsolutePath() );
    File[] files = directory.listFiles();
    for( File each : files ) {
      new FileContentsReplacer( converter ).handle( each );
    }
  }
}
