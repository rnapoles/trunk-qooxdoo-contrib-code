package org.eclipse.wst.jsdt.qooxdoo.functional;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.QxProjectUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import abbot.swt.finder.WidgetFinderImpl;
import abbot.swt.finder.generic.Matcher;
import abbot.swt.finder.generic.MultipleFoundException;
import abbot.swt.finder.generic.NotFoundException;
import abbot.swt.finder.matchers.WidgetClassMatcher;
import de.mkempka.sammy.operators.SammyProperties;
import de.mkempka.sammy.operators.ShellOperator;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class This_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;
  private String fileContents = "qx.Class.define(\"Application\", {\n"
                                + "construct : function(x) {\n"
                                + "            },\n"
                                + "properties : {\n"
                                + "    width : { check : \"Number\" }\n"
                                + "  },\n"
                                + "members : {\n"
                                + "    bar : function(x,y) {\n"
                                + "    },\n"
                                + "    foo : function(x) {\n"
                                + "    },\n"
                                + "    _baz : 3\n"
                                + "  }\n"
                                + "});\n"
                                + "\n";

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
  public void resolvedInFoo() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    teo.setCurserAfter( "foo : function(x) {" );
    checkMembersFound( teo );
  }

  @Test
  public void resolvedInBar() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    teo.setCurserAfter( "bar : function(x,y) {" );
    checkMembersFound( teo );
  }

  @Test
  public void resolvedInConstructor() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    teo.setCurserAfter( "construct : function(x) {" );
    checkMembersFound( teo );
  }

  private void checkMembersFound( TextEditorOperator teo )
    throws NotFoundException, MultipleFoundException
  {
    teo.type( "this." );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    checkMethods( suggestions );
    checkField( suggestions );
    checkProperties( suggestions );
  }

  private void checkProperties( Table suggestions ) {
    assertNotNull( findItem( suggestions, "getWidth(" ) );
    assertNotNull( findItem( suggestions, "setWidth(" ) );
  }

  private void checkMethods( Table suggestions ) {
    assertNotNull( findItem( suggestions, "foo(" ) );
    assertNotNull( findItem( suggestions, "bar(" ) );
  }

  private void checkField( Table suggestions ) {
    assertNotNull( findItem( suggestions, "_baz" ) );
  }

  private Table findTable( ShellOperator autoCompletionShell )
    throws NotFoundException, MultipleFoundException
  {
    Matcher<Widget> matcher = new WidgetClassMatcher( Table.class, true );
    Table suggestions = ( Table )WidgetFinderImpl.getDefault()
      .find( autoCompletionShell.getSource(), matcher );
    return suggestions;
  }

  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }

  private TableItem findItem( Table table, String itemPrefix ) {
    TableItem result = null;
    for( TableItem each : table.getItems() ) {
      if( each.getText().startsWith( itemPrefix ) ) {
        result = each;
      }
    }
    return result;
  }
}
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
