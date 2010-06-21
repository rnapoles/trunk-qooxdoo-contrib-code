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

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `snt` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci */;

USE test;


#
# Table structure for table 'application'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `application` (
  `app_id` int(3) NOT NULL auto_increment,
  PRIMARY KEY  (`app_id`),
  UNIQUE KEY `app_id` (`app_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='application configuration\r\nfield prefix => app';



#
# Dumping data for table 'application'
#



#
# Table structure for table 'company'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `company` (
  `cmp_id` int(11) NOT NULL auto_increment,
  `cmp_hq` int(1) NOT NULL default '1' COMMENT 'is company headquarter\r\n1= true\r\n0= false',
  PRIMARY KEY  (`cmp_id`),
  UNIQUE KEY `cmp_id` (`cmp_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='table for company address information\r\nfield prefix => cmp';



#
# Dumping data for table 'company'
#



#
# Table structure for table 'country'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `country` (
  `cty_id` int(4) unsigned NOT NULL auto_increment,
  `cty_name` varchar(80) collate latin1_general_ci NOT NULL,
  PRIMARY KEY  (`cty_id`),
  UNIQUE KEY `cty_id` (`cty_id`),
  UNIQUE KEY `cty_name` (`cty_name`)
) ENGINE=MyISAM AUTO_INCREMENT=195 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;



#
# Dumping data for table 'country'
#

/*!40000 ALTER TABLE country DISABLE KEYS;*/
LOCK TABLES country WRITE;
REPLACE INTO country (cty_id, cty_name) VALUES (1,'Afghanistan'),
	(2,'Albania'),
	(3,'Algeria'),
	(4,'Andorra'),
	(5,'Angola'),
	(6,'Antigua and Barbuda'),
	(7,'Argentina'),
	(8,'Armenia'),
	(9,'Australia'),
	(10,'Austria'),
	(11,'Azerbaijan'),
	(12,'Bahamas'),
	(13,'Bahrain'),
	(14,'Bangladesh'),
	(15,'Barbados'),
	(16,'Belarus'),
	(17,'Belgium'),
	(18,'Belize'),
	(19,'Benin'),
	(20,'Bhutan'),
	(21,'Bolivia'),
	(22,'Bosnia and Herzegovina'),
	(23,'Botswana'),
	(24,'Brazil'),
	(25,'Brunei'),
	(26,'Bulgaria'),
	(27,'Burkina Faso'),
	(28,'Burundi'),
	(29,'Cambodia'),
	(30,'Cameroon'),
	(31,'Canada'),
	(32,'Cape Verde'),
	(33,'Central African Republic'),
	(34,'Chad'),
	(35,'Chile'),
	(36,'China'),
	(37,'Colombia'),
	(38,'Comoros'),
	(39,'Congo Brazzaville'),
	(40,'Congo, Democratic Republic of the'),
	(41,'Costa Rica'),
	(42,'Croatia'),
	(43,'Cuba'),
	(44,'Cyprus'),
	(45,'Czech Republic'),
	(46,'Côte d''Ivoire'),
	(47,'Denmark'),
	(48,'Djibouti'),
	(49,'Dominica'),
	(50,'Dominican Republic'),
	(51,'East Timor Timor Timur'),
	(52,'Ecuador'),
	(53,'Egypt'),
	(54,'El Salvador'),
	(55,'Equatorial Guinea'),
	(56,'Eritrea'),
	(57,'Estonia'),
	(58,'Ethiopia'),
	(59,'Fiji'),
	(60,'Finland'),
	(61,'France'),
	(62,'Gabon'),
	(63,'Gambia,The'),
	(64,'Georgia'),
	(65,'Germany'),
	(66,'Ghana'),
	(67,'Greece'),
	(68,'Grenada'),
	(69,'Guatemala'),
	(70,'Guinea'),
	(71,'Guinea-Bissau'),
	(72,'Guyana'),
	(73,'Haiti'),
	(74,'Honduras'),
	(75,'Hungary'),
	(76,'Iceland'),
	(77,'India'),
	(78,'Indonesia'),
	(79,'Iran'),
	(80,'Iraq'),
	(81,'Ireland'),
	(82,'Israel'),
	(83,'Italy'),
	(84,'Jamaica'),
	(85,'Japan'),
	(86,'Jordan'),
	(87,'Kazakhstan'),
	(88,'Kenya'),
	(89,'Kiribati'),
	(90,'Korea,North'),
	(91,'Korea,South'),
	(92,'Kuwait'),
	(93,'Kyrgyzstan'),
	(94,'Laos'),
	(95,'Latvia'),
	(96,'Lebanon'),
	(97,'Lesotho'),
	(98,'Liberia'),
	(99,'Libya'),
	(100,'Liechtenstein'),
	(101,'Lithuania'),
	(102,'Luxembourg'),
	(103,'Macedonia,Former Yugoslav Republic of'),
	(104,'Madagascar'),
	(105,'Malawi'),
	(106,'Malaysia'),
	(107,'Maldives'),
	(108,'Mali'),
	(109,'Malta'),
	(110,'Marshall Islands'),
	(111,'Mauritania'),
	(112,'Mauritius'),
	(113,'Mexico'),
	(114,'Micronesia,Federated States of'),
	(115,'Moldova'),
	(116,'Monaco'),
	(117,'Mongolia'),
	(118,'Morocco'),
	(119,'Mozambique'),
	(120,'Myanmar'),
	(121,'Namibia'),
	(122,'Nauru'),
	(123,'Nepal'),
	(124,'Netherlands'),
	(125,'New Zealand'),
	(126,'Nicaragua'),
	(127,'Niger'),
	(128,'Nigeria'),
	(129,'Norway'),
	(130,'Oman'),
	(131,'Pakistan'),
	(132,'Palau'),
	(133,'Panama'),
	(134,'Papua New Guinea'),
	(135,'Paraguay'),
	(136,'Peru'),
	(137,'Philippines'),
	(138,'Poland'),
	(139,'Portugal'),
	(140,'Qatar'),
	(141,'Romania'),
	(142,'Russia'),
	(143,'Rwanda'),
	(144,'Saint Kitts and Nevis'),
	(145,'Saint Lucia'),
	(146,'Saint Vincent and The Grenadines'),
	(147,'Samoa'),
	(148,'San Marino'),
	(149,'Sao Tome and Principe'),
	(150,'Saudi Arabia'),
	(151,'Senegal'),
	(152,'Serbia and Montenegro'),
	(153,'Seychelles'),
	(154,'SierraLeone'),
	(155,'Singapore'),
	(156,'Slovakia'),
	(157,'Slovenia'),
	(158,'Solomon Islands'),
	(159,'Somalia'),
	(160,'SouthAfrica'),
	(161,'Spain'),
	(162,'Sri Lanka'),
	(163,'Sudan'),
	(164,'Suriname'),
	(165,'Swaziland'),
	(166,'Sweden'),
	(167,'Switzerland'),
	(168,'Syria'),
	(169,'Taiwan'),
	(170,'Tajikistan'),
	(171,'Tanzania'),
	(172,'Thailand'),
	(173,'Togo'),
	(174,'Tonga'),
	(175,'Trinidad and Tobago'),
	(176,'Tunisia'),
	(177,'Turkey'),
	(178,'Turkmenistan'),
	(179,'Tuvalu'),
	(180,'Uganda'),
	(181,'Ukraine'),
	(182,'United Arab Emirates'),
	(183,'United Kingdom'),
	(184,'United States'),
	(185,'Uruguay'),
	(186,'Uzbekistan'),
	(187,'Vanuatu'),
	(188,'Vatican City'),
	(189,'Venezuela'),
	(190,'Vietnam'),
	(191,'Western Sahara'),
	(192,'Yemen'),
	(193,'Zambia'),
	(194,'Zimbabwe');
UNLOCK TABLES;
/*!40000 ALTER TABLE country ENABLE KEYS;*/


#
# Table structure for table 'currency'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `currency` (
  `cur_symbol` varchar(3) collate latin1_general_ci NOT NULL default 'EUR' COMMENT 'currency symbol',
  `cur_name` varchar(20) collate latin1_general_ci NOT NULL,
  `cur_base` int(1) default '0' COMMENT 'is currency the base currency\r\n1 = true\r\n0 = false',
  `cur_xrate` float(9,5) unsigned NOT NULL default '1.00000' COMMENT 'exchange rate',
  PRIMARY KEY  (`cur_symbol`),
  UNIQUE KEY `cur_symbol` (`cur_symbol`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='field prefix => cur';



#
# Dumping data for table 'currency'
#

/*!40000 ALTER TABLE currency DISABLE KEYS;*/
LOCK TABLES currency WRITE;
REPLACE INTO currency (cur_symbol, cur_name, cur_base, cur_xrate) VALUES ('EUR','Euro',1,'1');
UNLOCK TABLES;
/*!40000 ALTER TABLE currency ENABLE KEYS;*/


#
# Table structure for table 'education'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `education` (
  `edu_id` int(11) NOT NULL auto_increment,
  `edu_person` int(11) NOT NULL COMMENT 'id of edu person record',
  `edu_completed` int(11) default NULL COMMENT 'id of completed trainig ',
  PRIMARY KEY  (`edu_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='further education table to track education status\r\nfield pre';



#
# Dumping data for table 'education'
#



#
# Table structure for table 'hotel'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `hotel` (
  `htl_id` int(11) NOT NULL auto_increment,
  `htl_site` int(11) default NULL COMMENT 'site id the hotel is linked to',
  PRIMARY KEY  (`htl_id`),
  UNIQUE KEY `htl_id` (`htl_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='hotel information linked to site infos\r\nfield prefix => htl';



#
# Dumping data for table 'hotel'
#



#
# Table structure for table 'language'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `language` (
  `lng_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`lng_id`),
  UNIQUE KEY `lng_id` (`lng_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='language specific configuration\r\nfield prefix => lng';



#
# Dumping data for table 'language'
#



#
# Table structure for table 'log'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `log` (
  `log_id` int(11) NOT NULL auto_increment COMMENT 'internal id',
  `log_datetime` datetime NOT NULL,
  `log_subject` varchar(25) collate latin1_general_ci NOT NULL COMMENT 'brief description of log entry',
  `log_text` text collate latin1_general_ci,
  `log_user` int(11) NOT NULL COMMENT 'internal user id',
  PRIMARY KEY  (`log_id`),
  UNIQUE KEY `log_id` (`log_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='system log table\r\nfield prefix => log';



#
# Dumping data for table 'log'
#



#
# Table structure for table 'output'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `output` (
  `out_id` int(11) NOT NULL auto_increment COMMENT 'internal ID',
  `out_parent` int(11) default NULL COMMENT 'parent id the output belongs to',
  `out_type` int(11) NOT NULL,
  `out_content` blob NOT NULL,
  PRIMARY KEY  (`out_id`),
  UNIQUE KEY `out_id` (`out_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='tabel holding the outputs (PDF''s)\r\nfield prefix => out';



#
# Dumping data for table 'output'
#



#
# Table structure for table 'person'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `person` (
  `per_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`per_id`),
  UNIQUE KEY `per_id` (`per_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='table for people / contact addresses - must be linked to a c';



#
# Dumping data for table 'person'
#



#
# Table structure for table 'registration'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `registration` (
  `reg_id` int(11) NOT NULL auto_increment COMMENT 'internal registration ID ',
  `reg_training_id` int(11) NOT NULL COMMENT 'linked to training record either scheduled or waitlist',
  PRIMARY KEY  (`reg_id`),
  UNIQUE KEY `reg_id` (`reg_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='registrations for training\r\nfield prefix => reg';



#
# Dumping data for table 'registration'
#



#
# Table structure for table 'ressource'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `ressource` (
  `res_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`res_id`),
  UNIQUE KEY `res_id` (`res_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='table for misc ressources\r\nfield prefix => res';



#
# Dumping data for table 'ressource'
#



#
# Table structure for table 'roles'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `roles` (
  `rle_id` int(11) NOT NULL auto_increment,
  `rle_name` varchar(20) collate latin1_general_ci NOT NULL COMMENT 'name of the role',
  `rle_issystem` int(1) NOT NULL default '0' COMMENT 'is this a system role [1] -. than it can not be deleted!',
  `rle_created` datetime NOT NULL,
  `rle_modified` datetime NOT NULL,
  `rle_createdby` varchar(25) collate latin1_general_ci NOT NULL,
  `rle_modifiedby` varchar(25) collate latin1_general_ci NOT NULL,
  `rle_m100` int(11) NOT NULL default '0' COMMENT 'acess to menu id 100',
  `rle_m110` int(1) NOT NULL default '0' COMMENT 'acess to menu id 110',
  `rle_m120` int(1) NOT NULL default '0' COMMENT 'acess to menu id 120 => by city',
  `rle_m130` int(1) NOT NULL default '0' COMMENT 'acess to menu id 130',
  `rle_m140` int(1) NOT NULL default '0' COMMENT 'acess to menu id 140',
  `rle_m150` int(1) NOT NULL default '0' COMMENT 'acess to menu id 150',
  `rle_m200` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m210` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m220` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m230` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m240` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m250` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m260` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m270` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m280` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m281` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m282` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m283` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m290` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m300` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m310` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m320` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m330` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m400` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m410` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m420` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m430` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m431` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m432` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m433` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m434` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m435` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m436` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m440` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m441` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m442` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m443` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m450` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m500` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m510` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m511` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m520` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m521` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m530` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m531` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m532` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m533` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m540` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m541` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m542` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m543` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m550` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m551` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m552` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m553` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m560` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m561` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m562` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m563` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m600` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m610` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m620` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m630` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m640` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m650` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m660` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m661` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m662` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m663` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m670` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m671` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m672` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m680` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m690` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m691` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m692` int(1) NOT NULL default '0' COMMENT 'acess to menu => mxxx',
  `rle_m900` int(1) NOT NULL default '0' COMMENT 'login menu',
  PRIMARY KEY  (`rle_id`),
  UNIQUE KEY `role_id` (`rle_id`),
  UNIQUE KEY `role_name` (`rle_name`),
  UNIQUE KEY `roe_name` (`rle_name`),
  UNIQUE KEY `rle_name` (`rle_name`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;



#
# Dumping data for table 'roles'
#

/*!40000 ALTER TABLE roles DISABLE KEYS;*/
LOCK TABLES roles WRITE;
REPLACE INTO roles (rle_id, rle_name, rle_issystem, rle_created, rle_modified, rle_createdby, rle_modifiedby, rle_m100, rle_m110, rle_m120, rle_m130, rle_m140, rle_m150, rle_m200, rle_m210, rle_m220, rle_m230, rle_m240, rle_m250, rle_m260, rle_m270, rle_m280, rle_m281, rle_m282, rle_m283, rle_m290, rle_m300, rle_m310, rle_m320, rle_m330, rle_m400, rle_m410, rle_m420, rle_m430, rle_m431, rle_m432, rle_m433, rle_m434, rle_m435, rle_m436, rle_m440, rle_m441, rle_m442, rle_m443, rle_m450, rle_m500, rle_m510, rle_m511, rle_m520, rle_m521, rle_m530, rle_m531, rle_m532, rle_m533, rle_m540, rle_m541, rle_m542, rle_m543, rle_m550, rle_m551, rle_m552, rle_m553, rle_m560, rle_m561, rle_m562, rle_m563, rle_m600, rle_m610, rle_m620, rle_m630, rle_m640, rle_m650, rle_m660, rle_m661, rle_m662, rle_m663, rle_m670, rle_m671, rle_m672, rle_m680, rle_m690, rle_m691, rle_m692, rle_m900) VALUES (1,'sysAdministrator',1,'2008-01-09 22:51:00','2008-01-09 22:51:00','System','System',0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,0),
	(2,'sysManager',1,'2008-01-09 22:54:00','2008-01-09 22:54:00','System','System',0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,1,1,1,0,0,2,2,2,2,1,1,1,0),
	(3,'sysCoordinator',1,'2008-01-09 22:54:00','2008-01-09 22:54:00','System','System',0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,2,1,1,1,1,0,0,2,2,2,2,0,0,0,0),
	(4,'sysTrainer',1,'2008-01-09 22:54:00','2008-01-09 22:54:00','System','System',0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0),
	(5,'sysDefault',1,'2008-01-09 22:55:00','2008-01-09 22:55:00','System','System',1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1),
	(6,'sysDefUser',1,'2008-01-09 22:55:00','2008-01-09 22:55:00','System','System',1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
UNLOCK TABLES;
/*!40000 ALTER TABLE roles ENABLE KEYS;*/


#
# Table structure for table 'room'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `room` (
  `roo_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`roo_id`),
  UNIQUE KEY `roo_id` (`roo_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='room infomrations\r\nfield prefix => roo';



#
# Dumping data for table 'room'
#



#
# Table structure for table 'scheduled'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `scheduled` (
  `scd_id` int(11) NOT NULL auto_increment,
  `scd_parent` int(11) NOT NULL COMMENT 'id of the parent / master training',
  PRIMARY KEY  (`scd_id`),
  UNIQUE KEY `scd_id` (`scd_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='Scheduled trainings => prefix = scd';



#
# Dumping data for table 'scheduled'
#



#
# Table structure for table 'site'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `site` (
  `sit_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`sit_id`),
  UNIQUE KEY `sit_id` (`sit_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='training sites\r\nfiled prefix => sit';



#
# Dumping data for table 'site'
#



#
# Table structure for table 'skill'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `skill` (
  `skl_id` int(11) NOT NULL auto_increment,
  `skl_name` varchar(25) collate latin1_general_ci NOT NULL,
  `skl_mandatory` int(11) default NULL COMMENT 'training id''s for mandatory trainings',
  `skl_optional` int(11) default NULL COMMENT 'training id''s for optional trainings',
  PRIMARY KEY  (`skl_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='skill holds prof. title names like teacher, mechanics...\r\nus';



#
# Dumping data for table 'skill'
#



#
# Table structure for table 'system'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `system` (
  `sys_id` int(3) NOT NULL auto_increment COMMENT 'id column to identify record - max 999 = size 3',
  `sys_web` varchar(50) collate latin1_general_ci default 'www.simply-notes.de' COMMENT 'Simply Notes Homepage',
  `sys_mail` varchar(25) collate latin1_general_ci default 'info@simply-notes.de' COMMENT 'Simply Notes Mail address',
  `sys_support` varchar(25) collate latin1_general_ci default 'support@simply-notes.de' COMMENT 'Simply Notes Support Mail Address',
  `sys_licence` int(1) NOT NULL default '1' COMMENT 'licence typ \r\n1=registration base\r\n2=time based\r\n3=registration & time based',
  `sys_reg_total` int(11) default '0' COMMENT 'total number of registrations',
  `sys_reg_count` int(11) default '0' COMMENT 'current number of unlicenced registrations (licence typ 1 or 3)',
  PRIMARY KEY  (`sys_id`),
  UNIQUE KEY `id` (`sys_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='system configuration\r\nfield prefix => sys';



#
# Dumping data for table 'system'
#

/*!40000 ALTER TABLE system DISABLE KEYS;*/
LOCK TABLES system WRITE;
REPLACE INTO system (sys_id, sys_web, sys_mail, sys_support, sys_licence, sys_reg_total, sys_reg_count) VALUES (1,'www.simply-notes.de','info@simply-notes.de','support@simply-notes.de',1,0,0);
UNLOCK TABLES;
/*!40000 ALTER TABLE system ENABLE KEYS;*/


#
# Table structure for table 'templates'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `templates` (
  `tmp_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`tmp_id`),
  UNIQUE KEY `tmp_id` (`tmp_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='table with template information for printouts\r\nfield prefix ';



#
# Dumping data for table 'templates'
#



#
# Table structure for table 'trainer'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `trainer` (
  `trn_id` int(11) NOT NULL auto_increment,
  `trn_intern` int(1) NOT NULL default '1' COMMENT 'is trainer an internal resource => 1\r\nexternal trainer => 0',
  PRIMARY KEY  (`trn_id`),
  UNIQUE KEY `trn_id` (`trn_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='trainer informations\r\nfield prefix = trn';



#
# Dumping data for table 'trainer'
#



#
# Table structure for table 'training'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `training` (
  `tra_id` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`tra_id`),
  UNIQUE KEY `tra_id` (`tra_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='master training records\r\nfield prefix => tra';



#
# Dumping data for table 'training'
#



#
# Table structure for table 'user'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `user` (
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
# Dumping data for table 'user'
#

/*!40000 ALTER TABLE user DISABLE KEYS;*/
LOCK TABLES user WRITE;
REPLACE INTO user (usr_id, usr_name, usr_intern, usr_issystem, usr_role, usr_pw, usr_fname, usr_lname, usr_fullname, usr_mail, usr_phone, usr_department, usr_company, usr_addr1, usr_addr2, usr_zip, usr_city, usr_country, usr_phone1, usr_phone2, usr_mobile, usr_created, usr_modified, usr_modified_by) VALUES (1,'sn_super_user',1,1,1,'schrotty_super',NULL,'sn_super_user','sn_super_user','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(2,'sn_defadmin',1,1,1,'sn_default_admin',NULL,'sn_default_admin','sn_default_admin','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(3,'sn_defmanager',1,1,2,'sn_default_manager',NULL,'sn_default_manager','sn_default_manager','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(4,'sn_defcoord',1,1,3,'sn_default_coordinator',NULL,'sn_default_coordinator','sn_default_coordinator','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(5,'sn_deftrainer',1,1,4,'sn_default_trainer',NULL,'sn_default_trainer','sn_default_trainer','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(6,'sn_default',1,1,5,'sn_default_default',NULL,'sn_default_default','sn_default_default','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),
	(7,'sn_defuser',1,1,6,'sn_default_defuser',NULL,'sn_default_defuser','sn_default_defuser','support@simply-notes.de',NULL,NULL,'Simply Notes','','','','','',NULL,NULL,NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00');
UNLOCK TABLES;
/*!40000 ALTER TABLE user ENABLE KEYS;*/


#
# Table structure for table 'variables'
#

CREATE TABLE /*!32312 IF NOT EXISTS*/ `variables` (
  `var_symbol` varchar(20) collate latin1_general_ci NOT NULL COMMENT 'var symbols like <startdate> ',
  `var_description` varchar(50) collate latin1_general_ci default NULL COMMENT 'description of variable',
  `var_table` varchar(20) collate latin1_general_ci NOT NULL COMMENT 'name of table the value is stored',
  `var_field` varchar(20) collate latin1_general_ci NOT NULL COMMENT 'column / field name for value',
  `var_key` varchar(20) collate latin1_general_ci NOT NULL COMMENT 'criteria for the var. value',
  PRIMARY KEY  (`var_symbol`),
  UNIQUE KEY `var_symbol` (`var_symbol`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci COMMENT='table to store variable names for print outs\r\nfield prefix =';



#
# Dumping data for table 'variables'
#

