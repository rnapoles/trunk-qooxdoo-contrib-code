package org.eclipse.wst.jsdt.qooxdoo.tolerance;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.QxProjectUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import de.mkempka.sammy.operators.SammyProperties;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class NoDefinedClass_PDETest extends Assert {

  private String fileContents = "someMethodCall(\"my.cool.Class\", \n"
                                + "{\n"
                                + "  extend : SuperClass,\n"
                                + "  something : function(x) {this.foo()}\n"
                                + "});\n"
                                + "this.bar";
  private SammyIDE sammy;
  private IFile file;

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

  @Test
  public void noValidation() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    new TextEditorOperator( "Application.js", getProperties() );
    // pass if "new TextEditorOperator(...)" does not fail with a
    // ClassCastException (due to EmptyStackException in
    // QooxdooInferrenceSupport).
  }

  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }
}
