-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jan 14, 2025 at 11:12 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tea_factory`
--

-- --------------------------------------------------------

--
-- Table structure for table `advances`
--

DROP TABLE IF EXISTS `advances`;
CREATE TABLE IF NOT EXISTS `advances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reqestedAmount` decimal(8,2) NOT NULL,
  `comment` varchar(255) NOT NULL DEFAULT 'NO COMMENT ADDED',
  `acceptedAmount` decimal(8,2) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `remarks` varchar(255) DEFAULT 'NO REMARK ADDED',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `farmerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `farmerId` (`farmerId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `advances`
--

INSERT INTO `advances` (`id`, `reqestedAmount`, `comment`, `acceptedAmount`, `status`, `remarks`, `createdAt`, `updatedAt`, `farmerId`) VALUES
(1, '2500.00', 'additional weights ', NULL, 'pending', 'NO REMARK ADDED', '2024-11-13 21:12:12', '2024-11-13 21:12:12', 1),
(2, '3000.00', 'new weight', NULL, 'pending', 'NO REMARK ADDED', '2024-11-13 22:45:49', '2024-11-13 22:45:49', 1),
(3, '1000.00', 'add new weights ', NULL, 'pending', 'NO REMARK ADDED', '2024-11-14 23:10:58', '2024-11-14 23:10:58', 1),
(4, '3000.00', 'additional', NULL, 'pending', 'NO REMARK ADDED', '2024-12-26 13:53:55', '2024-12-26 13:53:55', 1),
(5, '3000.00', 'need', NULL, 'pending', 'NO REMARK ADDED', '2024-12-30 22:35:29', '2024-12-30 22:35:29', 1),
(6, '3000.00', 'task', NULL, 'pending', 'NO REMARK ADDED', '2024-12-30 22:37:56', '2024-12-30 22:37:56', 1);

-- --------------------------------------------------------

--
-- Table structure for table `collectingagents`
--

DROP TABLE IF EXISTS `collectingagents`;
CREATE TABLE IF NOT EXISTS `collectingagents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userProfileId` int(11) DEFAULT NULL,
  `collectingRegionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userProfileId` (`userProfileId`),
  KEY `collectingRegionId` (`collectingRegionId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collectingagents`
--

INSERT INTO `collectingagents` (`id`, `empId`, `createdAt`, `updatedAt`, `userProfileId`, `collectingRegionId`) VALUES
(1, 'CA1001', '2024-10-27 11:10:20', '2024-10-27 11:10:20', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `collectingregions`
--

DROP TABLE IF EXISTS `collectingregions`;
CREATE TABLE IF NOT EXISTS `collectingregions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `collectingregions`
--

INSERT INTO `collectingregions` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'LK_1', '202 suppliers', '2024-10-27 11:03:35', '2024-10-27 11:03:35'),
(2, 'LK_2', '98 suppliers', '2024-10-27 11:03:44', '2024-10-27 11:03:44'),
(3, 'LK_3', '98 suppliers', '2024-10-27 11:03:50', '2024-10-27 11:03:50'),
(4, 'LK_4', '98 suppliers', '2024-10-27 11:03:55', '2024-10-27 11:03:55'),
(5, 'LK_5', '190 suppliers', '2024-10-27 11:04:02', '2024-10-27 11:04:02');

-- --------------------------------------------------------

--
-- Table structure for table `coordinators`
--

DROP TABLE IF EXISTS `coordinators`;
CREATE TABLE IF NOT EXISTS `coordinators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userProfileId` int(11) DEFAULT NULL,
  `collectingRegionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userProfileId` (`userProfileId`),
  KEY `collectingRegionId` (`collectingRegionId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coordinators`
--

INSERT INTO `coordinators` (`id`, `empId`, `createdAt`, `updatedAt`, `userProfileId`, `collectingRegionId`) VALUES
(1, 'C1001', '2024-10-27 11:05:54', '2024-10-27 11:05:54', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `farmerrevenues`
--

DROP TABLE IF EXISTS `farmerrevenues`;
CREATE TABLE IF NOT EXISTS `farmerrevenues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_for_weight` decimal(10,2) NOT NULL,
  `deduction_for_loan` decimal(10,2) NOT NULL,
  `deduction_for_advance` decimal(10,2) NOT NULL,
  `total_Rervenue` decimal(12,2) NOT NULL,
  `date` datetime NOT NULL,
  `remark` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmerrevenues`
--

INSERT INTO `farmerrevenues` (`id`, `payment_for_weight`, `deduction_for_loan`, `deduction_for_advance`, `total_Rervenue`, `date`, `remark`, `createdAt`, `updatedAt`) VALUES
(1, '50.00', '0.00', '0.00', '5000.00', '2024-11-02 11:54:29', '1730548469548 - Revenue', '2024-11-02 11:54:29', '2024-11-02 11:54:29'),
(2, '80.00', '0.00', '0.00', '8000.00', '2024-11-06 00:25:48', '1730852748349 - Revenue', '2024-11-06 00:25:48', '2024-11-06 00:25:48'),
(3, '20.00', '0.00', '0.00', '2000.00', '2024-12-26 13:24:38', '1735219478898 - Revenue', '2024-12-26 13:24:38', '2024-12-26 13:24:38'),
(4, '80.00', '0.00', '0.00', '8000.00', '2024-12-26 13:37:10', '1735220230132 - Revenue', '2024-12-26 13:37:10', '2024-12-26 13:37:10'),
(5, '80.00', '0.00', '0.00', '8000.00', '2024-12-26 13:46:17', '1735220777306 - Revenue', '2024-12-26 13:46:17', '2024-12-26 13:46:17'),
(6, '80.00', '0.00', '0.00', '8000.00', '2024-12-30 22:20:54', '1735597254481 - Revenue', '2024-12-30 22:20:54', '2024-12-30 22:20:54');

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

DROP TABLE IF EXISTS `farmers`;
CREATE TABLE IF NOT EXISTS `farmers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplierCode` varchar(255) NOT NULL,
  `RFID` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userProfileId` int(11) DEFAULT NULL,
  `coordinatorId` int(11) DEFAULT NULL,
  `collectingAgentId` int(11) DEFAULT NULL,
  `collectingRegionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userProfileId` (`userProfileId`),
  KEY `coordinatorId` (`coordinatorId`),
  KEY `collectingAgentId` (`collectingAgentId`),
  KEY `collectingRegionId` (`collectingRegionId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`id`, `supplierCode`, `RFID`, `createdAt`, `updatedAt`, `userProfileId`, `coordinatorId`, `collectingAgentId`, `collectingRegionId`) VALUES
(1, 'SUP1001', '31 2D 22 E4', '2024-10-27 11:12:29', '2024-10-27 11:12:29', 5, 1, 1, 1),
(2, 'SUP1002', '1257We3', '2024-11-04 14:04:49', '2024-11-04 14:04:49', 8, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
CREATE TABLE IF NOT EXISTS `logins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'offline',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `name`, `email`, `password`, `role`, `lastLogin`, `avatar`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Sanjaya', 'manager@domain.com', '$2a$10$AE4S9cadVN37.RU/cbI2.etAGCZAy5J04e4BmEd39/PF.OUWj42NC', 'factory-manager', '2024-12-25 16:38:55', 'aaaa', 'online', '2024-10-27 11:04:25', '2024-12-25 16:38:55'),
(2, 'aaaa', 'coordinater26@domain.com', '$2a$10$VIeAdtuFEKgNZVUzKWa99ePSlzBOvN5p8.IyXtQ3yNQi8sWNCrFiK', 'coordinater', '2024-12-26 14:05:26', 'aaaa', 'online', '2024-10-27 11:05:54', '2024-12-26 14:05:26'),
(3, 'Sanjaya', 'vagent@domain.com', '$2a$10$9Rs7sz56pEhluPTiuyrZgOvJhEOomKkoX7EnOkeR0sEdjvnjklefi', 'verification-agent', '2024-11-06 00:29:14', '', 'online', '2024-10-27 11:08:19', '2024-11-06 00:29:14'),
(4, 'aaaa', 'cagent@domain.com', '$2a$10$mb8sJLS.ItHwStdy.9VVQ.tg8En09QUO8zRf0rNio47qRAe.Qev.e', 'collecting-agent', '2024-12-30 22:29:34', '', 'online', '2024-10-27 11:10:20', '2024-12-30 22:29:34'),
(5, 'aaaa', 'farmer12@domain.com', '$2a$10$Z4XImlo62AXLicN3AjL0kON.iQx5ikoaHudMmwkRkGG1iB3xwVh7u', 'farmer', '2024-12-30 22:37:41', 'aaaa', 'online', '2024-10-27 11:12:29', '2024-12-30 22:37:41'),
(6, 'Nusly', 'manager2@domain.com', '$2a$10$qqnLspTZFxRl7GbciHv5.uzbyK//sv1OZ1Gln3KRPVdxRuNrQ8xem', 'factory-manager', '2024-12-26 14:11:09', 'aaaa', 'online', '2024-11-02 13:19:06', '2024-12-26 14:11:09'),
(7, 'Nusly', 'vagent2@domain.com', '$2a$10$/Qb3EeGNt/b5VS1QcleOMOQRls3kbmxPunag.nbbN0AZ444dWnJIu', 'verification-agent', '2024-12-30 22:25:22', '', 'online', '2024-11-02 13:21:33', '2024-12-30 22:25:22'),
(8, 'weerakody', 'weerakody.sandun@gmail.com', '$2a$10$5WlpBbG9BzkqU2Re0.6Ie.9/Am40P73elDqmtJFcX5KjJ34Gxssqm', 'farmer', '2024-12-25 17:44:54', '', 'online', '2024-11-04 14:04:49', '2024-12-25 17:44:54');

-- --------------------------------------------------------

--
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
CREATE TABLE IF NOT EXISTS `rates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rate` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagId` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `activatedTime` datetime NOT NULL,
  `releaseTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `tagId`, `status`, `activatedTime`, `releaseTime`, `createdAt`, `updatedAt`) VALUES
(3, '14953ca7', 'active', '2024-12-26 13:24:38', '2024-12-27 01:24:38', '2024-12-26 13:24:38', '2024-12-26 13:24:38'),
(4, '6f5bed3d', 'active', '2024-12-26 13:37:09', '2024-12-27 01:37:09', '2024-12-26 13:37:10', '2024-12-26 13:37:10'),
(6, '79dced3d', 'active', '2024-12-30 22:20:54', '2024-12-31 10:20:54', '2024-12-30 22:20:54', '2024-12-30 22:20:54');

-- --------------------------------------------------------

--
-- Table structure for table `teabuckets`
--

DROP TABLE IF EXISTS `teabuckets`;
CREATE TABLE IF NOT EXISTS `teabuckets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `weight` decimal(5,2) NOT NULL,
  `waterWeight` decimal(5,2) NOT NULL,
  `bagWeight` decimal(5,2) NOT NULL,
  `netWeight` decimal(5,2) NOT NULL,
  `qualityGrade` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `farmerId` int(11) DEFAULT NULL,
  `tagId` int(11) DEFAULT NULL,
  `farmerRevenueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `farmerId` (`farmerId`),
  KEY `tagId` (`tagId`),
  KEY `farmerRevenueId` (`farmerRevenueId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teabuckets`
--

INSERT INTO `teabuckets` (`id`, `date`, `weight`, `waterWeight`, `bagWeight`, `netWeight`, `qualityGrade`, `remarks`, `createdAt`, `updatedAt`, `farmerId`, `tagId`, `farmerRevenueId`) VALUES
(3, '2024-12-26', '20.00', '0.00', '0.00', '20.00', 'Best', '', '2024-12-26 13:24:38', '2024-12-26 13:24:38', 1, 3, 3),
(4, '2024-12-26', '80.00', '0.00', '0.00', '80.00', 'Premium ', '', '2024-12-26 13:37:10', '2024-12-26 13:37:10', 1, 4, 4),
(6, '2024-12-30', '80.00', '0.00', '0.00', '80.00', 'Best', '', '2024-12-30 22:20:54', '2024-12-30 22:20:54', 1, 6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `userprofiles`
--

DROP TABLE IF EXISTS `userprofiles`;
CREATE TABLE IF NOT EXISTS `userprofiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `loginId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `loginId` (`loginId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userprofiles`
--

INSERT INTO `userprofiles` (`id`, `firstName`, `middleName`, `lastName`, `address`, `contact`, `createdAt`, `updatedAt`, `loginId`) VALUES
(1, 'Sanjaya', 'Janakantha', 'DDDD', 'DDDD', '0761631054', '2024-10-27 11:04:25', '2024-10-27 11:04:25', 1),
(2, 'Coordinater 1', 'DDDD', 'DDDD', 'DDDD', '0761631054', '2024-10-27 11:05:54', '2024-10-27 11:05:54', 2),
(3, 'vagent', 'vagent', 'vagent', 'galle', '0761631054', '2024-10-27 11:08:19', '2024-10-27 11:08:19', 3),
(4, 'cagent', 'cagent', 'cagent', 'galle', '0773212932', '2024-10-27 11:10:20', '2024-10-27 11:10:20', 4),
(5, 'Farmer', 'gunapala', 'DDDD', 'DDDD', '0761631054', '2024-10-27 11:12:29', '2024-10-27 11:12:29', 5),
(6, 'Nusly', 'Nizam', 'DDDD', 'DDDD', '07492864110', '2024-11-02 13:19:06', '2024-11-02 13:19:06', 6),
(7, 'vagent', 'vagent', 'vagent', 'Aluthgama', '+447492864110', '2024-11-02 13:21:33', '2024-11-02 13:21:33', 7),
(8, 'somapala', 'sandun', 'weerakody', 'Colombo', '0784682812', '2024-11-04 14:04:49', '2024-11-04 14:04:49', 8);

-- --------------------------------------------------------

--
-- Table structure for table `vialationsreports`
--

DROP TABLE IF EXISTS `vialationsreports`;
CREATE TABLE IF NOT EXISTS `vialationsreports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userProfileId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userProfileId` (`userProfileId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vialationsreports`
--

INSERT INTO `vialationsreports` (`id`, `description`, `createdAt`, `updatedAt`, `userProfileId`) VALUES
(1, '40 shortage ', '2024-11-12 22:26:53', '2024-11-12 22:26:53', 7),
(2, '30 shortage ', '2024-11-13 21:20:59', '2024-11-13 21:20:59', 7),
(3, '30 shortage\n', '2024-12-26 13:50:30', '2024-12-26 13:50:30', 7),
(4, '30 shortage ', '2024-12-30 22:26:24', '2024-12-30 22:26:24', 7);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advances`
--
ALTER TABLE `advances`
  ADD CONSTRAINT `advances_ibfk_1` FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `collectingagents`
--
ALTER TABLE `collectingagents`
  ADD CONSTRAINT `collectingagents_ibfk_1` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `collectingagents_ibfk_2` FOREIGN KEY (`collectingRegionId`) REFERENCES `collectingregions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `collectingagents_ibfk_3` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `collectingagents_ibfk_4` FOREIGN KEY (`collectingRegionId`) REFERENCES `collectingregions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `coordinators`
--
ALTER TABLE `coordinators`
  ADD CONSTRAINT `coordinators_ibfk_1` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coordinators_ibfk_2` FOREIGN KEY (`collectingRegionId`) REFERENCES `collectingregions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coordinators_ibfk_3` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coordinators_ibfk_4` FOREIGN KEY (`collectingRegionId`) REFERENCES `collectingregions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `farmers`
--
ALTER TABLE `farmers`
  ADD CONSTRAINT `farmers_ibfk_1` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `farmers_ibfk_3` FOREIGN KEY (`collectingAgentId`) REFERENCES `collectingagents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `farmers_ibfk_4` FOREIGN KEY (`collectingRegionId`) REFERENCES `collectingregions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `farmers_ibfk_5` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `farmers_ibfk_6` FOREIGN KEY (`coordinatorId`) REFERENCES `coordinators` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `farmers_ibfk_7` FOREIGN KEY (`collectingAgentId`) REFERENCES `collectingagents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `farmers_ibfk_8` FOREIGN KEY (`collectingRegionId`) REFERENCES `collectingregions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teabuckets`
--
ALTER TABLE `teabuckets`
  ADD CONSTRAINT `teabuckets_ibfk_3` FOREIGN KEY (`farmerRevenueId`) REFERENCES `farmerrevenues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teabuckets_ibfk_4` FOREIGN KEY (`farmerId`) REFERENCES `farmers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teabuckets_ibfk_5` FOREIGN KEY (`tagId`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teabuckets_ibfk_6` FOREIGN KEY (`farmerRevenueId`) REFERENCES `farmerrevenues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userprofiles`
--
ALTER TABLE `userprofiles`
  ADD CONSTRAINT `userprofiles_ibfk_1` FOREIGN KEY (`loginId`) REFERENCES `logins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vialationsreports`
--
ALTER TABLE `vialationsreports`
  ADD CONSTRAINT `vialationsreports_ibfk_1` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vialationsreports_ibfk_2` FOREIGN KEY (`userProfileId`) REFERENCES `userprofiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
