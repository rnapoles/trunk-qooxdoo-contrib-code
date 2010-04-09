<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2007-2010 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */
/*
 * The parent directory containing subfolders with test classes.
 * Must be the top-level "class" folder containing the top namespace,
 * otherwise the class names cannot be correctly determined.
 */
if( ! defined( "QCL_TEST_CLASS_DIR" ) )
{
  define( "QCL_TEST_CLASS_DIR" , realpath( "../.." ) );
}

/*
 * The path to the directory containing the server that provides access
 * to the test classes
 */
if( ! defined( "QCL_TEST_SERVER_DIR" ) )
{
  define( "QCL_TEST_SERVER_DIR" , "../../.." );
}

/*
 * The parent class that test service classes must extend in order to
 * be included in the test suite
 */
if( ! defined( "QCL_TEST_SERVICE_PARENT_CLASS" ) )
{
  define( "QCL_TEST_SERVICE_PARENT_CLASS" , "qcl_test_AbstractTestController" );
}

/*
 * The filter used to run tests
 */
if( ! defined( "QCL_TEST_RUN_FILTER" ) )
{
  define( "QCL_TEST_RUN_FILTER" , "qcl.test.*" );
}

/*
 * we're delivering a javascript file
 */
header("Content-Type: text/javascript");

/*
 * urls
 */
$serverUrl =  "http://" . $_SERVER["HTTP_HOST"] .
  dirname( dirname( dirname( dirname( $_SERVER["SCRIPT_NAME"] ) ) ) ) . "/server.php";
$testDataUrl = "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["SCRIPT_NAME"];

/*
 * introduction
 */
echo <<<EOF
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2007-2010 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

   The following file contains data that can be fed into the RpcConsole
   contribution to automatically run all tests contained in the
   subdirectories. Load the RpcConsole with the following GET parameters:

   ?serverUrl=$serverUrl
   &testDataUrl=$testDataUrl

   You can also load the data from the testDataUrl with the "Load/Edit Tests"
   -> "Load test data..." command or copy and paste the data into the editor
   using the "Load/Edit Tests" -> "Edit test data" menu command.

************************************************************************ */

EOF;

/*
 * change the working directory to the server's and load required
 * libraries
 */
chdir( QCL_TEST_SERVER_DIR );
require_once "config.php";
require_once "qcl/bootstrap.php";

/**
 * Recursively collect all files that end with ".php"
 * @param $dir
 * @return array
 */
function getServiceClassFiles( $dir = QCL_TEST_CLASS_DIR )
{
  $serviceClasses = new ArrayList();
  foreach( scandir( $dir ) as $file )
  {
    $path = $dir . "/" . $file;
    if (  $file[0] == "." ) continue;
    if ( is_dir( $path) )
    {
      $serviceClasses->addAll( getServiceClassFiles( $path ) );
    }
    elseif ( get_file_extension( $file ) == "php" )
    {
      $serviceClasses->add( $path );
    }
  }
  return $serviceClasses->toArray();
}

require_once "services/server/JsonRpcServer.php";

$filter = QCL_TEST_RUN_FILTER;
echo <<<EOF
qx.core.Init.getApplication().setTestData(
{
  "runAutomatedTests":{
    "label":"Execute $filter test suite",
    "execute":function (){
      this.info( "Starting test suite ");
      this.runTests("$filter");
    }
  },

EOF;

$tests = array();
$files = getServiceClassFiles();

foreach( $files as $path )
{
  $file_content = file_get_contents( $path );
  if ( strstr( $file_content, "extends ". QCL_TEST_SERVICE_PARENT_CLASS) )
  {
    /*
     * convert path into class name
     */
    $import_class = substr(
       str_replace("/","_", substr( $path, strlen(QCL_TEST_CLASS_DIR) +1 ) ), 0, -4
    );
    qcl_import( $import_class );
    $className = JsonRpcClassPrefix . $import_class;
    $class = new $className;

    $testJson = $class->rpcConsoleClassTestJson();

    $testJson = implode("\n  ",explode("\n",$testJson) );


    if ( $testJson != "" )
    {
      $test = "\n";
      $test .= "  //=================================================================\n";
      $test .= "  // Class $className \n";
      $test .= "  //=================================================================\n";
      $test .= "  " . $testJson;
      $tests[] = $test;
    }

  }
}
echo implode(",\n",$tests) . "\n});";


?>