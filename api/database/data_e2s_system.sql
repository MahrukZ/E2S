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
VALUES(null, '2022/11/13 12:00', '2576.3', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/14 12:00', '2359.2', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/15 12:00', '2344.1', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/16 12:00', '2348.5', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/17 12:00', '2342.0', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/18 12:00', '2411.1', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/19 12:00', '2429.5', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/20 12:00', '2391.8', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/21 12:00', '2370.4', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/22 12:00', '2328.3', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/23 12:00', '1925.1', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/24 12:00', '1936.7', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/25 12:00', '1972.9', '2359.0', '43.45', '50.45', 1, 1);
INSERT INTO `consumptions`
VALUES(null, '2022/11/26 12:00', '2033.6', '2359.0', '43.45', '50.45', 1, 1);

INSERT INTO `reports`
VALUES(null, './assets/reports/report.pdf', 1, '2022-02-20');
INSERT INTO `reports`
VALUES(null, './assets/reports/report.pdf', 5, '2022-05-18');
INSERT INTO `reports`
VALUES(null, './assets/reports/report.pdf', 8, '2022-03-25');

INSERT INTO `insight_templates`
VALUES(null, 'Considering your energy prices forecasts, your CHP units should be ran into thermal led mode. This could help you save £... on your energy bills and ... tCO2e');
INSERT INTO `insight_templates`
VALUES(null, 'Last ..., your electricity consumption increased by ...% compared to your baseline');
INSERT INTO `insight_templates`
VALUES(null, 'Your forecast energy costs for the next ... is £... This is an increase/decrease of ...% compared to last ... at the same period');

SET foreign_key_checks = 1;