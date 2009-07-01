<?php
/*
 * FIXME: clear licencense issue.
 *
 */


/**
 This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 For Support, please visit http://www.criticaldevelopment.net/xml/

 */

/*
 * use the characters for indenting the XML (\t or spaces)
 */
define('XMLPARSER_INDENT_CHAR', "  ");

/**
 * XML Parser Class (php4)
 *
 * Parses an XML document into an object structure much like the SimpleXML extension.
 *
 * @author Adam A. Flynn <adamaflynn@criticaldevelopment.net>
 * @copyright Copyright (c) 2005-2007, Adam A. Flynn
 *
 * @version 1.3.0
 *
 * Adapted by Christian Boulanger (info@bibligraph.org) to be a php4 backport
 * of the php5 simplexml functions
 *
 * Changes:
 * - Renamed XMLTag to SimpleXMLElement so that API comments are consistent
 *   across versions
 * - added methods from PHP5 SimpleXml API to achieve basic compatibility
 *   main differences:
 *   * you cannot access attributes using the array syntax - use attributes()
 *     instead.
 *   * you cannot get the CDATA of a node by casting a member to string like
 *     in PHP5 ("(string) $obj->member"). You need to use $obj->member->CDATA()
 *     instead. To set the CDATA use $obj->member->setCDATA("foo");
 *     In order to work cross-version, you can use the following syntax:
 *     $data = phpversion() < 5 ? $node->CDATA() : (string) $node;
 * - renamed AddChild() method to _AddChild() ad added addChild() method
 *   with method signature from PHP5 SimpleXml
 * - child members will only be array if more than one child of with the same
 *   tag name exists
 * - no lowercasing of tagnames
 */
class XMLParser
{
  /**
   * The XML parser
   *
   * @var resource
   */
  var $parser;

  /**
   * The XML document
   *
   * @var string
   */
  var $xml;

  /**
   * Document tag
   *
   * @var object
   */
  var $document;

  /**
   * Current object depth
   *
   * @var array
   */
  var $stack;

  /**
   * Whether or not to replace dashes and colons in tag
   * names with underscores.
   *
   * @var bool
   */
  var $cleanTagNames;

  /**
   * Added: Index of attributes for fast access to nodes
   * @var array
   */
  var $attributeIndex = array();

  /**
   * Added: Array of attributes to be indexed
   * @var array
   */
  var $indexedAttributes = array();


  /**
   * Added: Index of tag names for fast access
   * @var array
   */
  var $tagIndex;


  /**
   * Constructor. Loads XML document.
   *
   * @param string $xml The string of the XML document
   * @return XMLParser
   */
  function XMLParser($xml = '', $cleanTagNames = true)
  {
    //Load XML document
    $this->xml = $xml;

    // Set stack to an array
    $this->stack = array();

    //Set whether or not to clean tag names
    $this->cleanTagNames = $cleanTagNames;
  }

  /**
   * added: load xml from string
   * @param string $xml
   * @return object parsed object
   */
  function &load_string($xml)
  {
    $this->xml = $xml;
    $this->Parse();
    return $this->document;
  }


  /**
   * added: load xml from file
   * @param $file
   * @return object
   */
  function &load_file($file)
  {
    if ( @is_file($file) )
    {
      $this->xml = file_get_contents($file);
      $this->Parse();
      return $this->document;
    }
    else
    {
      trigger_error("'$file'' is not a valid file path.");
    }
  }

  /**
   * Initiates and runs PHP's XML parser
   */
  function Parse()
  {
    //Reset id counter
    $this->_idCounter = 0;

    //Create the parser resource
    $this->parser = xml_parser_create();

    //Changed: Turn off case folding
    xml_parser_set_option($this->parser, XML_OPTION_CASE_FOLDING, 0);

    //Set the handlers
    xml_set_object($this->parser, $this);
    xml_set_element_handler($this->parser, 'StartElement', 'EndElement');
    xml_set_character_data_handler($this->parser, 'CharacterData');

    //Error handling
    if (!xml_parse($this->parser, $this->xml))
    $this->HandleError(xml_get_error_code($this->parser), xml_get_current_line_number($this->parser), xml_get_current_column_number($this->parser));

    //Free the parser
    xml_parser_free($this->parser);
  }

  /**
   * Handles an XML parsing error
   *
   * @param int $code XML Error Code
   * @param int $line Line on which the error happened
   * @param int $col Column on which the error happened
   */
  function HandleError($code, $line, $col)
  {
    trigger_error('XML Parsing Error at '.$line.':'.$col.'. Error '.$code.': '.xml_error_string($code));
  }


  /**
   * Gets the XML output of the PHP structure within $this->document
   *
   * @return string
   */
  function GenerateXML()
  {
    return $this->document->GetXML();
  }

  /**
   * Gets the reference to the current direct parent
   *
   * @return object
   */
  function GetStackLocation()
  {
    $return = '';

    foreach($this->stack as $stack)
    {
      $return .= $stack.'->';
    }
    return rtrim($return, '->');
  }

  /**
   * Handler function for the start of a tag
   *
   * @param resource $parser
   * @param string $name
   * @param array $attrs
   */
  function StartElement($parser, $name, $attrs = array())
  {
    //Check to see if tag is root-level
    if (count($this->stack) == 0)
    {
      //If so, set the document as the current tag
      $this->document = new SimpleXMLElement($name, $attrs);

      //And start out the stack with the document tag
      $this->stack = array('document');

      // taken from Ingo Schramm's simplexml44 Version 0.4.4 Ister.ORG
      // create a reference to doc to manipulate internal reference counter
      // otherwise references won't work with nested arrays
      // this is pretty a hack! (even works with 4.4.x)
      // thanks to chat~kaptain524 at neverbox dot com at php.net
      $r =& $this->document;
    }
    //If it isn't root level, use the stack to find the parent
    else
    {
      //Get the name which points to the current direct parent, relative to $this
      $parent = $this->GetStackLocation();

      //Add the child
      eval('
              $parentNode =& $this->'.$parent.';
              $child =& $parentNode->_AddChild($name, $attrs, '.count($this->stack).', $this->cleanTagNames);
            ');

      //Added: Set id and parent id
      $child->tagParentId = $parentNode->tagId;

      //Added: Save reference to node in numeric index
      $this->nodeIndex[$child->tagId] =& $child;

      //Added: create index of tag names
      $this->tagIndex[$name][] =& $child;

      //Added: create index of attributes.
      if ( count ( $this->indexedAttributes ) )
      {
        foreach($this->indexedAttributes as $attrName)
        {
          if ( isset($attrs[$attrName]) )
          {
            $value = $attrs[$attrName];
            $this->attributeIndex[$attrName][$value][] =& $child;
          }
        }
      }

      //If the cleanTagName feature is on, replace colons and dashes with underscores
      if($this->cleanTagNames)
      {
        $name = str_replace(array(':', '-'), '_', $name);
      }

      //Update the stack
      eval('
              $count = count($this->'.$parent.'->'.$name.');
              $this->stack[] = $count > 1 ? $name.\'[\'.($count-1).\']\' : $name;
            ');
    }
  }

  /**
   * Handler function for the end of a tag
   *
   * @param resource $parser
   * @param string $name
   */
  function EndElement($parser, $name)
  {
    //Update stack by removing the end value from it as the parent
    array_pop($this->stack);
  }

  /**
   * Handler function for the character data within a tag
   *
   * @param resource $parser
   * @param string $data
   */
  function CharacterData($parser, $data)
  {
    //Get the reference to the current parent object
    $tag = $this->GetStackLocation();

    //Assign data to it
    eval('$this->'.$tag.'->tagData .= trim($data);');
  }

  /**
   * Added: adds attribute index. needs to be called before Parse()
   * @param string $name
   */
  function addAttributeIndex($name)
  {
    $this->indexedAttributes[] = $name;
  }

  /**
   * Added: Lookup node by attribute values
   */
  function getNodesByAttributeValue($name,$value)
  {
    if ( ! in_array($name,$this->indexedAttributes) )
    {
      trigger_error("'$name' is not an indexed attribute.");
    }
    return $this->attributeIndex[$name][$value];
  }

  /**
   * Added: lookup nodes by tag name
   */
  function getNodesByTagName($name)
  {
    return $this->tagIndex[$name];
  }

}


/**
 * SimpleXMLElement Tag Object (php4)
 *
 * This object stores all of the direct children of itself in the $children array. They are also stored by
 * type as arrays. So, if, for example, this tag had 2 <font> tags as children, there would be a class member
 * called $font created as an array. $font[0] would be the first font tag, and $font[1] would be the second.
 *
 * To loop through all of the direct children of this object, the $children member should be used.
 *
 * To loop through all of the direct children of a specific tag for this object, it is probably easier
 * to use the arrays of the specific tag names, as explained above.
 *
 * @author Original author: Adam A. Flynn <adamaflynn@criticaldevelopment.net>
 * @author Modified by Christian Boulanger <c.boulanger@qxtransformer.org>
 * @copyright Copyright (c) 2005-2007, Adam A. Flynn
 *
 *
 */
class SimpleXMLElement
{
  /**
   * Array with the attributes of this XML tag
   *
   * @var array
   */
  var $tagAttrs;

  /**
   * The name of the tag
   *
   * @var string
   */
  var $tagName;

  /**
   * The data the tag contains
   *
   * So, if the tag doesn't contain child tags, and just contains a string, it would go here
   *
   * @var string
   */
  var $tagData;

  /**
   * Array of references to the objects of all direct children of this XML object
   *
   * @var array
   */
  var $tagChildren;

  /**
   * The number of parents this XML object has (number of levels from this tag to the root tag)
   *
   * Used presently only to set the number of tabs when outputting XML
   *
   * @var int
   */
  var $tagParents;

  /**
   * added: namespace to which the tag belongs. Not implemented
   * @var array
   */
  var $tagNamespace;

  /**
   * added: internal numeric id used for referencing since object
   * references are very buggy in php4
   * @var int
   */
  var $tagId;

  /**
   * id of parent tag
   * @var int
   */
  var $tagParentId;

  /**
   * Added: Array of tag names that are used by the
   * implementation and therefore cannot be child tags
   * @var array
   */
  var $invalidTags = array('tagChildren', 'tagAttrs', 'tagParents', 'tagData', 'tagName', 'tagNamespace', 'tagId', 'tagParentId');


  /**
   * Constructor, sets up all the default values
   *
   * @param string $name
   * @param array $attrs
   * @param int $parents
   * @return SimpleXMLElement
   */
  function SimpleXMLElement($name, $attrs = array(), $parents = 0, $namespace="" )
  {
    if ( !$name )
    {
      trigger_error("Missing element name.");
    }

    //Make the keys of the attr array lower case, and store the value
    $this->tagAttrs = array_change_key_case($attrs, CASE_LOWER);

    //Store the name
    $this->tagName = $name;

    //Set the number of parents
    $this->tagParents = $parents;

    //Set the namespace
    $this->tagNamespace = $namespace;

    //Set the types for children and data
    $this->tagChildren = array();
    $this->tagData = '';
  }

  /**
   * added: simplexml method to access attributes
   */
  function &attributes()
  {
    return $this->tagAttrs;
  }

  /**
   * added: PHP5 simplexml method to access children
   */
  function &children()
  {
    return $this->tagChildren;
  }

  /**
   * added: method to retrieve CDATA
   */
  function CDATA()
  {
    return $this->tagData;
  }

  /**
   * added: method to set CDATA
   */
  function setCDATA($data)
  {
    $this->tagData = $data;
  }

  /**
   * added: PHP5 simplexml method to access tag name
   */
  function getName()
  {
    return $this->tagName;
  }

  /**
   * added: PHP5 simplexml method to add an Attribute to the node
   * @param string $name
   * @param string $value
   * @param string $namespace currently not implemented
   */
  function addAttribute($name,$value,$namespace="")
  {
    return $this->tagAttrs[$name] = $value;
  }

  /**
   * added: PHP5 simplexml method to add a child to the node
   * @param string $name
   * @param mixed  $value
   * @param string $namespace (not yet supported)
   * @return SimpleXMLElement
   */
  function &addChild($name, $value=null , $namespace=null)
  {
    $child =& $this->_AddChild($name,array(),$this->tagParents+1);
    //$child->tagNamespace = $namespace;
    if ($value) $child->setCDATA($value);
    return $child;
  }

  /**
   * added: remove a child from the node. No equivalent in
   * php5 simpleXml function
   * @param object $childNode
   * @return boolean true if node was removed
   */
  function &removeChild($childNode)
  {
    if ( ! is_a( $childNode,"SimpleXMLElement"  ) )
    {
      trigger_error("Cannot remove node: Invalid parameter");
    }
    $found = false;
    foreach ( $this->children() as $index => $node )
    {
      if ( $node->tagId == $childNode->tagId )
      {
        unset($this->tagChildren[$index]);
        unset($this->{$node->tagName});
        $found = true;
        break;
      }
    }
    return $found;
  }

  /**
   * Adds a direct child to this object
   * Changes:
   * - child member will only be array if more than one member of
   *   a tag name is added
   * - method returns reference to newly created child
   * - a random md5 tag id is added
   *
   * @param string $name
   * @param array $attrs
   * @param int $parents
   * @param bool $cleanTagName
   * @return SimpleXMLElement
   */
  function &_AddChild($name, $attrs, $parents, $cleanTagName = true)
  {
    //If the tag is a reserved name, output an error
    if(in_array($name, $this->invalidTags ))
    {
      trigger_error("You have used a reserved name ('$name') as the name of an XML tag.", E_USER_ERROR);
      return;
    }

    //Create the child object itself
    $child = new SimpleXMLElement($name, $attrs, $parents);

    //Add a random tag id to make it unique
    $child->tagId = md5(mt_rand() . time());

    //If the cleanTagName feature is on, replace colons and dashes with underscores
    if($cleanTagName)
    {
      $name = str_replace(array(':', '-'), '_', $name);
    }

    //Toss up a notice if someone's trying to to use a colon or dash in a tag name
    elseif(strstr($name, ':') || strstr($name, '-'))
    {
      trigger_error('Your tag named "'.$name.'" contains either a dash or a colon. Neither of these characters are friendly with PHP variable names, and, as such, they cannot be accessed and will cause the parser to not work. You must enable the cleanTagName feature (pass true as the second argument of the XMLParser constructor). For more details, see http://www.criticaldevelopment.net/xml/', E_USER_ERROR);
    }


    //Changed: If tag name being added doesn't exist, add child directly
    if( !isset($this->$name) )
    {
      $this->$name =& $child;
    }

    //Changed: if it exists, check if it is an array
    else
    {
      if ( is_array($this->$name) )
      {
        // if yes, append to array
        $this->{$name}[] =& $child;
      }
      else
      {
        // if no, convert into array
        $tmp = $this->$name; // note: this MUST be copy by value, not by reference
        $this->$name = array(&$tmp,&$child);

        // this messes up the references in tag children, this is
        // why we need this hack
        for($i=0; $i<count($this->tagChildren); $i++)
        {
          if ( $this->tagChildren[$i]===$this->$name )
          {
            $this->tagChildren[$i] =& $this->tagChildren[$i][0];
          }
        }


      }
    }
    //Add the reference to the children array member
    $this->tagChildren[] =& $child;
    return $child;
  }

  /**
   * added: PHP5 simplexml API method to get serialized XML as a string
   */
  function asXML()
  {
    return $this->GetXML();
  }

  /**
   * added: dump as a simple array structure
   */
  function toArray()
  {
    $result = array();
    $attributes = $this->attributes();
    if ( count($attributes) ) $result['__attributes'] = $attributes;
    $cdata = $this->CDATA();
    if ( $cdata ) $result['__cdata'] = $cdata;

    $members = get_object_vars($this);
    foreach ( $members as $index => $member )
    {
      if ( substr($index,0,3) == "tag" ) continue;
      if ( is_object($member) )
      {
        $result[$index] = $member->toArray();
      }
      elseif ( is_array($member) )
      {
        foreach( $member as $i2 => $child )
        {
          if ( is_object($child) )
          {
            $result[$index][$i2] = $child->toArray();
          }
          else
          {
            $result[$index][$i2] = "*** ERROR ***: " . gettype($child);
          }
        }
      }
      else
      {
        $result[] = "$index:" .gettype($member);
      }
    }
    return $result;
  }

  /**
   * Returns the string of the XML document which would be generated from this object
   *
   * This function works recursively, so it gets the XML of itself and all of its children, which
   * in turn gets the XML of all their children, which in turn gets the XML of all thier children,
   * and so on. So, if you call GetXML from the document root object, it will return a string for
   * the XML of the entire document.
   *
   * Changed: added xml declaration
   *
   * @return string
   */
  function GetXML()
  {
    $out ="";

    // root tag
    if ( $this->tagParents==0)
    {
      $out .= '<?xml version="1.0" encoding="utf-8"?>';
    }

    //Start a new line, indent by the number indicated in $this->parents, add a <, and add the name of the tag
    $out .= "\n".
    str_repeat(XMLPARSER_INDENT_CHAR, $this->tagParents) .
                '<'.$this->tagName;

    //For each attribute, add attr="value"
    foreach($this->tagAttrs as $attr => $value)
    $out .= ' '.$attr.'="'.$value.'"';

    //If there are no children and it contains no data, end it off with a />
    if(empty($this->tagChildren) && empty($this->tagData))
    {
      $out .= " />";
    }

    //Otherwise...
    else
    {
      //Close off the start tag
      $out .= '>';

      //If there are children
      if(!empty($this->tagChildren))
      {

        //For each child, call the GetXML function (this will ensure that all children are added recursively)
        foreach($this->tagChildren as $child)
        {
          if(is_object($child))
          {
            $out .= $child->GetXML();
          }
        }

        //Add the newline and indentation to go along with the close tag
        $out .= "\n".str_repeat(XMLPARSER_INDENT_CHAR, $this->tagParents);
      }

      //If there is data, add it
      //Changed: this shouldn't be an "else" condition since there can be data AND children
      if (!empty($this->tagData))
      {
        $out .= $this->tagData;
      }

      //Add the end tag
      $out .= '</'.$this->tagName.'>';
    }

    //Return the final output
    return $out;
  }

  /**
   * Deletes this tag's child with a name of $childName and an index
   * of $childIndex
   *
   * @param string $childName
   * @param int $childIndex
   */
  function Delete($childName, $childIndex = 0)
  {
    //Delete all of the children of that child
    $this->{$childName}[$childIndex]->DeleteChildren();

    //Destroy the child's value
    $this->{$childName}[$childIndex] = null;

    //Remove the child's name from the named array
    unset($this->{$childName}[$childIndex]);

    //Loop through the tagChildren array and remove any null
    //values left behind from the above operation
    for($x = 0; $x < count($this->tagChildren); $x ++)
    {
      if(is_null($this->tagChildren[$x]))
      unset($this->tagChildren[$x]);
    }
  }

  /**
   * Removes all of the children of this tag in both name and value
   */
  function DeleteChildren()
  {
    //Loop through all child tags
    for($x = 0; $x < count($this->tagChildren); $x ++)
    {
      //Do this recursively
      $this->tagChildren[$x]->DeleteChildren();

      //Delete the name and value
      $this->tagChildren[$x] = null;
      unset($this->tagChildren[$x]);
    }
  }

  function getAttribute($name, $default= null )
  {
    $attrs = (array) $this->attributes();
    if (isset($attrs[$name]))
    {
      return (string) $attrs[$name];
    }
    return (string) $default;
  }

  function getAttributeCount()
  {
    return (int) count( (array) $this->attributes() );
  }

  function hasAttributes()
  {
    return (bool) $this->getAttributeCount();
  }

  /**
   * executes an xpath (1.0) query on the current document
   * @return XPathObject
   */
  function xpath( $expr )
  {
    /*
     * create a dom xml document from the stringyfied xml
     */
    $dom = domxml_open_mem(
      $this->asXML(),
      DOMXML_LOAD_RECOVERING,
      &$error
    );

    if ( ! $dom )
    {
      $this->error = "Error while parsing the document:" . print_r( $error, true );
      return false;
    }

    /*
     * create new context and evaluate the xpath expression
     */
    $xpCxt =& $this->dom->xpath_new_context();
    $xpObj =& $xpCxt->xpath_eval_expression( $expr );
    if ( ! $xpObj ) return null;

    /*
     * for each node found, create a SimpleXMLElement
     */
    $nodeSetArray=array();
    foreach ( $xpObj->nodeset as $node)
    {
      $doc =& domxml_new_doc("1.0");
      $doc->append_child( $node->clone_node( true ) );
      $xmlString = $doc->dump_mem( 2,"utf-8");
      $parser = new XMLParser($xmlString);
      $parser->Parse();
      $nodeSetArray[] =& $parser->document;
    }
    return $nodeSetArray;
  }



}
?>
