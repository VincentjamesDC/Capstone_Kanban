-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 11, 2023 at 01:10 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kanban_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `week_issued` varchar(255) NOT NULL,
  `product_order` varchar(255) NOT NULL,
  `item_code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cutting` varchar(255) DEFAULT NULL,
  `date_cutted` date DEFAULT NULL,
  `assembly_prep` varchar(255) DEFAULT NULL,
  `date_preped` date DEFAULT NULL,
  `assembly_one` varchar(255) DEFAULT NULL,
  `date_assembled_one` date DEFAULT NULL,
  `assembly_two` varchar(255) DEFAULT NULL,
  `date_assembled_two` date DEFAULT NULL,
  `quality_control` varchar(255) DEFAULT NULL,
  `date_checked` date DEFAULT NULL,
  `finishing_one` varchar(255) DEFAULT NULL,
  `date_finished_one` date DEFAULT NULL,
  `finishing_two` varchar(255) DEFAULT NULL,
  `date_started` date NOT NULL,
  `date_finished` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `week_issued`, `product_order`, `item_code`, `description`, `quantity`, `cutting`, `date_cutted`, `assembly_prep`, `date_preped`, `assembly_one`, `date_assembled_one`, `assembly_two`, `date_assembled_two`, `quality_control`, `date_checked`, `finishing_one`, `date_finished_one`, `finishing_two`, `date_started`, `date_finished`, `created_at`, `updated_at`) VALUES
(1, 'WEEK 13', '31430', '9000-0031', '1541007 Imprassario Ch', 10, 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', '2023-04-01', '2023-04-01 00:39:06', '2023-04-01 02:53:12'),
(2, 'WEEK 13', '31478', '5092', 'Antechamber WS', 20, 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', 'Ok', '2023-04-01', '2023-04-01', '2023-04-01 00:39:20', '2023-04-01 06:57:27'),
(3, 'WEEK 13', '31691', '6000-0232', '1633001 Kole TL', 10, 'Ok', '2023-04-01', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01', NULL, '2023-04-01 00:39:40', '2023-04-01 05:26:28'),
(4, 'WEEK 13', '31773', '50000-0016', '1592006 Wild Earth WS', 15, 'In-Progress', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01', NULL, '2023-04-01 00:40:12', '2023-04-01 06:55:05'),
(5, 'WEEK 13', '31889', '9119', 'Hannah Chandelier 6e- 0921031', 10, 'Ok', '2023-04-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01', NULL, '2023-04-01 00:41:06', '2023-04-03 05:25:55'),
(6, 'WEEK 13', '31889', '50000-0013', '15112001 Zucchero WS', 15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01', NULL, '2023-04-01 02:54:37', '2023-04-01 02:54:37'),
(7, 'WEEK 13', '34176', '9861', 'Turbina 1121035 - FINE', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-01', NULL, '2023-04-01 07:09:09', '2023-04-01 07:09:09'),
(8, 'WEEK 14', '31832', '5000-0017', 'Demo Order', 23, 'Ok', '2023-04-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-03', NULL, '2023-04-03 05:20:25', '2023-04-03 05:20:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
