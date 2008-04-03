/*******************************************************************************
 * Deutsche Post Com GmbH Tulpenfeld 9 53113 Bonn Germany (c) Copyright 2008 by
 * Deutsche Post Com GmbH ALL RIGHTS RESERVED
 * -----------------------------------------------------------------------------
 * $Id: StaticMembers_PDETest.java,v 1.0 Feb 11, 2008 user Exp $
 ******************************************************************************/
package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.io.ByteArrayInputStream;
import java.util.List;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.FindReplaceDocumentAdapter;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.ui.texteditor.ITextEditor;
import org.eclipse.wst.jsdt.core.JavaCore;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import abbot.swt.finder.WidgetFinderImpl;
import abbot.swt.finder.generic.Matcher;
import abbot.swt.finder.generic.MultipleFoundException;
import abbot.swt.finder.generic.NotFoundException;
import abbot.swt.finder.matchers.WidgetClassMatcher;
import de.mkempka.sammy.SammyKey;
import de.mkempka.sammy.operators.SammyProperties;
import de.mkempka.sammy.operators.ShellOperator;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class Namespace_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;
  private String fileContents = "qx.Class.define(\"a.b.App\", {\n"
                                + "type : \"static\",\n"
                                + "statics : {\n"
                                + "    PI : 3.1415\n"
                                + "    }\n"
                                + "});\n"
                                + "\n"
                                + "a\n";

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
  public void completeFullyQualifiedName() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    moveCursorToPosition( teo );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    TableItem suggestion = findItem( suggestions, "a.b.App" );
    assertNotNull( suggestion );
    suggestions.setSelection( suggestion );
    teo.type( SammyKey.ENTER );
    assertEquals( "a.b.App", teo.getLineContent( 7 ) );
    teo.type( ".PI;" );
    teo.save();
    List<IMarker> markers = teo.getMarkers();
    assertTrue( getFirstErrorMessage( markers ), markers.isEmpty() );
  }

  @Test
  public void getFullyQualifiedNameInAutoCompletion() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    moveCursorToPosition( teo );
    teo.type( "." );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    TableItem suggestion = findItem( suggestions, "a.b.App" );
    sammy.stopAndShowChangesToUser();
    assertNotNull( suggestion );
  }

  private String getFirstErrorMessage( List<IMarker> markers )
    throws CoreException
  {
    String result = "";
    if( !markers.isEmpty() ) {
      result = markers.get( 0 ).getAttribute( "message" ).toString();
    }
    return result;
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

  private void moveCursorToPosition( TextEditorOperator teo )
    throws BadLocationException
  {
    ITextEditor editor = ( ITextEditor )teo.getSource();
    IDocument document = editor.getDocumentProvider()
      .getDocument( editor.getEditorInput() );
    FindReplaceDocumentAdapter adapter = new FindReplaceDocumentAdapter( document );
    IRegion occurrence = adapter.find( 0, "\na", true, true, false, false );
    System.out.println( "found var a at " + occurrence );
    int lineNumber = document.getLineOfOffset( occurrence.getOffset() );
    editor.selectAndReveal( occurrence.getOffset()
                                + occurrence.getLength()
                                + document.getLineLength( lineNumber )
                                - document.getLineDelimiter( lineNumber )
                                  .length(),
                            0 );
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
