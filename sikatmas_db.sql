-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2024 at 10:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sikatmas_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `fakultas`
--

CREATE TABLE `fakultas` (
  `id_fakultas` int(11) NOT NULL,
  `nama_fakultas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fakultas`
--

INSERT INTO `fakultas` (`id_fakultas`, `nama_fakultas`) VALUES
(1, 'Teknik');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa_ub`
--

CREATE TABLE `mahasiswa_ub` (
  `nim` varchar(20) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `kota_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `id_fakultas` int(11) NOT NULL,
  `id_prog_studi` int(11) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa_ub`
--

INSERT INTO `mahasiswa_ub` (`nim`, `nama_lengkap`, `kota_lahir`, `tanggal_lahir`, `id_fakultas`, `id_prog_studi`, `gambar`) VALUES
('2351506067111020', 'Fahri Hanafi', 'Karanganyar', '2004-08-12', 1, 1, 'john.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa_ub_ktm`
--

CREATE TABLE `mahasiswa_ub_ktm` (
  `nim` varchar(20) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `kota_lahir` varchar(255) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `id_fakultas` int(11) NOT NULL,
  `id_prog_studi` int(11) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prog_studi`
--

CREATE TABLE `prog_studi` (
  `id_prog_studi` int(11) NOT NULL,
  `id_fakultas` int(11) NOT NULL,
  `nama_prog_studi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prog_studi`
--

INSERT INTO `prog_studi` (`id_prog_studi`, `id_fakultas`, `nama_prog_studi`) VALUES
(1, 1, 'Teknik Industri'),
(2, 1, 'Teknik Industri');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fakultas`
--
ALTER TABLE `fakultas`
  ADD PRIMARY KEY (`id_fakultas`);

--
-- Indexes for table `mahasiswa_ub`
--
ALTER TABLE `mahasiswa_ub`
  ADD PRIMARY KEY (`nim`),
  ADD KEY `id_fakultas` (`id_fakultas`),
  ADD KEY `id_prog_studi` (`id_prog_studi`);

--
-- Indexes for table `mahasiswa_ub_ktm`
--
ALTER TABLE `mahasiswa_ub_ktm`
  ADD PRIMARY KEY (`nim`),
  ADD KEY `id_fakultas` (`id_fakultas`),
  ADD KEY `id_prog_studi` (`id_prog_studi`);

--
-- Indexes for table `prog_studi`
--
ALTER TABLE `prog_studi`
  ADD PRIMARY KEY (`id_prog_studi`),
  ADD KEY `id_fakultas` (`id_fakultas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fakultas`
--
ALTER TABLE `fakultas`
  MODIFY `id_fakultas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prog_studi`
--
ALTER TABLE `prog_studi`
  MODIFY `id_prog_studi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mahasiswa_ub`
--
ALTER TABLE `mahasiswa_ub`
  ADD CONSTRAINT `mahasiswa_ub_ibfk_1` FOREIGN KEY (`id_fakultas`) REFERENCES `fakultas` (`id_fakultas`) ON DELETE CASCADE,
  ADD CONSTRAINT `mahasiswa_ub_ibfk_2` FOREIGN KEY (`id_prog_studi`) REFERENCES `prog_studi` (`id_prog_studi`) ON DELETE CASCADE;

--
-- Constraints for table `mahasiswa_ub_ktm`
--
ALTER TABLE `mahasiswa_ub_ktm`
  ADD CONSTRAINT `mahasiswa_ub_ktm_ibfk_1` FOREIGN KEY (`id_fakultas`) REFERENCES `fakultas` (`id_fakultas`) ON DELETE CASCADE,
  ADD CONSTRAINT `mahasiswa_ub_ktm_ibfk_2` FOREIGN KEY (`id_prog_studi`) REFERENCES `prog_studi` (`id_prog_studi`) ON DELETE CASCADE;

--
-- Constraints for table `prog_studi`
--
ALTER TABLE `prog_studi`
  ADD CONSTRAINT `prog_studi_ibfk_1` FOREIGN KEY (`id_fakultas`) REFERENCES `fakultas` (`id_fakultas`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
