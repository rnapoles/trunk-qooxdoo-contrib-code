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
 * The Hijax form class includes some functions from the qooxdoo 0.7's
 * qx.html.Form class.
 * Furthermore the class comes with functions to serialize the form data
 * and to validate the field values, client-side or server-side.
 */
qx.Class.define("hjx.FormValidation",
{
  type : "static",




  /*
        *****************************************************************************
           STATICS
        *****************************************************************************
        */

  statics :
  {
    __formCollection : {},
    __parentDocument : null,
    ignoreInputTypes : [ "file", "submit", "image", "reset", "button" ],
    ignoreElementTypes : [ "fieldset" ],
    checkElementTypes : [ "radio", "checkbox" ],
    multiSelectType : "select-multiple",

    // Data Types
    __validateDataTypes :
    {
      'int'     : /^[\d]+$/,
      'float'   : /^[\d\.]+$/,
      'string'  : /^[\w\W\s]+$/,
      'boolean' : /(0|false)|(1|true)/,
      'email'   : /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'date'    : /^[\d\.]+$/
    },


    prepareFormForValidation(formElem) {
      var settings = this._settings._forms[formElem.id];
      if (settings && settings.validate_onblur === true) {
        var vFields = hjx.Form.getFields(formElem);
        ///var vFields = formElem.elements;
        for (var j=0, le=vFields.length; j<le; j++) {
          try {
            if (settings[vFields[j].name].required === true) {
              this.bindEvent(vFields[j], 'blur', this._onFormBlur);
            }
          } catch(e) {
            qx.log.Logger.error(hjx.FormValidation, "", e);
          }
        }
      }
    },


    _onFormBlur : function(event) {
      hjx.FormValidation._onFormBlurImpl(event);
    },


    _onFormBlurImpl : function(event) {
      this._preventEventDefaults(event);

      var eventSrc = event.target || event.srcElement;

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
        qx.log.Logger.error(hjx.FormValidation, e);
      }

      //if (passedValidation === false) return;
    },


    /**
     * Collects the form fields and the validation settings.
     *
     * @param vFormId {String} HTML form id
     * @return {var} TODOC
     */
    validateForm : function(vFormId)
    {
      var settings = hjx.Settings.__settings._forms[vFormId];
      var vForm = document.getElementById(vFormId);
      var vFields = hjx.Form.getFields(vForm);
      var vPassed = true;

      for (var i=0, l=vFields.length; i<l; i++)
      {
        // if (typeof settings[vFields[i].name] != 'undefined')
        try
        {
          var validation = this.validateField(vFields[i], settings[vFields[i].name].type, settings[vFields[i].name].required);
          vPassed = vPassed === true ? validation : vPassed;
        }
        catch(e) {}
      }

      return vPassed;
    },


    /**
     * Validate the field against the passed data type and highlight it if it
     * failed validation.
     * Client-side.
     *
     * @param vField {HTMLElement} HTML form field element
     * @param vDataType {String} Name of the data type
     * @param vRequired {Boolean} Is the field required or not
     * @return {Boolean} Whether the validation succeeded or failed
     */
    validateField : function(vField, vDataType, vRequired)
    {
      switch(vField.type.toLowerCase())
      {
        case "text":
        case "textarea":
        case "hidden":
        case "password":
          if (this.__validateDataTypes[vDataType].test(vField.value))
          {
            if (vRequired === true)
            {
              // vField.className = "validationSuccess";
              vField.style.color = "#111";
              vField.style.backgroundColor = "#97d733";
            }

            return true;
          }
          else
          {
            if (vRequired === true)
            {
              // vField.className = "validationError";
              vField.style.color = "#111";
              vField.style.backgroundColor = "#ff7f12";
              return false;
            }
            else if (vField.value == "")
            {
              return true;
            }
            else
            {
              vField.style.color = "#111";
              vField.style.backgroundColor = "#ff7f12";
              return false;
            }
          }

          break;
      }
    },


    /**
     * Validate the field against a validation script on the server. Highlights
     * the field when an error has occurred.
     * Server-side.
     *
     * @param vField {HTMLElement} HTML form field element
     * @param vUrl {String} Url to the validation script
     * @return {void}
     */
    validateFieldServerSide : function(vField, vUrl)
    {
      if (vField.value != "")
      {
        var params = hjx.Form.encodeField(vField);
        var req = new qx.io.remote.Request(vUrl, 'POST');
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.setData(params);
        this.__setProgress(vField);

        req.addListener("completed", function(ev)
        {
          var data = ev.getContent();
          var statuscode = ev.getStatusCode();

          if (statuscode >= 200 && statuscode < 300)
          {
            if (data == "true")
            {
              vField.style.color = "#111";
              vField.style.backgroundColor = "#97d733";
            }
            else
            {
              vField.style.color = "#111";
              vField.style.backgroundColor = "#ff7f12";
            }

            this.__resetProgress(vField);
          }
        },
        this);

        req.addListener("failed", function(ev)
        {
          var statuscode = ev.getStatusCode().toString();
          hjx.Hijax._httpError(statuscode, vUrl);
          this.__resetProgress(vField);
        },
        this);

        req.send();
      }
    },


    /**
     * Shows a progress animation next to the form field when server-side
     * validation is in processing.
     *
     * @param vField {HTMLElement} HTML form field element
     * @return {void}
     */
    __setProgress : function(vField)
    {
      var progress = document.createElement('div');
      progress.className = "progress";
      vField.parentNode.insertBefore(progress, vField.nextSibling);
    },


    /**
     * Removes the progress animation when server-side validation finished.
     *
     * @param vField {HTMLElement} HTML form field element
     * @return {void}
     */
    __resetProgress : function(vField) {
      vField.parentNode.removeChild(vField.nextSibling);
    }

  }
});