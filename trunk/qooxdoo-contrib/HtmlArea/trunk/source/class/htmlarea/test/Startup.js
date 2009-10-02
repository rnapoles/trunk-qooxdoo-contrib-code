/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This class demonstrates how to define unit tests for your application.
 *
 * Execute <code>generate.py test</code> to generate a testrunner application
 * and open it from <tt>test/index.html</tt>
 *
 * The methods that contain the tests are instance methods with a
 * <code>test</code> prefix. You can create an arbitrary number of test
 * classes like this one. They can be organized in a regular class hierarchy,
 * i.e. using deeper namespaces and a corresponding file structure within the
 * <tt>test</tt> folder.
 */
qx.Class.define("htmlarea.test.Startup",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function()
    {
      var demoContent = '<h1>About</h1><p>qooxdoo (pronounced [ku:ksdu:]) is a comprehensive and innovative Ajax application framework. Leveraging object-oriented JavaScript allows developers to build impressive cross-browser applications. No <acronym title="HyperText Markup Language">HTML</acronym>, <acronym title="Cascading Style Sheets">CSS</acronym> nor <acronym title="Document Object Model">DOM</acronym> knowledge is needed. qooxdoo includes a platform-independent development tool chain, a state-of-the-art <acronym title="Graphical User Interface">GUI</acronym> toolkit and an advanced client-server communication layer. It is Open Source under an <acronym title="GNU Lesser General Public License">LGPL</acronym>/<acronym title="Eclipse Public License">EPL</acronym> dual <a href="http://qooxdoo.org/license" class="wikilink1" title="license">license</a>.';
      this.__htmlArea = new htmlarea.HtmlArea(demoContent, null, "blank.html");
      this.__htmlArea.set({ width: 200, height: 200 });
      qx.core.Init.getApplication().getRoot().add(this.__htmlArea);
    },

    tearDown : function() {
      qx.core.Init.getApplication().getRoot().remove(this.__htmlArea);
    },

    /*
    ---------------------------------------------------------------------------
      TESTS
    ---------------------------------------------------------------------------
    */

    testIsReady : function()
    {
      this.__htmlArea.addListener("ready", function(e) {
        this.resume(function()
        {
          this.assertTrue(this.__htmlArea.isReady(), "HtmlArea not ready!");
          this.assertTrue(this.__htmlArea.isEditable(), "HtmlArea not editable!");
          this.assertTrue(this.__htmlArea.isLoaded(), "HtmlArea not loaded!");
          this.assertTrue(qx.dom.Node.isWindow(this.__htmlArea.getContentWindow()));
          this.assertTrue(qx.dom.Node.isDocument(this.__htmlArea.getContentDocument()));
        }, this);
      }, this);

      this.wait(); // defaults to 5000
    }
  }
});