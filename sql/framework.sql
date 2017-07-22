-- --------------------------------------------------------
-- Host:                         ftpit.media-magic.ca
-- Server version:               5.7.16-0ubuntu0.16.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for chat-unmetered
CREATE DATABASE IF NOT EXISTS `chat-unmetered` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `chat-unmetered`;


-- Dumping structure for table chat-unmetered.API
CREATE TABLE IF NOT EXISTS `API` (
  `ke` varchar(50) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Auth
CREATE TABLE IF NOT EXISTS `Auth` (
  `uni` varchar(100) NOT NULL,
  `id` varchar(50) NOT NULL,
  `ke` varchar(50) NOT NULL,
  `auth` varchar(24) NOT NULL,
  `mas` int(1) NOT NULL DEFAULT '0',
  `last` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uni` (`uni`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Banned
CREATE TABLE IF NOT EXISTS `Banned` (
  `ip` varchar(40) NOT NULL,
  `ke` varchar(50) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `text` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Chats
CREATE TABLE IF NOT EXISTS `Chats` (
  `id` varchar(20) NOT NULL,
  `co` int(3) NOT NULL,
  `ke` varchar(20) NOT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `history` mediumtext NOT NULL,
  `user` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Crumbs
CREATE TABLE IF NOT EXISTS `Crumbs` (
  `id` varchar(20) DEFAULT NULL,
  `ke` varchar(20) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `brd` text,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Details
CREATE TABLE IF NOT EXISTS `Details` (
  `ke` varchar(20) NOT NULL,
  `resp` longtext NOT NULL,
  `roles` text,
  `depts` text,
  `subs` mediumtext,
  `rates` mediumtext,
  `chans` mediumtext,
  `clients` longtext,
  UNIQUE KEY `ke` (`ke`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Logs
CREATE TABLE IF NOT EXISTS `Logs` (
  `ke` varchar(20) DEFAULT NULL,
  `id` varchar(20) DEFAULT NULL,
  `cd` int(1) NOT NULL DEFAULT '0',
  `ms` tinytext,
  `ti` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Messages
CREATE TABLE IF NOT EXISTS `Messages` (
  `id` varchar(20) NOT NULL,
  `ke` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `msg` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '1',
  `ip` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Missed
CREATE TABLE IF NOT EXISTS `Missed` (
  `id` varchar(50) DEFAULT NULL,
  `ke` varchar(20) DEFAULT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ke` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `pass` text NOT NULL,
  `ref` text,
  `shfr` text NOT NULL,
  `shto` text NOT NULL,
  `perm` text NOT NULL,
  `ops` text NOT NULL,
  `ids` text NOT NULL,
  `type` int(2) NOT NULL DEFAULT '0',
  `hist` int(2) NOT NULL DEFAULT '10',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ke` (`ke`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Ratings
CREATE TABLE IF NOT EXISTS `Ratings` (
  `ke` varchar(20) NOT NULL,
  `id` varchar(20) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `rate` text NOT NULL,
  `page` tinytext NOT NULL,
  `user` tinytext NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Recordings
CREATE TABLE IF NOT EXISTS `Recordings` (
  `id` varchar(50) NOT NULL,
  `ke` varchar(50) NOT NULL,
  `file` varchar(50) NOT NULL,
  `start` timestamp NULL DEFAULT NULL,
  `end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Responses
CREATE TABLE IF NOT EXISTS `Responses` (
  `id` varchar(20) NOT NULL,
  `ke` varchar(20) NOT NULL,
  `resp` varchar(20) NOT NULL,
  `shared` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table chat-unmetered.Sites
CREATE TABLE IF NOT EXISTS `Sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` tinytext NOT NULL,
  `owners` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
