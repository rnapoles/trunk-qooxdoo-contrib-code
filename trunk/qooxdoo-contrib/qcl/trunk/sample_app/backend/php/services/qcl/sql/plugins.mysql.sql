CREATE TABLE `plugins` (
  `namedId` varchar(50) collate utf8_unicode_ci NOT NULL,
  `type` varchar(20) character set utf8 NOT NULL default '',
  `active` int(1) default NULL,
  `status` varchar(50) character set utf8 default NULL,
  `permission` varchar(50) character set utf8 default NULL,
  `author` varchar(100) character set utf8 default NULL,
  `description` varchar(100) character set utf8 default NULL,
  PRIMARY KEY  (`namedId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci