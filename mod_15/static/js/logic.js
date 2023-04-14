function createMap(earthquakes) {
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let basemap = {
        "World Map": streetmap
    };

    let overlayMap = {
        "Earthquakes": earthquakes
    };

    let map = L.map("map", {
        center: [40, -100],
        zoom: 6,
        layers: [streetmap, earthquakes]
    });


}

function createMarkers(response) {
    let features = response.features;

    let earthquakeMarks = [];

    for (let index = 0; index < features.length; index++) {
        let CIRCLE = features[index];
        let coordinates = CIRCLE.geometry.coordinates;
        let M = CIRCLE.properties.mag;
        let color = "";
        if (coordinates[2] > 90) {
          color = "red";
        } else if (coordinates[2] > 70 && coordinates[2] < 90) {
          color = "blue";
        } else if (coordinates[2] > 50 && coordinates[2] < 70) {
          color = "pink";
        } else if (coordinates[2] > 30 && coordinates[2] < 50) {
          color = "brown";
        } else if (coordinates[2] > 10 && coordinates[2] < 30) {
          color = "green";
        } else {
          color = "purple";
        }

        let earthquakeMarker = L.circle([coordinates[1], coordinates[0]], {
          fillOpacity: 1,
          color: "black",
          weight: .5,
          fillColor: color,
          
          radius: parseFloat(M) * 10000
        }).bindPopup("<h3>Earthquake Information</h3><hr><p><strong>M:</strong> " + M + "</p>");
    
        
        earthquakeMarks.push(earthquakeMarker);
      }
    
      // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
      createMap(L.layerGroup(earthquakeMarks));
    }


    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

    d3.json(url).then(createMarkers);