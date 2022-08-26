-- MySQL dump 10.19  Distrib 10.3.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: webdb
-- ------------------------------------------------------
-- Server version	10.3.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `u19_product`
--

DROP TABLE IF EXISTS `u19_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u19_product` (
  `product_number` varchar(30) NOT NULL,
  `product_category` varchar(30) DEFAULT NULL,
  `product_company` varchar(50) DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_modelname` varchar(30) DEFAULT NULL,
  `product_rdate` date DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `product_discount` int(11) DEFAULT NULL,
  `product_stock` int(11) DEFAULT NULL,
  `product_saleform` varchar(30) DEFAULT NULL,
  `product_imgpath` varchar(200) DEFAULT NULL,
  `product_description` text DEFAULT NULL,
  PRIMARY KEY (`product_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u19_product`
--

LOCK TABLES `u19_product` WRITE;
/*!40000 ALTER TABLE `u19_product` DISABLE KEYS */;
INSERT INTO `u19_product` VALUES ('A0001','에어컨','상우전자','상우에어컨','A0001','2021-11-09',30000,0,198,'일반세일','/images/uploads/products/82a1b55017be8ac6a158ef9faeb25759','이 에어컨은 너무너무 시원해서 한겨울인지 시베리안지 철원인지 분간이 안가요!! '),('A0002','에어컨','상우전자','지영에어컨','A0002','2021-11-09',3000000,0,197,'일반세일','/images/uploads/products/48e75d5d3cd63f51ea1e69a54b35ec5e','\'아, 구슬을 그냥 놓쳤어. \' 오징어게임 지영도 반한 바로 그 에어컨!!'),('AA1100','에어컨','(주)다얼전자','다얼려에어컨','AA9911','2021-11-11',300000,0,998,'일반세일','/images/uploads/products/dc7cbad11948a3fbf11c6fef75581546','얼음!!! 땡!!!! 틀면 주변사람들이 얼어버려!! 에어컨 ver'),('apple2322','선풍기','애플1','애플선풍기','ap333','2021-11-11',133333,0,3297,'일반세일','/images/uploads/products/1de030d65a7470075819f837ccbd3a4d','애플선풍기 좋아용 S급 아이템'),('AR1999','에어컨','별걸다(주)','벽걸이에어콘','BB991','2021-11-11',200000,0,186,'일반세일','/images/uploads/products/d6d8709addc3e6f896d888d45a0a08b4','에어컨을 벽에걸어???? 미친 발상의 연속!!! 감사합니다!!!'),('C0003','에어컨','깐부전자','기훈에이컨','C0003','2021-11-09',3000000,0,299,'일반세일','/images/uploads/products/503a3efedc2b50f0ea307d66f7e91dfb','기훈이도 좋아요~ 깐부끼리는 에어컨 싸게 주는거야~'),('F0001','선풍기','어름전자','얼음선풍기','fan0001','2021-11-11',40000,0,13,'일반세일','/images/uploads/products/5071703a6524e494af435cfac8481a83','얼음!!! 땡!!!! 틀면 주변사람들이 얼어버려!!'),('F0002','선풍기','하닐전자','원터치선풍기','fan0010','2021-11-11',62000,0,397,'일반세일','/images/uploads/products/8f983e6f3e997a68286f69e474bfdd59','원터치로 모든조작 완료!! 이런상품은 어디에도 없다!! 감사합니다!!'),('F0003','선풍기','엘자전자','터보풍선풍기','LJ009','2021-11-11',50000,0,32,'특별세일','/images/uploads/products/947689b4fb485e22f910e46ab064474f','터보풍 선풍기틀면 말 그대로 터보풍이 왕왕 나와'),('F0004','선풍기','초미전자','초미풍선풍기','CM9091','2021-11-11',35000,10,99,'일반세일','/images/uploads/products/0a98bc3ec6e990b35878949018e90c07','초미풍선풍기틀면 안튼거 처럼 미미~~한 바람이 살랑살랑 나와!!'),('FR001','냉장고','몽땅전자','다얼려냉장고','MFR001','2021-11-11',200000,20,398,'일반세일','/images/uploads/products/5c24d3800284a841fc90b7a52f564b9a','다얼려 냉장고의 냉동고는 전설이다... 무엇이든 한시간이면 어신다..'),('FR002','냉장고','남극전자','남극냉장고','NAM001','2021-11-11',500000,0,399,'일반세일','/images/uploads/products/e6eda5fb703827355279e6ccc21f334b','남극냉장고의 내부는 마치 남극을 연상하듯, 차갑습니다. '),('K0001','선풍기','코리아전자','코리아선풍기','K0001','2021-11-11',30000,0,296,'일반세일','/images/uploads/products/7caaca353ad29154fb7e1c2ded0bf85d','코리아 선풍기의 자존심. 코리아 선풍기.'),('K0002','선풍기','코리아전자','고려선풍기','K0002','2021-11-11',20000,0,298,'일반세일','/images/uploads/products/a1ac62dae84989a69c488f875c0919d8','미친 가성비, 코리아전자가 또 해냅니다.'),('K0003','선풍기','코리아전자','신라선풍기','K0003','2021-11-11',32000,0,300,'일반세일','/images/uploads/products/78b943cdc6ddfc0c13efa0d2175e07a4','코리아전자의 양심. 신라선풍기'),('K0004','선풍기','코리아전자','백제선풍기','K0004','2021-11-11',30000,0,397,'일반세일','/images/uploads/products/1d9ec94c4136472dba81bf82a88ad220','백제의 장인정신을 본받아 만든 선풍기는? 바로바로바로바로바로바로바로바로바로바로 백제 선풍기!!!!'),('M0100','미니선풍기','미니전자','미니미니','MM998','2021-11-11',16000,0,450,'일반세일','/images/uploads/products/132c5f42b3b4bbceff4af6e4520e4c40','미니미니하여 컴팩트컴팩트합니다'),('M0102','미니선풍기','사성전자','핸디선풍기','SS9888','2021-11-11',40000,0,48,'일반세일','/images/uploads/products/7b127b44cc70558d904d3cfb2adc9c26','손안에 착!! 감기는 컴팩트한 디자인'),('M0103','미니선풍기','마이전자','마이미니','MM002','2021-11-11',50000,0,775,'일반세일','/images/uploads/products/0699de75a94d407e55bb380d98c6ea49','마이미니는 나의 작은것이라는 뜻으로 영어권 문화를 공략한 상품입니다.'),('N0001','냉장고','깐부전자','깐부냉장고','N0001','2021-11-10',300000,0,398,'일반세일','/images/uploads/products/493421ce61ebd027d9aadb6f27a1d821','저희 판매몰만의 깐부 냉장고,, 추천드려요!'),('N0002','냉장고','깐부전자','정재냉장고','N0002','2021-11-09',400000,0,299,'일반세일','/images/uploads/products/99e429cc98cb86d7a16e2e011e2feccb','깐부냉장고의 후속상품 정재냉장고입니다.'),('N0003','냉장고','깐부전자','일남냉장고','N0003','2021-11-09',500000,0,299,'일반세일','/images/uploads/products/ed778304a259ef55c417574b43949144','정재냉장고의 초대박!! 고객감사 이벤트로 판매하는 업그레이드형 냉장고!!'),('N0004','냉장고','깐부전자','오징냉장고','N0004','2021-11-09',300000,0,398,'일반세일','/images/uploads/products/639579706bb1ca63fef2f1d6a9a47d07','깐부쇼핑몰의 실용성 최고의 모델!! 안사면 우리 깐부 아니야~'),('N0005','냉장고','깐부전자','병헌냉장고','N0005','2021-11-09',700000,0,29,'일반세일','/images/uploads/products/d0e87cb23cfcd058935326da49dd1bfa','깐부전자의 300년 노하우가 담겨있는 프리미엄 냉장고 놓치면 300년동안 후회합니다'),('sa222','선풍기','삼성','삼선선풍기','sa-232','2021-11-11',2000,0,304,'일반세일','/images/uploads/products/684019072cea2350adbe8c2fad507813','삼선선풍기 진짜 좋아요 굿굿'),('Y0001','냉풍기','새벽전자','새벽냉풍기','Y0001','2021-11-09',140000,0,331,'일반세일','/images/uploads/products/f0d4386cb2b3d149e6c9a4d7ca1d6a26','여름에 틀어도! 겨울에 틀어도! 항상 새벽의 기운을 느낄수 ! 있 어 요'),('Y0002','냉풍기','새벽전자','덕수냉풍기','Y0002','2021-11-09',120000,0,320,'','/images/uploads/products/ae2eddb687ad7d8c321bd3dcb30e210e','새벽전자의 회심의 상품! 시원함의 끝!'),('Y0003','냉풍기','새벽전자','기훈냉풍기','Y0003','2021-11-09',130000,0,299,'일반세일','/images/uploads/products/2d9d55f640cac9961c90f0b9debb8da7','오징어게임의 기훈이도 춥대요!! 기훈선풍기는 전설이다..'),('Y0004','냉풍기','새벽전자','알리선풍기','Y0004','2021-11-09',120000,0,299,'일반세일','/images/uploads/products/51d478656c55e09559a43abb47ff08fc','이선풍기는 배신안해요!! 알리도 믿고쓰는 선풍기!!'),('Y0005','냉풍기','새벽전자','미녀선풍기','Y0005','2021-11-09',300000,0,299,'일반세일','/images/uploads/products/bc8cc1794271ef4cf036e51c6e9cf2f4','미녀는 냉풍기를 좋아해~ 한미녀가 반한 바로 그 선풍기 추천합니다!');
/*!40000 ALTER TABLE `u19_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u19_user`
--

DROP TABLE IF EXISTS `u19_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u19_user` (
  `user_id` varchar(50) NOT NULL,
  `user_pw` varchar(200) DEFAULT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_phonenum` int(11) NOT NULL,
  `user_address` varchar(50) DEFAULT NULL,
  `user_mileage` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u19_user`
--

LOCK TABLES `u19_user` WRITE;
/*!40000 ALTER TABLE `u19_user` DISABLE KEYS */;
INSERT INTO `u19_user` VALUES ('admin@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','깐부관리자',66336633,'서울시 동호로 100',960000),('test001@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','김은영',33225243,'복정동 11-22',1000000),('test01@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','김은영',32324243,'서울시 동호로 102',296000),('test02@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','윤한길',32421231,'강원도 춘천시 지석로 97',703334),('test03@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','배다운',12301230,'서울시 동호로 103',960000),('test04@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','추빛가람',66221773,'서울시 동호로 109',810000),('test05@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','노광호',23462332,'서울시 동호로 110',1000000),('test06@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','노광호',74743246,'서울시 동호로 132',880000),('test07@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','오기용',98234932,'서울시 동호로 132',952000),('test08@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','황보우일',39726092,'서울시 동호로 132',1000000),('test09@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','조승은',97260938,'서울시 동호로 133',700000),('test10@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','제갈주미',97260938,'서울시 동호로 133',1000000),('test11@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','추한결',97298383,'서울시 동호로 143',1000000),('test12@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','정나길',97298383,'서울시 동호로 145',800000),('test13@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','예나길',97298383,'서울시 동호로 145',1000000),('test14@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','양나라우람',23423462,'서울시 동호로 1453',1000000),('test15@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','봉승남',52341232,'서울시 동호로 1453',94000000),('test16@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','표상철',23423221,'강원도 춘천시 지석로 23',88815001),('test17@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','홍우철',32421232,'강원도 춘천시 지석로 24',1000000),('test18@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','풍선옥',23527543,'강원도 춘천시 지석로 22',1000000),('test19@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','황은하',65756456,'강원도 춘천시 지석로 27',1000000),('test20@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','송나길',97983243,'강원도 춘천시 지석로 28',1000000),('test21@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','정석진',45642342,'강원도 춘천시 지석로 29',1000000),('test22@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','송호진',64362342,'강원도 춘천시 지석로 30',1000000),('test23@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','탁나라우람',56452342,'강원도 춘천시 지석로 31',1000000),('test24@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','윤바다',45332342,'강원도 춘천시 지석로 31',1000000),('test25@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','김으뜸',64566573,'강원도 춘천시 지석로 32',1000000),('test26@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','심나길',54642342,'강원도 춘천시 지석로 32',1000000),('test27@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','추우람',36335123,'강원도 춘천시 지석로 33',1000000),('test28@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','문건',34631231,'강원도 춘천시 지석로 32',1000000),('test29@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','설이레',34531231,'강원도 춘천시 지석로 39',1000000),('test30@gachon.ac.kr','d404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db','표웅',43531234,'강원도 춘천시 지석로 40',1000000);
/*!40000 ALTER TABLE `u19_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u19_comment`
--

DROP TABLE IF EXISTS `u19_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u19_comment` (
  `comment_number` int(11) NOT NULL AUTO_INCREMENT,
  `comment_contents` text DEFAULT NULL,
  `comment_rating` int(11) DEFAULT NULL,
  `comment_date` date DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `product_number` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`comment_number`),
  KEY `u19_comment` (`user_id`),
  KEY `product_number` (`product_number`),
  CONSTRAINT `u19_comment` FOREIGN KEY (`user_id`) REFERENCES `u19_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `u19_comment_ibfk_1` FOREIGN KEY (`product_number`) REFERENCES `u19_product` (`product_number`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u19_comment`
--

LOCK TABLES `u19_comment` WRITE;
/*!40000 ALTER TABLE `u19_comment` DISABLE KEYS */;
INSERT INTO `u19_comment` VALUES (48,'깐부냉장고 쵝오!!!',5,NULL,'test01@gachon.ac.kr','N0001'),(49,'그냥 저냥,, 쓸만해요',1,NULL,'test01@gachon.ac.kr','M0102'),(50,'마치 바람에서 사과향이 나는것 같습니다..',4,NULL,'test02@gachon.ac.kr','apple2322'),(51,'철원에 온것같아요,,, 추워어',5,NULL,'test02@gachon.ac.kr','A0001'),(52,'좋은데 잘 망가져요,, 재구매 X',3,NULL,'test03@gachon.ac.kr','F0001'),(53,'동작이 간편합니다',5,NULL,'test04@gachon.ac.kr','F0002'),(54,'컴팩트해요',5,NULL,'test04@gachon.ac.kr','M0103'),(55,'가격대비 별로에요',2,NULL,'test04@gachon.ac.kr','AA1100'),(56,'십사만원을 버리는 최고의 방법',2,NULL,'test04@gachon.ac.kr','Y0001'),(57,'터보풍소리가 너무 시끄러워요',1,NULL,'test06@gachon.ac.kr','F0003'),(58,'가전명가 새벽전자는 항상 믿고삽니다',4,NULL,'test06@gachon.ac.kr','Y0002'),(59,'성능은 좋은데 설치기사님이 너무 불친절해요',2,NULL,'test06@gachon.ac.kr','AR1999'),(60,'과대광고입니다 구매XXX',2,NULL,'test06@gachon.ac.kr','Y0003'),(61,'깐부냉장고 상위호환',4,NULL,'test07@gachon.ac.kr','N0002'),(62,'가볍게 구매할만해요',4,NULL,'test07@gachon.ac.kr','M0100'),(63,'알리선풍기는 전설이다',4,NULL,'test07@gachon.ac.kr','Y0004'),(64,'우일이가 추천하는 최고의 냉장고',4,NULL,'test08@gachon.ac.kr','N0003'),(65,'자연스러운 바람, 자연스럽지못한 가격',4,NULL,'test09@gachon.ac.kr','F0004'),(66,'작동이 안되요 ',1,NULL,'test09@gachon.ac.kr','sa222'),(67,'전기세가 절약되요',4,NULL,'test09@gachon.ac.kr','N0004'),(68,'돈값하네요 쓸만합니다',5,NULL,'test11@gachon.ac.kr','N0005'),(69,'냉동고온도가 아쉬워요',2,NULL,'test12@gachon.ac.kr','FR001'),(70,'남극에서 보관하는거 같아요!! 추천!!',5,NULL,'test12@gachon.ac.kr','FR002'),(71,'실용성갑 좋아용',5,NULL,'test13@gachon.ac.kr','N0004'),(72,'프리미엄라인답게 돈값합니다',4,NULL,'test15@gachon.ac.kr','A0002'),(73,'이가격에 이 옵션이...? 혁명입니다 이건',5,NULL,'test16@gachon.ac.kr','C0003'),(74,'애플선풍기 사용양호',5,NULL,'test16@gachon.ac.kr','apple2322'),(75,'싼건 이유가 있구나,,',1,NULL,'test16@gachon.ac.kr','M0102'),(77,'비싼건 답이다',4,NULL,'test16@gachon.ac.kr','Y0005'),(78,'쓸만함',4,NULL,'test16@gachon.ac.kr','Y0001'),(79,'쓸만해요',4,NULL,'test16@gachon.ac.kr','K0001'),(80,'별로',3,NULL,'test16@gachon.ac.kr','K0002'),(81,'내가 지금까지 써본 선풍기중 최악',2,NULL,'test16@gachon.ac.kr','K0003'),(82,'코리아전자 상품중에는 제일 좋아요',4,NULL,'test16@gachon.ac.kr','K0004');
/*!40000 ALTER TABLE `u19_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u19_order`
--

DROP TABLE IF EXISTS `u19_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `u19_order` (
  `order_number` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` date DEFAULT NULL,
  `product_number` varchar(30) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`order_number`),
  KEY `user_id` (`user_id`),
  KEY `product_number` (`product_number`),
  CONSTRAINT `u19_order_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `u19_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `u19_order_ibfk_4` FOREIGN KEY (`product_number`) REFERENCES `u19_product` (`product_number`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u19_order`
--

LOCK TABLES `u19_order` WRITE;
/*!40000 ALTER TABLE `u19_order` DISABLE KEYS */;
INSERT INTO `u19_order` VALUES (170,'2021-11-10','M0102','admin@gachon.ac.kr'),(171,'2021-11-10','apple2322','test02@gachon.ac.kr'),(172,'2021-11-10','apple2322','test02@gachon.ac.kr'),(173,'2021-11-10','F0001','test03@gachon.ac.kr'),(174,'2021-11-10','M0102','test01@gachon.ac.kr'),(175,'2021-11-10','M0103','test04@gachon.ac.kr'),(176,'2021-11-10','A0001','test02@gachon.ac.kr'),(177,'2021-11-10','Y0001','test04@gachon.ac.kr'),(178,'2021-11-10','N0001','test01@gachon.ac.kr'),(179,'2021-11-10','Y0002','test06@gachon.ac.kr'),(180,'2021-11-10','M0100','test07@gachon.ac.kr'),(181,'2021-11-10','M0100','test07@gachon.ac.kr'),(182,'2021-11-10','M0100','test07@gachon.ac.kr'),(183,'2021-11-10','N0004','test09@gachon.ac.kr'),(184,'2021-11-10','FR001','test12@gachon.ac.kr'),(185,'2021-11-10','A0002','test15@gachon.ac.kr'),(186,'2021-11-10','A0002','test15@gachon.ac.kr'),(187,'2021-11-10','apple2322','test16@gachon.ac.kr'),(188,'2021-11-10','apple2322','test16@gachon.ac.kr'),(189,'2021-11-10','C0003','test16@gachon.ac.kr'),(190,'2021-11-10','apple2322','test16@gachon.ac.kr'),(191,'2021-11-10','sa222','test16@gachon.ac.kr'),(192,'2021-11-10','F0001','test16@gachon.ac.kr'),(193,'2021-11-10','F0002','test16@gachon.ac.kr'),(194,'2021-11-10','F0003','test16@gachon.ac.kr'),(195,'2021-11-10','F0004','test16@gachon.ac.kr'),(196,'2021-11-10','M0100','test16@gachon.ac.kr'),(197,'2021-11-10','M0102','test16@gachon.ac.kr'),(198,'2021-11-10','M0103','test16@gachon.ac.kr'),(199,'2021-11-10','A0001','test16@gachon.ac.kr'),(200,'2021-11-10','A0001','test16@gachon.ac.kr'),(201,'2021-11-10','A0001','test16@gachon.ac.kr'),(202,'2021-11-10','A0002','test16@gachon.ac.kr'),(203,'2021-11-10','AA1100','test16@gachon.ac.kr'),(204,'2021-11-10','AR1999','test16@gachon.ac.kr'),(205,'2021-11-10','Y0001','test16@gachon.ac.kr'),(206,'2021-11-10','Y0002','test16@gachon.ac.kr'),(207,'2021-11-10','Y0003','test16@gachon.ac.kr'),(208,'2021-11-10','Y0004','test16@gachon.ac.kr'),(209,'2021-11-10','Y0005','test16@gachon.ac.kr'),(210,'2021-11-10','N0001','test16@gachon.ac.kr'),(211,'2021-11-10','N0002','test16@gachon.ac.kr'),(212,'2021-11-10','N0003','test16@gachon.ac.kr'),(213,'2021-11-10','N0004','test16@gachon.ac.kr'),(214,'2021-11-10','N0005','test16@gachon.ac.kr'),(215,'2021-11-10','FR001','test16@gachon.ac.kr'),(216,'2021-11-10','FR002','test16@gachon.ac.kr'),(217,'2021-11-11','K0001','test16@gachon.ac.kr'),(218,'2021-11-11','K0001','test16@gachon.ac.kr'),(219,'2021-11-11','K0001','test16@gachon.ac.kr'),(220,'2021-11-11','K0001','test16@gachon.ac.kr'),(221,'2021-11-11','K0002','test16@gachon.ac.kr'),(222,'2021-11-11','K0002','test16@gachon.ac.kr'),(223,'2021-11-11','K0004','test16@gachon.ac.kr'),(224,'2021-11-11','K0004','test16@gachon.ac.kr'),(225,'2021-11-11','K0004','test16@gachon.ac.kr'),(226,'2021-11-12','F0001','test01@gachon.ac.kr'),(227,'2021-11-12','F0001','test01@gachon.ac.kr'),(228,'2021-11-12','F0001','test01@gachon.ac.kr'),(229,'2021-11-12','F0001','test01@gachon.ac.kr'),(230,'2021-11-12','F0001','test01@gachon.ac.kr'),(231,'2021-11-12','F0002','test01@gachon.ac.kr'),(232,'2021-11-12','F0002','test01@gachon.ac.kr');
/*!40000 ALTER TABLE `u19_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-12 12:12:14
