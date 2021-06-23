mapboxgl.accessToken = 'pk.eyJ1IjoibGlsY3RodWx1IiwiYSI6ImNrcThweWN4bzAybWQzMGt5amlmNDd1NHIifQ.cDLNWMRoZ8PKz3VRujHhNQ';


function happyPath(pos) {
    console.log(pos)
    setupMap([pos.coords.longitude, pos.coords.latitude]);
}

function sadPath() {
    setupMap(3.56, 30.49)
}


navigator.geolocation.getCurrentPosition(
    happyPath,
    sadPath, { enableHighAccuracy: true }
);


function setupMap(curPos) {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-v9',
        center: curPos,
        zoom: 15,

    });

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const directions = new MapboxDirections({
        accessToken: 'pk.eyJ1IjoibGlsY3RodWx1IiwiYSI6ImNrcThweWN4bzAybWQzMGt5amlmNDd1NHIifQ.cDLNWMRoZ8PKz3VRujHhNQ'
    })

    map.addControl(directions, 'top-left')

    map.on('load', function() {

        //3d Buildings (Alpha test) 
        //Conflict with satalite map style for some reason

        // Insert the layer beneath any symbol layer.
        // var layers = map.getStyle().layers;
        // var labelLayerId;
        // for (var i = 0; i < layers.length; i++) {
        //     if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
        //         labelLayerId = layers[i].id;
        //         break;
        //     }
        // }

        // // Adding height layer for rendering buildings
        // map.addLayer({
        //         'id': 'add-3d-buildings',
        //         'source': 'composite',
        //         'source-layer': 'building',
        //         'filter': ['==', 'extrude', 'true'],
        //         'type': 'fill-extrusion',
        //         'minzoom': 15,
        //         'paint': {
        //             'fill-extrusion-color': '#aaa',


        //             // add a smooth transition effect to
        //             // the buildings as the user zooms in.
        //             'fill-extrusion-height': [
        //                 'interpolate', ['linear'],
        //                 ['zoom'],
        //                 15,
        //                 0,
        //                 15.05, ['get', 'height']
        //             ],
        //             'fill-extrusion-base': [
        //                 'interpolate', ['linear'],
        //                 ['zoom'],
        //                 15,
        //                 0,
        //                 15.05, ['get', 'min_height']
        //             ],
        //             'fill-extrusion-opacity': 0.6
        //         }
        //     },

        //     labelLayerId
        // );

        //Adding distance fog to help with rendering speed issues
        map.setFog({
            'range': [1.5, 8],
            'color': 'white',
            'horizon-blend': 0.5
        });

        // Add some 3d terrain
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.terrain-rgb',
            'tileSize': 512,
            'maxzoom': 14
        });
        map.setTerrain({
            'source': 'mapbox-dem',
            'exaggeration': 1.5
        });
    });


}