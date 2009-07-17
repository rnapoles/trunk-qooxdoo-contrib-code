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
     * David Werner
     * Til Schneider

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
    domain          : document.domain,
    baseUrl         : /(\w+:\/\/[\w\W.]+\/)(\S*)/.exec(location.href)[1],
    defaultElement  : null,
    defaultRegExp   : /[\w\W\s]*<body[^>]*>([\w\W\s]*)<\/body>[\w\W\s]*/im,
    _hijaxHistory    : null,
    _historyExtraInfo  : [],
    _settingsClass  : null,
    _settings       : null,
    _oldState       : null,
    _scrollToElem   : null,
    _userRequest    : false,
    _initiatingSubmitButton : null,
    _debug          : false,
    _ignoreNextHistoryEvent : false,


    /**
     * This function is the initialising function for page hijacking.
     *
     * Important: Clicking on anchors or submitting forms fires an history
     * request event which calls a callback.
     */
    main : function() {
      this._scrollToElem = document.body;

      this._settingsClass = qx.Class.getByName(qx.core.Setting.get("hjx.settingsClass"));
      this._settings = this._settingsClass.getSettings();

      // Init browser history
      this._hijaxHistory = qx.bom.History.getInstance();
      this._hijaxHistory.addListener('request', this._onHistoryRequest, this);

      if (this._settings._pages['*']) {
        this.setDefaultContentTarget(this._settings._pages['*'].domElem);
      }
      this._hijackLinksAndForms();

      if (qx.core.Variant.isSet("qx.client", "mshtml")) {
        var iframes = document.getElementsByTagName("iframe");
        if(iframes && iframes.length > 0) {
          this._hijaxHistory.historyIframe = iframes[iframes.length-1];
        } else {
          this.error("IE history iframe can't be found. Class qx.bom.History might have changed.");
        }
      }

      // Handle bookmarks
      var state = this._hijaxHistory.getState();
      if (state) {
        // This is a bookmark to another page
        this._loadPageViaHijax(this._decodeState(state), null);
      } else {
        // This is a normal startup -> Load the start page
        if (this._settings.getStartPage != null) {
          var startPage = this._settings.getStartPage();
          if (startPage != null) {
            this._loadPageViaHijax(startPage);
          }
        }
      }
    },


    /**
     * Sets the default DOM element where to put the content loaded via hijax.
     *
     * @param elem {HTMLElement} Element in the HTML DOM
     */
    setDefaultContentTarget : function(elem) {
      switch (typeof elem) {
        case "object": this.defaultElement = elem; break;
        case "string":
          try {
            this.defaultElement = document.getElementById(elem) || document[elem];
          } catch(exc) {
            qx.log.Logger.error(hjx.Hijax, "None existing DOM element: " + elem, exc);
          }
          break;
        default:
          throw new Error("Illegal value for elem: " + elem);
          break;
      }
    },


    /**
     * This function captures appearing click events on links and submit and
     * blur events on forms in an unobtrusive way and add the requested URL
     * to the browser history. Regular links will be rewritten to fragement
     * identifiers.
     */
    _hijackLinksAndForms : function() {
      this._logDebug("Capturing events");

      // Hijack anchors (a + area)
      var links = document.links;
      for (var i=0, l=links.length; i<l; i++) {
        if (this._shouldCaptureLink(links[i])) {
          // This link should be captured -> Capture it
          if (this._debug) {
            links[i].style.border = "1px solid green";
          }

          // Escape page anchors
          if (links[i].href.indexOf('#') != -1) {
            this._prepareLinkAnchor(links[i]);
          }

          this.bindEvent(links[i], 'click', this._onHijaxLinkClicked);
        }
      }

      // Capture form submits
      var forms = document.forms;
      for (var i=0, l=forms.length; i<l; i++) {
        var formElem = forms[i];

        if (this._debug) {
          formElem.style.border = "1px solid blue";
        }

        // Ensure that the form has an ID. The ID is needed for restoring the old form values
        // when navigating to a page with a form using the history
        if (! formElem.getAttribute('id')) {
          formElem.setAttribute('id', "form-" + i);
        }

        // Formfield blur
        // TODO: Form validation should not be done here
        /*
        var settings = this._settings._forms[formElem.id];
        if (settings && settings.validate_onblur === true) {
          var vFields = hjx.Form.getFields(formElem);
          ///var vFields = formElem.elements;
          for (var j=0, le=vFields.length; j<le; j++) {
            try {
              if (settings[vFields[j].name].required === true) {
                this.bindEvent(vFields[j], 'blur', this._onHijaxFormBlur);
              }
            } catch(e) {
              qx.log.Logger.error(hjx.Hijax, "", e);
            }
          }
        }
        */

        // Hijack the form
        this.bindEvent(formElem, 'submit', this._onHijaxFormSubmit);
        qx.bom.Event.addNativeListener(formElem, "reset", function() {  });

        // Hijack all submit buttons
        var inputArr = formElem.getElementsByTagName("input");
        for (var j = 0; j < inputArr.length; j++) {
          var inputElem = inputArr[j];
          if (inputElem.type == "submit") {
            this.bindEvent(inputElem, 'click', this._onSubmitButtonClicked, this);
          }
        }
      }

      // TODO: Should be moved to the event handler that sets the flag
      //       (if possible the flag should be removed)
      this._userRequest = false;
    },


    _restoreLastFormValues : function() {
      // Get the extraInfo for the
      var currentPage = this._hijaxHistory.getState();
      var extraInfo = null;
      for (var state in this._historyExtraInfo) {
        var info = this._historyExtraInfo[state];
        if (currentPage == info.referrerUrl && info.formInfo) {
          extraInfo = info;
        }
      }

      // Restore the form
      if (extraInfo != null) {
        var formEl = document.getElementById(extraInfo.formInfo.formId);
        if (formEl != null) {
          hjx.Form.restoreForm(formEl, extraInfo.formInfo.formData);
        }
      }
    },


    /**
     * Returns whether a link ("a" element) should be captured.
     *
     * @param {Elem} the link element
     * @return {Boolean} whether the link should be captured
     */
    _shouldCaptureLink : function(link) {
      if (new RegExp("^(javascript|mailto):").test(link.href)) {
        // This is a javascript or mailto link -> Don't capture it
        return false;
      }

      var target = link.getAttribute("target");
      if (target != null && target.length != 0) {
        // This is an external link -> Don't capture it
        return false;
      }

      var onclick = link.getAttribute("onclick");
      if (onclick != null && onclick.indexOf("window.open") != -1) {
        // This is a popup link -> Don't capture it
        return false;
      }

      return true;
    },


    // TODO: fix anchor handling in case user want's to open anchor link
    //       in new tab or window
    _prepareLinkAnchor : function(linkElem) {
      var anchor = linkElem.href.substring(this.baseUrl.length);
      if (anchor.indexOf('#') == 0) {
        // Cut existent anchor notation from the address
        var loc = location.href;
        var tildePos = loc.indexOf('~');
        if (tildePos != -1) {
          loc = loc.substring(0, tildePos);
        }
        linkElem.href = unescape(loc.replace(/#/, '')) + anchor;
      }
    },


    _logDebug : function(msg)
    {
      if (this._debug) {
        qx.log.Logger.info(hjx.Hijax, msg);
      }
    },


    _onSubmitButtonClicked : function(event) {
      hjx.Hijax._onSubmitButtonClickedImpl(event);
    },


    _onSubmitButtonClickedImpl : function(event) {
      // Remember the submit button that initiated the form submit
      // We need the button in order to add its name and value to the form data
      // NOTE: In IE we could use document.activeElement, in Mozilla event.explicitOriginalTarget.
      //       But in Safari none of these properties are supported.
      this._initiatingSubmitButton = event.target;
    },


    _onHijaxLinkClicked : function(event) {
      hjx.Hijax._onHijaxLinkClickedImpl(event);
    },


    _onHijaxLinkClickedImpl : function(event) {
      this._logDebug("Handling hijax link click");

      this._preventEventDefaults(event);

      // Regular request
      this._userRequest = true;

      // Walking up the DOM tree to get the link element
      // If an image is the content element of a link, the event occurs on the image
      var eventSrc = event.target || event.srcElement;
      while (eventSrc != null && typeof eventSrc.href == 'undefined') {
        eventSrc = eventSrc.parentNode;
      }

      var callUrl = eventSrc.href;
      var anchor = null;

      var path = callUrl.substring(this.baseUrl.length);
      this._loadPageViaHijax(path);
    },


    _onHijaxFormSubmit : function(event) {
      hjx.Hijax._onHijaxFormSubmitImpl(event);
    },


    _onHijaxFormSubmitImpl : function(event) {
      this._logDebug("Handling hijax form submit");

      this._preventEventDefaults(event);


      // Regular request
      this._userRequest = true;

      // Walking up the DOM tree to get the form element
      // When firing the submit event by pressing the enter key, the event occurs on the input element
      var formEl = event.target || event.srcElement;
      while (formEl != null && formEl.nodeName.toLowerCase() != "form") {
        formEl = formEl.parentNode;
      }

      // (Validate Form here!)
      /*
      var passedValidation = hjx.FormValidation.validateForm(formEl.id);
      if (passedValidation === false) return;
      */

      // Get the target page
      var action = formEl.action;
      var hostLength = action.indexOf(this.baseUrl);
      if (hostLength == -1) {
        var path = action;
      } else {
        var path = action.substring(this.baseUrl.length);
      }

      // Get the form values
      var formData = hjx.Form.encodeForm(formEl);
      if (this._initiatingSubmitButton != null) {
        formData += "&" + hjx.Form.encodeField(this._initiatingSubmitButton);
        this._initiatingSubmitButton = null;
      }
      var formInfo = {
        formId : formEl.id,
        method : formEl.method,
        formData : formData
      };

      // Load the page
      this._loadPageViaHijax(path, formInfo);
    },


    /*
    _onHijaxFormBlur : function(event) {
      hjx.Hijax._onHijaxFormBlurImpl(event);
    },


    _onHijaxFormBlurImpl : function(event) {
      this._logDebug("Handling hijax form blur");

      this._preventEventDefaults(event);

      var eventSrc = event.target || event.srcElement;

      // Regular request
      this._userRequest = true;


      // Walking up the DOM tree to get the form element
      // When firing the submit event by pressing the enter key, the event occurs on the input element
      var vField = eventSrc;
      while (eventSrc != null && eventSrc.nodeName.toLowerCase() != "form") {
        eventSrc = eventSrc.parentNode;
      }

      // Form parameters
      var fForm = {
        domElem : eventSrc,
        meth    : eventSrc.method,
        id      : eventSrc.id,
        action  : eventSrc.action
      };

      // (Validate field here!)
      var settings = this._settings._forms[fForm.id];
      try {
        var validation = hjx.FormValidation.validateField(vField, settings[vField.name].type, settings[vField.name].required);
        if (validation === true && settings[vField.name].prompt !== false) {
          hjx.FormValidation.validateFieldServerSide(vField, settings[vField.name].prompt.url);
        }
      } catch(e) {
        qx.log.Logger.error(hjx.Hijax, e);
      }

      //if (passedValidation === false) return;
    },
    */


    /**
     * If a page anchor is clicked process this first and return. Otherwise
     * send a GET or POST request depending on the event type to the server
     * and process the server response in addition to the settings.
     *
     * @param calledUrl {String} The URL called by the event
     */
    _loadPageViaHijax : function(calledUrl, formInfo, restoreLastFormValues) {
      this._logDebug("Loading page: " + calledUrl + ", form data: " + (formInfo != null));

      var referrerUrl = this._hijaxHistory.getState();
      var url = calledUrl;
      var path = calledUrl;

      // TODO: swap out anchor logic
      var anchor = null;
      var hashPos = calledUrl.indexOf('#');
      if (hashPos != -1) {
        path = calledUrl.substring(0, hashPos);
        anchor = calledUrl.substring(hashPos+1);
        this._scrollToElem = document.getElementById(anchor) ||
                             document.getElementsByName(anchor)[0] ||
                             document.body;
      }
      var oldPath = this._oldState || "";
      var stateHashPos = oldPath.indexOf('#');
      if (stateHashPos != -1) {
        oldPath = this._oldState.substring(0, stateHashPos);
      }
      if (oldPath == path && formInfo == null) {
        this._scrollToElem.scrollIntoView(true);
        this._scrollToElem = document.body;
        return;
      }

      this._oldState = calledUrl;
      url = this.baseUrl+path;

      if (formInfo) {
        var req = new qx.io.remote.Request(url, formInfo.method.toUpperCase());
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.setData(formInfo.formData);
      } else {
        var req = new qx.io.remote.Request(url);
        req.setRequestHeader("Content-Type", "text/html");
        req.setResponseType("text/javascript");
      }

      req.setTimeout(30000);
      req.setRequestHeader("Accept-charset", "UTF-8");
      req.setResponseType("text/html");

      this._setGlobalCursor("progress");


      req.addListener("completed", function(ev)
      {
        var statuscode = ev.getStatusCode();
        if (statuscode>=200 && statuscode<300) {
          // TODO: What happens for other status codes?!?

          // Loading succeed -> Put that request to the history
          this._addToHistory(calledUrl, {
              referrerUrl : referrerUrl,
              formInfo : formInfo
          });

          // De-initialize the old page
          this._executePageDependentHandlers("onunload");

          // Navigation highlighting
          this._highlightNavigation(url);

          var start = new Date();
          this._updateContent(ev.getContent(), path, anchor, (formInfo != null));
          var end = new Date();
          qx.log.Logger.info(hjx.Hijax, "Time to change page content: " +(end.getTime() - start.getTime())+ "ms");

          if (qx.core.Variant.isSet("qx.client", "mshtml")) {
            document.body.appendChild(this._hijaxHistory.historyIframe);
          }

          if (this._settings.getPageName != null) {
            this._currentPagename = this._settings.getPageName(calledUrl);
          } else {
            this._currentPagename = path;
          }

          // Call the initialization functions from the config file
          this._executePageDependentHandlers("onload");

          // Capture events from links and forms
          // NOTE: We caputure the events after running the page dependent scripts in order to catch generated
          //       links as well.
          this._hijackLinksAndForms();

          if (restoreLastFormValues) {
            this._restoreLastFormValues();
          }

          this._resetGlobalCursor();
        }
      },this);

      req.addListener("failed", function(ev) {
        var statuscode = ev.getStatusCode().toString();

        if (statuscode == 302) {
          // This is a cross-domain redirect -> Handle this like an external link
          // NOTE: non-cross-domain redirects don't cause an error, they are executed by the
          //       XmlHttpRequest automatically
          document.location.href = url;
        } else {
          this._httpError(statuscode, url);
          this._executePageDependentHandlers("onerror");
          this._resetGlobalCursor();
        }
      },this);
      req.send();

      this._executePageDependentHandlers("onhijax");
    },


    _updateContent : function(pageContent, path, anchor, isFormSubmit) {
      pageContent = this._parsePageContent(pageContent);
      document.title = pageContent.title;

      var wantedElemId = null;
      var pageSettings = this._settings._pages[path];
      if (pageSettings != null && pageSettings.event == (isFormSubmit ? "submit" : "click")) {
        wantedElemId = pageSettings.domElem;
      } else {
        wantedElemId = this._settings._pages['*'].domElem;
      }

      if (wantedElemId != null) {
        var loadedBodyElem = this._stringToDom(pageContent.bodyInnerHtml);
        var wantedElem = this._getElementById(loadedBodyElem, wantedElemId) || loadedBodyElem;
        var targetElem = document.getElementById(wantedElemId) || document[wantedElemId];
        targetElem.innerHTML = wantedElem.innerHTML;
      } else {
        document.body.innerHTML = pageContent.bodyInnerHtml;
      }

      this._scrollToElem = document.getElementById(anchor) ||
                           document.getElementsByName(anchor)[0] ||
                           document.body;
      this._scrollToElem.scrollIntoView(true);
    },


    _highlightNavigation : function(url)
    {
      for (var naviE in this._settings._navi)
      {
        if (naviE == "*")
        {
          var selString, domElems, activeClassName;
          var domEl, beforeActive, afterActive;
          var naviSetting = this._settings._navi[naviE];

          for (var i=0, l=naviSetting.selector.length; i<l; i++)
          {
            selString = naviSetting.selector[i];
            domElems = qx.bom.Selector.query(selString);
            activeClassName = naviSetting.active[0];

            for (var j=0, le=domElems.length; j<le; j++)
            {
              domEl = domElems[j];

              // add 'active' class name to clicked element's className property.
              if (domEl.href == url) {
                domEl.className = domEl.className + " " + activeClassName;
              }

              // remove 'active' class name from other elements' className property.
              else if (domEl.className.indexOf(activeClassName) >= 0)
              {
                beforeActive = domEl.className.substr(0, domEl.className.indexOf(activeClassName));
                afterActive = domEl.className.substr(domEl.className.indexOf(activeClassName) + activeClassName.length);
                domEl.className = beforeActive + afterActive;
              }
            }
          }
        }
      }
    },


    _executePageDependentHandlers : function(handlerType) {
      var pagename = this._currentPagename || "";

      var handlerInfo = this._settings[handlerType];
      for (var i = 0, l=handlerInfo.length, script, regexComp; i<l; i++) {
        info = handlerInfo[i];
        regexComp = info.regexComp;

        if (regexComp == null) {
          var regex = info.regex;
          if (regex == null) {
            regexComp = new RegExp("^" + info.patterns.join("|") + "$");
          } else {
            regexComp = new RegExp(regex);
          }
          info.regexComp = regexComp;
        }

        if (regexComp.test(pagename)) {
          try {
            info.handler.call(info.scope);
          } catch (exc) {
            qx.log.Logger.error(hjx.Hijax, "Calling " + handlerType + " handler #" + i + " failed", exc);
          }
        }
      }
    },


    /**
     * Search in the responded and parsed document tree for specified nodes
     * related to XPATH expressions.
     * The selectors will be set in the settings first.
     * Example: navigation selector /ul#navi/a
     * Explain: Search for list element with the id "navi" and get all
     *          anchors inside this element.
     *
     * @param root {Object} The root element to start with
     * @param path {Array} The parts of the path expression
     * @return (Array | String | null) Return the search results
     */
    ELEM : /^\w+$/,
    IDENT : /^\w*#?\w*$/,
    CLASS : /^\w*\.?\w*$/,
    ATTRIB : /^\w+\[.*\]$/,

    searchElement : function(root, path) {
      if (path.length == 0) {
        return null;
      }
      if (typeof root != "object") {
        return null;
      }

      var el = null; // the yet to find current element
      var step = path[0]; // the current part of the path expression
      var npath = path.slice(1); // new path - rest of path

      if (step == "") {
        el = root;
      } else if (step.match(this.ELEM)) {
        // HTML element
        el = root.getElementsByTagName(step);
      } else if (step.match(this.IDENT)) {
        // id
        var ident = step.split('#')[1];
        el = document.getElementById(ident);
      } else if (step.match(this.CLASS)) {
        el = [];
        // classname
        var sArr = step.split('.');
        var cName = sArr[1]; // ClassName
        try {
          var tag = sArr[0] != "" ? sArr[0] : "*";
          var cEl = root.getElementsByTagName(tag); // Element
          for (var i=0, l=cEl.length; i<l; i++) {
            if (cName == cEl[i].className) {
              el.push(cEl[i]);
            }
          }
        } catch (e) {
          qx.log.Logger.error(hjx.Hijax, e);
        }
      } else if (step.match(this.ATTRIB)) {
        // attribute
        var attr = null;
      }

      if (npath.length != 0) {
        var nroot = el != null ? el : root;
        try {
          if (el.length > 0) {
            var collection = [];
            for (var i=0, l=el.length; i<l; i++) {
              collection.push(this.searchElement(el[i], npath));
            }
            return collection;
          } else {
            return this.searchElement(nroot, npath);
          }
        } catch (exc) {
          qx.log.Logger.error(hjx.Hijax, "TODO", exc);
        }
      } else {
        return el;
      }
    },




    /**
     * Transfer the responded string to a document tree that can be
     * manipulated by DOM manipulation.
     * A new document fragment is used for parsing the string.
     *
     * @param htmlString {Object} The responded string.
     * @return (Array) Return the title of the document and the body
     */
    _parsePageContent : function(htmlString) {
      var titleExp = /<title>(.*)<\/title>/i;
      var titleMatch = htmlString.match(titleExp);
      var title = qx.bom.String.unescape(titleMatch ? titleMatch[1] : document.title);

      var bodyExp = /<body[^>]*>([\w\W\s]*)<\/body>/i;
      var bodyMatch = htmlString.match(bodyExp);

      return {
        title: title,
        bodyInnerHtml: bodyMatch[1]
      };
    },


    _stringToDom : function(bodyInnerHtml) {
      // Using a DocumentFragment
      var fragment = document.createDocumentFragment();
      var body = document.createElement('body');
      body.innerHTML = bodyInnerHtml;
      fragment.appendChild(body);

      return body;

/**
      if (typeof DOMParser != "undefined") {
        // Mozilla, Firefox, and related browsers
        var doc = (new DOMParser()).parseFromString(htmlString, "text/xml");
        var returnElem = doc.getElementsByTagName('body')[0];
      } else if (typeof ActiveXObject != "undefined") {
        // Internet Explorer
        //var doc = XML.newDocument();  // Create an empty document
        var doc = new ActiveXObject("MSXML2.DOMDocument");
  doc.loadXML(htmlString);        // Parse text into it
        var returnElem = doc.getElementsByTagName('body')[0];
      } else {
        // As a last resort, try loading the document from a data: URL
        // This is supposed to work in Safari
        var url = "data:text/xml;charset=utf-8," +encodeURIComponent(htmlString);
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        var doc = request.responseXML;
        var returnElem = doc.getElementsByTagName('body')[0];
      }

      return { title:titleNode[1], body:returnElem };

/**
      // IFrame
      var iframe = document.createElement('iframe');
      iframe.style.visibility = "hidden";
      iframe.style.position = "absolute";
      iframe.style.left = "-1000px";
      iframe.style.top = "-1000px";
      document.body.appendChild(iframe);

      var doc = iframe.contentDocument;
      doc.open();
      doc.write(bodyNode);
      doc.close();

      return { title:titleNode[1], body:doc.body };
*/
    },


    _getElementById : function(elem, elemId) {
      if (elemId == "") return;
      var children = elem.getElementsByTagName('*');
      for (var i = 0, l = children.length; i < l; i++) {
        if (children[i].id == elemId) {
          return children[i];
        }
      }
    },


    // Substitute a tilde for a hash in the url, to create a correct
    // fragment identifier
    _encodeState : function(state) {
      return state.replace(/(.*)#(.*)/g, "$1~$2");
    },

    _decodeState : function(encodedState) {
      return encodedState.replace(/(.*)~(.*)/g, "$1#$2");
    },






    _addToHistory : function(url, extraInfo) {
      var historyState = this._encodeState(url);
      this._historyExtraInfo[historyState] = extraInfo;

      var isNewState = (historyState != this._hijaxHistory.getState());
      this._hijaxHistory.addToHistory(historyState);

      this._ignoreNextHistoryEvent = isNewState;
    },


    _onHistoryRequest : function(ev) {
      if (! this._ignoreNextHistoryEvent) {
        qx.log.Logger.info(hjx.Hijax, "Page from history requested: " + ev.getData());

        var newState = ev.getData(); // path~anchor
        var extraInfo = this._historyExtraInfo[newState];

        if (extraInfo.formInfo) {
          var resendPostMsg = this.getResendPostMsg(qx.bom.client.Locale.LOCALE);
          if (! confirm(resendPostMsg)) {
            return;
          }
        }

        this._loadPageViaHijax(this._decodeState(newState), extraInfo.formInfo, true);
      } else {
        this._ignoreNextHistoryEvent = false;
      }
    },


    _setGlobalCursor : function(cursor) {
      document.getElementsByTagName('body')[0].style.cursor = cursor;
    },


    _resetGlobalCursor : function() {
      document.getElementsByTagName('body')[0].style.cursor = "default";
    },


    // Error messages for returned server status
    _httpError : function(statuscode, url) {
      var msg;
      switch(statuscode) {
        case "400": msg = "Error 400: Bad Request!"; break;
        case "401": msg = "Error 401: Unauthorized!"; break;
        case "403": msg = "Error 403: Forbidden!"; break;
        case "404": msg = "Error 404: Page " +url+ " Not Found!"; break;
        case "405": msg = "Error 405: Method Not Allowed!"; break;
        case "500":
        case "501":
        case "502":
        case "503":
        case "504":
        case "505": msg = "Error " +statuscode+ ": Internal Server Error!"; break;
        default: msg = "Error " + statuscode; break;
      }

      qx.log.Logger.error(hjx.Hijax, msg);
    },




    bindEvent : function(vElement, vEvent, vMethod) {
      qx.bom.Event.addNativeListener(vElement, vEvent, vMethod);
    },



    // Prevent the event from default execution
    _preventEventDefaults : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(e) {
        e.returnValue = false;
        e.cancelBubble = true;
      },
      "default" : function(e) {
        e.preventDefault();
        e.stopPropagation();
      }
    }),


    // Alert message when user retries to submit the form.
    getResendPostMsg : function(lang) {
      switch(lang) {
        case "de":
          return "Die Seite, die Sie versuchen zu laden, wurde aus POST-Daten erstellt, die im Cache abgelaufen sind. Wenn Sie die Daten nochmals senden, wird jede Aktion, die das Formular ausgef�hrt hat (wie eine Suche oder ein Online-Einkauf), noch einmal durchgef�hrt. Um die Daten nochmals zu senden, klicken Sie OK. Andernfalls klicken Sie auf Abbrechen.";
        default:
          return "The page you try to reload contains POST data which is expired in the cache. If you resend the data, every action which submitted the form will be executed again. To send the data once more click OK, otherwise click Cancel.";
      }
    }

  }
});

