<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

qcl_import( "qcl_data_model_db_PersistentObject" );

/**
 * locale model using the  the qooxdoo translation system.
 * @todo externally set paths
 */
class qcl_locale_QooxdooModel
  extends qcl_data_model_db_PersistentObject
{

  /**
   * The current message catalogue
   * @var array
   */
  public  $catalogue = array();

  /**
   * The default locale
   */
  public  $default_locale = "en";

  /**
   * The current locale
   * @public  string
   */
  public  $locale = null;

  /*
   * paths to files
   */
  public  $locale_dir;

  public  $locale_js_dir;

  public  $translation_js;


  /**
   * does the actual lookup
   * @return
   * @param $messageId Object
   */
  function gettext($messageId)
  {
    if ( ! trim ( $messageId ) ) return "";

    $locale = $this->getLocale();

    // translation found?
    $translation = $this->catalogue[$messageId];

    if ( $translation)
    {
      return $translation;
    }

    if ( $locale != $default_locale )
    {
      $this->markForTranslation( $messageId );
    }
    return $messageId;

  }


	//-------------------------------------------------------------
  // interface methods
  //-------------------------------------------------------------

  /**
   * sets the locale
   * @return void
   * @param $locale String
   */
	function setLocale($locale)
	{
    $this->locale = $locale;
    $this->loadTranslations();
    //$this->savePersistenceData();
	}

  /**
   * getter for locale
   * @return
   */
  function getLocale()
  {
    return $this->locale;
  }

  /**
   * Loads the translation strings for the current locale
   * FIXME Unfunctional
   */
  function loadTranslations()
  {

    //$this->debug("Loading translations for locale '$this->locale'");

    /*
     * check
     */
    if ( ! $this->locale )
    {
      $this->raiseError("No locale set!");
    }

    /*
     * clear translations
     */
    $this->catalogue = array();

    /*
     * load file contents
     */
//    $file = file_get_contents( $this->locale_js_dir . "/{$this->locale}.js" );
//    preg_match_all('/"(.+)": "(.+)",/',$file,$matches);
//    for ( $i=0; $i<count($matches[0]); $i++)
//    {
//      $this->catalogue[$matches[1][$i]] = $matches[2][$i];
//    }
  }

  /**
   * gets a list of available locales
   * FIXME unfunctional
   * @return array
   */
  function getAvailableLocales()
  {
    return array();

    static $availableLocales = array();
    if ( ! count( $availableLocales ) )
    {
      foreach( scandir( $this->locale_dir ) as $file )
      {
        if ( substr($file,-3) == ".po" )
        {
          $availableLocales[] = substr( $file, 0, strpos( $file, "." ) );
        }
      }
    }
    return array_unique( $availableLocales );
  }

  /**
   * checks if a locale is supported
   * @return Boolean
   * @param $locale String
   */
  function hasLocale($locale)
  {
    return ( in_array( $locale, $this->getAvailableLocales() ) );
  }

  /**
   * Translate a message
   *
   * @param messageId {String} message id (may contain format strings)
   * @return string
   */
  function translate ( $messageId )
  {
      return $this->gettext($messageId);
  }

  /**
   * Translate a plural message. Depending on the third argument the plural or the singular form is chosen.
   * @param string   $singularMessageId Message id of the singular form
   * @param string   $pluralMessageId   Message id of the plural form
   * @param int      $count
   * @return string
   */
  function translate_plural_msg ( $singularMessageId, $pluralMessageId, $count )
  {
    return $this->ngettext( $singularMessageId, $pluralMessageId, $count );
  }

  /**
   * on-the-fly addition of untranslated
   * messages to a special file. This will also catch dynamically
   * generated message strings.
   * @return
   * @param $messageId String
   * FIXME Unfunctional
   */
  function markForTranslation ( $messageId )
  {
    return;
    if ( trim($messageId)  )
    {
      $content   = file_get_contents( $this->translation_js );
      $messageId = addslashes( $messageId );

      if ( ! strstr( $content, $messageId ) )
      {
        $content .= "\n" . 'this.marktr("' . $messageId . '");';
        file_put_contents( $this->translation_js, $content );
      }
    }
  }
}

?>