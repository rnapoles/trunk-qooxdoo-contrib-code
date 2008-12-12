package org.eclipse.wst.jsdt.qooxdoo.functional.bootstrap;

import org.eclipse.core.resources.IFile;
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
import junit.framework.Assert;


public class BootstrapMembers_PDETest extends Assert {
  
  private SammyIDE sammy;
  private IFile file;
  private final String fileContents = "qx.Bootstrap.define(\"MyBootstrap\",  {\n"
                                      + "   members : {\n"
                                      + "   myfunc : function() {\n"
                                      + "},\n"
                                      + "   myAttribute : \"foo\"\n"
                                      + "},\n"
                                      + "   statics : {\n"
                                      + "       LOADSTART : new Date,\n"
                                      + "       HOME : \"/home/user\"\n"
                                      + "}\n"
                                      + "});\n"
                                      + "\n"
                                      + "var a = MyBootstrap.";

  @Before
  public void setUp() throws Exception {
    this.sammy = new SammyIDE();
    this.file = QxProjectUtil.createQxFileWithContents( sammy,
                                                        "Application.js",
                                                        fileContents );
  }
  
  @Test
  public void triggerAutoCompletion() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    moveCursorToPosition( teo );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    assertNotNull( findItem( suggestions, "myfunc(" ) );
  }
  
  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }
  
  private void moveCursorToPosition(TextEditorOperator teo)
      throws BadLocationException {
    ITextEditor editor = (ITextEditor) teo.getSource();
    IDocument document = editor.getDocumentProvider().getDocument(editor.getEditorInput());
    FindReplaceDocumentAdapter adapter = new FindReplaceDocumentAdapter(document);
    IRegion occurrence = adapter.find(0, "var a", true, true, false, false);
    System.out.println("found var a at " + occurrence);
    int lineNumber = document.getLineOfOffset(occurrence.getOffset());
    editor.selectAndReveal(occurrence.getOffset() + document.getLineLength(lineNumber), 0);
  }
  
  private Table findTable(ShellOperator autoCompletionShell)
      throws NotFoundException, MultipleFoundException {
    Matcher<Widget> matcher = new WidgetClassMatcher(Table.class, true);
    Table suggestions = (Table) WidgetFinderImpl.getDefault().find(
        autoCompletionShell.getSource(), matcher);
    return suggestions;
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
