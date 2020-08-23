$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users",
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  // });

  // $(document).ready(function () {
  // Initialize the map and setView to ([lat, long], zoom)
  const mymap = L.map("mapid").setView([51.505, -0.09], 13);

  // Add tileLayer to our map
  L.tileLayer(
    "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=GWJMQEvhI4ph9fwqGcab",
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }
  ).addTo(mymap);

  // Add a pin at [lat,long]
  const marker = L.marker([51.5, -0.09]).addTo(mymap);

  // Add a circle at [lat,long]
  const circle = L.circle([51.508, -0.11], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 500,
  }).addTo(mymap);

  // Add a circle at [lat,long]
  const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
  ]).addTo(mymap);

  //openPopup() only works for markers
  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  circle.bindPopup("I am a circle.");
  polygon.bindPopup("I am a polygon.");

  // Standalone popup at the lat/long
  /*  const popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap); */

  // Click event creates popup
  /*   const popup = L.popup();
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

    // newMarker.bindPopup(`lat:${e.latlng.lat}, lng:${e.latlng.lng}`).openPopup();
    newMarker
      .bindPopup(
        `
        <form method='POST' action="/pins">
          <label for="title">Place:</label><br>
          <input type="text" id="title" name="title" value="Place"><br>
          <label for="description">Description:</label><br>
          <input type="text" id="description" name="description" value="Description"><br><br>
          <button type="submit">Submit</button> 
          
          <input name="lat" type="hidden" value='${e.latlng.lat}'>
          <input name="lng" type="hidden" value='${e.latlng.lng}'>
          </input>
           
          </form>
        `
      )
      .openPopup();
  }

  // passing an input inside form, make it hidden

  mymap.on("click", dropNewPin);
});
