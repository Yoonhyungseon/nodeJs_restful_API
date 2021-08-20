-- --------------------------------------------------------
-- 호스트:                          49.247.5.30
-- 서버 버전:                        5.5.68-MariaDB - MariaDB Server
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sumin 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sumin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sumin`;

-- 테이블 sumin.nodeJs_DB_BOARD 구조 내보내기
CREATE TABLE IF NOT EXISTS `nodeJs_DB_BOARD` (
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `contents` text,
  `images` varchar(200) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(50) DEFAULT NULL,
  `is_release` char(1) DEFAULT 'Y',
  `delete_yn` char(1) DEFAULT 'N',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- 테이블 데이터 sumin.nodeJs_DB_BOARD:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `nodeJs_DB_BOARD` DISABLE KEYS */;
INSERT IGNORE INTO `nodeJs_DB_BOARD` (`seq`, `title`, `contents`, `images`, `updated_at`, `created_by`, `is_release`, `delete_yn`) VALUES
	(1, 'titleTEST', 'contentsTEST', 'imagesTEST', '2021-08-18 13:22:27', 'created_byTEST', 'Y', 'N'),
	(2, 'new title!', 'new contents', 'new images', '2021-08-18 13:22:52', 'created_byTEST', 'Y', 'N');
/*!40000 ALTER TABLE `nodeJs_DB_BOARD` ENABLE KEYS */;

-- 테이블 sumin.nodeJs_DB_MEMBER 구조 내보내기
CREATE TABLE IF NOT EXISTS `nodeJs_DB_MEMBER` (
  `seq` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `USER_ID` varchar(50) DEFAULT NULL COMMENT '아이디',
  `USER_NM` varchar(50) DEFAULT NULL COMMENT '이름',
  `USER_PWD` varchar(50) DEFAULT NULL COMMENT '패스워드',
  `USER_TYPE` char(1) NOT NULL DEFAULT 'U' COMMENT '타입',
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 테이블 데이터 sumin.nodeJs_DB_MEMBER:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `nodeJs_DB_MEMBER` DISABLE KEYS */;
INSERT IGNORE INTO `nodeJs_DB_MEMBER` (`seq`, `USER_ID`, `USER_NM`, `USER_PWD`, `USER_TYPE`) VALUES
	(1, 'admin', '관리자', '1234', 'A');
/*!40000 ALTER TABLE `nodeJs_DB_MEMBER` ENABLE KEYS */;

-- 테이블 sumin.nodeJs_DB_NOTICE 구조 내보내기
CREATE TABLE IF NOT EXISTS `nodeJs_DB_NOTICE` (
  `seq` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `title` varchar(50) DEFAULT NULL COMMENT '글 제목',
  `contents` varchar(250) DEFAULT NULL COMMENT '글 내용',
  `images` varchar(50) DEFAULT NULL COMMENT '이미지 경로',
  `created_by` varchar(50) DEFAULT NULL COMMENT '작성자',
  `updated_at` datetime DEFAULT NULL COMMENT '작성일',
  `is_release` char(50) DEFAULT NULL COMMENT '노출 여부',
  `ranking` int(11) DEFAULT NULL COMMENT '노출 순위',
  `delete_yn` varchar(50) DEFAULT 'N' COMMENT '삭제 여부',
  PRIMARY KEY (`seq`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- 테이블 데이터 sumin.nodeJs_DB_NOTICE:~12 rows (대략적) 내보내기
/*!40000 ALTER TABLE `nodeJs_DB_NOTICE` DISABLE KEYS */;
INSERT IGNORE INTO `nodeJs_DB_NOTICE` (`seq`, `title`, `contents`, `images`, `created_by`, `updated_at`, `is_release`, `ranking`, `delete_yn`) VALUES
	(11, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:51:02', 'N', NULL, 'N'),
	(12, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:11', 'Y', 1, 'N'),
	(13, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:24', 'Y', 2, 'N'),
	(14, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:29', 'Y', 8, 'N'),
	(15, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:44', 'Y', NULL, 'N'),
	(16, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:46', 'Y', NULL, 'N'),
	(17, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:48', 'Y', NULL, 'N'),
	(18, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:49', 'Y', NULL, 'N'),
	(19, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:50', 'Y', NULL, 'N'),
	(20, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:50', 'Y', NULL, 'N'),
	(21, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 13:53:51', 'Y', NULL, 'N'),
	(22, 'new title!', 'new contents', 'new images', 'created_byTEST', '2021-07-12 14:54:28', 'Y', 15, 'Y');
/*!40000 ALTER TABLE `nodeJs_DB_NOTICE` ENABLE KEYS */;

-- 테이블 sumin.nodeJs_DB_QUSTION 구조 내보내기
CREATE TABLE IF NOT EXISTS `nodeJs_DB_QUSTION` (
  `seq` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `title` varchar(50) DEFAULT NULL COMMENT '글 제목',
  `contents` varchar(250) DEFAULT NULL COMMENT '글 내용',
  `images` varchar(50) DEFAULT NULL COMMENT '이미지 경로',
  `created_by` varchar(50) DEFAULT NULL COMMENT '작성자',
  `updated_at` datetime DEFAULT NULL COMMENT '작성일',
  `is_public` char(50) DEFAULT NULL COMMENT '공개 여부(사용자 조작)',
  `is_release` char(50) DEFAULT NULL COMMENT '노출 여부(관리자 조작)',
  `delete_yn` varchar(50) DEFAULT 'N' COMMENT '삭제 여부',
  PRIMARY KEY (`seq`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- 테이블 데이터 sumin.nodeJs_DB_QUSTION:~7 rows (대략적) 내보내기
/*!40000 ALTER TABLE `nodeJs_DB_QUSTION` DISABLE KEYS */;
INSERT IGNORE INTO `nodeJs_DB_QUSTION` (`seq`, `title`, `contents`, `images`, `created_by`, `updated_at`, `is_public`, `is_release`, `delete_yn`) VALUES
	(24, 'new title!', 'new contents', 'new images', 'created_byTEST', '2021-07-12 15:52:19', 'Y', 'Y', 'Y'),
	(26, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 15:28:43', NULL, 'Y', 'N'),
	(28, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 15:29:10', 'Ys', 'Y', 'N'),
	(29, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 15:37:03', 'N', 'N', 'N'),
	(30, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 15:37:17', 'N', 'N', 'N'),
	(31, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 18:13:07', 'Y', 'Y', 'N'),
	(32, 'titleTEST', 'contentsTEST', 'imagesTEST', 'created_byTEST', '2021-07-12 18:13:16', 'Y', 'Y', 'N');
/*!40000 ALTER TABLE `nodeJs_DB_QUSTION` ENABLE KEYS */;

-- 테이블 sumin.nodeJs_DB_QUSTION_ANS 구조 내보내기
CREATE TABLE IF NOT EXISTS `nodeJs_DB_QUSTION_ANS` (
  `seq` int(11) NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `up_seq` int(11) DEFAULT NULL COMMENT '참조번호',
  `contents` varchar(250) DEFAULT NULL COMMENT '글 내용',
  `images` varchar(50) DEFAULT NULL COMMENT '이미지 경로',
  `created_by` varchar(50) DEFAULT NULL COMMENT '작성자',
  `updated_at` datetime DEFAULT NULL COMMENT '작성일',
  `is_release` char(50) DEFAULT NULL COMMENT '노출 여부',
  `delete_yn` varchar(50) DEFAULT 'N' COMMENT '삭제 여부',
  PRIMARY KEY (`seq`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- 테이블 데이터 sumin.nodeJs_DB_QUSTION_ANS:~7 rows (대략적) 내보내기
/*!40000 ALTER TABLE `nodeJs_DB_QUSTION_ANS` DISABLE KEYS */;
INSERT IGNORE INTO `nodeJs_DB_QUSTION_ANS` (`seq`, `up_seq`, `contents`, `images`, `created_by`, `updated_at`, `is_release`, `delete_yn`) VALUES
	(1, 26, 'ans', 'ans img', 'admin', '2021-07-12 16:31:14', 'Y', 'N'),
	(27, 26, 'new contents', 'new images', 'created_byTEST', '2021-07-12 16:57:39', 'N', 'Y'),
	(28, 26, 'new contents', 'new images', 'created_byTEST', '2021-07-12 17:04:57', 'N', 'Y'),
	(29, 26, 'new contents', 'new images', 'created_byTEST', '2021-07-12 17:06:08', 'N', 'N'),
	(31, 32, '1', '1', '1', '2021-07-12 18:13:27', 'Y', 'N'),
	(32, 32, '2', '2', '2', '2021-07-12 18:13:30', 'Y', 'N'),
	(33, 32, '3', '3', '3', '2021-07-12 18:13:32', 'Y', 'N');
/*!40000 ALTER TABLE `nodeJs_DB_QUSTION_ANS` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
