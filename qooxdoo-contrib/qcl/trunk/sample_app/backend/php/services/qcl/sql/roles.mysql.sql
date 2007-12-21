CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `namedId` varchar(50) character set utf8 NOT NULL default '',
  `name` varchar(50) character set utf8 NOT NULL default '',
  `note` varchar(255) character set utf8 default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci