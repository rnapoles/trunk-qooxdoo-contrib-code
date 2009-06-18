<?php
/**
 * Provides a pseudo Exception class for PHP4
 * taken from http://snippets.dzone.com/posts/show/2450
 */
class Exception
{
  var $_message = '';
  var $_code = 0;
  var $_line = 0;
  var $_file = '';
  var $_trace = null;

  function Exception($message = 'Unknown exception', $code = 0){
    $this->_message = $message;
    $this->_code = $code;
    $this->_trace = debug_backtrace();
    $x = array_shift($this->_trace);
    $this->_file = $x['file'];
    $this->_line = $x['line'];
  }

  function __construct($message = 'Unknown exception', $code = 0){
    $this->Exception($message, $code);
  }

  function getMessage(){
    return $this->_message;
  }
  function getCode(){
    return $this->_code;
  }
  function getFile(){
    return $this->_file;
  }
  function getLine(){
    return $this->_line;
  }
  function getTrace(){
    return $this->_trace;
  }
  function getTraceAsString(){
    $s = '';
    foreach($this->_trace as $i=>$item){
      foreach($item['args'] as $j=>$arg)
      $item['args'][$j] = print_r($arg, true);
      $s .= "#$i " . (isset($item['class']) ? $item['class'] . $item['type'] : '') . $item['function']
      . '(' . implode(', ', $item['args']) . ") at [$item[file]:$item[line]]\n";
    }
    return $s;
  }
  function printStackTace(){
    echo $this->getTraceAsString();
  }
  function toString(){
    return $this->getMessage();
  }
  function __toString(){
    return $this->toString();
  }
}

?>