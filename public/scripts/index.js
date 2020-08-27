const mapOne = L.map('mapid1', {
  zoomControl: false,
  maxZoom: 18,
  minZoom: 6,
}).setView([37.38276990, -5.99457996], 16);

const mapTwo = L.map('mapid2', {
  zoomControl: false,
  maxZoom: 18,
  minZoom: 6,
}).setView([51.505, -0.09], 16);

const mapThree = L.map('mapid3', {
  zoomControl: false,
  maxZoom: 18,
  minZoom: 6,
}).setView([45.42411530, -75.69902070], 16);

const mapFour = L.map('mapid4', {
  zoomControl: false,
  maxZoom: 18,
  minZoom: 6,
}).setView([40, -4], 6);

const mapFive = L.map('mapid5', {
  zoomControl: false,
  maxZoom: 18,
  minZoom: 6,
}).setView([40, -4], 6);

const mapSix = L.map('mapid6', {
  zoomControl: false,
  maxZoom: 18,
  minZoom: 6,
}).setView([40, -4], 6);

// Add a tile layer to the map (Mapbox Streets tile layer)
const mapboxUrl = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=rIGAtgd1JPJDWIhCRmru';
const mapboxAttribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';


const mapbox = (map) => {
  return L.tileLayer(mapboxUrl, {
    attribution: mapboxAttribution,
  }).addTo(map)
};

[mapOne, mapTwo, mapThree, mapFour, mapFive, mapSix].forEach(mapInstance => mapbox(mapInstance));
