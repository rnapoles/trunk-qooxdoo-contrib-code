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
package com.zenesis.qx.event;

/**
 * Objects which supprot events can optionally implement this interface to provide
 * better control over the event process.  If this is not implemented, the object
 * will be considered to throw events without any checks on validity
 * 
 * @author John Spackman [john.spackman@zenesis.com]
 */
public interface Eventable {

	/**
	 * Detects whether this object supports a given event
	 * @param eventName
	 * @return
	 */
	public boolean supportsEvent(String eventName);
}
