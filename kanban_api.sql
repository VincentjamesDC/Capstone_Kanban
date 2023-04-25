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
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_03_28_141500_orders', 1);

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

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `department`, `role`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Cutting Head', 'cutting@example.com', '2023-04-01 00:32:41', 'Cutting', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'hyJsHfut3qqESozoKWk7AUmcLVmjIjuJ1EBvxLUlwP20Zcnb3zSthve6GNHp', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(2, 'Assembly Prep Head', 'prep@example.com', '2023-04-01 00:32:41', 'Assembly-Prep', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'oEfBo3HkR1d5DYr94lGChWfQT2FUoPayZOHJK0IpnmcnaUWTrbvSX3yAlawN', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(3, 'Assembly 1 Head', 'assembly1@example.com', '2023-04-01 00:32:41', 'Assembly-1', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'cdh5oqPaWayDcBFkEF1vJywe6uf8yyIhvZ0eWJGRCpEY7FuHbUcox8KMejdA', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(4, 'Assembly 2 Head', 'assembly2@example.com', '2023-04-01 00:32:41', 'Assembly-2', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '1gLhltTUSZVMFoUaEBnvFsRlsWY9sw6pSU5FD0avOP3PVS1n0Bwc9rquzxEm', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(5, 'Quality Control Head', 'quality@example.com', '2023-04-01 00:32:41', 'Quality-Control', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'XmbDz9S8qQrVFliHfwd6T3ALZaEfohgjRNLBaz5MGE3HLm5ftoUjYNAirvNQ', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(6, 'Finishing 1 Head', 'finishing1@example.com', '2023-04-01 00:32:41', 'Finishing-1', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'FUAUFVoPFweHJvq0L7kgoX3nW6D2x4F1vLFxpiUNLBGQiM0veNvHeO44xtxB', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(7, 'Finishing 2 Head', 'finishing2@example.com', '2023-04-01 00:32:41', 'Finishing-2', 'User', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'p0BNgQZmbbLMwKPUvnIAqGZJC18pYQPHIzGoFmqvZrMt7AGpVMjAFT7fbcLu', '2023-04-01 00:32:41', '2023-04-01 00:32:41'),
(8, 'Test Admin', 'admin@example.com', '2023-04-01 00:32:41', 'IT', 'Admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'lhNdM0DDfWcoFoxxW79ZlkVauSKq35Q3251cna4uxdAF89cczMWuxVjDqadF', '2023-04-01 00:32:41', '2023-04-01 00:32:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
