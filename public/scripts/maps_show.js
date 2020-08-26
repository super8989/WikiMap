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

      console.log(obj);
  };

  // AJAX request to api/pins/:id to get the pin data for specific map id.
  const pageURL = $(location).attr("href");
  const splitPageURL = pageURL.split('/');
  const mapID = splitPageURL[splitPageURL.length - 1];

  $.get(`/api/pins/${mapID}`, function(result) {
    result.pins.forEach((pinObj) => addPinsFromDb(pinObj));
  });

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
          <input name="map_id" type="hidden" value='${mapID}'>
        </form>
        <hr>
        <form>
          <button type="submit" class="btn btn-primary btn-sm">Cancel</button>
        </form>
        `
      )
      .openPopup();
  }


  // for creation date: let the server figure out creation date OR in sql use .now for creation date OR another hidden input data for creation date

  map.on("click", dropNewPin);
});