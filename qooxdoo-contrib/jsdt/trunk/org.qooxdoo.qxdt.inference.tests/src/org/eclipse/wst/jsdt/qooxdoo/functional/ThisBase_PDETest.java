package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.io.ByteArrayInputStream;
import java.util.Arrays;
import java.util.Collection;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.core.JavaCore;
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
    setupProject();
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
    assertTrue( teo.getMarkers().isEmpty() );
  }

  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }

  private void setupProject() throws CoreException {
    IProject project = sammy.createGenericProject();
    QxProjectUtil.addJSDTNature( new NullProgressMonitor(), project );
    QxProjectUtil.addDefaultLibToLibraryPath( new NullProgressMonitor(),
                                              project );
    this.file = project.getFile( "Application.js" );
    this.file.create( new ByteArrayInputStream( fileContents.getBytes() ),
                      true,
                      new NullProgressMonitor() );
    QxProjectUtil.createUserLibrary( JavaCore.create( project ) );
  }
}
