-- Pins table seeds here

INSERT INTO pins (title, description, image_url, latitude, longitude, created_at, map_id, user_id)

-- 3 pins for map: ('Top coffee spots', 'Canada', 'Toronto', '43.6532', '-79.3832', '2020-07-20', 2)
VALUES ('White Squirrel', 'Chill cafe', 'https://www.blogto.com/listings/cafes/upload/2009/03/20090303-squirrel-aerial.jpg', '43.6453598', '-79.4123818', '2020-07-20', 2, 1),
('Antikka', 'Cafe and records', 'https://www.instagram.com/p/CDOthWPJy0n/', '43.6446524', '-79.4171343', '2020-07-20', 2, 1),
('El Almacen', 'Yerba mate', 'https://media.blogto.com/uploads/2017/04/27/20170421-elalmacen-05.jpg', '43.6437339', '-79.4217551', '2020-07-20', 2, 1),

-- 3 pins for map: ('Boats and ships', 'Canada', 'Toronto', '43.6532', '-79.3832', '2020-03-22', 1)
('The Tall Ship Kajama', 'A 165-foot-long, 3-masted schooner used for 2-hour daytime & sunset cruises, from May to September.', 'https://goo.gl/maps/dc1X7m2gd8BSSpdu9', '43.637904', '-79.3816454', '2020-03-22', 1, 2),
('Toronto Sailing & Canoe Club', 'Founded in 1880, the club offers racing, cruising, sailing instruction, recreational paddling and sailing camps.', 'https://goo.gl/maps/AN5s4PULmTiCQQrS6', '43.6337453', '-79.4391786', '2020-03-22', 1, 2),
('The Royal Canadian Yacht Club', 'Yachting, sport and tradition.', 'https://rcyc.ca/getmedia/6f9c0162-611d-4206-b94f-f60f4e03d69f/clubhouse-banner-about.aspx?width=1920&height=539&ext=.png', '43.62394', '-79.370554', '2020-03-22', 1, 2),

-- 3 pins for map: ('Best arcades', 'Canada', 'Toronto', '43.6532', '-79.3832', '2020-08-21', 3);
('Levelup VR Arcade', 'VR games', 'https://levelupreality.ca/wp-content/uploads/2018/09/20180731_144436.jpg', '43.6522612', '-79.3756059', '2020-08-21', 3, 3),
('ZED*80 Arcade Bar', 'Video arcade and pub grub', 'https://www.instagram.com/p/B9r07uml_b6/', '43.6765767', '-79.3563347', '2020-08-21', 3, 3),
('Get well', 'description of pin', 'https://images.squarespace-cdn.com/content/v1/531752e6e4b05fcac6a76326/1405621832116-FQ97YQ5JS1E1A1I2DTYX/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fKTrY37saURwPBw8fO2esROAxn-RKSrlQamlL27g22X2A/P1020272.JPG', '43.664418', '-79.378895', '2020-08-21', 3, 3);
