package org.qooxdoo.qxdt.releng;

import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ReplaceFileContentsInDirectory_Test {

  private File[] files;
  private File directory;

  @Before
  public void setup() throws IOException {
    initFileContents( "original file contents" );
  }

  @After
  public void teardown() {
    for( File each : files ) {
      removeFile( each );
    }
    removeFile( directory );
  }

  @Test
  public void replaceFileContents() throws Exception {
    final String newFileContents = "new file contents";
    new DirectoryContentsReplacer( new IConverter() {

      public String applyRules( String orig ) {
        return newFileContents;
      }
    } ).handle( directory );
    for( File each : files ) {
      assertEquals( newFileContents, IOUtil.readFileContents( each ) );
    }
  }

  private void removeFile( File file ) {
    if( !file.delete() ) {
      file.deleteOnExit();
    }
  }

  private void initFileContents( String fileContents ) throws IOException {
    directory = File.createTempFile( getClass().getName(), ".testdir" );
    directory.delete();
    directory.mkdir();
    files = new File[ 2 ];
    for( int i = 0; i < files.length; i++ ) {
      files[ i ] = File.createTempFile( getClass().getName(),
                                        ".test",
                                        directory );
      IOUtil.writeFileContents( files[ i ], fileContents );
      assertEquals( fileContents, IOUtil.readFileContents( files[ i ] ) );
    }
  }
}
