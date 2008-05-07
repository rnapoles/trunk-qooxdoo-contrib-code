package org.qooxdoo.qxdt.releng;

import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ReplaceFileContents_Test {

  private File file;

  @Before
  public void setup() throws IOException {
    initFileContents( "original file contents" );
  }

  @After
  public void teardown() {
    if( !file.delete() ) {
      file.deleteOnExit();
    }
  }

  @Test
  public void replaceFileContents() throws Exception {
    final String newFileContents = "new file contents";
    new FileContentsReplacer( new IConverter() {

      public String applyRules( String orig ) {
        return newFileContents;
      }
    } ).handle( file );
    assertEquals( newFileContents, IOUtil.readFileContents( file ) );
  }

  private void initFileContents( String fileContents ) throws IOException {
    file = File.createTempFile( getClass().getName(), ".test" );
    IOUtil.writeFileContents( file, fileContents );
    assertEquals( fileContents, IOUtil.readFileContents( file ) );
  }
}
