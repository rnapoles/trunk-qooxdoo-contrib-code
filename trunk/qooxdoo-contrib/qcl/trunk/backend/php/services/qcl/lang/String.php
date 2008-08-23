<?php

/**
 * String manipulation class.
 *
 * Adapted from http://www.phpclasses.org/browse/package/2396.html
 * @author Original author: Alexander Ramos Jardim (http://www.labma.ufrj.br/~alex/)
 * @author Adapted for qcl library: Christian Boulanger
 *
 */
class String
{

  /**
   * If size of the string is set, it will indicate the maximun size of
   * _value.
   *
   * @param int
   * @access private
   */
  var $_size = null;

  /**
   * String value.
   *
   * @param string
   * @access private
   */
  var $_value = '';

  /**
   * Returns the character (Unicode code point) at the specified index.
   *
   * @param int Position of the character that will be returned.
   * @return int
   */
  function codePointAt( $index )
  {
    return ord( $this->getCharAt( $index ) );
  }

  /**
   * Gets the string value of an element
   * @param String|string $elem
   */
  function _getStringValue( $elem )
  {
    return is_a( $elem, "String") ? $elem->get() : (string) $elem;
  }
  
  /**
   * Compares two strings lexicographically.
   *
   * @param String|string $str String (object) to which we will compare.
   * @param bool $caseSensitive If TRUE, comparison is case-sensitive.
   * @return int
   */
  function compareTo( $str, $caseSensitive = true )
  {
    $anotherString = $this->_getStringValue(); 
    $function = $caseSensitive ? 'strcmp' : 'strcasecmp';
    return $function( $this->_value, $anotherString );
  }

  /**
   * Concatenates the specified string to the end of this string.
   *
   * @param string String that will be concatenated.
   * @return void
   */
  function concat( $str )
  {
    $this->_value .= $str;
  }

  /**
   * Returns true if and only if this string contains the specified sequence
   * of char values.
   *
   * @param string Char Sequence that is being searched.
   * @return bool
   */
  function contains( $charSequence )
  {
    return ereg( $charSequence, $this->_value );
  }

  function copyValueOf( &$data )
  {
    if ( is_a($data, 'String') ) 
    {
      $this->_copyValueOfString( &$data );
    }
  }

  /**
   * Private method that copies the value of a String object to this one.
   *
   * @param object String object reference.
   * @return void
   */
  function _copyValueOfString( &$data )
  {
    $this->set( $data->get() );
  }

  /**
   * Returns the character that is in position $pos. If this position is out
   * of bounds, it returns FALSE.
   *
   * @param int Position of the character that will be returned.
   * @return char
   */
  function getCharAt( $pos )
  {
    if ( $pos < 0 || $pos > $this->lenght() ) {
      return false;
    } else {
      return $this->_value[$pos];
    }
  }

  /**
   * Alias for lenght method.
   *
   * @see String::lenght()
   */
  function count()
  {
    return $this->lenght();
  }

  // }}}
  // {{{ string get()

  function get()
  {
    return $this->_value;
  }

  // }}}
  // {{{ int lenght()

  /**
   * Returns the string lenght.
   *
   * @return int
   */
  function lenght()
  {
    return strlen( $this->_value );
  }

  // }}}
  // {{{ array matches( string,  [bool] )

  /**
   * Verifies if the expression matches the string value. It can be case-or-
   * -not-case-sensitive based on case parameter.
   * If the expression matches, it will return an array containing the
   * matched substrings separated by parentesis, just like ereg or eregi.
   */
  function matches( $expression, $case = false )
  {
    $function = $case ? 'ereg' : 'eregi';
    $function( $expression, $this->_value, $result );
    return $result;
  }

  // }}}
  // {{{ bool putCharAt( char, int )

  /**
   * Puts $char at position $pos in the string. Returns TRUE if it has success
   * on it or FALSE if it fails.
   *
   * @return bool
   */
  function putCharAt( $char, $pos )
  {
    if ( $pos >= 0 && $pos < $this->lenght() ) {
      $this->_value[$pos] = $char;
      return true;
    } else {
      return false;
    }
  }

  // }}}
  // {{{ contructor.

  function String( $str = null, $size = null )
  {
    $this->_size = $size;
    $this->set( (string)$str );
  }

  // }}}
  // {{{ void set( string )

  /**
   * Sets the string value. If there is a maximun size set, it will set the
   * string value to the substring made by the beginning to size position
   *
   * @param string Value that will be passed to the string.
   */
  function set( $value )
  {
    $this->_value = ( (int)$this->_size > 0 )
    ? substr( $value, 0, $this->_size )
    : $value;
  }

  // }}}
  // {{{ void trim()

  /**
   * Removes white spaces form beginnig and end of string.
   */
  function trim()
  {
    $this->_value = trim( $this->_value );
  }

  // }}}
  // {{{ void toUppercase( [int] )

  /**
   * Changes the string case to uppercase if no position is specified.
   * If a position was specified, changes that position case to upper.
   */
  function toUppercase( $charpos = null )
  {
    if ( $charpos === null || !is_int($charpos) ) {
      $this->_value = strtoupper( $this->_value );
    } else {
      $this->putCharAt( strtoupper($this->getCharAt( $charpos )),
      $charpos );
    }
  }

  // }}}
  // {{{ void toLowercase( [int] )

  /**
   * Changes the string case to lowercase if no position is specified.
   * If a position was specified, changes that position case to lower.
   */
  function toLowercase( $charpos = null )
  {
    if ( $charpos === null || !is_int($charpos) ) {
      $this->_value = strtolower( $this->_value );
    } else {
      $this->putCharAt( strtolower($this->getCharAt( $charpos )),
      $charpos );
    }
  }

  // }}}

  }
  ?>