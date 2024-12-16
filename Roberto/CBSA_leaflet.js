var geojsonLayer1, geojsonLayer2;

var myMap = L.map('map', {
    center: [39.5, -97],
    zoom: 5
});

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

// Getting our GeoJSON data
d3.json("USA_Core_Based_Statistical_Area.geojson").then(function(data) {
    geojsonLayer1 = L.geoJson(data, {
        style: cbsa_style,
        onEachFeature: onEachFeature
    }).addTo(myMap);
});

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight //,
        // click: zoomToFeature
    });
}

// Load and add the second GeoJSON layer
// d3.json('datasets/us-states.geojson').then(function(data) {
//     geojsonLayer2 = L.geoJson(data, {
//                             style: states_style,
//                             onEachFeature: function(feature, layer) {
//                                 layer.on({
//                                     // mouseover: highlightFeature,
//                                     // mouseout: resetHighlight
//                                 });
//                             }
//                         }).addTo(myMap);
// });

function states_style(feature) {
    return {
        weight: 5,
        opacity: 1,
        color: 'blue',
        fillOpacity: 0
    };
}

function cbsa_style(feature) {
    return {
        fillColor: getColor(feature.properties.CBSA_ID),
        weight: 2,
        opacity: 1,
        color: 'green',
        dashArray: '3',
        fillOpacity: 0.2
    };
}

function getColor(d) {
    return d >= 3 ? '#800026' :
           d >= 2 ? '#E31A1C' :
           d >= 1 ? '#FD8D3C' :
           d >= 0 ? '#FED976' :
                      '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        // color: 'red',
        // dashArray: '',
        fillOpacity: 0.5
    });

    layer.bringToFront();
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojsonLayer1.resetStyle(e.target);
    info.update();
}

var info = L.control();

info.onAdd = function (myMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        // '<b>props.name</b><br />props.density people / mi<sup>2</sup>'
        '<b>' + props.NAME + '</b><br />' + props.POP_SQMI + ' people / mi<sup>2</sup>'
        : 'Hover over a CBSA region');
};

info.addTo(myMap);

// Create a legend to display information about our map.
let legend = L.control({position: 'bottomright'});

// When the layer control is added, insert a div with the class of "legend".
legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3];

    div.innerHTML += '<b>Air Quality<b><br>'
        // loop through our temperature intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 0.1) + '"></i> ' +
            (grades[i] == 3 ? 'Hazardous' :
            grades[i] == 2 ? 'Poor' :
            grades[i] == 1 ? 'Moderate' : 'Good')  + '<br>';
    }

    return div;
};
// Add the info legend to the map.
legend.addTo(myMap);
