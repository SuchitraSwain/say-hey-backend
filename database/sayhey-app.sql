-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2022 at 12:19 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `sayhey-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `registers`
--

CREATE TABLE `registers` (
  `srno` int(10) UNSIGNED NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_mno` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_pass` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registers`
--
ALTER TABLE `registers`
  ADD PRIMARY KEY (`u_mno`),
  ADD UNIQUE KEY `srno` (`srno`),
  ADD UNIQUE KEY `u_email` (`u_email`),
  ADD UNIQUE KEY `u_mno` (`u_mno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registers`
--
ALTER TABLE `registers`
  MODIFY `srno` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;
