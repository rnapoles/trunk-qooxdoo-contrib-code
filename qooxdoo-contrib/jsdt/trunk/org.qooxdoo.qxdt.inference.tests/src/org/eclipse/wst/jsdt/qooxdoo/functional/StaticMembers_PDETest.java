package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.util.List;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.FindReplaceDocumentAdapter;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.ui.texteditor.ITextEditor;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.QxProjectUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
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

public class StaticMembers_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;
  private String fileContents = "qx.Class.define(\"Application\", {\n"
                                + "type : \"static\",\n"
                                + "statics : {\n"
                                + "    PI : 3.1415,\n"
                                + "    foo : function(x) {\n"
                                + "    }\n"
                                + "  }\n"
                                + "});\n"
                                + "\n"
                                + "var a =  Application.\n";

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
  @Ignore("fails currently: static methods are not yet working - is it due to jsdt or qooxdoo-tools?")
  public void getStaticMembersInAutoCompletion() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    moveCursorToPosition( teo );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    assertNotNull( findItem( suggestions, "PI" ) );
    assertNotNull( findItem( suggestions, "foo(" ) );
    teo.type( "PI" );
    teo.type( SammyKey.ENTER );
    teo.type( ";" );
    teo.save();
    List<IMarker> errorMarkers = teo.getMarkers( IMarker.SEVERITY_ERROR );
    assertTrue( getFirstErrorMessage( errorMarkers ), errorMarkers.isEmpty() );
    teo.type( SammyKey.ENTER );
    teo.type( "var b = Application" );
    teo.triggerAutoCompletion();
    teo.type( ".foo('a');" );
    teo.save();
    errorMarkers = teo.getMarkers( IMarker.SEVERITY_ERROR );
    assertTrue( getFirstErrorMessage( errorMarkers ), errorMarkers.isEmpty() );
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
    IRegion occurrence = adapter.find( 0, "var a", true, true, false, false );
    System.out.println( "found var a at " + occurrence );
    int lineNumber = document.getLineOfOffset( occurrence.getOffset() );
    editor.selectAndReveal( occurrence.getOffset() + document.getLineLength( lineNumber ),0 );
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
