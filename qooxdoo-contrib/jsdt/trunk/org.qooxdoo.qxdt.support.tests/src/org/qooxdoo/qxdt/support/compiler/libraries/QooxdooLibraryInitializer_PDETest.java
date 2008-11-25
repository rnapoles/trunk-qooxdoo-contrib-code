package org.qooxdoo.qxdt.support.compiler.libraries;

import static org.junit.Assert.*;

import java.util.Arrays;

import org.eclipse.wst.jsdt.core.compiler.libraries.LibraryLocation;
import org.eclipse.wst.jsdt.support.qooxdoo.core.compiler.libraries.QooxdooLibraryInitializer;
import org.junit.Ignore;
import org.junit.Test;

public class QooxdooLibraryInitializer_PDETest {

  @Test
  public void bootstrappingAvailable() throws Exception {
    LibraryLocation ll = new QooxdooLibraryInitializer().getLibraryLocation();
    char[][] cfileNames = ll.getLibraryFileNames();
    String[] fileNames = convertToStrings( cfileNames );
    assertContains( "qx.0.7.2.js", fileNames );
  }

  @Test
  public void ignoreHiddenFiles() throws Exception {
    LibraryLocation ll = new QooxdooLibraryInitializer().getLibraryLocation();
    char[][] cfileNames = ll.getLibraryFileNames();
    String[] fileNames = convertToStrings( cfileNames );
    for( String each : fileNames ) {
      assertFalse( each, each.startsWith( "." ) );
    }
  }

  @Test
  @Ignore
  public void qooxdooClassesAvailable() throws Exception {
    LibraryLocation ll = new QooxdooLibraryInitializer().getLibraryLocation();
    char[][] cfileNames = ll.getLibraryFileNames();
    String[] fileNames = convertToStrings( cfileNames );
    assertContains( "qx_Class.js", fileNames );
    assertTrue( "actual: " + fileNames.length, fileNames.length > 400 );
  }

  private void assertContains( String expected, String[] actual ) {
    boolean found = false;
    for( String each : actual ) {
      if( each.equals( expected ) ) {
        found = true;
      }
    }
    assertTrue( expected + " is not contained in " + Arrays.toString( actual ),
                found );
  }

  private String[] convertToStrings( char[][] cfileNames ) {
    String[] result = new String[ cfileNames.length ];
    for( int i = 0; i < result.length; i++ ) {
      result[ i ] = new String( cfileNames[ i ] );
    }
    return result;
  }
}
