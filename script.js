mapboxgl.accessToken = 'pk.eyJ1IjoiZHJpbm5pcmQiLCJhIjoiY201b2RyYXRhMGt1YTJvcHQ4ZjU4dDYycSJ9.jHNRKSu149-F5s157m1GwA'; // Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/drinnird/cm6if66vx008601qq12b6ggk6', // style URL
    center: [-79.39, 43.662], // starting position [lng, lat]
    zoom: 12
});

map.on('load', () => {

    // Add a data source containing GeoJSON data
    map.addSource('uoft-data', {
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Sidney Smith Hall"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point"
                    }
                }
            ]
        }
    });

    map.addLayer({
        'id': 'uoft-pnt',
        'type': 'circle',
        'source': 'uoft-data',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222'
        }

    });

    // Add a data source from a GeoJSON file
    map.addSource('buildings-data', {
        type: 'geojson',
        data: 'https://drinnnird-uoft.github.io/week_05_ex_01/wk5-data/buildings.geojson' // Your URL to your buildings.geojson file
    });

    map.addLayer({
        'id': 'buildings-point',
        'type': 'circle',
        'source': 'buildings-data',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });

    // Add a data source from a Mapbox tileset
    map.addSource('weather-data', { // Create your own source ID
        'type': 'vector',
        'url': 'mapbox://drinnird.1xkvgkqp' // Update to your mapbox tileset ID
    });

    map.addLayer({
        'id': 'coropleth', // Create your own layer ID
        'type': 'fill', // Note this is different to point data
        'source': 'weather-data', // Must match source ID from addSource Method
        'paint': {
            'fill-color': '#888888', // Test alternative colours and style properties
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        },
        'source-layer': 'map-3a21ul' // Tileset NAME (diff to ID), get this from mapbox tileset page
    },
        'buildings-point' // Drawing order - places layer below points
        // Here the addlayer method takes 2 arguments (the layer as an object and a string for another layer's name). If the other layer already exists, the new layer will be drawn before that one
    );



});
