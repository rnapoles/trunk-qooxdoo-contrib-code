/*******************************************************************************
 * Deutsche Post Com GmbH Tulpenfeld 9 53113 Bonn Germany (c) Copyright 2008 by
 * Deutsche Post Com GmbH ALL RIGHTS RESERVED
 * -----------------------------------------------------------------------------
 * $Id: StaticMembers_PDETest.java,v 1.0 Feb 11, 2008 user Exp $
 ******************************************************************************/
package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.io.ByteArrayInputStream;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.core.JavaCore;
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

public class DynamicProperties_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;
  private String fileContents = "qx.Class.define(\"Application\", {\n"
                                + "construct : function() {},\n"
                                + "properties : {\n"
                                + "    width : { check : \"Number\", apply : \"applyWidth\" },\n"
                                + "    checked : { check : \"Boolean\" }\n"
                                + "  },\n"
                                + "members : { PI : 3.14 }\n"
                                + "});\n"
                                + "\n"
                                + " Application;\n"
                                + "a.\n";

  @Before
  public void setUp() throws Exception {
    this.sammy = new SammyIDE();
    setupProject();
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
    teo.setCurserAfter( " Application" );
    teo.triggerAutoCompletion();
    teo.setCurserBefore( " Application" );
    teo.type( "var a = new" );
    teo.setCurserAfter( "a." );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    assertTypeIsResolved( suggestions );
    assertGettersAndSetters( suggestions );
    assertNotNull( findItem( suggestions, "toggleChecked()" ) );
    assertNoRecursion( suggestions );
    assertNull( findItem( suggestions, "toggleWidth()" ) );
    // assertNull( findItem( suggestions, "toggleWidth()" ) );
  }

  private void assertNoRecursion( Table suggestions ) {
    assertNull( findItem( suggestions, "getCheck(" ) );
    assertNull( findItem( suggestions, "setCheck(" ) );
    assertNull( findItem( suggestions, "getApply(" ) );
    assertNull( findItem( suggestions, "setApply(" ) );
  }

  private void assertGettersAndSetters( Table suggestions ) {
    assertNotNull( findItem( suggestions, "getWidth()" ) );
    assertNotNull( findItem( suggestions, "getChecked()" ) );
    assertNotNull( findItem( suggestions, "setWidth( width)" ) );
    assertNotNull( findItem( suggestions, "setChecked( checked)" ) );
  }

  private void assertTypeIsResolved( Table suggestions ) {
    assertNotNull( findItem( suggestions, "PI" ) );
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
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
