$(document).ready(function() {

    // Web Socket init
    var socket = io.connect('http://' + document.domain + ':' + location.port);


    socket.on('connect', function() {
        socket.emit('connection', {data: 'I\'m connected!'});
    });

    socket.on('realtime_data', function(data) {
        // var lst = JSON.parse(data)
        console.log("data sent by bg thread : ")
        console.log(data)
    });

})
