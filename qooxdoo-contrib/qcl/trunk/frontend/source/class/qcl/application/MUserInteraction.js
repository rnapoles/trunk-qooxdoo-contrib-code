
/**
 * Mixin for application providing asynchronous
 * equivalents for prompt, alert, confirm
 */
qx.Mixin.define("qcl.application.MUserInteraction",
{
  members :
  {
    /**
     * Displays an information message
     *
     * @type member
     * @param msg {String} Message 
     * @param callback {Function} Callback function
     * @param context {Object} "this" object in callback function
     * @return {void} 
     */
    inform : function(msg, callback, context)
    {
      // "OK" button
      var b = new qx.ui.form.Button(this.tr("OK"), "icon/16/actions/dialog-ok.png");
      var controls = [ b ];

      // window
      var w = this._createWindow(this.tr("Information"), msg, "icon/16/status/dialog-information.png", "icon/32/status/dialog-information.png", controls);

      // add event listener for OK Button
      b.addEventListener("execute", function()
      {
        w.close();
        w.dispose();

        if (typeof (callback) == "function") {
          callback.call(context);
        }
      });
    },


    /**
     * Displays an alert / warning
     *
     * @type member
     * @param msg {String} Message 
     * @param callback {Function} Callback function
     * @param context {Object} "this" object in callback function
     * @return {void} 
     */
    alert : function(msg, callback, context)
    {
      // "OK" button
      var b = new qx.ui.form.Button(this.tr("OK"), "icon/16/actions/dialog-ok.png");
      var controls = [ b ];

      // window
      var w = this._createWindow(this.tr("Information"), msg, "icon/16/status/dialog-warning.png", "icon/32/status/dialog-warning.png", controls);

      // add event listener for OK Button
      b.addEventListener("execute", function()
      {
        w.close();
        w.dispose();

        if (typeof (callback) == "function") {
          callback.call(context);
        }
      });
    },


    /**
     * Asks user to confirm something. The callback function receives a true or false value.
     *
     * @type member
     * @param msg {String} Message 
     * @param yesMsg {String} Label for the "Yes" or "OK" button (Default: "OK")
     * @param noMsg {String} Label for the "No" or "Cancel" button (Default: "Cancel")
     * @param callback {Function} Callback function
     * @param context {Object} "this" object in callback function
     * @return {void} 
     */
    confirm : function(msg, yesMsg, noMsg, callback, context)
    {
      // make sure callback is a function
      this._checkCallback(callback);

      // cancel button
      var c = new qx.ui.form.Button(noMsg || this.tr("Cancel"), "icon/16/actions/dialog-cancel.png");

      // "OK" button
      var b = new qx.ui.form.Button(yesMsg || this.tr("OK"), "icon/16/actions/dialog-ok.png");

      // button panel
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");
      p.add(c, b);

      // controls for window
      var controls = [ p ];

      // window
      var w = this._createWindow(this.tr("Information"), msg, "icon/16/actions/help-about.png", "icon/32/status/help-about.png", controls);

      // add event listener for OK Button
      b.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, true);
      });

      // add event listener for cancel Button
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      });
    },


    /**
     * Offers a set of choices, one button for each. The callback
     * function receives a integer (1 ... n) according to which
     * button the user clicks on 
     *
     * @type member
     * @param msg {String} Message 
     * @param choices {Array} Array of labels for buttons
     * @param callback {Function} Callback function
     * @param context {Object} "this" object in callback function
     * @return {void} 
     */
    offer : function(msg, choices, callback, context)
    {
      // make sure callback is a function
      this._checkCallback(callback);

      // check choices
      if (!choices instanceof Array) {
        this.error("Second argument must be an array.");
      }

      // button panel
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");

      // controls for window
      var controls = [ p ];

      // window
      var w = this._createWindow(this.tr("Information"), msg, "icon/16/actions/help-about.png", "icon/32/status/help-about.png", controls);

      // make a button for each choice and add the necessary event listener
      var i = 1;
      choices.forEach(function(choice){
        var b = new qx.ui.form.Button(choice);
        b.setHeight(24);
        eval('b.addEventListener("execute",function(){' + 'w.close();w.dispose();' + 'callback.call(context,' + (i++) + ');' + '});');
        p.add(b);
      });

      // cancel button
      var c = new qx.ui.form.Button(this.tr("Cancel"), "icon/16/actions/dialog-cancel.png");
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      });
      p.add(c);
    },


    /**
     * Prompts the user to enter a text.
     *
     * @type member
     * @param msg {String} Message 
     * @param defaultAnswer {String} Default answer displayed in the text field
     * @param callback {Function} Callback function, argument is entered text
     * @param context {Object} "this" object in callback function
     * @param lines {Int} number of lines. If larger than 1, a TextArea widget is used 
     * @return {void} 
     */
    prompt : function(msg, defaultAnswer, callback, context, lines)
    {
      // make sure callback is a function
      this._checkCallback(callback);

      // cancel button
      var c = new qx.ui.form.Button(this.tr("Cancel"), "icon/16/actions/dialog-cancel.png");

      // "OK" button
      var b = new qx.ui.form.Button(this.tr("OK"), "icon/16/actions/dialog-ok.png");

      // text field
      if (lines && lines > 1)
      {
        var t = new qx.ui.form.TextArea(defaultAnswer);
        t.setHeight(lines * 16);
      }
      else
      {
        var t = new qx.ui.form.TextField(defaultAnswer);
      }
      t.setLiveUpdate(true);
      t.setWidth("100%");

      t.addEventListener("appear", function(){
        t.selectAll();
      });

      // button panel
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");
      p.add(c, b);

      // controls for window
      var controls = [ t, p ];

      // window
      var w = this._createWindow(this.tr("Information"), msg, "icon/16/actions/help-about.png", "icon/32/status/help-about.png", controls);

      // add event listener for OK Button
      b.addEventListener("execute", function()
      {
        var v = t.getValue();
        w.close();
        w.dispose();
        callback.call(context, v);
      });

      // add event listener for cancel Button
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      });
    },

    /**
     * Presents a form with multiple fields. 
     *
     * @type member
     * @param msg {String} Message 
     * @param formData {Map} Map of form field information: 
     * <pre>
     * { 'username' : { 'label':"User Name", 'value':"", 'lines':1 } }
     * </pre>
     * @param callback {Function} Callback function, argument of function will be formData array with updated value properties
     * @param context {Object} "this" object in callback function
     * @return {void} 
     */
    presentForm : function (msg, formData, callback, context)
    {
      // check form data
      if ( typeof formData != "object" )
      {
        this.error("Form data must be a map.");
      }
      
      // controls
      var controls = [];
      
      // make sure callback is a function
      this._checkCallback(callback);

      // cancel button
      var c = new qx.ui.form.Button(this.tr("Cancel"), "icon/16/actions/dialog-cancel.png");

      // "OK" button
      var b = new qx.ui.form.Button(this.tr("OK"), "icon/16/actions/dialog-ok.png");
      
      // loop through form data array
      for ( key in formData )
      {
        
        var fieldData = formData[key];
        
        // label
        var l = new qx.ui.basic.Label(fieldData.label);
        l.setWidth("1*");
        
        // text field
        if ( fieldData.lines && fieldData.lines > 1)
        {
          var t = new qx.ui.form.TextArea(fieldData.value || "");
          t.setHeight(lines * 16);
        }
        else
        {
          var t = new qx.ui.form.TextField(fieldData.value || "");
          t.setHeight(24);
        }
        t.setWidth("3*");
        t.setLiveUpdate(true);
        eval('t.addEventListener("changeValue", function(event){'+  
          'formData.' + key + '.value=event.getData();' +
        '});');
        
        // panel
        var h = new qx.ui.layout.HorizontalBoxLayout;
        h.setWidth("100%");
        h.setHeight("auto");
        h.setSpacing(5);
        h.add(l,t);
        controls.push(h);
        
      }

      // button panel
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");
      p.add(c, b);
      controls.push(p);

      // window
      var w = this._createWindow(this.tr("Information"), msg, "icon/16/actions/help-about.png", "icon/32/status/help-about.png", controls);

      // add event listener for OK Button
      b.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, formData);
      });

      // add event listener for cancel Button
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      });
    },
    
    /**
     * upload window. user can select a file on the local filesystem
     * @param {String} msg
     * @param {String|null} url or null if the file is not to be uploaded 
     * @param {Function} callback, will be called with the path of the local file as argument
     * @param {Object} context
     */
    upload : function (msg, url, callback, context)
    {
      // check that we have the upload widget available
      if (! window.uploadwidget )
      {
        return this.alert("Upload Widget is not available.");
      }
      
      // make sure callback is a function
      this._checkCallback(callback);

      // cancel button
      var c = new qx.ui.form.Button(this.tr("Cancel"), "icon/16/actions/dialog-cancel.png");

      // "OK" button
      var b = new qx.ui.form.Button(this.tr("OK"), "icon/16/actions/dialog-ok.png");
      
      // form
      var cv = new qx.ui.layout.CanvasLayout;
      cv.addToDocument();
      cv.set({width:300,height:50});
      
      var form = new uploadwidget.UploadForm('uploadFrm',url );
      form.setParameter('rm','upload');
      form.set({top:0,left:0,right:0,bottom:0,width:null});
      
      // file upload field
      var file = new uploadwidget.UploadField('uploadfile',"Choose File",null);
      file.set({top:0,left:0,right:0,bottom:0,width:null});
      form.add(file);
      cv.add(form);

      // event listeners
      form.addEventListener('sending',function(e) {
        this.debug('sending');
      });
      
      form.addEventListener('completed',function(e) {
        var response = this.getIframeHtmlContent();
        this.debug(response);
        var path = file.getValue();
        w.close();
        w.dispose();
        callback.call(context, path );
      });

      // button panel
      var p = new qx.ui.layout.HorizontalBoxLayout;
      p.setSpacing(10);
      p.setHorizontalChildrenAlign("center");
      p.add(c, b);
      controls = [cv,p];

      // window
      var w = this._createWindow(this.tr("Select a file"), msg, 'icon/16/actions/document-save.png', 'icon/32/actions/document-save.png', controls);

      // add event listener for OK Button
      b.addEventListener("execute", function()
      {
        // send form if an url has been passed        
        this.setLabel("Uploading...");
        this.setEnabled(false);       
        if (url) 
        {
          form.send();  
        }
        else
        {
          var path = file.getValue();
          w.close();
          w.dispose();
          callback.call(context, path );        
        }
      });

      // add event listener for cancel Button
      c.addEventListener("execute", function()
      {
        w.close();
        w.dispose();
        callback.call(context, false);
      }); 
          
    },
    

    /**
     * checks if callback argument is a function
     *
     * @type member
     * @param callback {Function} TODOC
     * @return {Boolean} 
     */
    _checkCallback : function(callback)
    {
      if (typeof (callback) != "function") {
        this.error("Callback is not a function!");
      }
    },


    /**
     * Creates the popup window
     *
     * @type member
     * @param caption {String} Window caption
     * @param msg {String} Message
     * @param smallIcon {String} Resource string for icon in the window title bar
     * @param bigIcon {String} Resource string for icon in the main pane
     * @param controls {Array} Array of widgets that will be placed below each other in the main pane
     * @return {qx.ui.window.Window} 
     */
    _createWindow : function(caption, msg, smallIcon, bigIcon, controls)
    {
      // window
      var w = new qx.ui.window.Window(caption, smallIcon);
      w.setMinWidth(300);
      w.setMinHeight(100);
      w.setShowMaximize(false);
      w.setShowMinimize(false);
      w.setShowClose(false);
      w.setModal(true);
      w.setMoveable(false);
      w.setResizable(false);
      w.addEventListener("appear", function() {
        this.centerToBrowser();
      }, w);

      // layout
      var l = new qx.ui.layout.VerticalBoxLayout;
      l.setLeft(10);
      l.setRight(10);
      l.setBottom(10);
      l.setTop(10);
      l.setVerticalChildrenAlign("middle");
      l.setHorizontalChildrenAlign("center");
      l.setSpacing(5);
      l.setPadding(10);
      w.add(l);

      // icon and message
      var h = new qx.ui.layout.HorizontalBoxLayout;
      h.setWidth("90%");
      h.setHeight("auto");
      h.setVerticalChildrenAlign("middle");
      var i = new qx.ui.basic.Image(bigIcon);
      i.setWidth(30);
      var a = new qx.ui.basic.Atom(this.wordwrap(msg,80));
      a.setWidth("1*");
      h.add(i, a);
      l.add(h);

      // controls array
      controls.forEach(function(control) {
        l.add(control);
      });

      qx.ui.core.ClientDocument.getInstance().add(w);
      w.show();
      return w;
    },
    
    /**
     * wordwraps strings
     * @param str {String} string to be wrapped
     * @param int_width {Int} line length
     * @return {String} the formatted string, line breaks replaced by br tags
     * @author original author Jonas Raoni Soares Silva (http://www.jsfromhell.com),
     * improved by Nick Callen, Kevin Zonnevelt (http://kevin.vanzonneveld.net)
     */
    wordwrap : function ( str, int_width )
    {
      var str_break = "\n";
      var i, j, s, r = new String(str).split("\n");
      if(int_width > 0) for(i in r){
          for(s = r[i], r[i] = ""; s.length > int_width;
              j = (j = s.substr(0, int_width).match(/\S*$/)).input.length - j[0].length || int_width,
              r[i] += s.substr(0, j) + ((s = s.substr(j)).length ? str_break : "")
          );
          r[i] += s;
      }
        return r.join("\n").replace(/\n/g,"<br />");
    }
  }
});
