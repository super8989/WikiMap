$(() => {
  const mymap = L.map("mapid").setView([51.505, -0.09], 13);

  // Add tileLayer to our map
  L.tileLayer(
    "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=8XDAnrbH4UlK8LQKyTB9",
    {
      attribution: `
      <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>
      <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
    }
  ).addTo(mymap);

  // Add a pin at [lat,long]
  const marker = L.marker([51.5, -0.09]).addTo(mymap);
  //openPopup() only works for markers
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  // Add a circle at [lat,long]
  /*   const circle = L.circle([51.508, -0.11], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(mymap);
  circle.bindPopup("I am a circle."); */

  // Add a polygon at [lat,long]
  /*   const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
  ]).addTo(mymap);
  polygon.bindPopup("I am a polygon."); */

  // Render pins on the map from db
  const addPinsFromDb = (obj) => {
    // console.log("addPinsFromDb obj in maps.js", obj);
    const marker = L.marker([obj.lat, obj.lng]).addTo(mymap).bindPopup(`
      <p>Place: ${obj.title}</p>
      <p>Description: ${obj.description}</p>
      <p>Latitude: ${obj.lat}</p>
      <p>Longitude: ${obj.lng}</p>
      <p>id: ${obj.id}</p>
      <form method="POST" action='/maps/${obj.id}/delete'>
        <button>Delete</button>
      </form>
      `);
  };

  // AJAX request to api/pins to get the pin data
  $.get("/api/pins", function (result) {
    console.log("result.pins", result.pins);
    result.pins.forEach((pinObj) => addPinsFromDb(pinObj));
  });

  //if not refreshing to get the pins, refer to Tweeter for the client side rendering

  //another example of AJAX: when i click this button, make an ajax request -- ajax = way to ask server for things

  /*   // Standalone popup at the lat/long
  const popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

  // Click event creates popup
  const popup = L.popup();
  function onMapClick(e) {
    console.log(e.latlng);
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
  }
  mymap.on("click", onMapClick); */

  // function cancelForm {
  //   console.log("clicked");
  //   // document.querySelector("#map_container").   mymap.removeLayer(newMarker);
  // }

  // Drop a new pin and submit a form > POST /pins
  function dropNewPin(e) {
    console.log(e);
    console.log(e.latlng);

    const newMarker = L.marker([e.latlng.lat, e.latlng.lng], {
      title: "appears on hover",
      draggable: true,
      riseOnHover: true,
    }).addTo(mymap);

    // Send POST to pins.js
    newMarker
      .bindPopup(
        `
        <form method='POST' action="/maps">
          <label for="title">Place:</label><br>
          <input type="text" id="title" name="title" value="Place"><br>
          <label for="description">Description:</label><br>
          <input type="text" id="description" name="description" value="Description"><br><br>
          <button type="submit">Submit</button>
          <input name="lat" type="hidden" value='${e.latlng.lat}'>
          <input name="lng" type="hidden" value='${e.latlng.lng}'>
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

  mymap.on("click", dropNewPin);
});
