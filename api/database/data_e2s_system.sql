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
VALUES(null, 'Martin', 'James', 'martinjames@cardiff.ac.uk', 'director of estates', '$2a$10$JubOeS1ni5ZurQZ9Y3S/f.yLlhLdnSOcDWqYJbkWGYzXzzlat6aum', 1);
INSERT INTO `users`
VALUES(null, 'Rhy', 'Jones', 'rhyjones@cardiff.ac.uk', 'facility energy manager', '$2a$10$OI1b4b4kzeU6qI8Dns3YGeKVvG.BBTGflE0tfzVd2WO4sQ/OC.sU.', 1);
INSERT INTO `users`
VALUES(null, 'James', 'Ohay', 'jamesohay@cardiff.ac.uk', 'facility energy manager', '$2a$10$ZBYZscFZAnKVrUnWyUdr.OGr2p/ZjY4FkJ3T7abNKzqTYkvq6bz9S', 1);
INSERT INTO `users`
VALUES(null, 'Helen', 'Wilkins', 'helenwilkins@nhs.co.uk', 'director of estates', '$2a$10$QWu3qFeprrA9whrfxu0nmu7RDMWnTTKURoKWMcH/45h.fGVGrWGSO', 2);
INSERT INTO `users`
VALUES(null, 'Max', 'Norris', 'maxnorris@nhs.co.uk', 'facility energy manager', '$2a$10$SPlcCORRWTpWpsGv3nFx/.PtA/BzajdhbLCnxIUO5eBqshR.Yon1m', 2);
INSERT INTO `users`
VALUES(null, 'Johnny', 'Bravo', 'johnnybravo@nhs.co.uk', 'facility energy manager', '$2a$10$55ys62Kjw3seJaL6DjPlRu12JR/1vjge9Ttf.2FO4XEhVnVrMH7Pu', 2);
INSERT INTO `users`
VALUES(null, 'Jade', 'Pierce', 'jadepierce@ons.gov.uk', 'director of estates', '$2a$10$A/L8rmJ50zK8ooq9E.L7SObwDydyO4UMRH5AHwgQZ1NAchlqfK5RO', 3);
INSERT INTO `users`
VALUES(null, 'Martina', 'Schmitt', 'martinaschmitt@ons.gov.uk', 'facility energy manager', '$2a$10$LlTv6dx11zSvhrF404.TKeFKqOwsaIAlxFdIf1U5KbyiAB9Tzvw8W', 3);
INSERT INTO `users`
VALUES(null, 'Antonio', 'White', 'antoniowhite@ons.gov.uk', 'facility energy manager', '$2a$10$bjMzX7I3ayPYPn4BSSpqEOeGT4qt6tlIBZEhmcQfxjsz36nH63PwK', 3);
INSERT INTO `users`
VALUES(null, 'Cai', 'Robert', 'cairobert@e2s.co.uk', 'administrator', '$2a$10$xNRnHsQEf2vn/rTbmTWcmOJ1t2Mm7q20anm64pLMAyYJdNqWZEDYS', 4);
INSERT INTO `users`
VALUES(null, 'Admin', 'User', 'adminuser@e2s.co.uk', 'administrator', '$2a$10$ZWFMVtxOab0qGSM61eKEFOwUK3VdIaE2621mRzTWnDk3Gw9TIPOv6', 4);

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
VALUES(NULL, 1, 1);
INSERT INTO `sites_has_users`
VALUES(NULL, 2, 1);
INSERT INTO `sites_has_users`
VALUES(NULL, 1, 3);
INSERT INTO `sites_has_users`
VALUES(NULL, 2, 3);
INSERT INTO `sites_has_users`
VALUES(NULL, 3, 1);
INSERT INTO `sites_has_users`
VALUES(NULL, 2, 2);
INSERT INTO `sites_has_users`
VALUES(NULL, 4, 4);
INSERT INTO `sites_has_users`
VALUES(NULL, 5, 4);
INSERT INTO `sites_has_users`
VALUES(NULL, 6, 4);
INSERT INTO `sites_has_users`
VALUES(NULL, 4, 5);
INSERT INTO `sites_has_users`
VALUES(NULL, 5, 5);
INSERT INTO `sites_has_users`
VALUES(NULL, 6, 6);
INSERT INTO `sites_has_users`
VALUES(NULL, 7, 7);
INSERT INTO `sites_has_users`
VALUES(NULL, 8, 7);
INSERT INTO `sites_has_users`
VALUES(NULL, 9, 7);
INSERT INTO `sites_has_users`
VALUES(NULL, 7, 8);
INSERT INTO `sites_has_users`
VALUES(NULL, 8, 8);
INSERT INTO `sites_has_users`
VALUES(NULL, 9, 8);
INSERT INTO `sites_has_users`
VALUES(NULL, 9, 9);

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
INSERT INTO `insight_templates`
VALUES(null, 'Between [dateFrom] and [dateTo], the total costs of [site] was [data].');
INSERT INTO `insight_templates`
VALUES(null, 'Between [dateFrom] and [dateTo], the gas consumption of [site] was [data].');
INSERT INTO `insight_templates`
VALUES(null, 'Between [dateFrom] and [dateTo], the electricity consumption of [site] was [data].');
INSERT INTO `insight_templates`
VALUES(null, 'Between [dateFrom] and [dateTo], the carbon emissions of [site] was [data].');

SET foreign_key_checks = 1;