/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.20 : Database - newly-married
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`newly-married` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `newly-married`;

/*Table structure for table `choice` */

DROP TABLE IF EXISTS `choice`;

CREATE TABLE `choice` (
  `ch_Id` int(50) NOT NULL AUTO_INCREMENT,
  `ch_Month` varchar(255) NOT NULL,
  PRIMARY KEY (`ch_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `choice` */

insert  into `choice`(`ch_Id`,`ch_Month`) values (1,'一月'),(2,'二月'),(3,'三月'),(4,'四月'),(5,'五月'),(6,'六月'),(7,'七月'),(8,'八月'),(9,'九月'),(10,'十月'),(11,'十一月'),(12,'十二月');

/*Table structure for table `img` */

DROP TABLE IF EXISTS `img`;

CREATE TABLE `img` (
  `img_Id` int(50) NOT NULL AUTO_INCREMENT,
  `img_Src` varchar(255) NOT NULL,
  `img_ThemeId` int(50) DEFAULT NULL,
  `img_MonthId` int(50) DEFAULT NULL,
  `img_ChoiceId` int(50) DEFAULT NULL,
  PRIMARY KEY (`img_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8;

/*Data for the table `img` */

insert  into `img`(`img_Id`,`img_Src`,`img_ThemeId`,`img_MonthId`,`img_ChoiceId`) values (1,'http://loaclhost:3030/static/img/Month/one_month/yanjiao.jpg',1,1,NULL),(2,'http://loaclhost:3030/static/img/Month/one_month/ailisi.jpg',1,1,NULL),(3,'http://loaclhost:3030/static/img/Month/one_month/mengjing.jpg',1,1,NULL),(4,'http://loaclhost:3030/static/img/Month/one_month/sx.jpg',1,1,NULL),(5,'http://loaclhost:3030/static/img/Month/one_month/xiaxiang.jpg',1,1,NULL),(6,'http://loaclhost:3030/static/img/Month/one_month/xiaxiang.jpg',1,1,NULL),(7,'http://loaclhost:3030/static/img/Month/one_month/one/xh1.jpg',NULL,NULL,1),(8,'http://loaclhost:3030/static/img/Month/one_month/one/xh2.jpg',NULL,NULL,1),(9,'http://loaclhost:3030/static/img/Month/one_month/one/xh3.jpg',NULL,NULL,1),(10,'http://loaclhost:3030/static/img/Month/one_month/one/xh4.jpg',NULL,NULL,1),(11,'http://loaclhost:3030/static/img/Month/one_month/one/xh5.jpg',NULL,NULL,1),(12,'http://loaclhost:3030/static/img/Month/two_month/weilan.jpg',1,2,NULL),(13,'http://loaclhost:3030/static/img/Month/two_month/quesheng.jpg',1,2,NULL),(14,'http://loaclhost:3030/static/img/Month/two_month/dengdai.jpg',1,2,NULL),(15,'http://loaclhost:3030/static/img/Month/two_month/doushi.jpg',1,2,NULL),(16,'http://loaclhost:3030/static/img/Month/two_month/xinfashi.jpg',1,2,NULL),(17,'http://loaclhost:3030/static/img/Month/two_month/zhefeiji.jpg',1,2,NULL),(18,'http://loaclhost:3030/static/img/Month/two_month/two/xh1.jpg',NULL,NULL,2),(19,'http://loaclhost:3030/static/img/Month/two_month/two/xh2.jpg',NULL,NULL,2),(20,'http://loaclhost:3030/static/img/Month/two_month/two/xh3.jpg',NULL,NULL,2),(21,'http://loaclhost:3030/static/img/Month/two_month/two/xh4.jpg',NULL,NULL,2),(22,'http://loaclhost:3030/static/img/Month/two_month/two/xh5.jpg',NULL,NULL,2),(23,'http://loaclhost:3030/static/img/Month/there_month/caizi.jpg',1,3,NULL),(24,'http://loaclhost:3030/static/img/Month/there_month/maitian.jpg',1,3,NULL),(25,'http://loaclhost:3030/static/img/Month/there_month/xinyiyuan.jpg',1,3,NULL),(26,'http://loaclhost:3030/static/img/Month/there_month/there/xh1.jpg',NULL,NULL,3),(27,'http://loaclhost:3030/static/img/Month/there_month/there/xh2.jpg',NULL,NULL,3),(28,'http://loaclhost:3030/static/img/Month/there_month/there/xh3.jpg',NULL,NULL,3),(29,'http://loaclhost:3030/static/img/Month/there_month/there/xh4.jpg',NULL,NULL,3),(30,'http://loaclhost:3030/static/img/Month/there_month/there/xh5.jpg',NULL,NULL,3),(31,'http://loaclhost:3030/static/img/Month/there_month/there/xh6.jpg',NULL,NULL,3),(32,'http://loaclhost:3030/static/img/Month/there_month/there/xh7.jpg',NULL,NULL,3),(33,'http://loaclhost:3030/static/img/Month/there_month/there/xh8.jpg',NULL,NULL,3),(34,'http://loaclhost:3030/static/img/Month/there_month/there/xh9.jpg',NULL,NULL,3),(35,'http://loaclhost:3030/static/img/Month/there_month/there/xh10.jpg',NULL,NULL,3),(36,'http://loaclhost:3030/static/img/Month/four_month/guzhen.jpg',2,4,NULL),(37,'http://loaclhost:3030/static/img/Month/four_month/huafang.jpg',2,4,NULL),(38,'http://loaclhost:3030/static/img/Month/four_month/jingling.jpg',2,4,NULL),(39,'http://loaclhost:3030/static/img/Month/four_month/qy.jpg',2,4,NULL),(40,'http://loaclhost:3030/static/img/Month/four_month/xiehou.jpg',2,4,NULL),(41,'http://loaclhost:3030/static/img/Month/four_month/four/xh1.jpg',NULL,NULL,4),(42,'http://loaclhost:3030/static/img/Month/four_month/four/xh2.jpg',NULL,NULL,4),(43,'http://loaclhost:3030/static/img/Month/four_month/four/xh3.jpg',NULL,NULL,4),(44,'http://loaclhost:3030/static/img/Month/four_month/four/xh4.jpg',NULL,NULL,4),(45,'http://loaclhost:3030/static/img/Month/four_month/four/xh5.jpg',NULL,NULL,4),(46,'http://loaclhost:3030/static/img/Month/four_month/four/xh6.jpg',NULL,NULL,4),(47,'http://loaclhost:3030/static/img/Month/four_month/four/xh7.jpg',NULL,NULL,4),(48,'http://loaclhost:3030/static/img/Month/four_month/four/xh8.jpg',NULL,NULL,4),(49,'http://loaclhost:3030/static/img/Month/four_month/four/xh9.jpg',NULL,NULL,4),(50,'http://loaclhost:3030/static/img/Month/four_month/four/xh10.jpg',NULL,NULL,4),(51,'http://loaclhost:3030/static/img/Month/four_month/four/xh11.jpg',NULL,NULL,4),(52,'http://loaclhost:3030/static/img/Month/four_month/four/xh12.jpg',NULL,NULL,4),(53,'http://loaclhost:3030/static/img/Month/four_month/four/xh13.jpg',NULL,NULL,4),(54,'http://loaclhost:3030/static/img/Month/four_month/four/xh14.jpg',NULL,NULL,4),(55,'http://loaclhost:3030/static/img/Month/four_month/four/xh15.jpg',NULL,NULL,4),(56,'http://loaclhost:3030/static/img/Month/five_month/binfen.jpg',2,5,NULL),(57,'http://loaclhost:3030/static/img/Month/five_month/lvtu.jpg',2,5,NULL),(58,'http://loaclhost:3030/static/img/Month/five_month/minhong.jpg',2,5,NULL),(59,'http://loaclhost:3030/static/img/Month/five_month/peiban.jpg',2,5,NULL),(60,'http://loaclhost:3030/static/img/Month/five_month/red.jpg',2,5,NULL),(61,'http://loaclhost:3030/static/img/Month/five_month/xingfu.jpg',2,5,NULL),(62,'http://loaclhost:3030/static/img/Month/five_month/yuanse.jpg',2,5,NULL),(63,'http://loaclhost:3030/static/img/Month/five_month/five/xh1.jpg',NULL,NULL,5),(64,'http://loaclhost:3030/static/img/Month/five_month/five/xh2.jpg',NULL,NULL,5),(65,'http://loaclhost:3030/static/img/Month/five_month/five/xh3.jpg',NULL,NULL,5),(66,'http://loaclhost:3030/static/img/Month/five_month/five/xh6.jpg',NULL,NULL,5),(67,'http://loaclhost:3030/static/img/Month/five_month/five/xh7.jpg',NULL,NULL,5),(68,'http://loaclhost:3030/static/img/Month/five_month/five/xh8.jpg',NULL,NULL,5),(69,'http://loaclhost:3030/static/img/Month/five_month/five/xh9.jpg',NULL,NULL,5),(70,'http://loaclhost:3030/static/img/Month/five_month/five/xh10.jpg',NULL,NULL,5),(71,'http://loaclhost:3030/static/img/Month/five_month/five/xh11.jpg',NULL,NULL,5),(72,'http://loaclhost:3030/static/img/Month/five_month/five/xh12.jpg',NULL,NULL,5),(73,'http://loaclhost:3030/static/img/Month/five_month/five/xh13.jpg',NULL,NULL,5),(74,'http://loaclhost:3030/static/img/Month/five_month/five/xh14.jpg',NULL,NULL,5),(75,'http://loaclhost:3030/static/img/Month/five_month/five/xh15.jpg',NULL,NULL,5),(76,'http://loaclhost:3030/static/img/Month/six_month/kele.jpg',2,6,NULL),(77,'http://loaclhost:3030/static/img/Month/six_month/meigui.jpg',2,6,NULL),(78,'http://loaclhost:3030/static/img/Month/six_month/menghuan.jpg',2,6,NULL),(79,'http://loaclhost:3030/static/img/Month/six_month/ningmeng.jpg',2,6,NULL),(80,'http://loaclhost:3030/static/img/Month/six_month/xiari.jpg',2,6,NULL),(81,'http://loaclhost:3030/static/img/Month/six_month/six/xh1.jpg',NULL,NULL,6),(82,'http://loaclhost:3030/static/img/Month/six_month/six/xh2.jpg',NULL,NULL,6),(83,'http://loaclhost:3030/static/img/Month/six_month/six/xh3.jpg',NULL,NULL,6),(84,'http://loaclhost:3030/static/img/Month/six_month/six/xh4.jpg',NULL,NULL,6),(85,'http://loaclhost:3030/static/img/Month/six_month/six/xh5.jpg',NULL,NULL,6),(86,'http://loaclhost:3030/static/img/Month/six_month/six/xh6.jpg',NULL,NULL,6),(87,'http://loaclhost:3030/static/img/Month/six_month/six/xh7.jpg',NULL,NULL,6),(88,'http://loaclhost:3030/static/img/Month/six_month/six/xh8.jpg',NULL,NULL,6),(89,'http://loaclhost:3030/static/img/Month/six_month/six/xh9.jpg',NULL,NULL,6),(90,'http://loaclhost:3030/static/img/Month/six_month/six/xh10.jpg',NULL,NULL,6),(91,'http://loaclhost:3030/static/img/Month/six_month/six/xh11.jpg',NULL,NULL,6),(92,'http://loaclhost:3030/static/img/Month/six_month/six/xh12.jpg',NULL,NULL,6),(93,'http://loaclhost:3030/static/img/Month/six_month/six/xh13.jpg',NULL,NULL,6),(94,'http://loaclhost:3030/static/img/Month/six_month/six/xh14.jpg',NULL,NULL,6),(95,'http://loaclhost:3030/static/img/Month/six_month/six/xh15.jpg',NULL,NULL,6),(96,'http://loaclhost:3030/static/img/Month/seven_month/huolie.jpg',3,7,NULL),(97,'http://loaclhost:3030/static/img/Month/seven_month/qingchun.jpg',3,7,NULL),(98,'http://loaclhost:3030/static/img/Month/seven_month/qiyue.jpg',3,7,NULL),(99,'http://loaclhost:3030/static/img/Month/seven_month/shiguang.jpg',3,7,NULL),(100,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh1.jpg',NULL,NULL,7),(101,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh2.jpg',NULL,NULL,7),(102,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh3.jpg',NULL,NULL,7),(103,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh4.jpg',NULL,NULL,7),(104,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh5.jpg',NULL,NULL,7),(105,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh6.jpg',NULL,NULL,7),(106,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh7.jpg',NULL,NULL,7),(107,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh8.jpg',NULL,NULL,7),(108,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh9.jpg',NULL,NULL,7),(109,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh10.jpg',NULL,NULL,7),(110,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh11.jpg',NULL,NULL,7),(111,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh12.jpg',NULL,NULL,7),(112,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh13.jpg',NULL,NULL,7),(113,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh14.jpg',NULL,NULL,7),(114,'http://loaclhost:3030/static/img/Month/seven_month/seven/xh15.jpg',NULL,NULL,7),(115,'http://loaclhost:3030/static/img/Month/eight_month/bihai.jpg',3,8,NULL),(116,'http://loaclhost:3030/static/img/Month/eight_month/guangyin.jpg',3,8,NULL),(117,'http://loaclhost:3030/static/img/Month/eight_month/lianren.jpg',3,8,NULL),(118,'http://loaclhost:3030/static/img/Month/eight_month/eight/xh1.jpg',NULL,NULL,8),(119,'http://loaclhost:3030/static/img/Month/eight_month/eight/xh2.jpg',NULL,NULL,8),(120,'http://loaclhost:3030/static/img/Month/eight_month/eight/xh3.jpg',NULL,NULL,8),(121,'http://loaclhost:3030/static/img/Month/eight_month/eight/xh4.jpg',NULL,NULL,8),(122,'http://loaclhost:3030/static/img/Month/eight_month/eight/xh5.jpg',NULL,NULL,8),(123,'http://loaclhost:3030/static/img/Month/eight_month/eight/xh6.jpg ',NULL,NULL,8),(124,'http://loaclhost:3030/static/img/Month/nine_month/gonhlu.jpg',3,9,NULL),(125,'http://loaclhost:3030/static/img/Month/nine_month/lanshan.jpg',3,9,NULL),(126,'http://loaclhost:3030/static/img/Month/nine_month/nine/xh1.jpg',NULL,NULL,9),(127,'http://loaclhost:3030/static/img/Month/nine_month/nine/xh2.jpg',NULL,NULL,9),(128,'http://loaclhost:3030/static/img/Month/nine_month/nine/xh3.jpg',NULL,NULL,9),(129,'http://loaclhost:3030/static/img/Month/nine_month/nine/xh4.jpg',NULL,NULL,9),(130,'http://loaclhost:3030/static/img/Month/nine_month/nine/xh5.jpg',13,NULL,9),(131,'3',3,10,NULL),(132,'http://loaclhost:3030/static/img/Month/ten_month/shanchuan.jpg',3,10,NULL),(133,'http://loaclhost:3030/static/img/Month/ten_month/xingfu.jpg',3,10,NULL),(134,'http://loaclhost:3030/static/img/Month/ten_month/ten/xh1.jpg',NULL,NULL,10),(135,'http://loaclhost:3030/static/img/Month/ten_month/ten/xh2.jpg',NULL,NULL,10),(136,'http://loaclhost:3030/static/img/Month/ten_month/ten/xh3.jpg',NULL,NULL,10),(137,'http://loaclhost:3030/static/img/Month/ten_month/ten/xh4.jpg',NULL,NULL,10),(138,'http://loaclhost:3030/static/img/Month/ten_month/ten/xh5.jpg',NULL,NULL,10),(139,'http://loaclhost:3030/static/img/Month/eleven_month/jishi.jpg',4,11,NULL),(140,'http://loaclhost:3030/static/img/Month/eleven_month/qingchun.jpg',4,11,NULL),(141,'http://loaclhost:3030/static/img/Month/eleven_month/shanshui.jpg',4,11,NULL),(142,'http://loaclhost:3030/static/img/Month/eleven_month/eleven/xh1.jpg',NULL,NULL,11),(143,'http://loaclhost:3030/static/img/Month/eleven_month/eleven/xh2.jpg',NULL,NULL,11),(144,'http://loaclhost:3030/static/img/Month/eleven_month/eleven/xh3.jpg',NULL,NULL,11),(145,'http://loaclhost:3030/static/img/Month/eleven_month/eleven/xh4.jpg ',NULL,NULL,11),(146,'http://loaclhost:3030/static/img/Month/eleven_month/eleven/xh5.jpg',NULL,NULL,11),(147,'http://loaclhost:3030/static/img/Month/twelve_month/gonglu.jpg',4,12,NULL),(148,'http://loaclhost:3030/static/img/Month/twelve_month/gongluai.jpg',4,12,NULL),(149,'http://loaclhost:3030/static/img/Month/twelve_month/gonglujiepai.jpg',4,12,NULL),(150,'http://loaclhost:3030/static/img/Month/twelve_month/wanan.jpg',4,12,NULL),(151,'http://loaclhost:3030/static/img/Month/twelve_month/twelve/xh1.jpg',NULL,NULL,12),(152,'http://loaclhost:3030/static/img/Month/twelve_month/twelve/xh2.jpg',NULL,NULL,12),(153,'http://loaclhost:3030/static/img/Month/twelve_month/twelve/xh3.jpg',NULL,NULL,12),(154,'http://loaclhost:3030/static/img/Month/twelve_month/twelve/xh4.jpg',NULL,NULL,12),(155,'http://loaclhost:3030/static/img/Month/twelve_month/twelve/xh5.jpg',NULL,NULL,12),(156,'http://loaclhost:3030/static/img/pdd/xh1.jpg',5,NULL,NULL),(157,'http://loaclhost:3030/static/img/pdd/xh2.jpg',5,NULL,NULL),(158,'http://loaclhost:3030/static/img/pdd/xh3.jpg',5,NULL,NULL),(159,'http://loaclhost:3030/static/img/pdd/xh4.jpg',5,NULL,NULL),(160,'http://loaclhost:3030/static/img/pdd/neirong/xh1.jpg',NULL,NULL,13),(161,'http://loaclhost:3030/static/img/pdd/neirong/xh2.jpg',NULL,NULL,13),(162,'http://loaclhost:3030/static/img/pdd/neirong/xh3.jpg',NULL,NULL,13),(163,'http://loaclhost:3030/static/img/pdd/neirong/xh4.jpg',NULL,NULL,13),(164,'http://loaclhost:3030/static/img/pdd/neirong/xh5.jpg',NULL,NULL,13),(165,'http://loaclhost:3030/static/img/pdd/neirong/xh6.jpg',NULL,NULL,13),(166,'http://loaclhost:3030/static/img/pdd/neirong/xh7.jpg',NULL,NULL,13),(167,'http://loaclhost:3030/static/img/pdd/neirong/xh8.jpg',NULL,NULL,13),(168,'http://loaclhost:3030/static/img/pdd/neirong/xh9.jpg',NULL,NULL,13),(169,'http://loaclhost:3030/static/img/pdd/neirong/xh10.jpg',NULL,NULL,13),(170,'http://loaclhost:3030/static/img/pdd/neirong/xh11.jpg',NULL,NULL,13),(171,'http://loaclhost:3030/static/img/pdd/neirong/xh12.jpg',NULL,NULL,13),(172,'http://loaclhost:3030/static/img/pdd/neirong/xh13.jpg',NULL,NULL,13),(173,'http://loaclhost:3030/static/img/pdd/neirong/xh14.jpg',NULL,NULL,13),(174,'http://loaclhost:3030/static/img/pdd/neirong/xh15.jpg',NULL,NULL,13);

/*Table structure for table `information` */

DROP TABLE IF EXISTS `information`;

CREATE TABLE `information` (
  `in_Id` int(50) NOT NULL AUTO_INCREMENT,
  `in_UserId` int(50) NOT NULL,
  `in_Name` varchar(255) DEFAULT NULL,
  `in_Phone` int(255) DEFAULT NULL,
  `in_Address` varchar(255) DEFAULT NULL,
  `in_Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`in_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `information` */

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `or_Id` int(50) NOT NULL AUTO_INCREMENT,
  `or_UserId` int(50) NOT NULL,
  `or_SampleId` int(50) NOT NULL,
  `or_Time` varchar(255) NOT NULL,
  `or_Price` double DEFAULT NULL,
  PRIMARY KEY (`or_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `order` */

/*Table structure for table `sample` */

DROP TABLE IF EXISTS `sample`;

CREATE TABLE `sample` (
  `sa_Id` int(50) NOT NULL AUTO_INCREMENT,
  `sa_ImgId` int(50) DEFAULT '0',
  `sa_Name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sa_Time` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sa_Price` double NOT NULL,
  `sa_Type` int(50) DEFAULT NULL,
  `sa_ChoiceId` int(50) DEFAULT NULL,
  `sa_ThemeId` int(50) DEFAULT NULL,
  `sa_StyleId` int(50) DEFAULT NULL,
  PRIMARY KEY (`sa_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_icelandic_ci;

/*Data for the table `sample` */

insert  into `sample`(`sa_Id`,`sa_ImgId`,`sa_Name`,`sa_Time`,`sa_Price`,`sa_Type`,`sa_ChoiceId`,`sa_ThemeId`,`sa_StyleId`) values (1,1,'眼角写诗','Jan 27 2018',3500,1,1,1,1),(2,2,'爱丽丝','Jan 27 2018',4300,1,1,1,2),(3,3,'梦境','Jab 27 2018',5300,1,1,1,3),(4,4,'森系','Jan 08 2018',3999,1,1,1,4),(5,5,'遐想','Jan 09 2018',3566,1,1,1,5),(6,12,'蔚蓝','Jan 07 2018',3599,1,2,1,6),(7,13,'雀圣','Jan 09 2018',2699,1,2,1,7),(8,14,'等待','Jan 11 2018',3599,1,2,1,8),(9,15,'都市','Jan 21 2018',3566,1,2,1,1),(10,16,'新法式','Jan 21 2018',3566,1,2,1,2),(11,17,'折飞机','Jan 22 2018',2599,1,2,1,3),(12,23,'菜籽','Jan 22 2018',4366,1,3,1,4),(13,24,'麦田','Jan 21 2018',2399,1,3,1,5),(14,25,'新戏园','Jan 22 2018',2699,1,3,1,6),(15,36,'古镇','Jan 23 2018',2599,1,4,2,7),(16,37,'花昂','Jan 26 2018',3699,1,4,2,8),(17,38,'精灵','Jan 26 2018',3599,1,4,2,1),(18,39,'情缘','Jan 26 2018',4399,1,4,2,2),(19,40,'邂逅','Jan 04 2018',7000,1,4,2,3),(20,56,'缤纷','Jan 06 2018',4399,1,5,2,4),(21,57,'旅途','Jan 04 2018',3633,1,5,2,5),(22,58,'红灯','Jan 04 2018',4399,1,5,2,6),(23,59,'陪伴','Jan 04 2018',3600,1,5,2,7),(24,60,'red红','Jan 14 2018',4399,1,5,2,8),(25,61,'幸福','Jan 12 2018',4366,1,5,2,1),(26,62,'原色','Jan 11 2018',4399,1,5,2,2),(27,76,'可乐','Jan 12 2018',4133,1,6,2,3),(28,77,'玫瑰','Jan 11 2018',4266,1,6,2,4),(29,78,'梦幻 ','Jan 04 2018',4399,1,6,2,5),(30,79,'柠檬','Jan 01 2018',6399,1,6,2,6),(31,80,'夏日','Jan 02 2018',4399,1,6,2,7),(32,96,'火烈','Jan 03 2018',4233,1,7,2,8),(33,97,'青春','Jan 02 2018',4399,1,7,3,1),(34,98,'器乐','july 03 2018',4988,1,7,3,2),(35,99,'视光','july 04 2018',4399,1,7,3,3),(36,115,'碧海','August 11 2018',9998,1,8,3,4),(37,116,'光影','August 01 2018',6888,1,8,3,5),(38,117,'恋人','August 02 2018',4266,1,8,3,6),(39,124,'公路','Sept 01 2018',4399,1,9,3,7),(40,125,'阑珊','Sept 02 2018',4699,1,9,3,8),(41,131,'青春','Oct 01 2018',4389,1,10,3,1),(42,132,'山川','Oct 23 2018',3699,1,10,3,2),(43,139,'吉士','Nov 11 2018',4366,1,11,4,3),(44,140,'青春','Nov 23 2018',4399,1,11,4,4),(45,141,'山水','Nov 24 2018',4399,1,11,4,5),(46,147,'公路','Nov 11 2018',4399,1,12,4,6),(47,148,'公路爱','Nov 12 2018',3600,1,12,4,7),(48,149,'公路节拍','Nov 12 2018',4399,1,12,4,8),(49,150,'晚安','Nov 11 2018',4399,1,12,4,1),(50,156,'网红套餐','0',4399,0,13,5,2),(51,157,'定制套餐','0',4399,0,13,5,3),(52,158,'定制套餐','0',7399,0,13,5,4),(53,159,'性价比套餐','0',6399,0,13,5,5);

/*Table structure for table `style` */

DROP TABLE IF EXISTS `style`;

CREATE TABLE `style` (
  `st_Id` int(50) NOT NULL AUTO_INCREMENT,
  `st_Name` varchar(255) NOT NULL,
  PRIMARY KEY (`st_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `style` */

insert  into `style`(`st_Id`,`st_Name`) values (1,'简约韩式'),(2,'华美中式'),(3,'轻奢法式 '),(4,'复古欧式'),(5,'日系小清新'),(6,'摩登街拍'),(7,'梦幻大片'),(8,'缓城市旅拍');

/*Table structure for table `theme` */

DROP TABLE IF EXISTS `theme`;

CREATE TABLE `theme` (
  `th_Id` int(50) NOT NULL AUTO_INCREMENT,
  `th_Season` varchar(255) NOT NULL,
  `th_ImgId` int(50) NOT NULL,
  PRIMARY KEY (`th_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `theme` */

insert  into `theme`(`th_Id`,`th_Season`,`th_ImgId`) values (1,'春',0),(2,'夏',0),(3,'秋',0),(4,'冬',0);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_Id` int(50) NOT NULL AUTO_INCREMENT,
  `user_Phone` varchar(255) NOT NULL,
  `user_Password` varchar(255) NOT NULL,
  `user_State` int(50) DEFAULT NULL,
  PRIMARY KEY (`user_Id`,`user_Phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
