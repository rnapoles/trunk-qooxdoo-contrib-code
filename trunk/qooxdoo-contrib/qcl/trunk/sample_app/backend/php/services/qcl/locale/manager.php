<?php

// dependencies
require_once ("qcl/object.php");

/**
 * manages locales and translations
 * ported from qooxdoo javascript implementation
 * this is only a stub which does not do any translation yet
 * to be implemented & turned into an interface/abstract class - we can implement 
 * gettext-based, db-based, file-based etc. although gettext-based makes most sense
 * since qooxdoo frontend can use those, too. 
 * 
 * qcl/locale/
 * |-- locale.php abstract class
 * |-- gettext.php subclass
 * |-- db.php subclass etc. 
 */
class qcl_locale_manager extends qcl_object
{
  
	var $locale 		= null;
	var $domain			= null;
  	var $locale_dir		= "./locale";
  	var $language		= null;
  	var $defaultLocale	= "C";
  	
  	/**
   	* constructor
   	*/
  	function __construct($locale=null, $domain= null, $locale_dir=null )
  	{
    	parent::__construct();
		if ( $locale )
		{
			$this->setLocale($locale);		
		}
		
		if ( $domain )
		{
			$this->setDomain ( $domain );
		}
		
		if ( $locale_dir )
		{
			$this->locale_dir = $locale_dir;
		}
  	}
  	
  	function setLocale($locale)
	{
		putenv("LANGUAGE=$locale");
	}
	
	function setDomain($domain)
	{
		bindtextdomain($domain, $this->locale_dir);
		textdomain($domain);		
	}

    /**
     * Translate a message
     *
     * @param messageId {String} message id (may contain format strings)
     * @param varargs {Object} variable number of argumes applied to the format string
     * @return string
     */
    function tr( $messageId, $varargs)
    {
      	return $messageId;
    }


    /**
     * Translate a plural message
     *
     * Depending on the third argument the plursl or the singular form is chosen.
     *
     * @type static
     * @param string $singularMessageId message id of the singular form (may contain format strings)
     * @param string $pluralMessageId message id of the plural form (may contain format strings)
     * @param int $count if greater than 1 the plural form otherwhise the singular form is returned.
     * @param array $varargs variable number of argumes applied to the format string
     * @return string
     */
    function trn ( $singularMessageId, $pluralMessageId, $count, $varargs )
    {
      if ($count > 1) 
      {
        	return $singularMessageId;
      } 
      else 
      {
        	return $pluralMessageId;
      }
    }

    /**
     * Get the language code of the currnt locale
     *
     * This is the first part of a locale definition. The language for "de_DE" would be "de"
     *
     * @type member
     * @return {String} language code
     */
    function getLanguage() 
    {
      return $this->language;
    }


    /**
     * Get the territory code of the currnt locale
     *
     * This is the second part of a locale definition. The territory for "de_DE" would be "DE"
     *
     * @type member
     * @return {String} territory code
     */
    function getTerritory() 
    {
      trigger_error("not implemented");
      return strrchr($this->locale(),"_");
    }


    /**
     * Return the available application locales
     *
     * This corresponds to the Makefile APPLICATION_LOCALES setting
     *
     * @type member
     * @return {String[]} array of available locales
     */
    function getAvailableLocales()
    {
      trigger_error("not implemented");
    }


    /**
     * Extract the language part from a locale.
     *
     * @type member
     * @param locale {String} locale to be used
     * @return {String} language
     */
    function _extractLanguage($locale)
    {
      trigger_error("not implemented");
      /*
      var language;
      var pos = locale.indexOf("_");

      if (pos == -1) {
        language = locale;
      } else {
        language = locale.substring(0, pos);
      }

      return language;
      */
    }




    /**
     * Add a translation to the translation manager
     *
     * @type member
     * @param languageCode {String} language code of the translation like de, de_AT, en, en_GB, fr, ...
     * @param translationMap {Map} mapping of message identifiers (english text) to the target language
     * @return {void}
     */
    function addTranslation($languageCode, $translationMap)
    {
      trigger_error("not implemented");
      /*
      if (this._translationCatalog[languageCode])
      {
        for (var key in translationMap) {
          this._translationCatalog[languageCode][key] = translationMap[key];
        }
      }
      else
      {
        this._translationCatalog[languageCode] = translationMap;
      }*/
    }

    /**
     * Translate a message using the current locale and apply format string to the arguments.
     *
     * @type member
     * @param messageId {String} message id (may contain format strings)
     * @param args {Object[]} array of objects, which are inserted into the format string.
     * @param locale {String} optional locale to be used for translation
     * @return {String} translated message.
     */
    function translate ($messageId, $args, $locale)
    {
    	trigger_error("not implemented");
    	/*
      var txt;

      if (locale) {
        var language = this._extractLanguage(locale);
      }
      else
      {
        locale = this._locale;
        language = this._language;
      }

      if (!txt && this._translationCatalog[locale]) {
        txt = this._translationCatalog[locale][messageId];
      }

      if (!txt && this._translationCatalog[language]) {
        txt = this._translationCatalog[language][messageId];
      }

      if (!txt && this._translationCatalog[this._defaultLocale]) {
        txt = this._translationCatalog[this._defaultLocale][messageId];
      }

      if (!txt) {
        txt = messageId;
      }

      if (args.length > 0) {
        txt = qx.lang.String.format(txt, args);
      }

      return txt;
      */
    }
}

/**
 * translates message if translation exists, otherwise make entry in the 
 * .po file. You can use the sprinf() syntax to dynamically insert values into
 * the text.
 * @param string $message
 * @param mixed variable
 * @param mixed variable ...
 */
function __()
{  
  $args  = func_get_args();
  $msgId = $args[0];
  //$args[0] = $msgId; // todo: implement translation here
  return call_user_func_array('sprintf',$args);  
}
