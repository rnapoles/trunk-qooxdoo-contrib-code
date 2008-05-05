/*******************************************************************************
 * Deutsche Post Com GmbH Tulpenfeld 9 53113 Bonn Germany (c) Copyright 2008 by
 * Deutsche Post Com GmbH ALL RIGHTS RESERVED
 * -----------------------------------------------------------------------------
 * $Id: StaticMembers_PDETest.java,v 1.0 Feb 11, 2008 user Exp $
 ******************************************************************************/
package org.eclipse.wst.jsdt.qooxdoo.functional;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.eclipse.ui.part.FileEditorInput;
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
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    assertNotNull( findItem( suggestions, "foo(" ) );
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
