$(() => {
  const map = L.map("mapid").setView([43.65, -79.38], 13);

  // Add tileLayer to our map
  L.tileLayer(
    `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=8XDAnrbH4UlK8LQKyTB9`,
    {
      attribution: `
      <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
      <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
    }
  ).addTo(map);

  // Add a pin at [lat,long] > Initial = lighthouse labs
  const marker = L.marker([43.64426, -79.40226]).addTo(map);
  //openPopup() only works for markers
  marker.bindPopup("Lighthouse Labs").openPopup();

  // Render pins on the map from db
  const addPinsFromDb = (obj) => {
    // console.log("addPinsFromDb obj in maps.js", obj);
    const marker = L.marker([obj.latitude, obj.longitude]).addTo(map)
      .bindPopup(`
      <p>Place: ${obj.title}</p>
      <p>Description: ${obj.description}</p>
      <img src="${obj.image_url}" alt="Pin image" class="img-thumbnail showImg">
      <p>Created by: ${obj.id}</p>
      <form method="POST" action='/maps/${obj.id}/delete'>
        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
      </form>
      `);
  };

  // AJAX request to api/pins to get the pin data
  $.get("/api/pins", function (result) {
    console.log("result.pins from .get /api/pins", result.pins);
    result.pins.forEach((pinObj) => addPinsFromDb(pinObj));
  });

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
          <input id="title" name="title" class="form-control form-control-sm" type="text" placeholder="Title"><br>
          <label for="description">Description:</label><br>
          <input name="description" id="description" class="form-control form-control-sm" type="text" placeholder="Description"><br>
          <label for="image_url">Image:</label><br>
          <input name="image_url" id="image_url" class="form-control form-control-sm" type="text" placeholder="Image URL"><br>
          <button type="submit" class="btn btn-primary btn-sm">Create new pin!</button>
          <input name="latitude" type="hidden" value='${e.latlng.lat}'>
          <input name="longitude" type="hidden" value='${e.latlng.lng}'>
        </form>
        <hr>
        <form>
          <button type="submit" class="btn btn-primary btn-sm">Cancel</button>
        </form>
        `
      )
      .openPopup();
  }

  // instead of a form, i could do an ajax post -> .then() gets the single object back from the server with res.json(data.rows[0]) because of RETURNING * -> call addPinFromDb() with the object returned --> so then the page would not be redirected and refreshed

  // form without method defaults to get and gets the current page hence refreshes the page

  // for creation date: let the server figure out creation date OR in sql use .now for creation date OR another hidden input data for creation date

  map.on("click", dropNewPin);
});
