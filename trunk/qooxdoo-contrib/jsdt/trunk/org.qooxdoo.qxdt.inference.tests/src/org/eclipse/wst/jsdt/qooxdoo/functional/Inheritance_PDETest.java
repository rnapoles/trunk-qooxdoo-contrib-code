package org.eclipse.wst.jsdt.qooxdoo.functional;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.ContentAssistAssert;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.QxProjectUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import de.mkempka.sammy.operators.SammyProperties;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class Inheritance_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;
  private String fileContents = "qx.Class.define(\"Parent\", {\n"
                                + "construct : function() {},\n"
                                + "members : {\n"
                                + "    foo : function(x) {\n"
                                + "    }\n"
                                + "  }\n"
                                + "});\n"
                                + "\n"
                                + "qx.Class.define(\"Child\", {\n"
                                + "extend : Parent,\n"
                                + "construct : function() {}\n"
                                + "});\n"
                                + "\n"
                                + " Child;\n"
                                + "a.";

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
  public void triggerAutoCompletion() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    teo.setCurserAfter( ": Parent" );
    teo.triggerAutoCompletion();
    teo.setCurserAfter( " Child" );
    teo.triggerAutoCompletion();
    teo.setCurserBefore( " Child" );
    teo.type( "var a = new" );
    teo.setCurserAfter( "a." );
    teo.triggerAutoCompletion();
    ContentAssistAssert.assertAutoCompletionResultsContain( "foo(" );
  }

  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }
}
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
