
mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
    projection: 'globe' // display the map as a 3D globe

});
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style

});


// create the popup
const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    `<h3>${campground.title}</h3> <p>${campground.location}</p>`
);


// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';


const marker1 = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup) // sets a popup on this marker
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl());



