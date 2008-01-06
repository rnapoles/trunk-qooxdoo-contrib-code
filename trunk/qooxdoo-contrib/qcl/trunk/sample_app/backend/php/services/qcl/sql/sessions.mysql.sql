CREATE TABLE `sessions` (
  `sessionId` varchar(50) NOT NULL default '',
  `user` varchar(50) NOT NULL,
  `messages` tinytext NOT NULL,
  `lastAction` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY  (`sessionId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8