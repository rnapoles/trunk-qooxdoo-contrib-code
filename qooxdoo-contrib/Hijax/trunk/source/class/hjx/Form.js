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
    ignoreInputTypes : [ "file", "submit", "image", "reset", "button" ],
    ignoreElementTypes : [ "fieldset" ],
    checkElementTypes : [ "radio", "checkbox" ],
    multiSelectType : "select-multiple",


    /**
     * TODOC
     *
     * @param vNode {var} TODOC
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

      return true;
    },


    /**
     * TODOC
     *
     * @param vForm {var} TODOC
     * @return {var} TODOC
     */
    getFields : function(vForm) {
      return Array.filter(vForm.elements, this.inputFilter);
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

      if (vType === this.multiSelectType)
      {
        var vValues = [];

        for (var i=0; i<vNode.options.length; i++)
        {
          if (vNode.options[i].selected) {
            vValues.push(encodeURIComponent(vName) + "=" + encodeURIComponent(vNode.options[i].value));
          }
        }

        return vValues.join("&");
      }
      else
      {
        return encodeURIComponent(vName) + "=" + encodeURIComponent(vNode.value);
      }
    },


    /**
     * TODOC
     *
     * @param vForm {var} TODOC
     * @return {var} TODOC
     */
    encodeForm : function(vForm)
    {
      var vFields = this.getFields(vForm);
      var vAll = [];

      for (var i=0, l=vFields.length; i<l; i++) {
        var fieldEl = vFields[i];
        if (fieldEl.checked || ! qx.lang.Array.contains(hjx.Form.checkElementTypes, fieldEl.type.toLowerCase())) {
          vAll.push(this.encodeField(vFields[i]));
        }
      }

      return vAll.join("&");
    },


    parseFormData : function(serializedFormData) {
      var formData = {};
      var regex = new RegExp("([^=]+)=([^&]+)(&|$)", "g");
      var match;
      while ((match = regex.exec(serializedFormData)) != null) {
        var key   = decodeURIComponent(match[1]);
        var value = decodeURIComponent(match[2]);

        if (formData[key] == null) {
          formData[key] = [ value ];
        } else {
          formData[key].push(value);
        }
      }

      return formData;
    },


    /**
     * Reinserts the collected form values into their origin fields.
     *
     * @param vFormId {String} Form element id
     * @return {void}
     */
    restoreForm : function(formElem, serializedFormData) {
      var formData = this.parseFormData(serializedFormData);
      var fields = this.getFields(formElem);
      for (var i = 0, l = fields.length; i < l; i++) {
        var field = fields[i];
        var valueArr = formData[field.name];

        if (valueArr != null) {
          switch(field.type.toLowerCase()) {
            case "text":
            case "textarea":
            case "hidden":
              field.value = valueArr[0];
              break;

            case "checkbox":
            case "radio":
              if (qx.lang.Array.contains(valueArr, field.value)) {
                field.checked = "checked";
              }
              break;

            case "select-one":
            case "select-multiple":
              var options = vField.options;
              for (var j = 0, jl = options.length; j < jl; j++) {
                var option = options[j];
                if (qx.lang.Array.contains(valueArr, option.value)) {
                  option.selected = "selected";
                }
              }
              break;
          }
        }
      }
    }

  }
});
