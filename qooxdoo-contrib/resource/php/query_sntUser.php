<?php
// =====include db_connect start===========================
include 'db_connect.php';
// =====include db_connect end=============================

$userID = $_GET["userID"];

$sql = "SELECT u.*, r.rle_name FROM sntuser u, roles r 
WHERE u.usr_id = $userID AND u.usr_role = r.rle_id";

$result = mysql_query($sql);
$daten = array();

while ($row = mysql_fetch_assoc($result)) 
{ 		
	$daten["usr_id"] 				= $row["usr_id"];							//[0] User: ID
	$daten["usr_name"] 			= $row["usr_name"];           //[1] User: Name 
	$daten["usr_intern"] 		= $row["usr_intern"];         //[2] User: Is Internal User 
	$daten["usr_issystem"] 	= $row["usr_issystem"];       //[3] User: Is system user 
	$daten["usr_role"] 			= $row["rle_name"];           //[4] User: role 
	$daten["usr_fname"] 		= $row["usr_fname"];          //[5] User: First Name 
	$daten["usr_lname"] 		= $row["usr_lname"];          //[6] User: Last Name
	$daten["usr_fullname"] 	= $row["usr_fullname"];				//[7] User: Fullname
	$daten["usr_pw"] 				= $row["usr_pw"];             //[8] User: Password 
	$daten["usr_mail"] 			= $row["usr_mail"];           //[9] User: E-Mail
	$daten["usr_phone"] 		= $row["usr_phone"];          //[10]User: Phone 
	$daten["usr_department"]= $row["usr_department"];     //[11]User: Department       
	$daten["usr_company"] 	= $row["usr_company"];        //[12]User: Company          
	$daten["usr_addr1"] 		= $row["usr_addr1"];          //[13]User: Addr1            
	$daten["usr_addr2"] 		= $row["usr_addr2"];          //[14]User: Addr2            
	$daten["usr_zip"] 			= $row["usr_zip"];            //[15]User: Zip              
	$daten["usr_city"] 			= $row["usr_city"];           //[16]User: City             
	$daten["usr_country"] 	= $row["usr_country"];        //[17]User: Country          
	$daten["usr_phone1"] 		= $row["usr_phone1"];         //[18]User: Phone 1 (Company)
	$daten["usr_phone2"] 		= $row["usr_phone2"];         //[19]User: Phone 2 (Company)
	$daten["usr_mobile"] 		= $row["usr_mobile"];         //[20]User: Mobile           
	$daten["usr_fax"] 			= $row["usr_fax"];       			//[21]User: Fax              
	$daten["usr_modified_by"] = $row["usr_modified_by"];	//[22]User: Modified by
	$daten["usr_created"] 	= $row["usr_created"]; 
	$daten["usr_modified"] 	= $row["usr_modified"];        
	
	$daten["usr_gui_lng"]		= $row["usr_gui_lng"]; 				//[23]User: GUI Language
}

echo json_encode($daten);

?>
