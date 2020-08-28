-- Pins table seeds here

INSERT INTO pins (title, description, image_url, latitude, longitude, created_at, map_id, user_id)

-- 3 pins for map: ('Top coffee spots', 'Canada', 'Toronto', '43.6532', '-79.3832', '2020-07-20', 2)
VALUES ('White Squirrel', 'Chill cafe', 'https://www.blogto.com/listings/cafes/upload/2014/10/20141003-whitesquirrel590-02.jpg', '43.6453598', '-79.4123818', '2020-07-20', 2, 1),
('Antikka', 'Cafe and records', 'https://media.blogto.com/listings/20171227-2048-Antikka6.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70', '43.6446524', '-79.4171343', '2020-07-20', 2, 1),
('El Almacen', 'Yerba mate', 'https://cdn.shopify.com/s/files/1/0079/5646/3714/products/elalmacen_345x@2x.jpg?v=1546915219', '43.6437339', '-79.4217551', '2020-07-20', 2, 1),

-- 3 pins for map: ('Boats and ships', 'Canada', 'Toronto', '43.6532', '-79.3832', '2020-03-22', 1)
('The Tall Ship Kajama', 'A 165-foot-long, 3-masted schooner used for 2-hour daytime & sunset cruises, from May to September.', 'https://i.pinimg.com/originals/cc/de/1a/ccde1ae7dd04849544e50a54268bd7b0.jpg', '43.637904', '-79.3816454', '2020-03-22', 1, 2),
('Toronto Sailing & Canoe Club', 'Founded in 1880, the club offers racing, cruising, sailing instruction, recreational paddling and sailing camps.', 'https://www.tscc.net/resources/SiteAlbums/About%20us%20Photos/TS-0142.jpg', '43.6337453', '-79.4391786', '2020-03-22', 1, 2),
('The Royal Canadian Yacht Club', 'Yachting, sport and tradition.', 'https://media-exp1.licdn.com/dms/image/C4E1BAQGMCaqW8JuWdQ/company-background_10000/0?e=2159024400&v=beta&t=nhJO0XsQ3Mwj4qHSVlsIvTCX80Zaa-6u6rUPzZ12H0c', '43.62394', '-79.370554', '2020-03-22', 1, 2),

-- 3 pins for map: ('Best arcades', 'Canada', 'Toronto', '43.6532', '-79.3832', '2020-08-21', 3);
('Levelup Reality', 'VR games', 'https://media.blogto.com/articles/2017531-vr1.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70', '43.6522612', '-79.3756059', '2020-08-21', 3, 3),
('ZED*80 Arcade Bar', 'Video arcade and pub grub', 'https://media.blogto.com/listings/20192003-ZED80-24.jpg?w=2048&cmd=resize_then_crop&height=1365&quality=70', '43.6765767', '-79.3563347', '2020-08-21', 3, 3),
('Get well', 'Boisterous taproom as known for vintage decor & arcade games as its selection of craft beers', 'https://images.squarespace-cdn.com/content/v1/531752e6e4b05fcac6a76326/1405621977204-1QNFAAN36ZU2A0L6CUX2/ke17ZwdGBToddI8pDm48kPTrHXgsMrSIMwe6YW3w1AZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0k5fwC0WRNFJBIXiBeNI5fKTrY37saURwPBw8fO2esROAxn-RKSrlQamlL27g22X2A/P1020263.JPG?format=2500w', '43.664418', '-79.378895', '2020-08-21', 3, 3);
