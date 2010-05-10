/* ************************************************************************

   server-objects - a contrib to the Qooxdoo project (http://qooxdoo.org/)

   http://qooxdoo.org

   Copyright:
     2010 Zenesis Limited, http://www.zenesis.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
     * John Spackman (john.spackman@zenesis.com)

************************************************************************ */

/* ************************************************************************

 #asset(demoapp/*)

 ************************************************************************ */

/**
 * This is the main application class of your custom application "demoapp"
 */
qx.Class.define("demoapp.Application", {
	extend : qx.application.Standalone,

	/*
	 * ****************************************************************************
	 * MEMBERS
	 * ****************************************************************************
	 */

	members : {
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function() {
			// Call super class
			this.base(arguments);
		
			// Enable logging in debug variant
			if (qx.core.Variant.isSet("qx.debug", "on")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle
				// visibility
				qx.log.appender.Console;
			}
		
			/*
			 * -------------------------------------------------------------------------
			 * Below is your actual application code...
			 * -------------------------------------------------------------------------
			 */
			
			var manager = new com.zenesis.qx.remote.ProxyManager("/sampleServlet/ajax");
			
			var boot = manager.getBootstrapObject();
			var testScalars = boot.getTestScalars();
			
			qx.core.Assert.assertEquals(43, testScalars.getFourtyThree());
			qx.core.Assert.assertEquals(6.7, testScalars.getSixPointSeven());
			qx.core.Assert.assertEquals("Hello World", testScalars.getHelloWorld());
			var names = testScalars.getNames();
			var str = "";
			for (var i = 0; i < names.length; i++) {
				if (i > 0)
					str += ",";
				str += names[i];
			}
			qx.core.Assert.assertEquals("Jack,Jill,Bill,Ben", str);
			qx.core.Assert.assertEquals(25, testScalars.addUp([1, 3, 5, 7, 9]));
			qx.core.Assert.assertTrue(boot.verifyTestScalars(testScalars));
			
			var tp = boot.getTestProperties();
			var numCalls = manager.getNumberOfCalls();
			str = tp.getQueued();
			qx.core.Assert.assertEquals("Server Queued", str);
			tp.setQueued("queued from client");
			qx.core.Assert.assertEquals(numCalls, manager.getNumberOfCalls());
			tp.setImmediate("immediate from client");
			qx.core.Assert.assertEquals(numCalls + 1, manager.getNumberOfCalls());
			
			str = tp.getChangeLog();
			this.debug("tp.changeLog = " + str);
			
			var numChangeDemandString = 0;
			tp.addListener("changeDemandString", function(evt) {
				numChangeDemandString++;
				qx.core.Assert.assertEquals("Hello World", evt.getData());
				qx.core.Assert.assertEquals("MyOnDemandString", evt.getOldData());
			}, this);
			numCalls = manager.getNumberOfCalls();
			qx.core.Assert.assertEquals("MyOnDemandString", tp.getOnDemandString());
			qx.core.Assert.assertEquals(numCalls + 1, manager.getNumberOfCalls());
			qx.core.Assert.assertEquals("MyOnDemandString", tp.getOnDemandString());
			qx.core.Assert.assertEquals(numCalls + 1, manager.getNumberOfCalls());
			
			tp.setOnDemandString("Hello World");
			qx.core.Assert.assertEquals(numChangeDemandString, 1);
			qx.core.Assert.assertEquals("Hello World", tp.getOnDemandString());
			qx.core.Assert.assertEquals(numCalls + 1, manager.getNumberOfCalls());
			
			var watchedStringA = "unknown";
			var watchedChangedA = 0;
			tp.addListener("changeWatchedString", function(evt) {
				watchedStringA = evt.getData();
				watchedChangedA++;
			}, this);
			var watchedStringB = "unknown";
			var watchedChangedB = 0;
			tp.addListener("changeWatchedString", function(evt) {
				watchedStringB = evt.getData();
				watchedChangedB++;
			}, this);
			tp.triggerChangeWatchedString();
			qx.core.Assert.assertEquals(watchedChangedA, 1);
			qx.core.Assert.assertEquals(watchedStringA, "Watched=1");
			qx.core.Assert.assertEquals(watchedChangedB, 1);
			qx.core.Assert.assertEquals(watchedStringB, "Watched=1");
			tp.triggerChangeWatchedString();
			qx.core.Assert.assertEquals(watchedChangedA, 2);
			qx.core.Assert.assertEquals(watchedStringA, "Watched=2");
			qx.core.Assert.assertEquals(watchedChangedB, 2);
			qx.core.Assert.assertEquals(watchedStringB, "Watched=2");

			var someEventFires = 0;
			tp.addListener("someEvent", function(evt) {
				someEventFires++;
			}, this);
			tp.triggerSomeEvent();
			qx.core.Assert.assertEquals(someEventFires, 1);
			tp.triggerSomeEvent();
			qx.core.Assert.assertEquals(someEventFires, 2);
			
			numCalls = manager.getNumberOfCalls();
			var myTp = new com.zenesis.qx.remote.test.properties.TestProperties();
			myTp.setWatchedString("setByClientMethod");
			qx.core.Assert.assertEquals(numCalls, manager.getNumberOfCalls());
			qx.core.Assert.assertTrue(boot.checkNewTestProperties(myTp));
			qx.core.Assert.assertEquals(numCalls + 1, manager.getNumberOfCalls());

			var myTp = new com.zenesis.qx.remote.test.properties.TestProperties();
			myTp.setWatchedString("setByClientProperty");
			boot.setClientTestProperties(myTp);
			boot.checkClientTestProperties();
			
			var testEx = boot.getTestExceptions();
			var str = testEx.getString();
			try {
				testEx.setString("my client string");
			} catch(ex) {
			}
			qx.core.Assert.assertEquals(str, testEx.getString());
			
			try {
				testEx.throwException();
				qx.core.Assert.assertTrue(false);
			} catch(ex) {
				this.debug("Caught exception: " + ex);
			}
			
			var testArr = boot.getTestArrays();
			var tmp = testArr.getScalarArray();
			qx.core.Assert.assertTrue(qx.Class.isSubClassOf(tmp.constructor, qx.data.Array), "Expecting instance of qx.data.Array, not " + tmp.constructor);
			qx.core.Assert.assertArrayEquals([ "One", "Two", "Three", "Four", "Five" ], tmp.toArray());
			tmp.sort();
			qx.core.Assert.assertTrue(testArr.testScalarArray(tmp.toArray()), "testScalarArray failed - the array has not been updated properly");
			
			var tmp = testArr.getScalarArrayList();
			qx.core.Assert.assertTrue(qx.Class.isSubClassOf(tmp.constructor, qx.data.Array), "Expecting instance of qx.data.Array, not " + tmp.constructor);
			qx.core.Assert.assertArrayEquals([ "One", "Two", "Three", "Four", "Five" ], tmp.toArray());
			tmp.sort();
			qx.core.Assert.assertTrue(testArr.testScalarArrayList(tmp.toArray()), "testScalarArrayList failed - the array has not been updated properly");
			

			var tmp = testArr.getObjectArray();
			qx.core.Assert.assertTrue(qx.Class.isSubClassOf(tmp.constructor, qx.data.Array), "Expecting instance of qx.data.Array, not " + tmp.constructor);
			for (var i = 0; i < 5; i++)
				qx.core.Assert.assertEquals(tmp.getItem(i).getValue(), i + 1);
			tmp.sort();
			qx.core.Assert.assertTrue(testArr.testObjectArray(tmp.toArray()), "testObjectArray failed - the array has not been updated properly");
			
			var tmp = testArr.getObjectArrayList();
			qx.core.Assert.assertTrue(qx.Class.isSubClassOf(tmp.constructor, qx.data.Array), "Expecting instance of qx.data.Array, not " + tmp.constructor);
			for (var i = 0; i < 5; i++)
				qx.core.Assert.assertEquals(tmp.getItem(i).getValue(), i + 1);
			tmp.sort();
			qx.core.Assert.assertTrue(testArr.testObjectArrayList(tmp.toArray()), "testObjectArrayList failed - the array has not been updated properly");
			
			alert("All tests passed!");
		
			// Create a button
			var button1 = new qx.ui.form.Button("First Button", "demoapp/test.png");
		
			// Document is the application root
			var doc = this.getRoot();
		
			// Add button to document at fixed coordinates
			doc.add(button1, {
				left : 100,
				top : 50
			});
		
			// Add an event listener
			button1.addListener("execute", function(e) {
				alert("Hello World!");
			});
		}
	}
});
