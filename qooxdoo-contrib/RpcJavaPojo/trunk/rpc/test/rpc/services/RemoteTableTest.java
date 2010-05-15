/*
   Java JSON RPC
   RPC Java POJO by Novlog
   http://www.novlog.com

   This library is dual-licensed under the GNU Lesser General Public License (LGPL) and the Eclipse Public License (EPL).
   Check http://qooxdoo.org/license

   This library is also licensed under the Apache license.
   Check http://www.apache.org/licenses/LICENSE-2.0

   Contribution:
   This contribution is provided by Novlog company.
   http://www.novlog.com
*/

package services;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.HashMap;
import java.util.Map;

/**
 * This service is a Java implementation of the remoteTableTest example written by Derrell Lipman in the PHP JSON-RPC backend.
 * <p/>
 * This is a very simple example of server-generated data for a table which
 * uses a Remote Table Model.
 * <p/>
 * In this simple example, we provide each of the years between 1900 and 2020
 * inclusive, along with a boolean indicator of whether the year is/was a leap
 * year.  Table row 0 contains the data for year 1900, row 1 has year 1901,
 * etc.
 */

public class RemoteTableTest implements Remote {
    /**
     * Get the row count of the table
     *
     * @return Success: The number of rows in the table
     *         Failure: null
     */
    public int getRowCount() throws RemoteException {
        // Since we're handling years 1900-2020 inclusive, we have a fixed
        // number of years, and thus a fixed row count.
        return 121;
    }

    /**
     * Get the row data, given a starting and ending row number.  In a "real"
     * backend for the Remote table model, one would likely retrieve row data
     * from a database or some other "massive" storage implementation.  In
     * this simple example, we dynamically generate the data.
     *
     * @return Success: The data model data for the requested rows.  The data is
     *         returned as an array of row arrays.  Each row array contains
     *         the year number as its first element and a boolean
     *         indicating whether that year is a leap year as its second
     *         element.
     *         Failure: null
     */
    public Object getRowData(int firstRow, int lastRow) throws RemoteException {
        // Create an array of rows
        Map[] rows = new Map[121];

        // For each requested row...
        for (int row = firstRow, year = 1900 + firstRow; row <= lastRow; row++, year++) {
            // Create an array of data for this row
            Map<String, Object> rowData = new HashMap<String, Object>();

            // Get the data for this row.  In this example case, we calculate
            // it, but we could as well be retrieving it from a database.
            //
            // Note that the associative array indexes (which become the
            // property names in the JSON map) are the column id fields used
            // by the data model.  These are strings that are not localized
            // and so differ, possibly, from the column headings.
            rowData.put("year", year);
            boolean isLeap = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));
            rowData.put("leap", isLeap);

            // Add this row data to the result set
            rows[row] = rowData;
        }

        // Give 'em what they came for!
        return rows;
    }
}
