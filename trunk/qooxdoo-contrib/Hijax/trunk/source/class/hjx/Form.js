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
qx.Class.define("hjx.Form",
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

    // Alert message when user retries to submit the form.
    /**
     * TODOC
     *
     * @param lang {var} TODOC
     * @return {string} TODOC
     */
    POSTretry : function(lang)
    {
      switch(lang)
      {
        case "de":
          return "Die Seite, die Sie versuchen zu laden, wurde aus POST-Daten erstellt, die im Cache abgelaufen sind. Wenn Sie die Daten nochmals senden, wird jede Aktion, die das Formular ausgef�hrt hat (wie eine Suche oder ein Online-Einkauf), noch einmal durchgef�hrt. Um die Daten nochmals zu senden, klicken Sie OK. Andernfalls klicken Sie auf Abbrechen.";
          break;

        default:
          return "The page you try to reload contains POST data which is expired in the cache. If you resend the data, every action which submitted the form will be executed again. To send the data once more click OK, otherwise click Cancel.";
      }
    },

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
    },


    /**
     * Collects the form field data.
     * Map containing the form data is needed to represent the same characteristics
     * based on a browser behavior when walking in the browser history.
     *
     * @param vForm {HTMLElement} HTML form element
     * @return {var} (String) The field data as a ampersand seperated String
     */
    serializeForm : function(vForm)
    {
      var vId = vForm.id;
      var vFormCollection = {};
      vFormCollection[vId] = {};
      vFormCollection[vId]["parentDocument"] = hjx.Form.getParentDocument();
      var vFields = hjx.Form.getFields(vForm);
      var vAll = [];

      // Step through all form fields
      for (var i=0, l=vFields.length; i<l; i++)
      {
        if (vFields[i].multiple)
        {
          var vValues = [];

          for (var j=0; j<vFields[i].options.length; j++)
          {
            if (vFields[i].options[j].selected) {
              vValues.push(vFields[i].options[j].value);
            }
          }
        }

        vFormCollection[vId][vFields[i].name] = vValues || vFields[i].value;
        vValues = false;
        vAll.push(hjx.Form.encodeField(vFields[i]));
      }

      this.setFormCollection(vId, vFormCollection[vId]);
      return vAll.join("&");
    },


    /**
     * Reinserts the collected form values into their origin fields.
     *
     * @param vFormId {String} Form element id
     * @return {void} 
     */
    deserializeForm : function(vFormId)
    {
      var vFormCollection = this.getFormCollection(vFormId);

      for (var elem in vFormCollection)
      {
        var vFields = document.getElementsByName(elem);

        for (var i=0, l=vFields.length; i<l; i++)
        {
          var vField = vFields[i];

          if (vField)
          {
            switch(vField.type.toLowerCase())
            {
              case "text":
              case "textarea":
              case "hidden":
                vField.value = vFormCollection[elem];
                break;

              case "checkbox":
              case "radio":
                vField.value == vFormCollection[elem] ? vField.checked = "checked" : false;
                break;

              case "select-one":
                var opt = vField.options;

                for (var opti=0, optl=opt.length; opti<optl; opti++)
                {
                  if (opt[opti].value == vFormCollection[elem]) {
                    opt[opti].selected = "selected";
                  }
                }

                break;

              case "select-multiple":
                var opt = vField.options;

                for (var opti=0, optl=opt.length; opti<optl; opti++)
                {
                  for (var vali=0, vall=vFormCollection[elem].length; vali<vall; vali++)
                  {
                    if (opt[opti].value == vFormCollection[elem][vali]) {
                      opt[opti].selected = "selected";
                    }
                  }
                }

                break;
            }
          }
        }
      }
    },


    /**
     * TODOC
     *
     * @param vId {var} TODOC
     * @return {var} TODOC
     */
    getFormCollection : function(vId) {
      return this.__formCollection[vId];
    },


    /**
     * TODOC
     *
     * @param vId {var} TODOC
     * @param vValue {var} TODOC
     * @return {void} 
     */
    setFormCollection : function(vId, vValue) {
      this.__formCollection[vId] = vValue;
    },


    /**
     * TODOC
     *
     * @param vIdentifier {var} TODOC
     * @return {void} 
     */
    setParentDocument : function(vIdentifier) {
      this.__parentDocument = vIdentifier;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getParentDocument : function() {
      return this.__parentDocument;
    },


    /**
     * TODOC
     *
     * @param vNode {var} TODOC
     * @return {boolean} TODOC
     */
    inputFilter : function(vNode)
    {
      if (vNode.disabled) {
        return false;
      }

      var vTag = (vNode.tagName || "").toLowerCase();

      if (qx.lang.Array.contains(hjx.Form.ignoreElementTypes, vTag)) {
        return false;
      }

      var vType = vNode.type.toLowerCase();

      if (qx.lang.Array.contains(hjx.Form.ignoreInputTypes, vType)) {
        return false;
      }

      if (!vNode.checked && qx.lang.Array.contains(hjx.Form.checkElementTypes, vType)) {
        return false;
      }

      return true;
    },


    /**
     * TODOC
     *
     * @param vNode {var} TODOC
     * @return {var} TODOC
     */
    encodeField : function(vNode)
    {
      var vName = vNode.name || "";
      var vType = (vNode.type || "").toLowerCase();

      if (vType === hjx.Form.multiSelectType)
      {
        var vValues = [];

        for (var i=0; i<vNode.options.length; i++)
        {
          if (vNode.options[i].selected) {
            vValues.push(vName + "=" + vNode.options[i].value);
          }
        }

        return vValues.join("&");
      }
      else
      {
        return vName + "=" + vNode.value;
      }
    },


    /**
     * TODOC
     *
     * @param vForm {var} TODOC
     * @return {var} TODOC
     */
    getFields : function(vForm) {
      return Array.filter(vForm.elements, hjx.Form.inputFilter);
    },


    /**
     * TODOC
     *
     * @param vForm {var} TODOC
     * @return {var} TODOC
     */
    encodeForm : function(vForm)
    {
      var vFields = hjx.Form.getFields(vForm);
      var vAll = [];

      for (var i=0, l=vFields.length; i<l; i++) {
        vAll.push(hjx.Form.encodeField(vFields[i]));
      }

      return vAll.join("&");
    }
  }
});