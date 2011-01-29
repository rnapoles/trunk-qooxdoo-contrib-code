/*
 *
 * Copyright:
 *   (c) 2008-2009 by Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *   Derrell Lipman (derrell)
 *
 */
qx.Class.define("rpcexample.Application",
{
  extend : qx.application.Standalone,

  properties :
  {
    url :
    {
      init : "/services",
      event : "changeUrl"
    }
  },

  members :
  {
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        var appender;

        // support native logging capabilities, e.g. Firebug for Firefox
        appender = qx.log.appender.Native;

        // support cross-browser console. Press F7 to toggle visibility
        appender = qx.log.appender.Console;
      }

      // Create the list of tests
      var tests =
        [
          {
            name : "Echo Test",
            func : this.echo,
            desc : ("This test calls a simple echo-style service " +
                    "on the server. The server method accepts a string " +
                    "and sends back a string that says " +
                    "'Client said: [input string]'.")
          },

          {
            name : "Multiple Async Calls",
            func : this.multipleAsyncCalls,
            desc : ("This tests the ability to issue multiple " +
                    "asynchronous RPC calls to the same service/method, " +
                    "and determine from which request we have received a " +
                    "response.  We issue multiple 'sleep' calls, " +
                    "for decreasing amounts of time, and ensure that we " +
                    "can associate the resonses from the later-issued " +
                    "requests to the earlier-received responses." +
                    "<p>" +
                    "Both IE and Firefox follow (too strictly) RFC2616 " +
                    "and limit the number of simultaneous asyncronous HTTP " +
                    "requests to 2.  We'll allow testing just 2 " +
                    "simultaneous requests or issuing 6 simultaneous " +
                    "requests.  In the former case, we'll get expected " +
                    "results.  In the latter, we'll see two at a time " +
                    "being processed." +
                    "<p>" +
                    "Note that this applies to both XmlHTTPTransport " +
                    "and IframeTransport. It is an HTTP limitation, not " +
                    "a limitation of a particular method of issuing " +
                    "a request.")
                    
          },

          {
            name : "RPC Server Functionality (sync)",
            func : this.rpcServerFunctionalitySync,
            desc : ("This test calls a whole set of functions to test " +
                    "each of the primitive data types. " +
                    "<span style='color:blue;'>Results are " +
                    "displayed in the debug console.</span>  The comparison " +
                    "results should all end with ': true', and the " +
                    "last test generates an Application Error (#1000).  " +
                    "No other test generates that error, so receiving " +
                    "it means the complete set of tests was run." +
                    "<p>" +
                    "These functions all use the synchronous interface. " +
                    "You should not use the synchronous interface " +
                    "because with some browsers, the entire browser " +
                    "environment locks up during a synchronous call.  " +
                    "If the server hangs for a minute or two, so will " +
                    "the browser!  You have been warned.")
          },

          {
            name : "RPC Server Functionality (async)",
            func : this.rpcServerFunctionalityAsync,
            desc : ("This test calls a whole set of functions to test " +
                    "each of the primitive data types.  " +
                    "<span style='color:blue;'>Results are " +
                    "displayed in the debug console.</span>  The comparison " +
                    "results should all end with ': true', and the " +
                    "last test generates an Application Error (#1000).  " +
                    "No other test generates that error, so receiving " +
                    "it means the complete set of tests was run." +
                    "<p>" +
                    "These functions all use the synchronous interface. " +
                    "You should not use the synchronous interface " +
                    "because with some browsers, the entire browser " +
                    "environment locks up during a synchronous call.  " +
                    "If the server hangs for a minute or two, so will " +
                    "the browser!  You have been warned.")
          },

          {
            name : "Demonstrate Remote Table usage",
            func : this.remoteTable,
            desc : ("This is an example of using the Remote table model " +
                    "by extending qx.ui.table.model.Remote.  It retrieves " +
                    "its table data via Remote Procedure Call to the " +
                    "service called <i>qooxdoo.remoteTableTest</i>.  As of " +
                    "this writing, that test had been implemented in " +
                    "qooxdoo's PHP JSON-RPC backend but not yet any " +
                    "of the other backends.  Look at the qooxdoo-contrib " +
                    "project called RpcPhp, and specifically, within that " +
                    "project, at the implementation of the remoteTableTest " +
                    "method in trunk/services/qooxdoo.")
          }
        ];

      // Create tabs for each of our tests
      var tabs = new qx.ui.tabview.TabView();
      this.getRoot().add(tabs, { edge : 10 });

      // For each test...
      for (var i = 0; i < tests.length; i++)
      {
        var test = tests[i];

        // Create a page for this test
        var page = new qx.ui.tabview.Page(test.name);

        // Give it a layout
        page.setLayout(new qx.ui.layout.VBox(4));

        // Add this page to the tab set
        tabs.add(page);

        // Add the description to the page
        var label = new qx.ui.basic.Label().set({
          value   : test.desc,
          decorator : "main",
          rich      : true,
          padding   : 10,
          margin    : 20,
          width     : 500
        });
        page.add(label);
        

        // Call the function to generate this page
        test.func.call(this, page, test.desc);
      }
    },

    echo : function(page, description)
    {
      var async = new qx.ui.form.CheckBox(
        "Asynchronous (must be checked if cross-domain is selected)");
      page.add(async);

      var crossDomain = new qx.ui.form.CheckBox("Cross Domain");
      page.add(crossDomain);

      page.add(new qx.ui.basic.Label("URL:"));
      var defaultURL = qx.io.remote.Rpc.makeServerURL();
      if (defaultURL == null)
      {
        defaultURL = qx.core.Setting.get("rpcexample.URL");
      }
      var url = new qx.ui.form.TextField(defaultURL);

      // If the global URL changes, reset our text field
      this.addListener("changeUrl",
                       function(e)
                       {
                         url.setValue(e.getData());
                       });

      // If our text field changes, reset the global URL
      url.addListener("changeValue",
                      function(e)
                      {
                        this.setUrl(url.getValue());
                      },
                      this);

      page.add(url);

      page.add(new qx.ui.basic.Label("Service:"));
      var service = new qx.ui.form.TextField("qooxdoo.test");
      page.add(service);

      page.add(new qx.ui.basic.Label("Method:"));
      var method = new qx.ui.form.TextField("echo");
      page.add(method);

      var hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
      hBox.set(
        {
          width     : 60,
          marginTop : 60
        });
      page.add(hBox);

      var message = new qx.ui.form.TextField("Hello");
      message.setWidth(200);
      hBox.add(message);

      var send = new qx.ui.form.Button("Send to server");
      hBox.add(send);

      var abort = new qx.ui.form.Button("Abort");
      abort.setEnabled(false);
      hBox.add(abort);

      // We'll be setting url and service upon execute; no need to do it now.
      var rpc = new qx.io.remote.Rpc();
      rpc.setTimeout(10000);
      var mycall = null;

      send.addListener("execute",
                       function() {
        // Allow the user to reset the URL and Service on each call
        rpc.setUrl(url.getValue());
        rpc.setServiceName(service.getValue());
        rpc.setCrossDomain(crossDomain.getValue());

        if (async.getValue()) {
          send.setEnabled(false);
          abort.setEnabled(true);
          mycall = rpc.callAsync(function(result, ex, id) {
            mycall = null;
            if (ex == null) {
              alert("Async(" + id + ") result: " + result);
            } else {
              alert("Async(" + id + ") exception: " + ex);
            }
            send.setEnabled(true);
            abort.setEnabled(false);
          }, method.getValue(), message.getValue());
        } else {
          try {
            var result = rpc.callSync(method.getValue(), message.getValue());
            alert("Sync result: " + result);
          } catch (ex) {
            alert("Sync exception: " + ex);
          }
        }
      });

      abort.addListener("execute",
                        function()
                        {
                          rpc.abort(mycall);
                        });
    },

    multipleAsyncCalls : function(page, description)
    {
      /*
        * Sigh.  Both IE and Firefox follow (too strictly) RFC2616 and limit
        * the number of simultaneous asyncronous HTTP requests to 2.  We'll
        * allow testing just 2 simultaneous requests or issuing 6 simultaneous
        * requests.  In the former case, we'll get expected results.  In the
        * latter, we'll see two at a time being processed.
        *
        * Note that this applies to both XmlHTTPTransport and IframeTransport.
        * It is an HTTP limitation, not a limitation of a particular method of
        * issuing a request.
        */
      var tooMany = new qx.ui.form.CheckBox(
        "Issue more requests than IE's and Firefox's implementations " +
        "of HTTP will process simultaneously");
      page.add(tooMany);

      var crossDomain = new qx.ui.form.CheckBox("Cross Domain");
      page.add(crossDomain);

      page.add(new qx.ui.basic.Label("URL:"));
      var defaultURL = qx.io.remote.Rpc.makeServerURL();
      if (defaultURL == null) {
        defaultURL = qx.core.Setting.get("rpcexample.URL");
      }
      var url = new qx.ui.form.TextField(defaultURL);

      // If the global URL changes, reset our text field
      this.addListener("changeUrl",
                       function(e)
                       {
                         url.setValue(e.getData());
                       });

      // If our text field changes, reset the global URL
      url.addListener("changeValue",
                      function(e)
                      {
                        this.setUrl(url.getValue());
                      },
                      this);

      page.add(url);

      page.add(new qx.ui.basic.Label("Service:"));
      var service = new qx.ui.form.TextField("qooxdoo.test");
      page.add(service);

      var hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
      hBox.set(
        {
          width     : 60,
          marginTop : 60
        });
      page.add(hBox);

      var start = new qx.ui.form.Button("Start Test");
      hBox.add(start);

      var abort = new qx.ui.form.Button("Abort");
      hBox.add(abort);

      // ensure there's room in the queue for all of our requests
      qx.io.remote.RequestQueue.getInstance().setMaxConcurrentRequests(8);

      // We'll be setting url and service upon execute; no need to do it now.
      var rpc = new qx.io.remote.Rpc();
      rpc.setTimeout(60000);
      var mycall;
      var mycalls = [];

      start.addListener("execute", function() {
        var t0 = new Date().getTime();

        rpc.setCrossDomain(crossDomain.getValue());

        rpc.setUrl(url.getValue());
        rpc.setServiceName(service.getValue());

        var seqnum;
        for (var i=(tooMany.getValue() ? 10 : 4); i > 0; i-=2) {
          /*
           * Always issue an asynchronous request!  Issuing a synchronous
           * request can lock up the entire browser until a response is
           * received.  Bad browser developers!  Bad!
           */
          mycall = rpc.callAsync(function(result, ex, seqnum) {
            mycalls[seqnum] = null;
            var t = new Date().getTime() - t0;
            if (ex == null)
            {
              page.debug(t + ": response " + seqnum + ": " + result);
            }
            else
            {
              page.debug(t + ": exception " + seqnum + ": " + ex);
            }
          }, "sleep", i.toString());

          var t = new Date().getTime() - t0;
          seqnum = mycall.getSequenceNumber();
          mycalls[seqnum] = mycall;
          page.debug(t + ": request " + seqnum + " = " + i.toString());
        }
      });

      abort.addListener("execute", function() {
        for (var seqnum in mycalls)
        {
          if (mycalls[seqnum] !== null) {
            rpc.abort(mycalls[seqnum]);
            mycalls[seqnum] = null;
          }
        }
        mycalls = [];
      });
    },

    rpcServerFunctionalitySync : function(page, description)
    {
      page.add(new qx.ui.basic.Label("URL:"));
      var defaultURL = qx.io.remote.Rpc.makeServerURL();
      if (defaultURL == null) {
        defaultURL = qx.core.Setting.get("rpcexample.URL");
      }
      var url = new qx.ui.form.TextField(defaultURL);

      // If the global URL changes, reset our text field
      this.addListener("changeUrl",
                       function(e)
                       {
                         url.setValue(e.getData());
                       });

      // If our text field changes, reset the global URL
      url.addListener("changeValue",
                      function(e)
                      {
                        this.setUrl(url.getValue());
                      },
                      this);

      page.add(url);

      page.add(new qx.ui.basic.Label("Service path:"));
      var service = new qx.ui.form.TextField("qooxdoo.test");
      page.add(service);

      var hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
      hBox.set(
        {
          width     : 60,
          marginTop : 60
        });
      page.add(hBox);

      var start = new qx.ui.form.Button("Start Test");
      hBox.add(start);

      var rpc;
      var mycall = null;
      var test;

      start.addListener("execute", function() {
        try
        {
          var rpc = new qx.io.remote.Rpc(url.getValue(), service.getValue());
          rpc.setTimeout(10000);

          test = "getCurrentTimestamp";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: now=" + result.now);
          page.warn("result: jsonDate=" + result.json.toString());

          test = "getInteger";
          page.warn("Calling '" + test + "'");
          var result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns a number, got " +
                    typeof(result) + ": " +
                    (typeof(result) == "number" &&
                     isFinite(result) ? "true" : "false"));

          test = "isInteger";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, 1);
          page.warn("result: {" + result + "}");
          page.warn("Returns an integer: " + result);

          test = "getString";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns a string: " + (typeof(result) == "string"));

          test = "isString";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, "Hello World");
          page.warn("result: {" + result + "}");
          page.warn("Returns a string: " + result);

          test = "getNull";
          page.warn("Calling '" + test + "'");
          var result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns null: " +
                    (typeof(result) == "object" &&
                     result === null ? "true" : "false"));

          test = "isNull";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, null);
          page.warn("result: {" + result + "}");
          page.warn("Returns null: " + result);

          test = "getArrayInteger";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns an array: " +
                    ((typeof(result) == "object") &&
                     (result instanceof Array)));

          test = "getArrayString";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns an array: " +
                    ((typeof(result) == "object") &&
                     (result instanceof Array)));

          var dataArray = new Array(5);

          for (var i=0; i<5; i++)
          {
            dataArray[i] = i;
          };

          test = "isArray";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, dataArray);
          page.warn("result: {" + result + "}");

          dataArray = new Array(5);

          for (i=0; i<5; i++)
          {
            dataArray[i] = "Element " + i;
          };

          test = "isArray";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, dataArray);
          page.warn("result: {" + result + "}");

          test = "getFloat";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns a float: " + (typeof(result) == "number"));

          test = "getObject";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result + "}");
          page.warn("Returns an object: " + (typeof(result) == "object"));

          test = "isObject";
          page.warn("Calling '" + test + "'");
          var obj = new Object();
          obj.s = "Hi there.";
          obj.n = 23;
          obj.o = new Object();
          obj.o.s = "This is a test.";
          result = rpc.callSync(test, obj);
          page.warn("result: {" + result.toString() + "}");
          page.warn("Returns an object: " + result);

          test = "getTrue";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result.toString() + "}");
          page.warn("Returns a boolean = true: " +
                    (typeof(result) == "boolean"));

          test = "getFalse";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          page.warn("result: {" + result.toString() + "}");
          page.warn("Returns a boolean = false: " +
                    (typeof(result) == "boolean"));

          test = "isBoolean";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, true);
          page.warn("result: {" + result.toString() + "}");
          page.warn("Returns a boolean: " +  result);

          test = "isBoolean";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, false);
          page.warn("result: {" + result.toString() + "}");
          page.warn("Returns a boolean: " + result);

          Date.prototype.classname = "Date";
          var date = new Date();
          test = "getParam";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test, date);
          page.warn("result: {" + result + "}");
          page.warn("Returns a date object, got " +
                    (result.classname == date.classname));
          page.warn("Returns matching time " +
                    date.getTime() + " = " +
                    result.getTime() + " :" +
                    (result.getTime() == date.getTime()));

          dataArray = new Array();
          dataArray[0] = true;
          dataArray[1] = false;
          dataArray[2] = 1;
          dataArray[3] = 1.1;
          dataArray[4] = "Hello World";
          dataArray[5] = new Array(5);
          dataArray[6] = new Object();
          dataArray[7] = new Date();

          test = "getParams";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test,
                                dataArray[0],
                                dataArray[1],
                                dataArray[2],
                                dataArray[3],
                                dataArray[4],
                                dataArray[5],
                                dataArray[6],
                                dataArray[7]);
          page.warn("result: {" + result + "}");

          for (i=0; i< dataArray.length; i++)
          {
            page.warn("Returned parameter (" + i + ") value '" + result[i] +
                      "' matches '" + dataArray[i] + "': " +
                      (result[i].toString() == dataArray[i].toString()));
            page.warn("Returned parameter (" + i + ") type '" +
                      typeof(result[i]) + "' matches '" +
                      typeof(dataArray[i]) + "': " +
                      (typeof(result[i]) == typeof(dataArray[i])));
          };

          test = "getError";
          page.warn("Calling '" + test + "'");
          result = rpc.callSync(test);
          // should never get here; we should receive an exception
          page.warn("ERROR: Should have received an exception!  Got: " + result);

        }
        catch (ex)
        {
          alert("Exception on test " + test + ": " + ex);
        }
      });
    },

    rpcServerFunctionalityAsync : function(page, description)
    {
      var crossDomain = new qx.ui.form.CheckBox("Cross Domain");
      page.add(crossDomain);

      page.add(new qx.ui.basic.Label("URL:"));
      var defaultURL = qx.io.remote.Rpc.makeServerURL();
      if (defaultURL == null) {
        defaultURL = qx.core.Setting.get("rpcexample.URL");
      }
      var url = new qx.ui.form.TextField(defaultURL);

      // If the global URL changes, reset our text field
      this.addListener("changeUrl",
                       function(e)
                       {
                         url.setValue(e.getData());
                       });

      // If our text field changes, reset the global URL
      url.addListener("changeValue",
                      function(e)
                      {
                        this.setUrl(url.getValue());
                      },
                      this);

      page.add(url);

      page.add(new qx.ui.basic.Label("Service path:"));
      var service = new qx.ui.form.TextField("qooxdoo.test");
      page.add(service);

      var hBox = new qx.ui.container.Composite(new qx.ui.layout.HBox(4));
      hBox.set(
        {
          width     : 60,
          marginTop : 60
        });
      page.add(hBox);

      var start = new qx.ui.form.Button("Start Test");
      hBox.add(start);

      var mycall = null;
      var test;
      var testNum;

      start.addListener("execute", function() {
        var obj;
        var date;
        var dataArray;

        /*
         * Create an array of each of the tests.  Each array element is itself
         * an array of two function: the first to issue the test request, and
         * the second to validate the result.
         */
        var tests =
          [
            [
              function()
              {
                test = "getCurrentTimestamp";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: now=" + result.now);
                page.warn("result: jsonDate=" + result.json.toString());
              }
            ],

            [
              function()
              {
                test = "getInteger";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns a number, got " + typeof(result) + ": " +
                          (typeof(result) == "number" &&
                           isFinite(result) ? "true" : "false"));
              }
            ],

            [
              function()
              {
                test = "isInteger";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, 1);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns an integer: " + result);
              }
            ],

            [
              function()
              {
                test = "getString";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns a string: " + (typeof(result) == "string"));
              }
            ],

            [
              function()
              {
                test = "isString";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, "Hello World");
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns a string: " + result);
              }
            ],

            [
              function()
              {
                test = "getNull";
                page.warn("Calling '" + test + "'");
                var mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns null: " +
                          (typeof(result) == "object" &&
                           mycall === null ? "true" : "false"));
              }
            ],

            [
              function()
              {
                test = "isNull";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, null);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns null: " + result);
              }
            ],

            [
              function()
              {
                test = "getArrayInteger";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns an array: " +
                          ((typeof(result) == "object") &&
                           (result instanceof Array)));
              }
            ],

            [
              function()
              {
                test = "getArrayString";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns an array: " +
                          ((typeof(result) == "object") &&
                           (result instanceof Array)));
              }
            ],

            [
              function()
              {
                dataArray = new Array(5);

                for (var i=0; i<5; i++)
                {
                  dataArray[i] = i;
                };

                test = "isArray";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, dataArray);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns an array: " + result);
              }
            ],

            [
              function()
              {
                dataArray = new Array(5);

                for (var i=0; i<5; i++)
                {
                  dataArray[i] = "Element " + i;
                };

                test = "isArray";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, dataArray);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns an array: " + result);
              }
            ],

            [
              function()
              {
                test = "getFloat";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns a float: " + (typeof(result) == "number"));
              }
            ],

            [
              function()
              {
                test = "getObject";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns an object: " +
                          (typeof(result) == "object"));
              }
            ],

            [
              function()
              {
                test = "isObject";
                page.warn("Calling '" + test + "'");
                obj = new Object();
                obj.s = "Hi there.";
                obj.n = 23;
                obj.o = new Object();
                obj.o.s = "This is a test.";
                mycall = rpc.callAsync(handler, test, obj);
              },

              function(result)
              {
                page.warn("result: {" + result.toString() + "}");
                page.warn("Returns an object: " + result);
              }
            ],

            [
              function()
              {
                test = "isBoolean";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, false);
              },

              function(result)
              {
                page.warn("result: {" + result.toString() + "}");
                page.warn("Returns a boolean: " + result);
              }
            ],

            [
              function()
              {
                test = "isBoolean";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, true);
              },

              function(result)
              {
                page.warn("result: {" + result.toString() + "}");
                page.warn("Returns a boolean: " +  result);
              }
            ],

            [
              function()
              {
                test = "getTrue";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result.toString() + "}");
                page.warn("Returns a boolean = true: " +
                          (typeof(result) == "boolean"));
              }
            ],

            [
              function()
              {
                test = "getFalse";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                page.warn("result: {" + result.toString() + "}");
                page.warn("Returns a boolean = false: " +
                          (typeof(result) == "boolean"));
              }
            ],

            [
              function()
              {
                Date.prototype.classname = "Date";
                date = new Date();
                test = "getParam";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler, test, date);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");
                page.warn("Returns a date object, got " +
                          (result.classname == date.classname));
                page.warn("Returns matching time " + date.getTime() + " = " +
                          result.getTime() + " :" +
                          (result.getTime() == date.getTime()));
              }
            ],

            [
              function()
              {
                dataArray = new Array();
                dataArray[0] = true;
                dataArray[1] = false;
                dataArray[2] = 1;
                dataArray[3] = 1.1;
                dataArray[4] = "Hello World";
                dataArray[5] = new Array(5);
                dataArray[6] = new Object();
                dataArray[7] = new Date();

                test = "getParams";
                page.warn("Calling '" + test + "'");
                mycall = rpc.callAsync(handler,
                                       test,
                                       dataArray[0],
                                       dataArray[1],
                                       dataArray[2],
                                       dataArray[3],
                                       dataArray[4],
                                       dataArray[5],
                                       dataArray[6],
                                       dataArray[7]);
              },

              function(result)
              {
                page.warn("result: {" + result + "}");

                for (var i=0; i< dataArray.length; i++)
                {
                  page.warn("Returned parameter (" + i + ") value '" +
                            result[i] + "' matches '" + dataArray[i] + "': " +
                            (result[i].toString() == dataArray[i].toString()));
                  page.warn("Returned parameter (" + i + ") type '" +
                            typeof(result[i]) + "' matches '" +
                            typeof(dataArray[i]) + "': " +
                            (typeof(result[i]) == typeof(dataArray[i])));
                };
              }
            ],

            [
              function()
              {
                test = "getError";
                page.warn("Calling '" + test + " (method 1)'");
                mycall = rpc.callAsync(handler, test);
              },

              function(result)
              {
                // should never get here; we should receive an exception
                page.warn("ERROR: Should have received an exception!  " +
                          "Got: " + result);
              }
            ],

            [
              function()
              {
                test = "getError";
                page.warn("Calling '" + test +
                          " (method 2 -- only differs with PHP backend)'");
                mycall = rpc.callAsync(handler, test, true);
              },

              function(result)
              {
                // should never get here; we should receive an exception
                page.warn("ERROR: Should have received an exception!  " +
                          "Got: " + result);
              }
            ]
          ];

        /*
         * This is the generic handler, used by each of the tests.  It
         * ascertains whether an exception occured and alert()s with the
         * exception if so; otherwise it calls the result validation function
         * and then starts the next test.
         */
        var handler = function(result, ex, id) {
          mycall = null;
          if (ex !== null) {
            alert("Async(" + id + ") exception: " + ex);
          } else {
            // display results of the completed test
            tests[testNum][1](result);  // [][1] = validate response
          }

          // start the next test
          ++testNum;
          
          // Are we done?
          if (testNum < tests.length) {
            // Nope.  Run the next test.
            tests[testNum][0]();
          }
        };

        // Determine which transport to use
        var rpc = new qx.io.remote.Rpc(url.getValue(), service.getValue());
        rpc.setTimeout(10000);
        rpc.setCrossDomain(crossDomain.getValue());

        // start the first test
        testNum = 0;
        tests[testNum][0]();            // [][0] = request
      });
    },

    remoteTable : function(page, description)
    {
      // Instantiate an instance of our local remote data model
      var dm = new rpcexample.RemoteDataModel();

      // Set the column headings
      dm.setColumns([ "Year", "Leap Year" ], [ "year", "leap" ]);

      // Instantiate a table
      var table = new qx.ui.table.Table(dm);
      table.set(
        {
          margin    : 20
        });

      // Get the table column model
      var tcm = table.getTableColumnModel();

      // Show leap year as a boolean (checkbox)
      tcm.setDataCellRenderer(1, new qx.ui.table.cellrenderer.Boolean());

      page.add(table, { flex : 1 });
    }
  }
});
