/* ************************************************************************

   Copyright:
     (c) 2010 Derrell Lipman
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * Execute <code>generate.py test</code> to generate a testrunner application 
 * and open it from <tt>test/index.html</tt>
 */
qx.Class.define("timezonedate.test.Test",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    testStartOfEpoch : function()
    {
      var tzDate;

      tzDate = new timezonedate.TimezoneDate(0);
      this.assertEquals((new Date(0)).getTime(), tzDate.getTime());

      tzDate = new timezonedate.TimezoneDate("1970-01-01T00:00Z");
      this.assertEquals((new Date(0)).getTime(), tzDate.getTime());

      tzDate = new timezonedate.TimezoneDate("1970-01-01T04:00-04:00");
      tzDate.setOutputFormatter(tzDate.constructor._formatRfc2822);
      this.assertEquals((new Date(0)).getTime(), tzDate.getTime());

      this.assertEquals(tzDate.format(240), "Wed, 31 Dec 1969 20:00:00 +0400");
    }
  }
});
