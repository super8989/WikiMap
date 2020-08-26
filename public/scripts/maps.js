//on the front end, event listenenr listens to the click for the create map form // same cycle as Tweeter the tweet post cycle

$(document).ready(function () {
  // AJAX GET to mapquestapi to get the geocoords of a location
  $.ajax({
    url: `http://open.mapquestapi.com/geocoding/v1/address?key=${geocodingKey}&location=Toronto,ON`,
    method: "GET",
  })
    .then((response) => {
      // console.log("latLng", latLng);
      newMap(response);
    })
    .catch((err) => console.error("error", err.stack));

  // Create a new map
  const newMap = (geoCoordinates) => {
    const latitude = geoCoordinates.results[0].locations[0].latLng.lat;
    const longitude = geoCoordinates.results[0].locations[0].latLng.lng;

    // Create a map with the response from mapquest api call :: [43.65, -79.38] = Toronto
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

    // URL is based on maps/:map_id --> if maps/:map_id, the pins db is coming from /api/maps/:map_id/pins otherwise get all pins from /api/pins
    // window.location.pathname = "/maps/:map_id"
    const url =
      window.location.pathname.split("/").length === 3
        ? `/api/maps/${window.location.pathname.split("/")[2]}/pins` // pins data based on :map_id
        : "/api/pins"; // all pins data

    console.log("url:maps.js", url);

    $.ajax({
      url,
      method: "GET",
    })
      .then((response) => {
        // console.log(response);
        response.pins.forEach((pinObj) => addPinsFromDb(pinObj));
      })
      .catch((err) => console.err(err.stack));

    //if not refreshing to get the pins, refer to Tweeter for the client side rendering
    //another example of AJAX: when i click this button, make an ajax request -- ajax = way to ask server for things

    // Render pins on the map from db
    const addPinsFromDb = (obj) => {
      // console.log("addPinsFromDb obj in maps.js", obj);
      const marker = L.marker([obj.latitude, obj.longitude]).addTo(map)
        .bindPopup(`
      <span>Place: ${obj.title}</span><br>
      <span>Description: ${obj.description}</span><br>
      <span>Image url: ${obj.image_url}</span><br>
      <img style='max-width: 100%; max-height: 150px;' src='${obj.image_url}'><br>
      <span>Latitude: ${obj.latitude}</span><br>
      <span>Longitude: ${obj.longitude}</span><br>
      <span>id: ${obj.id}</span><br>
      <span>map_id: ${obj.map_id}</span><br>
      <span>user_id: ${obj.user_id}</span><br>
      <form method="POST" action='/maps/${obj.id}/delete'>
        <button>Delete</button>
      </form>
      `);
    };

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
          <input name="map_id" type="hidden" value='${
            window.location.pathname.split("/")[2]
          }'>
        </form>
        <form>
          <button type="submit">Cancel</button>
        </form>
        `
        )
        .openPopup();
    }

    // instead of a form, i could do an ajax post -> .then() gets the single object back from the server with res.json(data.rows[0]) because of RETURNING * -> call addPinFromDb() with the object returned --> so then the page would not be redirected and refreshed

    map.on("click", dropNewPin);
  };

  // Create new map
  // newMap();
});
