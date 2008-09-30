<?
/**
 * ArrayList class
 * from http://www.phpclasses.org/browse/package/1169.html
 * adapted for  for qcl library:
 * - small documentation cleanup and additions
 *
 * @version 0.2
 * @author Tim Anlauf <schranzistorradio@gmx.de>
 */
class ArrayList
{
   
  /**
   * Array, representing the arrayList
   * @var array
   */
  var $arrayList;

  /**
   * Pointer variable. used to detect the last element of the list in hasNext() method.
   * @var int
   */
  var $pointer=0;

  /**
   * Constructor
   * Constructs a new list. The Parameter $arr is optional. If set an ArrayList
   * with the elements in array is created. Otherwise a empty list is constructed.
   * @param array[optional] $arr - one dimensional array
   */
  function ArrayList( $arr=array() )
  {
    $this->arrayList = $arr;
  }

  /**
   * Inserts the specified element at the specified position in this list.
   * @param index integer - position in list
   * @param $obj
   **/
  function addToPos($index, $obj)
  {
    if ( $this->isInteger($index) )
      $this->arrayList[$index] = $obj;
    else
      trigger_error("ERROR in ArrayList.addToPos <br> Integer value required");
  }
   
  /**
   * Appends the specified element to the end of this list.
   * @param mixed $obj
   */
  function add($obj) 
  {
    array_push($this->arrayList, $obj);
  }

  /**
   * Appends all of the elements in the specified Array to the end of this list
   * @param mixed $elem ArrayList or array
   */
  function addAll($elem) 
  {
    if ( is_a($elem,"ArrayList") )
    {
      $arr = $elem->toArray();
    }
    elseif ( is_array($elem) )
    {
      $arr = $elem;
    }
    else
    {
      trigger_error("Argument must be an ArrayList or array.");
    }
    $this->arrayList = array_merge($this->arrayList, $arr);
  }
  
  /**
   * Removes all of the elements from this list.
   */
  function clear() 
  {
    $this->arrayList = array();
  }

  /**
   * Returns true if this list contains the specified element.
   * @param mixed $obj
   * @return boolean
   */
  function contains($obj) 
  {
    return in_array($obj, $this->arrayList);
  }

  /**
   * Returns the element at the specified position in this list.
   * @param int $index
   */
  function get($index) 
  {
    if ($this->isInteger($index))
      return $this->arrayList[$index];
    else
      trigger_error("ERROR in ArrayList.get <br> Integer value required");
  }

  /**
   * Searches for the first occurence of the given argument.
   * If the element isn´t found, -1 is returned
   * @param obj
   * @return integer
   */
  function indexOf($obj) 
  {
    while (list ($key, $val) = each ($this->arrayList) )
    if ($obj == $val) return $key;
    return -1;
  }

  /**
   * Tests if this list has no elements.
   * @return boolean
   **/
  function isEmpty()
  {
    if ( count($this->arrayList) == 0) return true;
    else return false;
  }
  
  /**
   * Returns the index of the last occurrence of the specified object in this list.
   * @param mixed $obj
   * @return int
   **/
  function lastIndexOf($obj)
  {
    return array_search($obj, $this->arrayList);
  }

  /**
   * removes the element at the specified position in this list.
   * @param index
   **/
  function remove($index) 
  {
    if ( $this->isInteger($index) )
    {
      $newArrayList = array();
       
      for ($i=0; $i < $this->size(); $i++)
      if ($index != $i) $newArrayList[] = $this->get($i);
       
      $this->arrayList = $newArrayList;
    }
    else 
    {
      trigger_error("ERROR in ArrayList.remove <br> Integer value required");
    }
  }
   
  /**
   * Removes from this List all of the elements whose index is between fromIndex, inclusive and toIndex, exclusive.
   * @param int $formIndex
   * @param int $toIndex
   */
  function removeRange($fromIndex, $toIndex) 
  {
    if ( $this->isInteger($fromIndex) && $this->isInteger($toIndex)) 
    {
      $newArrayList = array();
       
      for ($i=0; $i < $this->size(); $i++)
      {
        if ($i < $fromIndex || $i > $toIndex ) 
        {
          $newArrayList[] = $this->get($i);
        }
      } 
      $this->arrayList = $newArrayList;
    }
    else 
    {
      trigger_error ("ERROR in ArrayList.removeRange <br> Integer value required");
    }
  }

  /**
   * Returns the number of elements in this list.
   * return integer
   */
  function size() 
  {
    return count($this->arrayList);
  }

  /**
   * Sorts the list in alphabetical order. Keys are not kept in position.
   */
  function sort() 
  {
    sort($this->arrayList);
  }

  /**
   * Returns an array containing all of the elements in this list in the correct order.
   * @return array
   */
  function toArray() 
  {
    return $this->arrayList;
  }

   
  /* Iterator Methods */


  /**
   * Returns true if the list has more elements. Advice : excecute reset method before
   * using this method
   * @return boolean
   **/
  function hasNext() 
  {
     
    if ($this->pointer < $this->size() ) 
    {
      return false;
    }
    return true;
  }

  /**
   * Set the pointer of the list to the first element
   */
  function reset() 
  {
    reset($this->arrayList);
    $this->pointer=0;
  }

  /**
   * Set the pointer of the next element of the list
   * @return mixed current element
   */
  function next() 
  {
    $cur = current($this->arrayList);
    next($this->arrayList);
    $this->pointer++;
    return $cur;
  }

  /* private Methods */

  /**
   * Returns true if the parameter holds an integer value
   * @return boolean
   */
  function isInteger($toCheck) 
  {
    return eregi("^-?[0-9]+$", $toCheck);
  }
  
  /**
   * Joins array elemnt with given glue character(s)
   * @param string $glue
   * @return string
   */
  function join( $glue )
  {
    return implode($glue,$this->arrayList);
  }
}
?>