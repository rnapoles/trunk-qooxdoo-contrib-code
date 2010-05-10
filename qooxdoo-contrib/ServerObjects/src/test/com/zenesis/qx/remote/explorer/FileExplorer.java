/**
 * ************************************************************************
 * 
 *    server-objects - a contrib to the Qooxdoo project that makes server 
 *    and client objects operate seamlessly; like Qooxdoo, server objects 
 *    have properties, events, and methods all of which can be access from
 *    either server or client, regardless of where the original object was
 *    created.
 * 
 *    http://qooxdoo.org
 * 
 *    Copyright:
 *      2010 Zenesis Limited, http://www.zenesis.com
 * 
 *    License:
 *      LGPL: http://www.gnu.org/licenses/lgpl.html
 *      EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *      
 *      This software is provided under the same licensing terms as Qooxdoo,
 *      please see the LICENSE file in the Qooxdoo project's top-level directory 
 *      for details.
 * 
 *    Authors:
 *      * John Spackman (john.spackman@zenesis.com)
 * 
 * ************************************************************************
 */
package com.zenesis.qx.remote.explorer;

import com.zenesis.qx.remote.Proxied;
import com.zenesis.qx.remote.annotations.Properties;
import com.zenesis.qx.remote.annotations.Property;

/**
 * Bootstrap class for FileExplorer demo
 * 
 * @author "John Spackman <john.spackman@zenesis.com>"
 */
@Properties({
	@Property("root")
})
public class FileExplorer implements Proxied {
	
	private ServerFile root;

	public ServerFile getRoot() {
		if (root == null)
			root = new ServerFile(FileExplorerServlet.getInstance().getRoot(), null);
		return root;
	}

}
