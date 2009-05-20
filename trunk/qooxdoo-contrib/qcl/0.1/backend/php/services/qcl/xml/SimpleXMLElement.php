<?php


class qcl_xml_SimpleXMLElement extends SimpleXMLElement
{

  function getAttribute($name, $default='')
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
  
  function CDATA()
  {
    return (string) $this;
  }

  function setCDATA($data)
  {
    $this->{0} = $data;
  }  
  
  /**
   * Remove a child from the node.
   * @param object $childNode
   * @return boolean true if node was removed
   */
  function removeChild( $childNode )
  {
    if ( ! is_a( $childNode,"SimpleXMLElement"  ) )
    {
      trigger_error("Cannot remove node: Invalid parameter");
    }
    $found = false;
    foreach ( $this->children() as $index => $node )
    {
      if ( $node === $childNode )
      {
        unset( $node );
        $found = true;
        break;
      }
    }
    return $found;
  }  
}

?>