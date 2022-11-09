DROP DATABASE IF EXISTS `e2s_system`;
CREATE DATABASE IF NOT EXISTS `e2s_system`;
USE `e2s_system`;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `ROLE` ENUM('facility energy manager', 'administrator', 'director of estates', 'third party') NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `org_id` INT NOT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `organisations` (
  `org_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo_id` INT NOT NULL,
  PRIMARY KEY (`org_id`)
  );

CREATE TABLE IF NOT EXISTS `logos` (
  `logo_id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`logo_id`)
  );
  
  CREATE TABLE IF NOT EXISTS `bills` (
  `bill_id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(45) NULL,
  `type` ENUM('gas', 'electricity', 'combined') NULL,
  `status` ENUM('valid', 'in verification', 'invalid') NULL,
  `date` DATE NULL,
  `site_id` INT NOT NULL,
  `supplier_id` INT NOT NULL,
  PRIMARY KEY (`bill_id`)
  );
  
  CREATE TABLE IF NOT EXISTS `suppliers` (
  `supplier_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`supplier_id`)
  );

CREATE TABLE IF NOT EXISTS `sites` (
  `site_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `org_id` INT NOT NULL,
  PRIMARY KEY (`site_id`)
  );
  
  CREATE TABLE IF NOT EXISTS `reports` (
  `report_id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(45) NULL,
  `site_id` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`report_id`)
  );

CREATE TABLE IF NOT EXISTS `insight_templates` (
  `insight_id` INT NOT NULL AUTO_INCREMENT,
  `insight` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`insight_id`)
  );

CREATE TABLE IF NOT EXISTS `consumptions` (
  `consumption_id` INT NOT NULL AUTO_INCREMENT,
  `time_interval` DATETIME(1) NOT NULL,
  `heat_demand` INT NULL,
  `electricity_demand` INT NULL,
  `electricity_price` INT NULL,
  `gas_price` INT NULL,
  `site_id` INT NOT NULL,
  `org_id` INT NOT NULL,
  PRIMARY KEY (`consumption_id`)
  );
  
  CREATE TABLE IF NOT EXISTS `sites_has_users` (
  `site_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`site_id`)
  );

ALTER TABLE `organisations`
ADD FOREIGN KEY (`logo_id`) REFERENCES `logos`(`logo_id`);

ALTER TABLE `users`
ADD FOREIGN KEY (`org_id`) REFERENCES `organisations`(`org_id`);

ALTER TABLE `sites`
ADD FOREIGN KEY (`org_id`) REFERENCES `organisations`(`org_id`);

ALTER TABLE `bills`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`);

ALTER TABLE `bills`
ADD FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`supplier_id`);

ALTER TABLE `reports`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`);

ALTER TABLE `consumptions`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`);

ALTER TABLE `consumptions`
ADD FOREIGN KEY (`org_id`) REFERENCES `organisations`(`org_id`);

ALTER TABLE `sites_has_users`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`);

ALTER TABLE `sites_has_users`
ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

-- VIEWS -- 

CREATE VIEW user_management AS
SELECT u.user_id, u.first_name, u.last_name, u.email, o.name, COUNT(*) as `no_sites_managed`, u.role
FROM users u
INNER JOIN organisations o
ON u.org_id = o.org_id
INNER JOIN sites_has_users s
ON u.user_id = s.user_id;

CREATE VIEW site_management AS
SELECT s.site_id, s.location, o.name, COUNT(*) as `number_of_users`
FROM sites s
INNER JOIN organisations o
ON s.org_id = o.org_id
INNER JOIN sites_has_users shu
ON s.site_id = shu.site_id;

CREATE VIEW electricity_usage AS
SELECT c.consumption_id, c.time_interval, c.electricity_demand
FROM consumptions c;

CREATE VIEW heat_usage AS
SELECT c.consumption_id, c.time_interval, c.heat_demand
FROM consumptions c;

CREATE VIEW costs AS
SELECT c.consumption_id, (c.electricity_price + c.gas_price) as total_costs
FROM consumptions c;