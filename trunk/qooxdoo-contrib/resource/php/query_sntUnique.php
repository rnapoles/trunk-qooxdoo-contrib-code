<?php
//check whether userid is in db 
// =====include db_connect start===========================
include 'db_connect.php';
require_once 'snt_log.php';
// =====include db_connect end=============================

$userName = $_GET["userName"];
$userID = $_GET["userID"];

//logMsg("query_sntUnique.php", $userName);

//error Handling
$rcStatus = array();
$rcStatus["sntRoutine"] = "query_sntUnique.php";
$rcStatus["sntStatus"] = false;
$rcStatus["sntCode"] = 0;

$sql = "SELECT usr_name FROM sntuser WHERE usr_name = '" . $userName . "'";
$sql .= "AND usr_id != " . $userID;

//logMsg("query_sntUnique.php", $sql);

$result = mysql_query($sql);

if (mysql_num_rows($result) > 0) {
	//user name exists already
	$rcStatus["sntStatus"] = false;
	$rcStatus["sntCode"] = 10130;	
}
else {
	//user name does not exist
	$rcStatus["sntStatus"] = true;
	$rcStatus["sntCode"] = 0;		
}

echo json_encode($rcStatus);

?>
