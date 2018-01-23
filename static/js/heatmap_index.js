$(document).ready(function() {
    console.log("enter ajax req code")
    var ajax_call = function() {
        var req = $.ajax({
           type:"GET",
           url:"https://www.velib-metropole.fr/webapi/map/details?gpsTopLatitude=49.00094298321503&gpsTopLongitude=2.7699279785156254&gpsBotLatitude=48.75256718365392&gpsBotLongitude=1.8848419189453125&zoomLevel=11"
        });

        req.done(function(data){
           console.log("Request successful!");
           updateMap(data)
        });
    }

    var interval = 1000 * 10; // 10 seconds interval

    setInterval(ajax_call, interval);

});

function updateMap(data) {
    // var lstBikes = JSON.parse(data).content
    pointList = new Array();
    data.forEach( function(elem) {
        var lat = elem['station']['gps']['latitude'];
        var lng = elem['station']['gps']['longitude'];
        var nbBikes = elem['nbBike'] + elem['nbEbike'];
        console.log(elem["station"]['name'])
        console.log(nbBikes)
        // append a weighted point to list. the more bikes available the more heavy
        pointList.push({location: new google.maps.LatLng(lat, lng), weight: nbBikes});
    });

    // remove old heatmapLayer
    heatmap.setMap(null)
    // insert in heatmap
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: pointList,
        map: map
    });
    heatmap.set('radius', 30);
    heatmap.set('opacity', 0.5)
}


function initMap() {
    // global variables we'll need for display (in socketio.js)
    currentHeatMapLayer = 0
    heatMapLayersInDisplay = 5
    heatmapLayerList = []

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 48.8534, lng: 2.3488},
      mapTypeId: 'roadmap'
    });

    initData = [
      new google.maps.LatLng(48.882551, 2.345368)
    ];

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: initData,
      map: map
    });
}
