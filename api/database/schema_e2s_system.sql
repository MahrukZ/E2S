DROP DATABASE IF EXISTS `e2s_system`;
CREATE DATABASE IF NOT EXISTS `e2s_system`;
USE `e2s_system`;

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `role` ENUM('facility energy manager', 'administrator', 'director of estates') NOT NULL,
  `password` VARCHAR(150) NOT NULL,
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
  `link` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`logo_id`)
  );
  
  CREATE TABLE IF NOT EXISTS `bills` (
  `bill_id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(150) NULL,
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
  `link` VARCHAR(150) NULL,
  `site_id` INT NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`report_id`)
  );

CREATE TABLE IF NOT EXISTS `insight_templates` (
  `insight_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`insight_id`)
  );

CREATE TABLE IF NOT EXISTS `consumptions` (
  `consumption_id` INT NOT NULL AUTO_INCREMENT,
  `time_interval` DATETIME NOT NULL,
  `heat_demand` FLOAT,
  `electricity_demand` FLOAT,
  `co2_emissions` FLOAT,
  `electricity_price` DECIMAL(19,2),
  `gas_price` DECIMAL(19,2),
  `site_id` INT NOT NULL,
  `org_id` INT NOT NULL,
  PRIMARY KEY (`consumption_id`)
  );
  
  CREATE TABLE IF NOT EXISTS `sites_has_users` (
  `site_id` INT NOT NULL,
  `user_id` INT NOT NULL
  );

ALTER TABLE `organisations`
ADD FOREIGN KEY (`logo_id`) REFERENCES `logos`(`logo_id`);

ALTER TABLE `users`
ADD FOREIGN KEY (`org_id`) REFERENCES `organisations`(`org_id`) ON DELETE CASCADE;

ALTER TABLE `sites`
ADD FOREIGN KEY (`org_id`) REFERENCES `organisations`(`org_id`) ON DELETE CASCADE;

ALTER TABLE `bills`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`) ON DELETE CASCADE;

ALTER TABLE `bills`
ADD FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`supplier_id`);

ALTER TABLE `reports`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`) ON DELETE CASCADE;

ALTER TABLE `consumptions`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`) ON DELETE CASCADE;

ALTER TABLE `consumptions`
ADD FOREIGN KEY (`org_id`) REFERENCES `organisations`(`org_id`);

ALTER TABLE `sites_has_users`
ADD FOREIGN KEY (`site_id`) REFERENCES `sites`(`site_id`) ON DELETE CASCADE;

ALTER TABLE `sites_has_users`
ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE;

-- VIEWS -- 

CREATE VIEW user_management AS
SELECT u.user_id, u.first_name, u.last_name, u.email, o.name AS `organisation`, (SELECT COUNT(*) FROM sites_has_users s WHERE u.user_id = s.user_id) AS `no_sites_managed`, u.role
FROM users u
JOIN organisations o
ON u.org_id = o.org_id;

CREATE VIEW site_management AS
SELECT s.site_id, s.name, s.location, o.org_id, o.name AS `organisation`, (SELECT COUNT(*) FROM sites_has_users shu WHERE s.site_id = shu.site_id)  AS `number_of_users`
FROM sites s
INNER JOIN organisations o
ON s.org_id = o.org_id;

CREATE VIEW electricity_usage AS
SELECT c.consumption_id, c.time_interval, c.electricity_demand
FROM consumptions c;

CREATE VIEW heat_usage AS
SELECT c.consumption_id, c.time_interval, c.heat_demand
FROM consumptions c;

CREATE VIEW costs AS
SELECT c.consumption_id, (c.electricity_price + c.gas_price) as total_costs
FROM consumptions c;

CREATE VIEW sites_and_users AS
SELECT s.site_id, s.name, shu.user_id FROM sites s
JOIN sites_has_users shu
ON s.site_id = shu.site_id;

-- STORED PROCEDURES --

DROP PROCEDURE IF EXISTS SitesByUserId;
DELIMITER //
CREATE PROCEDURE SitesByUserId(
	IN InputUserID INT
)
BEGIN
SELECT * FROM sites s
JOIN sites_has_users shu
ON s.site_id = shu.site_id
WHERE shu.user_id = InputUserID;
END //
DELIMITER ;

-- TRIGGERS -- 

DROP TRIGGER IF EXISTS calc_co2_emissions_before_insert;
DELIMITER //
CREATE TRIGGER calc_co2_emissions_before_insert
BEFORE INSERT ON `consumptions`
FOR EACH ROW
BEGIN
	DECLARE sum FLOAT;
    DECLARE multiplier FLOAT DEFAULT 0.19338;
    DECLARE calc_emission FLOAT;
    
    SET sum = NEW.heat_demand + NEW.electricity_demand;
    SET calc_emission = sum * multiplier;
    
	SET NEW.co2_emissions = calc_emission;
END //
DELIMITER ;