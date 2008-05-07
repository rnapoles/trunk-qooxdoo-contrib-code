package org.qooxdoo.qxdt.releng;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;


public class IOUtil {

  public static String readFileContents( File file ) throws IOException {
    InputStream contents = new FileInputStream( file );
    StringWriter writer = new StringWriter();
    int ch = contents.read();
    while( ch >= 0 ) {
      writer.write( ch );
      ch = contents.read();
    }
    contents.close();
    return writer.getBuffer().toString();
  }

  public static void writeFileContents( File file, String fileContents )
    throws IOException
  {
    FileWriter fileWriter = new FileWriter( file );
    fileWriter.append( fileContents );
    fileWriter.close();
  }
}

