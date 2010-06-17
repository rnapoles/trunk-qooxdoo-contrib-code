# HeidiSQL Dump 
#
# --------------------------------------------------------
# Host:                 localhost
# Database:             test
# Server version:       5.0.45-community-nt
# Server OS:            Win32
# max_allowed_packet:   1048576
# HeidiSQL version:     3.0 RC4 Revision: 334
# --------------------------------------------------------

/*!40100 SET CHARACTER SET latin1;*/


#
# Database structure for database 'test'
#

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `test` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;

USE test;


#
# Table structure for table 'sntuser'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `sntuser` (
  `usr_id` int(11) NOT NULL auto_increment COMMENT 'internal user id',
  `usr_name` varchar(16) collate latin1_general_ci NOT NULL default '' COMMENT 'user login name',
  `usr_intern` tinyint(1) NOT NULL default '0' COMMENT 'internal user?\r\n1 = internal\r\n0 = external',
  `usr_issystem` tinyint(1) NOT NULL default '0' COMMENT 'IS this a system user - than we will not be able to edit or delete it (application needs to control this)',
  `usr_role` int(11) default NULL COMMENT 'id of role in the roles table',
  `usr_pw` varchar(25) collate latin1_general_ci NOT NULL COMMENT 'users password',
  `usr_fname` varchar(20) collate latin1_general_ci default NULL COMMENT 'Firstname of User',
  `usr_lname` varchar(25) collate latin1_general_ci NOT NULL COMMENT 'Last Name of User',
  `usr_fullname` varchar(50) collate latin1_general_ci default NULL COMMENT 'users full name',
  `usr_mail` varchar(50) collate latin1_general_ci NOT NULL COMMENT 'users email address',
  `usr_phone` varchar(50) collate latin1_general_ci default NULL,
  `usr_department` varchar(25) collate latin1_general_ci default NULL COMMENT 'User Department',
  `usr_company` varchar(25) collate latin1_general_ci default NULL,
  `usr_addr1` text collate latin1_general_ci NOT NULL COMMENT 'users address 1 data',
  `usr_addr2` text collate latin1_general_ci COMMENT 'users address 2 data',
  `usr_zip` text collate latin1_general_ci NOT NULL COMMENT 'users zip code\r\n',
  `usr_city` text collate latin1_general_ci NOT NULL COMMENT 'Users city',
  `usr_country` text collate latin1_general_ci NOT NULL COMMENT 'Users country',
  `usr_phone1` text collate latin1_general_ci,
  `usr_phone2` text collate latin1_general_ci,
  `usr_mobile` text collate latin1_general_ci,
  `usr_created` datetime NOT NULL COMMENT 'creation date and time',
  `usr_modified` datetime NOT NULL COMMENT 'modified date and time',
  `usr_modified_by` text collate latin1_general_ci NOT NULL COMMENT 'modified by',
  PRIMARY KEY  (`usr_id`),
  UNIQUE KEY `usr_id` (`usr_id`),
  UNIQUE KEY `usr_name` (`usr_name`),
  UNIQUE KEY `usr_name_2` (`usr_name`),
  UNIQUE KEY `usr_name_3` (`usr_name`),
  UNIQUE KEY `usr_name_4` (`usr_name`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='user mgmt table for web user which are not in the person tab';



#
# Dumping data for table 'sntuser'
#

/*!40000 ALTER TABLE sntuser DISABLE KEYS;*/
LOCK TABLES sntuser WRITE;
REPLACE INTO sntuser (usr_id, usr_name, usr_intern, usr_issystem, usr_role, usr_pw, usr_fname, usr_lname, usr_fullname, usr_mail, usr_phone, usr_department, usr_company, usr_addr1, usr_addr2, usr_zip, usr_city, usr_country, usr_phone1, usr_phone2, usr_mobile, usr_created, usr_modified, usr_modified_by) VALUES (1,'sn_super_user',1,1,1,'schrotty_super',NULL,'sn_super_user','sn_super_user','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(2,'sn_defadmin',1,1,1,'sn_default_admin',NULL,'sn_default_admin','sn_default_admin','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(3,'sn_defmanager',1,1,2,'sn_default_manager',NULL,'sn_default_manager','sn_default_manager','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(4,'sn_defcoord',1,1,3,'sn_default_coordinator',NULL,'sn_default_coordinator','sn_default_coordinator','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(5,'sn_deftrainer',1,1,4,'sn_default_trainer',NULL,'sn_default_trainer','sn_default_trainer','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(6,'sn_default',1,1,5,'sn_default_default',NULL,'sn_default_default','sn_default_default','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(7,'sn_defuser',1,1,6,'sn_default_defuser',NULL,'sn_default_defuser','sn_default_defuser','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00');
UNLOCK TABLES;
/*!40000 ALTER TABLE sntuser ENABLE KEYS;*/
