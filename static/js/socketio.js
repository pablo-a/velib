$(document).ready(function() {

    var socket = io.connect('http://' + document.domain + ':' + location.port);
    socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });

    socket.on('my response', function(message) {
        $('#receiver').text(message['data']);
    });

    // date picker
    start = "2018-01-20"
    end = "2018-02-10"
    $('input[name="daterange"]').daterangepicker(
        { locale: {format: 'YYYY-MM-DD'}},
        function(start, end, label) {
        start = start.format('YYYY-MM-DD')
        end = end.format('YYYY-MM-DD')
    });

    $('#button').bind('click', function() {
        console.log(start)
        console.log(end)
        socket.emit("load_data", {data: "gimme data", start:"20170705", end:"20170805"});
    });

    // activate when a chunk of data is sent by server.
    socket.on("chunck_sent", function(data) {
        heatmap.setMap(null)
        velibLst = JSON.parse(data)
        $("#datetime").text(velibLst[0]['date_extract'])
        heatmapLayerList[currentHeatMapLayer] = new google.maps.visualization.HeatmapLayer({
          data: convert_chunk(velibLst),
          map: map
        });
        heatmapLayerList[currentHeatMapLayer].set('radius', 30);
        heatmapLayerList[currentHeatMapLayer].set('opacity', 0.2);
        if (currentHeatMapLayer >= heatMapLayersInDisplay) {
             heatmapLayerList[currentHeatMapLayer - heatMapLayersInDisplay].setMap(null)
        }
        currentHeatMapLayer += 1
    });
})

function convert_chunk(data) {
    pointList = new Array()
    data.forEach( function(elem) {
        // append a weighted point to list. the more bikes available the more heavy
        pointList.push({location: new google.maps.LatLng(elem['latitude'],
        elem['longitude']), weight: elem['available_bikes']})
    });
    return pointList
}
