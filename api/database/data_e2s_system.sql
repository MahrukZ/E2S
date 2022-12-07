USE e2s_system;

SET foreign_key_checks = 0;
TRUNCATE TABLE `logos`;
TRUNCATE TABLE `organisations`;
TRUNCATE TABLE `suppliers`;
TRUNCATE TABLE `logos`;
TRUNCATE TABLE `reports`;
TRUNCATE TABLE `sites_has_users`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `sites`;
TRUNCATE TABLE `bills`;
TRUNCATE TABLE `consumptions`;
TRUNCATE TABLE `insight_templates`;

INSERT INTO `logos`
VALUES(null, './assets/images/Cardiff_University_logo.png');
INSERT INTO `logos`
VALUES(null, './assets/images/NHS_logo.png');
INSERT INTO `logos`
VALUES(null, './assets/images/ONS_logo.png');
INSERT INTO `logos`
VALUES(null, './assets/images/E2S_logo.png');

INSERT INTO `organisations`
VALUES(null, 'Cardiff University', 1);
INSERT INTO `organisations`
VALUES(null, 'National Health Service', 2);
INSERT INTO `organisations`
VALUES(null, 'Office Of National Statistics', 3);
INSERT INTO `organisations`
VALUES(null, 'Empowering Energy Solutions', 4);

INSERT INTO `users`
VALUES(null, 'Martin', 'James', 'martinjames@cardiff.ac.uk', 'director of estates', 'martin12345', 1);
INSERT INTO `users`
VALUES(null, 'Rhy', 'Jones', 'rhyjones@cardiff.ac.uk', 'facility energy manager', 'rhy12345', 1);
INSERT INTO `users`
VALUES(null, 'James', 'Ohay', 'jamesohay@cardiff.ac.uk', 'facility energy manager', 'james12345', 1);
INSERT INTO `users`
VALUES(null, 'Helen', 'Wilkins', 'helenwilkins@nhs.co.uk', 'director of estates', 'helen12345', 2);
INSERT INTO `users`
VALUES(null, 'Max', 'Norris', 'maxnorris@nhs.co.uk', 'facility energy manager', 'max12345', 2);
INSERT INTO `users`
VALUES(null, 'Johnny', 'Bravo', 'johnnybravo@nhs.co.uk', 'facility energy manager', 'johnny12345', 2);
INSERT INTO `users`
VALUES(null, 'Jade', 'Pierce', 'jadepierce@ons.gov.uk', 'director of estates', 'jade12345', 3);
INSERT INTO `users`
VALUES(null, 'Martina', 'Schmitt', 'martinaschmitt@ons.gov.uk', 'facility energy manager', 'martina12345', 3);
INSERT INTO `users`
VALUES(null, 'Antonio', 'White', 'antoniowhite@ons.gov.uk', 'facility energy manager', 'antonio12345', 3);
INSERT INTO `users`
VALUES(null, 'Cai', 'Robert', 'cairobert@e2s.co.uk', 'administrator', 'cai12345', 4);
INSERT INTO `users`
VALUES(null, 'Admin', 'User', 'adminuser@e2s.co.uk', 'administrator', 'adminpass', 4);

INSERT INTO `sites`
VALUES(null, 'Abacws', 'Cathays', 1);
INSERT INTO `sites`
VALUES(null, 'National Software Academy', 'Newport', 1);
INSERT INTO `sites`
VALUES(null, 'Queens Building', 'Cardiff', 1);
INSERT INTO `sites`
VALUES(null, 'Heath Hospital', 'Heath', 2);
INSERT INTO `sites`
VALUES(null, 'Musgrove Park Hospital', 'Somerset', 2);
INSERT INTO `sites`
VALUES(null, 'Pilgrim Hospital', 'Boston', 2);
INSERT INTO `sites`
VALUES(null, 'Newport Building', 'Newport', 3);
INSERT INTO `sites`
VALUES(null, 'Titchfield Building', 'Titchfield', 3);
INSERT INTO `sites`
VALUES(null, 'Darlington Economic Campus', 'Feethams', 3);

INSERT INTO `sites_has_users`
VALUES(1, 1);
INSERT INTO `sites_has_users`
VALUES(2, 1);
INSERT INTO `sites_has_users`
VALUES(3, 1);
INSERT INTO `sites_has_users`
VALUES(2, 2);
INSERT INTO `sites_has_users`
VALUES(1, 3);
INSERT INTO `sites_has_users`
VALUES(2, 3);
INSERT INTO `sites_has_users`
VALUES(3, 3);
INSERT INTO `sites_has_users`
VALUES(4, 4);
INSERT INTO `sites_has_users`
VALUES(5, 4);
INSERT INTO `sites_has_users`
VALUES(6, 4);
INSERT INTO `sites_has_users`
VALUES(4, 5);
INSERT INTO `sites_has_users`
VALUES(5, 5);
INSERT INTO `sites_has_users`
VALUES(6, 6);
INSERT INTO `sites_has_users`
VALUES(7, 7);
INSERT INTO `sites_has_users`
VALUES(8, 7);
INSERT INTO `sites_has_users`
VALUES(9, 7);
INSERT INTO `sites_has_users`
VALUES(7, 8);
INSERT INTO `sites_has_users`
VALUES(8, 8);
INSERT INTO `sites_has_users`
VALUES(9, 8);
INSERT INTO `sites_has_users`
VALUES(9, 9);

INSERT INTO `suppliers`
VALUES(null, 'British Gas');
INSERT INTO `suppliers`
VALUES(null, 'E.ON');

INSERT INTO `bills`
VALUES(null, './assets/bills/british_gas_bill.pdf', 'gas', 'in verification', '2022-08-11', 1, 1);
INSERT INTO `bills`
VALUES(null, './assets/bills/british_gas_bill.pdf', 'electricity', 'invalid', '2022-08-12', 8, 1);
INSERT INTO `bills`
VALUES(null, './assets/bills/british_gas_bill.pdf', 'combined', 'valid', '2022-06-14', 5, 1);
INSERT INTO `bills`
VALUES(null, './assets/bills/eon_bill.pdf', 'gas', 'in verification', '2022-05-11', 4, 2);
INSERT INTO `bills`
VALUES(null, './assets/bills/eon_bill.pdf', 'electricity', 'invalid', '2022-02-20', 3, 2);
INSERT INTO `bills`
VALUES(null, './assets/bills/eon_bill.pdf', 'combined', 'valid', '2022-06-14', 7, 2);

INSERT INTO `consumptions`
VALUES(null, '2020/01/01 12:00', 2576.3, 2359.0, NULL, 43.45, 50.45, 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2020/01/02 15:00', 2529.7, 2351.1, NULL, 35.55, 32.55, 5, 5);
INSERT INTO `consumptions`
VALUES(null, '2020/01/03 20:00', 2878.7, 2699.1, NULL, 78.55, 56.55, 8, 8);

INSERT INTO `reports`
VALUES(null, './assets/reports/report.pdf', 1, '2022-02-20');
INSERT INTO `reports`
VALUES(null, './assets/reports/report.pdf', 5, '2022-05-18');
INSERT INTO `reports`
VALUES(null, './assets/reports/report.pdf', 8, '2022-03-25');

INSERT INTO `insight_templates`
VALUES(null, 'In the last 7 days, the total costs of [site] has changed by [data] compared to the previous 7 days.');
INSERT INTO `insight_templates`
VALUES(null, 'In the last 7 days, the electricity consumption of [site] has changed by [data] compared to the previous 7 days.');
INSERT INTO `insight_templates`
VALUES(null, 'In the last 7 days, the gas consumption of [site] has changed by [data] compared to the previous 7 days.');
INSERT INTO `insight_templates`
VALUES(null, 'In the last 7 days, the carbon emissions of [site] has changed by [data] compared to the previous 7 days.');

SET foreign_key_checks = 1;