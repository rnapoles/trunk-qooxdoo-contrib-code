package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.QxProjectUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import de.mkempka.sammy.operators.SammyProperties;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

@RunWith(value = Parameterized.class)
public class ThisBase_PDETest extends Assert {

  private String fileContents;
  private SammyIDE sammy;
  private IFile file;

  public ThisBase_PDETest( String fileContents ) {
    this.fileContents = fileContents;
  }

  @Before
  public void setUp() throws Exception {
    this.sammy = new SammyIDE();
    this.file = QxProjectUtil.createQxFileWithContents( sammy,
                                                        "Application.js",
                                                        fileContents );
  }

  @After
  public void tearDown() throws Exception {
    sammy.cleanUp();
  }

  @Parameters
  public static Collection<Object[]> data() {
    return Arrays.asList( new Object[][]{
      { // super class has no namespace
        "qx.Class.define(\"SuperClass\", {} )\n"
            + "qx.Class.define(\"my.cool.Class\", \n"
            + "{\n"
            + "  extend : SuperClass,\n"
            + "  construct : function(x) {\n"
            + "    this.base(arguments, x);\n"
            + "  }\n"
            + "});\n"
      },
      { // super class has namespace
        "qx.Class.define(\"my.great.SuperClass\", {\n"
            + "  members : {\n"
            + "    foo : function() {\n"
            + "    }\n"
            + "  }\n"
            + "} )\n"
            + "qx.Class.define(\"my.cool.Class\", \n"
            + "{\n"
            + "  extend : my.great.SuperClass,\n"
            + "  construct : function(x) {\n"
            + "    this.base(arguments, x);\n"
            + "  },\n"
            + "  members : {\n"
            + "    foo : function() {\n"
            + "      this.base(arguments);\n"
            + "    }\n"
            + "  }\n"
            + "});\n"
      }
    } );
  }

  @Test
  public void resolvedInFoo() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    List<IMarker> markers = teo.getMarkers();
    assertTrue( getFirstErrorMessage( markers ), markers.isEmpty() );
  }

  private String getFirstErrorMessage( List<IMarker> errorMarkers )
    throws CoreException
  {
    String result = "";
    if( !errorMarkers.isEmpty() ) {
      result = errorMarkers.get( 0 ).getAttribute( "message" ).toString();
    }
    return result;
  }

  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }
}
