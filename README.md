Wiki Map
=========

### Version 1.0.0

Welcome to Wiki Map, an application where you may create customized maps with waypoints (also called pins) based on your personal interests or tastes. Anyone may explore Wiki Map's collection, and you may register to create your own maps, share your contributions into other maps, and create a list of favourite maps, so you may visit and explore them quickly.

# Final Product

Wiki Map is designed to perform in mobile devices, tablets and desktops. Its layout can adapt responsively depending on the device you may be using.

![Mobile presentation](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_mobile.png) ![Tablet presentation](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_tablet.png)

![Desktop presentation](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_desktop.png)

You may navigate any map or visit user profiles as a visitor, but you must be a registered user with a valid User to be able to create maps, contribute, and bookmark (favourite) any maps that feel special to you.

![Visitor visualization(map list)](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_maplist_visitor.png)

![User profile(user)](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_user_profile.png)

![Pin visualization(visitor)](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_pin_view.png)

You may also manage, delete and edit any maps and points that you have created. If you created a map, you may manage all points in your map.

![Pin visualization(map or pin owner)](https://github.com/super8989/WikiMap/blob/master/docs/wikimap_pin_manage.png)

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `wikimap`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Technologies Used

- Node.JS
- SASS
- Bootstrap 4.5
- Leaflet.JS
- jQuery
- AJAX
- Maptiler
- Mapquest
- Font Awesome
- PostgreSQL

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- bcrypt
- body-parser
- chalk
- dotenv
- pg and pg-native
- request and request-promise-native
- Node SASS-middleware
- Express
- Nodemon
- EJS
