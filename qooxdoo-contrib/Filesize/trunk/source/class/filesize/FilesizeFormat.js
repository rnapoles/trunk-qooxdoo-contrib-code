/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)
     * Michael Rea

************************************************************************ */

/* ************************************************************************


************************************************************************ */

/**
 * A formatter and parser for numbers.
 */
qx.Class.define("filesize.FilesizeFormat",
{
  extend : qx.util.format.Format,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param locale {String} optional locale to be used
   */
  construct : function(locale)
  {
    this.base(arguments);
    this._locale = locale;
  },

  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**
     * Returns an integer number format.
     *
     * @type static
     * @return {FilesizeFormat} an integer number format.
     */
    getIntegerInstance : function()
    {
      var FilesizeFormat = filesize.FilesizeFormat;

      if (FilesizeFormat._integerInstance == null)
      {
        FilesizeFormat._integerInstance = new FilesizeFormat();
      }

      return FilesizeFormat._integerInstance;
    },

    /**
     * Return an instance of FilesizeFormat
     *
     * @return {filesize.FilesizeFormat} an instance
     * @signature function()
     */
    getInstance : qx.lang.Function.returnInstance

  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * The minimum number of integer digits (digits before the decimal separator).
     * Missing digits will be filled up with 0 ("19" -> "0019").
     */
    minimumIntegerDigits :
    {
      check : "Number",
      init : 0
    },


    /**
     * The maximum number of integer digits (superfluos digits will be cut off
     * ("1923" -> "23").
     */
    maximumIntegerDigits :
    {
      check : "Number",
      nullable : true
    },


    /**
     * The minimum number of fraction digits (digits after the decimal separator).
     * Missing digits will be filled up with 0 ("1.5" -> "1.500")
     */
    minimumFractionDigits :
    {
      check : "Number",
      init : 0
    },


    /**
     * The maximum number of fraction digits (digits after the decimal separator).
     * Superflous digits will cause rounding ("1.8277" -> "1.83")
     */
    maximumFractionDigits :
    {
      check : "Number",
      init : 0,
      nullable : true
    },


    /** Whether thousand groupings should be used {e.g. "1,432,234.65"}. */
    groupingUsed :
    {
      check : "Boolean",
      init : true
    }

  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Formats a number.
     *
     * @type member
     * @param num {number} the number to format.
     * @return {String} the formatted number as a string.
     */
    format : function(num)
    {
      // handle special cases
      switch (num) {
        case Infinity:
          return "Infinity";

        case -Infinity:
          return "-Infinity";

        case NaN:
          return "NaN";
      }

      var negative = (num < 0);

      if (negative) {
        num = -num;
      }
      
      var symbol = 'B';
      //var fsNum = Math.round(num);
      var fsNum = num;
      
      var maximumFractionDigits
    
      //1024, not 1000.  This is not a mistake.  It's the way it's done.  1024 is 2^10.
      while (fsNum >= 1024){
      	fsNum = fsNum / 1024;
      	maximumFractionDigits = 0;
      	if (fsNum < 10){  maximumFractionDigits = 1; }
		switch(symbol) 
		{
			case 'B':
			  symbol = 'KB'
			  break;
			case 'KB':
			  symbol = 'MB'
			  break;
			case 'MB':
			  symbol = 'GB'
			  break;
			case 'GB':
			  symbol = 'TB'
			  break;
			case 'TB':
			  symbol = 'PB'
			  break;
			case 'PB':
			  fsNum = fsNum * 1024 //just undoing /1024 in the rare case where somebody has huge files.
			break;
		}
	  }
      
      var numStr = "" + fsNum;
      var integerDigits = String(Math.floor(fsNum)).length;
      var integerStr = numStr.substring(0, integerDigits);

      // Prepare the fraction part

      var fractionStr = numStr.substring(integerDigits + 1);

      //if (maximumFractionDigits() != null && fractionStr.length > maximumFractionDigits())
      if (maximumFractionDigits == 1)
      {
        // We have already rounded -> Just cut off the rest
        fractionStr = fractionStr.substring(0, 1);
      }

      // Add the thousand groupings
      var origIntegerStr = integerStr;
      integerStr = "";
      var groupPos;

      for (groupPos=origIntegerStr.length; groupPos>3; groupPos-=3) {
        integerStr = "" + qx.locale.Number.getGroupSeparator(this._locale) + origIntegerStr.substring(groupPos - 3, groupPos) + integerStr;
      }

      integerStr = origIntegerStr.substring(0, groupPos) + integerStr;

      // Assemble the filesize
      var str = "" + (negative ? "-" : "") + integerStr;
      
      if (maximumFractionDigits == 1) {
        str += "" + qx.locale.Number.getDecimalSeparator(this._locale) + fractionStr;
      }
      
      str += " " + symbol;

      return str;
    },

    /**
     * Parses a number.
     *
     * @type member
     * @param str {String} the string to parse.
     * @return {Double} the number.
     * @throws TODOC
     */

	//this is directly copied from the NumberFormat class.  
	//Not sure if it works, or if it is needed.
    parse : function(str)
    {
      // use the escaped separators for regexp
      var groupSepEsc = qx.lang.String.escapeRegexpChars(qx.locale.Number.getGroupSeparator(this._locale) + "");
      var decimalSepEsc = qx.lang.String.escapeRegexpChars(qx.locale.Number.getDecimalSeparator(this._locale) + "");

      var regex = new RegExp(
        "^" +
        qx.lang.String.escapeRegexpChars(this.getPrefix()) +
        '([-+]){0,1}'+
        '([0-9]{1,3}(?:'+ groupSepEsc + '{0,1}[0-9]{3}){0,})' +
        '(' + decimalSepEsc + '\\d+){0,1}' +
        qx.lang.String.escapeRegexpChars(this.getPostfix()) +
        "$"
      );

      var hit = regex.exec(str);

      if (hit == null) {
        throw new Error("Number string '" + str + "' does not match the number format");
      }

      var negative = (hit[1] == "-");
      var integerStr = hit[2];
      var fractionStr = hit[3];

      // Remove the thousand groupings
      integerStr = integerStr.replace(new RegExp(groupSepEsc, "g"), "");

      var asStr = (negative ? "-" : "") + integerStr;

      if (fractionStr != null && fractionStr.length != 0)
      {
        // Remove the leading decimal separator from the fractions string
        fractionStr = fractionStr.replace(new RegExp(decimalSepEsc), "");
        asStr += "." + fractionStr;
      }

      return parseFloat(asStr);
    }

  }
});
