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
    _debug            : false,
    _baseUrl          : /(\w+:\/\/[\w\W.]+\/)(\S*)/.exec(location.href)[1],
    _hijaxHistory     : null,
    _historyExtraInfo : [],
    _settings         : null,
    _lastCalledUrl    : "",
    _initiatingSubmitButton : null,
    _ignoreNextHistoryEvent : false,


    /**
     * This function is the initialising function for page hijacking.
     *
     * Important: Clicking on anchors or submitting forms fires an history
     * request event which calls a callback.
     */
    main : function() {
      var settingsClass = qx.Class.getByName(qx.core.Setting.get("hjx.settingsClass"));
      this._settings = settingsClass.getSettings();

      // Init browser history
      this._hijaxHistory = qx.bom.History.getInstance();
      this._hijaxHistory.addListener('request', this._onHistoryRequest, this);
      if (qx.core.Variant.isSet("qx.client", "mshtml")) {
        var iframes = document.getElementsByTagName("iframe");
        if(iframes && iframes.length > 0) {
          this._hijaxHistory.historyIframe = iframes[iframes.length-1];
        } else {
          this.error("IE history iframe can't be found. Class qx.bom.History might have changed.");
        }
      }

      // Hijack the initial page
      this._hijackLinksAndForms();

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

          this._bindEvent(links[i], 'click', this._onHijaxLinkClicked);
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
        hjx.FormValidation.prepareFormForValidation(formElem);
        */

        // Hijack the form
        this._bindEvent(formElem, 'submit', this._onHijaxFormSubmit);
        qx.bom.Event.addNativeListener(formElem, "reset", function() {  });

        // Hijack all submit buttons
        var inputArr = formElem.getElementsByTagName("input");
        for (var j = 0; j < inputArr.length; j++) {
          var inputElem = inputArr[j];
          if (inputElem.type == "submit") {
            this._bindEvent(inputElem, 'click', this._onSubmitButtonClicked, this);
          }
        }
      }
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


    _prepareLinkAnchor : function(linkElem) {
      var rawHref = linkElem.getAttribute("href");
      if (rawHref.indexOf('#') == 0) {
        // This is a link to a local anchor (e.g.: "#bla") -> Fix the anchor URL
        // NOTE: Why is this needed? In hijax mode the anchor notation of URLs is used to store the
        //       current page. E.g. "start.html#current.html"
        //       If there is a local anchor on the page, the browser will interpret it wrong.
        //       E.g. "start.html#top" instead of "current.html#top".
        //       Therefore we fix all local anchor links by prefixing them with the current page name.
        //       E.g. "#top" -> "current.html#top"

        if (this._lastCalledUrl != "") {
          var pageUrl = this._lastCalledUrl;
          var hashPos = pageUrl.indexOf("#");
          if (hashPos != -1) {
            pageUrl = pageUrl.substring(0, hashPos);
          }

          linkElem.href = pageUrl + rawHref;
        }
      }
    },


    _logDebug : function(msg) {
      if (this._debug) {
        qx.log.Logger.info(hjx.Hijax, msg);
      }
    },


    _onHijaxLinkClicked : function(event) {
      hjx.Hijax._onHijaxLinkClickedImpl(event);
    },


    _onHijaxLinkClickedImpl : function(event) {
      this._logDebug("Handling hijax link click");

      this._preventEventDefaults(event);

      // Walking up the DOM tree to get the link element
      // If an image is the content element of a link, the event occurs on the image
      var linkElem = event.target || event.srcElement;
      while (linkElem != null && typeof linkElem.href == 'undefined') {
        linkElem = linkElem.parentNode;
      }

      var callUrl = linkElem.href;
      var path = callUrl.substring(this._baseUrl.length);
      this._loadPageViaHijax(path);
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


    _onHijaxFormSubmit : function(event) {
      hjx.Hijax._onHijaxFormSubmitImpl(event);
    },


    _onHijaxFormSubmitImpl : function(event) {
      this._logDebug("Handling hijax form submit");

      this._preventEventDefaults(event);

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
      var hostLength = action.indexOf(this._baseUrl);
      if (hostLength == -1) {
        var path = action;
      } else {
        var path = action.substring(this._baseUrl.length);
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


    /**
     * If a page anchor is clicked process this first and return. Otherwise
     * send a GET or POST request depending on the event type to the server
     * and process the server response in addition to the settings.
     *
     * @param calledUrl {String} The URL called by the event
     */
    _loadPageViaHijax : function(calledUrl, formInfo, restoreLastFormValues) {
      this._logDebug("Loading page: " + calledUrl + ", form data: " + (formInfo != null));

      // Use the current page as referrer for this request
      var referrerUrl = this._lastCalledUrl;
      var stateHashPos = referrerUrl.indexOf('#');
      if (stateHashPos != -1) {
        referrerUrl = this._lastCalledUrl.substring(0, stateHashPos);
      }

      // Handle anchor
      var path = calledUrl;
      var anchor = null;
      var hashPos = calledUrl.indexOf('#');
      if (hashPos != -1) {
        path = calledUrl.substring(0, hashPos);
        anchor = calledUrl.substring(hashPos+1);
      }
      if (referrerUrl == path && formInfo == null) {
        // This is an anchor link on the current page
        // -> Don't reload the page, simply scroll to the position of the anchor
        this._scrollToAnchor(anchor);
        this._addToHistory(calledUrl, {
            referrerUrl : referrerUrl,
            formInfo : formInfo
        });
        return;
      }

      // Prepare the request
      var url = this._baseUrl + path;
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
      this._lastCalledUrl = calledUrl;

      this._executePageDependentHandlers("onhijax");
    },


    _scrollToAnchor : function(anchor) {
      var anchorElem = document.getElementById(anchor) ||
                       document.getElementsByName(anchor)[0] ||
                       document.body;
      anchorElem.scrollIntoView(true);
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

      this._scrollToAnchor(anchor);
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

/*
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

/*
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
          var resendPostMsg = this._getResendPostMsg(qx.bom.client.Locale.LOCALE);
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


    _bindEvent : function(vElement, vEvent, vMethod) {
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
    _getResendPostMsg : function(lang) {
      switch(lang) {
        case "de":
          return "Die Seite, die Sie versuchen zu laden, wurde aus POST-Daten erstellt, die im Cache abgelaufen sind. Wenn Sie die Daten nochmals senden, wird jede Aktion, die das Formular ausgef�hrt hat (wie eine Suche oder ein Online-Einkauf), noch einmal durchgef�hrt. Um die Daten nochmals zu senden, klicken Sie OK. Andernfalls klicken Sie auf Abbrechen.";
        default:
          return "The page you try to reload contains POST data which is expired in the cache. If you resend the data, every action which submitted the form will be executed again. To send the data once more click OK, otherwise click Cancel.";
      }
    }

  }
});

