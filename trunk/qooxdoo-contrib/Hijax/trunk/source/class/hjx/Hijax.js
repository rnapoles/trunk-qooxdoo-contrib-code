/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2009 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Kloiber (skloiber)
     * Daniel Wagner (d_wagner)

************************************************************************ */

/**
 * Graceful degradation enables a system to continue operating properly in 
 * the event of the failure of some of its components.
 *
 * The event fired by clicking on an anchor or submitting a form adds  
 * entries to the browser history and executes the Hijax method. This 
 * disposes to send a request to the server to get the changed HTML 
 * document. If stated in the settings a specified part of the page will 
 * be updated, else the whole body of the document changes.
 *
 * Progressive enhancement:
 * First, build an old-fashioned website that uses hyperlinks and forms to 
 * pass information to the server. The server returns whole new pages with 
 * each request.
 * Now, use JavaScript to intercept those links and form submissions and 
 * pass the information via XMLHttpRequest instead. You can then select 
 * which parts of the page need to be updated instead of updating the whole
 * page.
 *
 * This module is based on the ideas behind Hijax by Jeremy Keith 
 * (Clearleft), which is described at
 * http://domscripting.com/blog/display/41.
 */
qx.Class.define("hjx.Hijax",
{
  type : "static",




  /*
        *****************************************************************************
           STATICS
        *****************************************************************************
        */

  statics :
  {
    domain : document.domain,
    url : /(\w+:\/\/[\w\W.]+\/)(\S*)/.exec(location.href)[1],
    defaultElement : null,
    defaultRegExp : /[\w\W\s]*<body[^>]*>([\w\W\s]*)<\/body>[\w\W\s]*/im,
    hijaxHistory : null,
    historyReqMeth : [],
    __settings : hjx.Settings.getSettings(),
    __oldState : null,
    __bookmark : false,
    __scrollToElem : null,
    __userRequest : false,
    __eventType : null,
    __form : null,


    /**
     * This function is the initialising function of page hijacking.
     * 
     * Important: Clicking on anchors or submitting forms fires an history 
     * request event which calls a callback.
     *
     * @return {void} 
     */
    main : function()
    {
      this.__scrollToElem = document.body;
      this.setDefaultElement(this.__settings._pages['*'].DOMElem);

      // Capture click and submit events
      this.__captureEvents();

      // Browser history
      this.hijaxHistory = qx.bom.History.getInstance();

      this.hijaxHistory.addListener('request', function(ev)
      {
        this.__setEventType(this.historyReqMeth[ev.getData()]);
        this.__execEvent(this.__decodeState(ev.getData()));
      },
      this);

      // Handle bookmarks
      var state = this.hijaxHistory.getState();

      if (state)
      {
        this.__bookmark = true;
        this.__execEvent(this.__decodeState(state));
      }
    },


    /**
     * Sets the default for the element in the DOM to change its value.
     *
     * @param DOMElement {HTMLElement} Element in the HTML DOM
     * @return {void} 
     */
    setDefaultElement : function(DOMElement)
    {
      switch(typeof DOMElement)
      {
        case "object":
          this.defaultElement = DOMElement;
          break;

        case "string":
          try {
            this.defaultElement = document.getElementById(DOMElement) || document[DOMElement];
          } catch(e) {
            alert("None existing DOM element: " + DOMElement);
          }

          break;

        default:
          this.defaultElement = document.body;
      }
    },


    /**
     * This function captures appearing click events on links and submit and
     * blur events on forms in an unobtrusive way and add the requested URL
     * to the browser history. Regular links will be rewritten to fragement 
     * identifiers.
     *
     * @return {void} 
     */
    __captureEvents : function()
    {
      // Capture anchors (a + area)
      var links = document.links;

      for (var i=0, l=links.length; i<l; i++)
      {
        if (links[i].getAttribute('onclick')) {
          links[i].setAttribute('onclick', function() {});  // Kills existing DOM 0 event
        }

        // Page anchors
        var isHash = links[i].href.indexOf('#');

        if (isHash != -1)
        {
          var anchor = links[i].href.substring(this.url.length);

          if (anchor.indexOf('#') == 0)
          {
            // Cut existent anchor notation from the address
            var loc = location.href;
            var tildePos = loc.indexOf('~');

            if (tildePos != -1) {
              loc = loc.substring(0, tildePos);
            }

            links[i].href = unescape(loc.replace(/#/, '')) + anchor;
          }
        }

        this.bindEvent(links[i], 'click', this.__doHijax);
      }

      // Capture form submits
      var forms = document.forms;

      for (var i=0, l=forms.length; i<l; i++)
      {
        if (forms[i].getAttribute('onsubmit')) {
          forms[i].setAttribute('onsubmit', function() {});  // Kills existing DOM 0 event
        }

        // If empty form id generate and set one
        if (!forms[i].getAttribute('id')) {
          forms[i].setAttribute('id', 'form' + i);
        }

        // Formfield blur
        var settings = this.__settings._forms[forms[i].id];

        if (settings && settings.validate_onblur === true)
        {
          var vFields = hjx.Form.getFields(forms[i]);

          for (var j=0, le=vFields.length; j<le; j++)
          {
            try
            {
              if (settings[vFields[j].name].required === true) {
                this.bindEvent(vFields[j], 'blur', this.__doHijax);
              }
            }
            catch(e)
            {
              console.log(e);
            }
          }
        }

        // From history
        if (this.__userRequest === false)
        {
          if (hjx.Form.getFormCollection(forms[i].id) && this.hijaxHistory.getState() == hjx.Form.getFormCollection(forms[i].id).parentDocument) {
            hjx.Form.deserializeForm(forms[i].id);
          }
        }
        else
        {
          if (hjx.Form.getFormCollection(forms[i].id) && this.hijaxHistory.getState() == hjx.Form.getFormCollection(forms[i].id).parentDocument) {
            hjx.Form.setFormCollection(forms[i].id, null);
          }
        }

        this.bindEvent(forms[i], 'submit', this.__doHijax);

        // qx.html.EventRegistration.addEventListener(forms[i], "reset", function() {  });
        qx.event.Registration.addListener(forms[i], "reset", function() {});
      }

      this.__userRequest = false;
    },


    /**
     * This function prosseced the fired event by preventing the default 
     * functionality, checking the same origin policy and pushing the 
     * requested path to the browser history.
     * Forms will be validated client side before sending the data to
     * the server.
     *
     * @param event {Event} The fired event
     * @return {void} 
     */
    __doHijax : function(event)
    {
      var hijax = hjx.Hijax;
      event.preventDefault();
      event.stopPropagation();

      var eventSrc = event.getTarget() || event.srcElement;

      // Check if qx Event or native Event
      hijax.__setEventType(event.getType ? event.getType() : event.type);

      // Regular request
      hijax.__userRequest = true;

      switch(hijax.__getEventType())
      {
        // Captured anchor events
        case "click":
          // Walking up the DOM tree to get the link element
          // If an image is the content element of a link, the event occurs on the image
          while (eventSrc != null && typeof eventSrc.href == 'undefined') {
            eventSrc = eventSrc.parentNode;
          }

          var callUrl = eventSrc.href;

          // Same origin policy
          // Only localhost requests will be processed
          if (new RegExp(hijax.getSOPDomainRegExp(), 'i').test(callUrl))
          {
            // Add to browser history
            var path = callUrl.substring(hijax.url.length);
            hijax.__oldState = hijax.__decodeState(hijax.hijaxHistory.getState());
            var pathHash = path.indexOf('#');

            if (path == hijax.__oldState && pathHash != -1)
            {
              hijax.__execEvent(path);
              return;
            }

            // Push the requested path (with query and anchor params) to the browser history
            hijax.__addHistoryReqMeth(path, hijax.__getEventType());
            hijax.hijaxHistory.addToHistory(hijax.__encodeState(path));
          }

          // open external domains in new window
          else
          {
            window.open(callUrl);
          }

          break;

          // Captured form submit events

        case "submit":
          // Walking up the DOM tree to get the form element
          // When firing the submit event by pressing the enter key, the event occurs on the input element
          while (eventSrc != null && eventSrc.nodeName.toLowerCase() != "form") {
            eventSrc = eventSrc.parentNode;
          }

          // Form parameters
          hijax.__form =
          {
            domElem : eventSrc,
            meth    : eventSrc.method,
            id      : eventSrc.id,
            action  : eventSrc.action
          };

          // Validate form
          var passedValidation = hjx.Form.validateForm(hijax.__form.id);

          if (passedValidation === false) {
            return;
          }

          // Same origin policy
          // Only localhost Requests will be processed
          if (new RegExp(hijax.getSOPDomainRegExp(), 'i').test(hijax.__form.action) || !(/\w+\:\/\//.test(hijax.__form.action)))
          {
            // Save the name of the form parent doc
            hjx.Form.setParentDocument(hijax.hijaxHistory.getState());

            // Add to browser history
            var hostLength = hijax.__form.action.indexOf(hijax.url);

            if (hostLength == -1) {
              var path = hijax.__form.action;
            } else {
              var path = hijax.__form.action.substring(hijax.url.length);
            }

            // Push the requested path to the browser history
            hijax.__addHistoryReqMeth(hijax.__encodeState(path), hijax.__getEventType());

            if (path == hijax.__oldState) {
              hijax.__execEvent(path);
            } else {
              hijax.hijaxHistory.addToHistory(hijax.__encodeState(path));
            }
          }

          break;
          //

        case "blur":
          // Walking up the DOM tree to get the form element
          // When firing the submit event by pressing the enter key, the event occurs on the input element
          var vField = eventSrc;

          while (eventSrc != null && eventSrc.nodeName.toLowerCase() != "form") {
            eventSrc = eventSrc.parentNode;
          }

          // Form parameters
          var fForm =
          {
            domElem : eventSrc,
            meth    : eventSrc.method,
            id      : eventSrc.id,
            action  : eventSrc.action
          };

          // (Validate field here!)
          var settings = hijax.__settings._forms[fForm.id];

          try
          {
            var validation = hjx.Form.validateField(vField, settings[vField.name].type, settings[vField.name].required);

            if (validation === true && settings[vField.name].prompt !== false) {
              hjx.Form.validateFieldServerSide(vField, settings[vField.name].prompt.url);
            }
          }
          catch(e)
          {
            console.log(e);
          }

          // if (passedValidation === false) return;
          break;
      }
    },


    /**
     * If a page anchor is clicked process this first and return. Otherwise 
     * send a GET or POST request depending on the event type to the server 
     * and process the server response in addition to the settings.
     *
     * @param calledUrl {String} The URL called by the event
     * @return {void} 
     */
    __execEvent : function(calledUrl)
    {
      var url = calledUrl;
      var path = calledUrl;
      var anchor = null;

      // Page anchors
      var hashPos = calledUrl.indexOf('#');

      if (hashPos != -1)
      {
        path = calledUrl.substring(0, hashPos);
        anchor = calledUrl.substring(hashPos + 1);
        this.__scrollToElem = document.getElementById(anchor) || document.getElementsByName(anchor)[0] || document.body;
      }

      var oldPath = this.__oldState || "";
      var stateHashPos = oldPath.indexOf('#');

      if (stateHashPos != -1) {
        oldPath = this.__oldState.substring(0, stateHashPos);
      }

      if (oldPath == path && this.__getEventType() != "submit")
      {
        this.__scrollToElem.scrollIntoView(true);
        this.__scrollToElem = document.body;
        return;
      }

      this.__oldState = calledUrl;
      url = this.url + path;

      // Create the server request
      switch(this.__getEventType())
      {
        case "submit":
          if (this.__userRequest === false)
          {
            if (!confirm(hjx.Form.POSTretry(qx.core.Client.getLocale()))) {
              return;
            }

            var params = hjx.Form.encodeForm(this.__form.domElem);
          }
          else
          {
            var params = hjx.Form.serializeForm(this.__form.domElem);
          }

          var req = new qx.io.remote.Request(url, this.__form.meth.toUpperCase(), "text/html");
          req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          req.setData(params);
          break;

        default:
          var req = new qx.io.remote.Request(url, "GET", "text/html");
      }

      // req.setRequestHeader("Content-Type", qx.util.Mime.HTML);
      req.setRequestHeader("Accept-charset", "ISO-8859-1");

      // req.setResponseType(qx.util.Mime.HTML);
      // Show the user that the page is in progress
      this.__setGlobalCursor("progress");

      // Grab the IE History
      if (document.getElementById('IEHistory')) {
        var iehistory = document.getElementById('IEHistory');
      }

      req.addListener("completed", function(ev)
      {
        var data = ev.getContent();
        var statuscode = ev.getStatusCode();

        if (statuscode >= 200 && statuscode < 300)
        {
          if (typeof this.__settings._pages[path] != 'undefined' && this.__getEventType() == this.__settings._pages[path].event)
          {
            // Get the document node where the new content will be paste in
            var docNode = document.getElementById(this.__settings._pages[path].DOMElem) || document[this.__settings._pages[path].DOMElem];
          }
          else
          {
            // Get the document node where the new content will be paste in
            var docNode = document.getElementById(this.__settings._pages['*'].DOMElem) || document[this.__settings._pages['*'].DOMElem];
          }

          // Navigation highlighting
          for (var naviE in this.__settings._navi)
          {
            if (naviE == "*")
            {
              for (var i=0, l=this.__settings._navi[naviE].selector.length; i<l; i++)
              {
                var selString = this.__settings._navi[naviE].selector[i];
                var domElems = qx.bom.Selector.query(selString);
                var activeClassName = this.__settings._navi[naviE].active[0];

                for (var j=0, le=domElems.length; j<le; j++)
                {
                  // add 'active' class name to clicked element's className property.
                  if (domElems[j].href == url) {
                    domElems[j].className = domElems[j].className + " " + activeClassName;
                  }

                  // remove 'active' class name from other elements' className property.
                  else if (domElems[j].className.indexOf(activeClassName) >= 0)
                  {
                    var beforeActive = domElems[j].className.substr(0, domElems[j].className.indexOf(activeClassName));
                    var afterActive = domElems[j].className.substr(domElems[j].className.indexOf(activeClassName) + activeClassName.length);
                    domElems[j].className = beforeActive + afterActive;
                  }
                }
              }
            }
          }

          // var start = new Date();
          // To use the response convert the String to a DOM fragment
          var parsedString = this.__parseFromString(data);
          document.title = parsedString.title;
          var bodyNode = parsedString.body;

          // Extension for the body node object to get an element directly by id
          bodyNode.__getElementById = function(elemId)
          {
            if (elemId == "") {
              return;
            }

            var elems = this.getElementsByTagName('*');

            for (var i=0, l=elems.length; i<l; i++)
            {
              if (elems[i].id == elemId) {
                return elems[i];
              }
            }
          };

          if (typeof this.__settings._pages[path] != 'undefined' && this.__getEventType() == this.__settings._pages[path].event)
          {
            // Get the needed nodes from the parsed response
            bodyNode = bodyNode.__getElementById(this.__settings._pages[path].DOMElem) || bodyNode;

            // Reference to the element in the document that has to be changed
            var docNode = document.getElementById(this.__settings._pages[path].DOMElem) || document[this.__settings._pages[path].DOMElem];

            // Update content
            docNode.innerHTML = bodyNode.innerHTML;
          }
          else
          {
            // Get the needed nodes from the parsed response
            bodyNode = bodyNode.__getElementById(this.__settings._pages['*'].DOMElem) || bodyNode;

            // console.log("bodyNode " + bodyNode.innerHTML);
            // Reference to the element in the document that has to be changed
            var docNode = document.getElementById(this.__settings._pages['*'].DOMElem) || document[this.__settings._pages['*'].DOMElem];

            // Update content
            docNode.innerHTML = bodyNode.innerHTML;
          }

          // var end = new Date();
          // console.log("Time to change page content: " +(end.getTime() - start.getTime())+ "ms");
          this.__scrollToElem = document.getElementById(anchor) || document.getElementsByName(anchor)[0] || document.body;
          this.__scrollToElem.scrollIntoView(true);

          // Append the ie history iframe to the document
          if (iehistory) {
            document.body.appendChild(iehistory);
          }

          // Initialize the event capturing on the changed content
          this.__captureEvents();

          // Initialize functions from the config file
          for (var prop in this.__settings._scripts)
          {
            if (prop == "*" || prop == path)
            {
              for (var i=0, l=this.__settings._scripts[prop].length; i<l; i++) {
                eval(this.__settings._scripts[prop][i]);
              }
            }
          }

          // Changes are done, so reset the cursor to standard
          this.__resetGlobalCursor();
        }
      },
      this);

      // When request fails get the status code and send it to the error message handler
      req.addListener("failed", function(ev)
      {
        var statuscode = ev.getStatusCode().toString();
        this._httpError(statuscode, url);
        this.__resetGlobalCursor();
      },
      this);

      req.send();
    },


    /**
     * Transfer the responded string to a document tree that can be 
     * manipulated by DOM manipulation.
     * A new document fragment is used for parsing the string.
     *
     * @param htmlString {Object} The responded string.
     * @return {Map} (Array) Return the title of the document and the body
     */
    __parseFromString : function(htmlString)
    {
      // Title expression
      var titleExp = /<title>([\w\W\s]*)<\/title>/i;

      // Get the title from the responded document
      var titleNode = htmlString.match(titleExp) || document.title;

      // Body expression
      var bodyExp = /<body[\w\W\s]*<\/body>/i;

      // Get the body node from the responded document
      var bodyNode = htmlString.match(bodyExp);

      // Using a DocumentFragment
      // First create a document fragment and then paste the string into it
      var fragment = document.createDocumentFragment();
      var div = document.createElement('div');
      div.innerHTML = bodyNode;
      fragment.appendChild(div);

      return {
        title : titleNode[1],
        body  : fragment.firstChild
      };
    },

    // Substitute a tilde for a hash in the url, to create a correct
    // fragment identifier
    /**
     * TODOC
     *
     * @param state {var} TODOC
     * @return {var} TODOC
     */
    __encodeState : function(state) {
      return state.replace(/(.*)#(.*)/g, "$1~$2");
    },


    /**
     * TODOC
     *
     * @param encodedState {var} TODOC
     * @return {var} TODOC
     */
    __decodeState : function(encodedState) {
      return encodedState.replace(/(.*)~(.*)/g, "$1#$2");
    },


    /**
     * TODOC
     *
     * @param url {var} TODOC
     * @param method {var} TODOC
     * @return {void} 
     */
    __addHistoryReqMeth : function(url, method) {
      this.historyReqMeth[url] = method;
    },


    /**
     * TODOC
     *
     * @param cursor {var} TODOC
     * @return {void} 
     */
    __setGlobalCursor : function(cursor) {
      document.getElementsByTagName('body')[0].style.cursor = cursor;
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    __resetGlobalCursor : function() {
      document.getElementsByTagName('body')[0].style.cursor = "default";
    },


    /**
     * TODOC
     *
     * @param evType {var} TODOC
     * @return {void} 
     */
    __setEventType : function(evType) {
      this.__eventType = evType;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    __getEventType : function() {
      return this.__eventType;
    },


    /**
     * TODOC
     *
     * @return {void} 
     */
    __resetEventType : function() {
      this.__eventType = null;
    },

    // Returns the regular expression for the same origin policy test
    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getSOPDomainRegExp : function()
    {
      var escDomain = qx.lang.String.escapeRegexpChars(this.domain);
      var regexp = "[\w\:\/\/]*" + escDomain + "\/*.*";
      return regexp;
    },

    // Error messages for returned server status
    /**
     * TODOC
     *
     * @param statuscode {var} TODOC
     * @param url {var} TODOC
     * @return {void} 
     */
    _httpError : function(statuscode, url)
    {
      switch(statuscode)
      {
        case "400":
          alert("Error 400: Bad Request!");
          break;

        case "401":
          alert("Error 401: Unauthorized!");
          break;

        case "403":
          alert("Error 403: Forbidden!");
          break;

        case "404":
          alert("Error 404: Page " + url + " Not Found!");
          break;

        case "405":
          alert("Error 405: Method Not Allowed!");
          break;

        case "500":
        case "501":
        case "502":
        case "503":
        case "504":
        case "505":
          alert("Error " + statuscode + ": Internal Server Error!");
          break;
      }
    },


    /**
     * TODOC
     *
     * @param vElement {var} TODOC
     * @param vEvent {var} TODOC
     * @param vMethod {var} TODOC
     * @return {void} 
     */
    bindEvent : function(vElement, vEvent, vMethod) {
      qx.event.Registration.addListener(vElement, vEvent, vMethod);
    }
  }
});