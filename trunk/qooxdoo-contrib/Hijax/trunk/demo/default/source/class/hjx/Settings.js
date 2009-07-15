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
 * The global configuration settings.
 * Includes the settings for occuring script calls, navigation highlighting,
 * changing specific parts of the document and form validating information, 
 * such as what type of data the value is and if the field value is required 
 * to be not empty.
 * Pages can be specified to execute a particular action, ie the navigation
 * highlighting. To use all pages in a same way use the catch all (*) statement.
 */
qx.Class.define("hjx.Settings",
{
  type : "static",




  /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */

  statics :
  {
    _blockElem: null,

    __settings :
    {
      // JS functions to execute after page content has changed.
      onload : [
        {
          regex: ".*",
          handler: function() {
            hjxDemoLoader.hideBlocker();
          }
        }
      ],

      // JS functions to execute right before a hijax call is executed
      onhijax : [
        {
          regex: ".*",
          handler: function() {
            hjxDemoLoader.showBlocker();
          }
        }
      ],

      // JS functions to execute before page content will change.
      onunload : [
      ],

      // JS functions to execute when an error occurred
      onerror : [
        {
          regex: ".*",
          handler: function() {
            hjxDemoLoader.hideBlocker();
          }
        }
      ],

      // "form.py"     : ['formCheck()']
      // "login/"       : ['focusOnInput()']
      // CSS to include after page has changed
      _styles : [],

      // Navigation highlighting to avoid the whole content to be reloaded.
      // The selector picks the navi elements via XPATH expression.
      _navi :
      {
        "*" :
        {
          selector : [ 'ul#nav li a' ],
          link     : [ '' ],
          visited  : [ '' ],
          hover    : [ '' ],
          active   : [ 'active' ]
        }
      },

      // Specify the event and the DOM element which causes a dispatch.
      _pages :
      {
        "*" :
        {
          event   : 'click',
          domElem : 'content'
        },

        "form.py" :
        {
          event   : 'submit',
          domElem : 'content'
        }
      }

      // "login/"       : { event : 'submit', domElem : 'body' },
      // "logout/"      : { event : 'click', domElem : 'body' }
      // The form field error stylesheet class to highlight an occured error.
      // Furthermore enter the validation details for the forms:
      // Validation starts whether leaving the field or submitting the form.
      // Available data types: int, float, boolean, string, email.
      // The field value is required true or false.
      // The prompt property is used for server-side validation and requires
      //     the event and the url to the server script.
      /*
      _forms :
      {
        error_styles :
        {
          field : 'error',
          label : 'error'
        },

        contact_form :
        {
          validate_onblur : true,

          sender_text :
          {
            type     : 'string',
            required : false,
            prompt   : false
          },

          email_email :
          {
            type     : 'email',
            required : true,
            prompt   : false
          },

          subject_text :
          {
            type     : 'string',
            required : false,
            prompt   : false
          },

          message_textarea :
          {
            type     : 'string',
            required : true,
            prompt   : {
              url : 'contact-validate.php'  
            }
          }
        }
      }
      */
    },

    /**
     * Getter function for the settings map.
     *
     * @param vKey {String ? null} Specify one setting information or get the whole map
     * @return {Object} Returns specified settings or the whole map
     */
    getSettings : function(vKey)
    {
      var _vKey = vKey || "";

      if (_vKey != "") {
        return this.__settings[_vKey];
      } else {
        return this.__settings;
      }
    }
  }
});