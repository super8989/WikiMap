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
    const marker = L.marker([obj.latitude, obj.longitude]).addTo(mymap);
  };

  // AJAX request to api/pins to get the pin data
  $.get("/api/pins", function (result) {
    console.log("result.pins", result.pins);
    result.pins.forEach((pinObj) => addPinsFromDb(pinObj));
  });

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

  let newMarker;
  // Drop a new pin and submit a form > POST /pins
  function dropNewPin(e) {
    console.log(e);
    console.log(e.latlng);

    newMarker = L.marker([e.latlng.lat, e.latlng.lng], {
      title: "appears on hover",
      draggable: true,
      riseOnHover: true,
    }).addTo(mymap);

    // Send POST to pins.js
    newMarker
      .bindPopup(
        `
        <form method='POST' action="/maps">
          <label for="title">Title:</label><br>
          <input id="title" name="title" class="form-control form-control-sm" type="text" placeholder="Title"><br>
          <label for="description">Description:</label><br>
          <input name="description" id="description" class="form-control form-control-sm" type="text" placeholder="Description"><br>
          <label for="image_url">Image:</label><br>
          <input name="image_url" id="image_url" class="form-control form-control-sm" type="text" placeholder="Image URL"><br>
          <button type="submit" class="btn btn-primary btn-sm">Create new pin!</button>

          <input name="lat" type="hidden" value='${e.latlng.lat}'>
          <input name="lng" type="hidden" value='${e.latlng.lng}'>

          </input>
        </form>
        `
      )
      .openPopup();
  }

  // for creation date: let the server figure out creation date OR in sql use .now for creation date OR another hidden input data for creation date

  mymap.on("click", dropNewPin);
});
