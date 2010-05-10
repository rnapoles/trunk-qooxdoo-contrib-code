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
package com.zenesis.qx.remote.test.properties;

import com.zenesis.qx.event.EventManager;
import com.zenesis.qx.remote.ProxyManager;

public class TestProperties implements ITestProperties {
	
	private String immediate = "Server Immediate";
	private String queued = "Server Queued";
	private String onDemandString = "MyOnDemandString";
	private String changeLog = "";
	private String watchedString;
	private int triggers = 0;
	
	@Override
	public String getImmediate() {
		return immediate;
	}
	
	@Override
	public String getQueued() {
		return queued;
	}
	
	@Override
	public void setImmediate(String value) {
		if (value == immediate || (value != null && value.equals(immediate)))
			return;
		Object oldValue = this.immediate;
		this.immediate = value;
		ProxyManager.propertyChanged(this, "immediate", oldValue, value);
		changeLog += "immediate=" + value + "; ";
	}
	
	@Override
	public void setQueued(String value) {
		if (value == queued || (value != null && value.equals(queued)))
			return;
		Object oldValue = this.queued;
		this.queued = value;
		ProxyManager.propertyChanged(this, "queued", oldValue, value);
		changeLog += "queued=" + value + "; ";
	}

	@Override
	public String getOnDemandString() {
		return onDemandString;
	}
	
	@Override
	public void setOnDemandString(String value) {
		this.onDemandString = value;
	}

	@Override
	public String getReadOnlyString() {
		return "read-only";
	}

	public String getChangeLog() {
		return changeLog;
	}

	@Override
	public String getWatchedString() {
		return watchedString;
	}

	@Override
	public void setWatchedString(String value) {
		if (value == watchedString || (value != null && value.equals(watchedString)))
			return;
		Object oldValue = this.watchedString;
		this.watchedString = value;
		ProxyManager.propertyChanged(this, "watchedString", oldValue, value);
		changeLog += "watchedString=" + value + "; ";
	}

	@Override
	public void triggerChangeWatchedString() {
		setWatchedString("Watched=" + (++triggers));
	}

	@Override
	public void triggerSomeEvent() {
		EventManager.getInstance().fireEvent(this, "someEvent");
	}
	
}
