package org.eclipse.wst.jsdt.qooxdoo.functional;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.eclipse.ui.part.FileEditorInput;
import org.eclipse.wst.jsdt.qooxdoo.functional.util.QxProjectUtil;
import org.junit.AfterClass;
import org.junit.BeforeClass;
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

  private static SammyIDE sammy;
  private static IFile file;
  private static String fileContents = "qx.Class.define(\"Application\", {\n"
                                       + "construct : function() {},\n"
                                       + "properties : {\n"
                                       + "    width : { check : \"Number\", apply : \"applyWidth\", init : 3 },\n"
                                       + "    checked : { check : \"Boolean\" },\n"
                                       + "    inherit : { check : \"Number\", inheritable : true },\n"
                                       + "    themed : { themeable : true }\n"
                                       + "  }\n"
                                       + "});\n"
                                       + "\n"
                                       + " Application;\n"
                                       + "a.\n";
  private static Table suggestions;

  @BeforeClass
  public static void setUp() throws Exception {
    sammy = new SammyIDE();
    file = QxProjectUtil.createQxFileWithContents( sammy,
                                                   "Application.js",
                                                   fileContents );
    triggerAutoCompletion();
  }

  @AfterClass
  public static void tearDown() throws Exception {
    sammy.cleanUp();
  }

  @Test
  public void noRecursion() {
    assertNull( findItem( suggestions, "getCheck(" ) );
    assertNull( findItem( suggestions, "setCheck(" ) );
    assertNull( findItem( suggestions, "getApply(" ) );
    assertNull( findItem( suggestions, "setApply(" ) );
  }

  @Test
  public void is() {
    assertNotNull( findItem( suggestions, "isChecked()" ) );
    assertNull( findItem( suggestions, "isWidth()" ) );
    assertNull( findItem( suggestions, "isInherit()" ) );
    assertNull( findItem( suggestions, "isThemed()" ) );
  }

  @Test
  public void toggle() {
    assertNotNull( findItem( suggestions, "toggleChecked()" ) );
    assertNull( findItem( suggestions, "toggleWidth()" ) );
    assertNull( findItem( suggestions, "toggleInherit()" ) );
    assertNull( findItem( suggestions, "toggleThemed()" ) );
  }

  @Test
  public void refresh() {
    assertNull( findItem( suggestions, "refreshWidth()" ) );
    assertNull( findItem( suggestions, "refreshChecked()" ) );
    assertNotNull( findItem( suggestions, "refreshInherit()" ) );
    assertNull( findItem( suggestions, "refreshThemed()" ) );
  }

  @Test
  public void set() {
    assertNotNull( findItem( suggestions, "setWidth( width)" ) );
    assertNotNull( findItem( suggestions, "setChecked( checked)" ) );
    assertNotNull( findItem( suggestions, "setInherit( inherit)" ) );
    assertNotNull( findItem( suggestions, "setThemed( themed)" ) );
  }

  @Test
  public void reset() {
    assertNotNull( findItem( suggestions, "resetWidth()" ) );
    assertNotNull( findItem( suggestions, "resetChecked()" ) );
    assertNotNull( findItem( suggestions, "resetInherit()" ) );
    assertNotNull( findItem( suggestions, "resetThemed()" ) );
  }

  @Test
  public void get() {
    assertNotNull( findItem( suggestions, "getWidth()" ) );
    assertNotNull( findItem( suggestions, "getChecked()" ) );
    assertNotNull( findItem( suggestions, "getInherit()" ) );
    assertNotNull( findItem( suggestions, "getThemed()" ) );
  }

  @Test
  public void style() {
    assertNull( findItem( suggestions, "styleWidth()" ) );
    assertNull( findItem( suggestions, "styleChecked()" ) );
    assertNull( findItem( suggestions, "styleInherit()" ) );
    assertNotNull( findItem( suggestions, "styleThemed()" ) );
  }

  @Test
  public void unstyle() {
    assertNull( findItem( suggestions, "unstyleWidth()" ) );
    assertNull( findItem( suggestions, "unstyleChecked()" ) );
    assertNull( findItem( suggestions, "unstyleInherit()" ) );
    assertNotNull( findItem( suggestions, "unstyleThemed()" ) );
  }

  @Test
  public void init() {
    assertNotNull( findItem( suggestions, "initWidth()" ) );
    assertNotNull( findItem( suggestions, "initChecked( checked)" ) );
    assertNotNull( findItem( suggestions, "initInherit( inherit)" ) );
    assertNotNull( findItem( suggestions, "initThemed( themed)" ) );
  }

  private static void triggerAutoCompletion() throws Exception {
    sammy.openEditor( new FileEditorInput( file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    teo.setCurserAfter( " Application" );
    teo.triggerAutoCompletion();
    teo.setCurserBefore( " Application" );
    teo.type( "var a = new" );
    teo.setCurserAfter( "a." );
    teo.triggerAutoCompletion();
    ShellOperator autoCompletionShell = new ShellOperator();
    suggestions = findTable( autoCompletionShell );
  }

  private static Table findTable( ShellOperator autoCompletionShell )
    throws NotFoundException, MultipleFoundException
  {
    Matcher<Widget> matcher = new WidgetClassMatcher( Table.class, true );
    Table suggestions = ( Table )WidgetFinderImpl.getDefault()
      .find( autoCompletionShell.getSource(), matcher );
    return suggestions;
  }

  private static SammyProperties getProperties() {
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
