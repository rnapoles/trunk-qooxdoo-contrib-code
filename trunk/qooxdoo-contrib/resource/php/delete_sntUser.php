<?php
// =====includes start=====================================
include 'db_connect.php';
require_once 'snt_log.php';
// =====includes end=======================================

$curUserID= $_GET["userID"];

//error Handling
$rcStatus = array();
$rcStatus["sntRoutine"] = "save_sntUser.php";
$rcStatus["sntStatus"] = true;
$rcStatus["sntCode"] = 0;

//delete user from table sntuser
$sql = "DELETE FROM sntuser WHERE usr_id = " . $curUserID . " LIMIT 1";

$result = mysql_query($sql);
$affectedRows = mysql_affected_rows();

if ($affectedRows == 1) {
	//user deleted
	$rcStatus["sntStatus"] = true;
	$rcStatus["sntCode"] = 10170;	
	logMsg("delete_sntUser.php", "user ID: " . $curUserID . " deleted" );
}
else {
	//Problem occured while trying to delete
	$rcStatus["sntStatus"] = false;
	$rcStatus["sntCode"] = 10160;	
	logMsg("delete_sntUser.php", "user ID: " . $curUserID . " NOT deleted" );
	}

echo json_encode($rcStatus);

?>
