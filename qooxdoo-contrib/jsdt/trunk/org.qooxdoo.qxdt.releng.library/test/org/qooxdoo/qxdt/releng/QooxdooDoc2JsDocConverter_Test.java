package org.qooxdoo.qxdt.releng;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

@RunWith(Parameterized.class)
public class QooxdooDoc2JsDocConverter_Test {

  private String orig;
  private String expected;

  public QooxdooDoc2JsDocConverter_Test( String orig, String expected ) {
    super();
    this.orig = orig;
    this.expected = expected;
  }

  @Parameters
  public static Collection<Object[]> parameters() {
    return Arrays.asList( new Object[][]{
      { // insert return as JSDoc
        "  /**                              \n"
            + " * @return {void}\n"
            + " */\n",
        "  /**                              \n"
            + " * @type void\n"
            + " * @return {void}\n"
            + " */\n"
      },
      { // ignore non-JSDocs
        "    /*                              \n"
            + "   * @type member\n"
            + "   * @result {String}\n"
            + "   */\n",
        "    /*                              \n"
            + "   * @type member\n"
            + "   * @result {String}\n"
            + "   */\n"
      },
      { // throw away old @type statement
        "    /**                                                                 \n"
            + "   * @type member\n"
            + "   */\n",
        "    /**                                                                 \n"
            + "   */\n"
      },
      { // insert correct return type and replace old type statement with JSDoc
        // type statement
        "    /**                              \n"
            + "   * @type static\n"
            + "   * @return {String} blablubb\n"
            + "   */\n",
        "    /**                              \n"
            + "   * @type String\n"
            + "   * @return {String} blablubb\n"
            + "   */\n"
      },
    } );
  }

  @Test
  public void insertType() throws Exception {
    String actual = new QooxdooDoc2JsDocConverter().applyRules( orig );
    assertEquals( expected, actual );
  }
}
