// console.log("geocodingapi", geocodingAPI);
//on the front end, event listenenr listens to the click  // same cycle as Tweeter the tweet post cycle

$(document).ready(function () {
  // $.get(
  //   `http://open.mapquestapi.com/geocoding/v1/address?key=${geocodingKey}&location=Toronto,ON`,
  //   function (data, status) {
  //     // console.log("latLng", data.results[0].locations[0].latLng);
  //     newMap(data);
  //   }
  // ).catch((err) => console.error("error", err.stack));

  // AJAX GET to mapquestapi to get the geocoords of a location
  $.ajax({
    url: `http://open.mapquestapi.com/geocoding/v1/address?key=${geocodingKey}&location=Toronto,ON`,
    method: "GET",
  })
    .then((response) => {
      const { latLng } = response.results[0].locations[0].latLng;
      console.log("latLng", latLng);
      newMap(response);
    })
    .catch((err) => console.error("error", err.stack));

  // Create a new map
  const newMap = (geoCoordinates) => {
    const latitude = geoCoordinates.results[0].locations[0].latLng.lat;
    const longitude = geoCoordinates.results[0].locations[0].latLng.lng;
    console.log(latitude, longitude);

    // Map of Toronto
    // const map = L.map("mapid").setView([43.65, -79.38], 13);

    // Create a map based on the latlng from mapquest api call
    const map = L.map("mapid").setView([latitude, longitude], 13);

    // Add tileLayer to our map
    L.tileLayer(
      `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${mapTilerKey}`,
      {
        attribution: `
      <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
      <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
      }
    ).addTo(map);

    /*   // Initial marker for lighthouse labs : ISSUE --> having initial marker sets the map view to the marker so needs to be removed
    // const labsMarker = L.marker([43.64426, -79.40226]).addTo(map);
    // const labsURL =
    //   "https://856887.smushcdn.com/1859345/wp-content/uploads/2018/05/lighthouse-labs-300x300.png?lossy=0&strip=1&webp=1";
    //openPopup() only works for markers
    // labsMarker
    //   .bindPopup(
    //     `<p>Lighthouse Labs<br>The Best Place To Be</p>
    //   <img style='max-width: 100%; max-height: 200px;'
    //   src='${labsURL}'>`
    //   )
    //   .openPopup();
    // labsMarker.popup("Lighthouse Labs").openOn(map); */

    // Render pins on the map from db
    const addPinsFromDb = (obj) => {
      // console.log("addPinsFromDb obj in maps.js", obj);
      const marker = L.marker([obj.latitude, obj.longitude]).addTo(map)
        .bindPopup(`
      <p>Place: ${obj.title}</p>
      <p>Description: ${obj.description}</p>
      <p>Image url: ${obj.image_url}</p>
      <img style='max-width: 100%; max-height: 150px;' src='${obj.image_url}'>
      <p>Latitude: ${obj.latitude}</p>
      <p>Longitude: ${obj.longitude}</p>
      <p>id: ${obj.id}</p>
      <p>map_id: ${obj.map_id}</p>
      <p>user_id: ${obj.user_id}</p>
      <form method="POST" action='/maps/${obj.id}/delete'>
        <button>Delete</button>
      </form>
      `);
    };

    // $.get("/api/pins", function (result) {
    //   // console.log("result.pins from .get /api/pins", result.pins);
    //   result.pins.forEach((pinObj) => addPinsFromDb(pinObj));
    // });

    // AJAX request to api/pins to get the pin data
    $.ajax({
      url: "/api/pins",
      method: "GET",
    })
      .then((response) => {
        response.pins.forEach((pinObj) => addPinsFromDb(pinObj));
      })
      .catch((err) => console.err(err.stack));

    //if not refreshing to get the pins, refer to Tweeter for the client side rendering

    //another example of AJAX: when i click this button, make an ajax request -- ajax = way to ask server for things

    // Drop a new pin and submit a form > POST /pins
    function dropNewPin(e) {
      console.log("e from dropNewPin", e);
      console.log("e.latlng from dropNewPin", e.latlng);

      const newMarker = L.marker([e.latlng.lat, e.latlng.lng], {
        title: "appears on hover",
        draggable: true,
        riseOnHover: true,
      }).addTo(map);

      // Send POST to pins.js
      newMarker
        .bindPopup(
          `
        <form method='POST' action="/maps">
          <label for="title">Place:</label><br>
          <input type="text" id="title" name="title" value="title"><br>
          <label for="description">Description:</label><br>
          <input type="text" id="description" name="description" value="description"><br><br>
          <label for="image_url">Image:</label><br>
          <input type="text" id="image_url" name="image_url" value="image url"><br><br>
          <button type="submit">Submit</button>
          <input name="latitude" type="hidden" value='${e.latlng.lat}'>
          <input name="longitude" type="hidden" value='${e.latlng.lng}'>
        </form>
        <form>
          <button type="submit">Cancel</button>
        </form>
        `
        )
        .openPopup();
    }

    // instead of a form, i could do an ajax post -> .then() gets the single object back from the server with res.json(data.rows[0]) because of RETURNING * -> call addPinFromDb() with the object returned --> so then the page would not be redirected and refreshed

    // form without method defaults to get and gets the current page hence refreshes the page

    // for creation date: let the server figure out creation date OR in sql use .now for creation date OR another hidden input data for creation date

    map.on("click", dropNewPin);
  };

  // Create new map
  // newMap();
});
