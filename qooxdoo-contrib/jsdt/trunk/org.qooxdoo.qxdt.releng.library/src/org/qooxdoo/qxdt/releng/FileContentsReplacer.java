package org.qooxdoo.qxdt.releng;

import java.io.File;
import java.io.IOException;

public class FileContentsReplacer {

  private final IConverter converter;

  public FileContentsReplacer( IConverter converter ) {
    this.converter = converter;
  }

  public void handle( File file ) {
    System.out.println( " Converting " + file.getName() );
    try {
      String fc = IOUtil.readFileContents( file );
      String newFc = converter.applyRules( fc );
      IOUtil.writeFileContents( file, newFc );
    } catch( IOException e ) {
      e.printStackTrace();
    }
  }
}
