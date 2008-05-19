package org.eclipse.wst.jsdt.qooxdoo.functional.util;

import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Widget;
import org.junit.Assert;

import abbot.swt.finder.WidgetFinderImpl;
import abbot.swt.finder.generic.Matcher;
import abbot.swt.finder.generic.MultipleFoundException;
import abbot.swt.finder.generic.NotFoundException;
import abbot.swt.finder.matchers.WidgetClassMatcher;
import de.mkempka.sammy.operators.ShellOperator;

public class ContentAssistAssert {

  public static void assertAutoCompletionResultsContain( String prefix )
    throws NotFoundException, MultipleFoundException
  {
    ShellOperator autoCompletionShell = new ShellOperator();
    Table suggestions = findTable( autoCompletionShell );
    Assert.assertNotNull( "No Item in table that starts with: " + prefix,
                          findItem( suggestions, prefix ) );
  }

  private static Table findTable( ShellOperator autoCompletionShell )
    throws NotFoundException, MultipleFoundException
  {
    Matcher<Widget> matcher = new WidgetClassMatcher( Table.class, true );
    Table suggestions = ( Table )WidgetFinderImpl.getDefault()
      .find( autoCompletionShell.getSource(), matcher );
    return suggestions;
  }

  private static TableItem findItem( Table table, String itemPrefix ) {
    TableItem result = null;
    for( TableItem each : table.getItems() ) {
      if( each.getText().startsWith( itemPrefix ) ) {
        result = each;
      }
    }
    return result;
  }

}
