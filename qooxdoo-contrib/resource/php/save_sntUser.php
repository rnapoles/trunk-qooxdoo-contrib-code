<?php
// =====includes start=====================================
include 'db_connect.php';
require_once 'snt_log.php';
// =====includes end=======================================

$curData= $_GET["curRecord"];

$curData = ltrim($curData, "[");
$curData = rtrim($curData, "]");

$curRecord = array();
$curRecord = explode("," , $curData);

logMsg("data", $curData);

//error Handling
$rcStatus = array();
$rcStatus["sntRoutine"] = "save_sntUser.php";
$rcStatus["sntStatus"] = true;
$rcStatus["sntCode"] = 0;

//check whether username is unique in db
$sql = "SELECT usr_name FROM sntuser WHERE usr_name = '" . $curRecord[1] . "'";
if ($curRecord[0] != "") {
	$sql .= "AND usr_id != " . $curRecord[0];
	}

$result = mysql_query($sql);
logMsg("save_user.php", $sql);

if (mysql_num_rows($result) > 0) {
	//user name exists already
	$rcStatus["sntStatus"] = false;
	$rcStatus["sntCode"] = 10130;	
	echo json_encode($rcStatus);
	exit;
}
else {
	//user name does not exist
	//do nothing here and continue
}

// get ID for the user role
$sql = 'SELECT rle_id FROM roles WHERE rle_name = "' . $curRecord[4] . '"';

$result = mysql_query($sql);

if (mysql_num_rows($result) > 0) {
	// we only care about the first match
	$row = mysql_fetch_assoc($result);
	$curRole = $row["rle_id"];
} 
else {
	// default role is id 6
	$curRole = 6;
}

//Get actual date & time
$modDateTime = date("Y-m-d H:i:s");

//var for snt user
$sql = "";
$sql_end = "";

//[0] User: ID               
if ($curRecord[0] == "") {
	//logMsg("save_user.php", "INsert user" . $curRecord[0]);
	
	$sql = "INSERT INTO sntuser SET ";
	} 
else {	
	$sql = "UPDATE sntuser SET ";
	$sql_end = " WHERE usr_id = $curRecord[0]";
	$curRecord[1] . "' , Password=password('" . $curRecord[8] . 
	"') WHERE Host='%' AND User='" . $curRecord[1] . "'";
	}

$sql = $sql . 
	'usr_name = "' 		. 		$curRecord[1]  . '", ' . 	//[1] User: Name
	'usr_intern = "' 	.	 		$curRecord[2]  . '", ' .	//[2] User: Is Internal User
	'usr_issystem = "'. 		$curRecord[3]  . '", ' .	//[3] User: Is system user
	'usr_role = "' 		. 		$curRole  . '", ' 		 .	//[4] User: role
	'usr_fname = "' 	.		 	$curRecord[5]  . '", ' . 	//[5] User: First Name
	'usr_lname = "' . 			$curRecord[6]  . '", ' . 	//[6] User: Last Name
	'usr_fullname = "'.		 	$curRecord[7]  . '", ';		//[7] User: Fullname
	
if ($curRecord[8] != "") {
		$sql = $sql .
		'usr_pw = "' . 				$curRecord[8]  . '", '; 	//[8] User: Password
	}
	
$sql = $sql .	
	'usr_mail = "' . 				$curRecord[9]  . '", ' . 	//[9] User: E-Mail
	'usr_phone = "' .		 		$curRecord[10] . '", ' . 	//[10]User: Phone
	'usr_department = "' .	$curRecord[11] . '", ' . 	//[11]User: Department
	'usr_company = "' .		 	$curRecord[12] . '", ' . 	//[12]User: Company
	'usr_addr1 = "' . 			$curRecord[13] . '", ' . 	//[13]User: Addr1
	'usr_addr2 = "' . 			$curRecord[14] . '", ' . 	//[14]User: Addr2
	'usr_zip = "' . 				$curRecord[15] . '", ' . 	//[15]User: Zip
	'usr_city = "' . 				$curRecord[16] . '", ' . 	//[16]User: City
	'usr_country = "' .	 		$curRecord[17] . '", ' . 	//[17]User: Country
	'usr_phone1 = "' . 			$curRecord[18] . '", ' . 	//[18]User: Phone 1 (Company)
	'usr_phone2 = "' . 			$curRecord[19] . '", ' . 	//[19]User: Phone 2 (Company)
	'usr_mobile = "' . 			$curRecord[20] . '", ' . 	//[20]User: Mobile
	'usr_fax = "' . 				$curRecord[21] . '", ' . 	//[21]User: Fax
	'usr_modified_by = "' . $curRecord[22] . '", ' . 	//[22]User: Modified by
	'usr_gui_lng = "' . 		$curRecord[23] . '", ' . 	//[23]User: GUI Language
	'usr_modified = "' . 		$modDateTime   . '" ';		// User: Modified TimeStamp

$sql = $sql . $sql_end;

$result = mysql_query($sql);					

$rcStatus["sntStatus"] = true;
$rcStatus["sntCode"] = 10140;	

//error Handling
echo json_encode($rcStatus);

?>
