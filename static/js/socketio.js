$(document).ready(function() {

    var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });

    socket.on('my response', function(message) {
        $('#receiver').text(message['data']);
    });

    $('#button').bind('click', function() {
        socket.emit("load_data", {data: "gimme data", start:"20170705", end:"20170805"});
    });

    // activate when a chunk of data is sent by server.
    socket.on("chunck_sent", function(data) {
        // console.log(data)

        velibLst = JSON.parse(data)
        $("#datetime").text(velibLst[0]['date_extract'])
        heatmapLayerList[currentHeatMapLayer] = new google.maps.visualization.HeatmapLayer({
          data: convert_chunk(velibLst),
          map: map
        });
        if currentHeatMapLayer > HeatMapLayersInDisplay:
            heatmapLayerList[currentHeatMapLayer - HeatMapLayersInDisplay].setMap(null)
    });
})

function convert_chunk(data) {
    pointList = new Array()
    data.forEach( function(elem) {
        pointList.push({location: new google.maps.LatLng(elem['latitude'],
        elem['longitude']), weight: elem['available_bikes']})
    });
        // console.log(elem['available_bikes'])
        // append a weighted point to list. the more bikes available the more heavy
    return pointList
}
