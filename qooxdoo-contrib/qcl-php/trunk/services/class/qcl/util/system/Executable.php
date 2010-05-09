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

class qcl_util_system_Executable
{

  protected $cmd;

  protected $arguments;

  protected $stdin;

  protected $stdout;

  protected $stderr;

  protected $exitcode;


  /**
   * Constructor. Takes the name of the executable as argument
   * @param string $cmd Name of the command
   */
  public function __construct( $cmd )
  {
    $this->cmd = $cmd;
  }

  /**
   * Return the data that was fed into the executable
   * @return string
   */
  public function getStdIn()
  {
    return $this->stdin;
  }

  /**
   * Returns the data that was returned by the executable
   * @return string
   */
  public function getStdOut()
  {
    return $this->stdout;
  }

  /**
   * Returns the error data returned by the executable
   * @return string
   */
  public function getStdErr()
  {
    return $this->stderr;
  }

  /**
   * Returns the exit code returned by the executable
   * @return int
   */
  public function getExitCode()
  {
    return (int) $this->exitcode;
  }

  /**
   * Internal method which does the actual calling of the
   * executable.
   *
   * @param $cmd
   * @param $input
   * @return array
   * @throws Exception
   */
  protected function call_executable( $cmd, $input=null )
  {
    $proc=proc_open($cmd, array(
      array("pipe","r"),
      array("pipe","w"),
      array("pipe","w")
    ), $pipes );
    if ( is_resource( $proc ) )
    {
      if( $input) fwrite($pipes[0], $input);
      fclose($pipes[0]);
      $stdout = stream_get_contents($pipes[1]);
      fclose($pipes[1]);
      $stderr = stream_get_contents($pipes[2]);
      fclose($pipes[2]);
      $exitcode = proc_close($proc);
      return array(
        'stdout'    => $stdout,
        'stderr'    => $stderr,
        'exitcode'  => $exitcode
      );
    }
    throw new Exception("Could not create process '$cmd'");
  }

  /**
   * Calls the executable, returning the exit code. The
   * stdout and stderr data can be retrieved using the
   * getStdOut() and getStdErr() methods.
   *
   * @param string $arguments Optional command-line arguements
   * @param string $stdin Optional data fed into the executable
   * @return int Exit code
   */
  public function exec( $arguments="", $stdin="" )
  {
    $this->arguments = $arguments;
    $this->stdin = $stdin;
    $result = $this->call_executable( $this->cmd . " " . $arguments, $stdin );
    $this->stdout   = $result['stdout'];
    $this->stderr   = $result['stderr'];
    $this->exitcode = $result['exitcode'];
    return $this->exitcode;
  }

  /**
   * Calls the executable, returning the stdout data. If
   * the exit code is not 0, throw an exeption using the
   * stderr data as exception message.
   *
   * @param string $arguments Optional command-line arguements
   * @param string $stdin Optional data fed into the executable
   * @return string Data returned by the executable to stdout.
   * @throws Exception
   */
  public function call( $arguments="", $stdin="" )
  {
    if ( $this->exec( $arguments, $stdin ) == 0 )
    {
      return $this->getStdOut();
    }
    else
    {
      throw new Exception( $this->getStdErr() );
    }
  }
}
?>