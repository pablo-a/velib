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

    socket.on("data_sent", function(message) {
        console.log(message['data']);
    });


    socket.on("chunck_sent", function(data) {
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: update(),
          map: map
        });
    });
})

function update() {
    return [
        new google.maps.LatLng(37.776814, -122.438412),
        new google.maps.LatLng(37.776787, -122.438628),
        new google.maps.LatLng(37.776729, -122.438650),
        new google.maps.LatLng(37.776759, -122.438677),
        new google.maps.LatLng(37.776772, -122.438498),
        new google.maps.LatLng(37.776787, -122.438389),
        new google.maps.LatLng(37.776848, -122.438283),
        new google.maps.LatLng(37.776870, -122.438239),
        new google.maps.LatLng(37.777015, -122.438198),
        new google.maps.LatLng(37.777333, -122.438256),
        new google.maps.LatLng(37.777595, -122.438308),
        new google.maps.LatLng(37.777797, -122.438344),
        new google.maps.LatLng(37.778160, -122.438442),
        new google.maps.LatLng(37.778414, -122.438508),
        new google.maps.LatLng(37.778445, -122.438516),
        new google.maps.LatLng(37.778503, -122.438529),
        new google.maps.LatLng(37.778607, -122.438549),
        new google.maps.LatLng(37.778670, -122.438644),
        new google.maps.LatLng(37.778847, -122.438706),
        new google.maps.LatLng(37.779240, -122.438744),
        new google.maps.LatLng(37.779738, -122.438822),
        new google.maps.LatLng(37.780201, -122.438882),
        new google.maps.LatLng(37.780400, -122.438905),
        new google.maps.LatLng(37.780501, -122.438921),
        new google.maps.LatLng(37.780892, -122.438986),
        new google.maps.LatLng(37.781446, -122.439087),
        new google.maps.LatLng(37.781985, -122.439199),
        new google.maps.LatLng(37.782239, -122.439249),
        new google.maps.LatLng(37.782286, -122.439266),
        new google.maps.LatLng(37.797847, -122.429388),
        new google.maps.LatLng(37.797874, -122.429180),
        new google.maps.LatLng(37.797885, -122.429069),
        new google.maps.LatLng(37.797887, -122.429050),
        new google.maps.LatLng(37.797933, -122.428954),
        new google.maps.LatLng(37.798242, -122.428990),
        new google.maps.LatLng(37.798617, -122.429075),
        new google.maps.LatLng(37.798719, -122.429092),
        new google.maps.LatLng(37.798944, -122.429145),
        new google.maps.LatLng(37.799320, -122.429251),
        new google.maps.LatLng(37.799590, -122.429309),
        new google.maps.LatLng(37.799677, -122.429324),
        new google.maps.LatLng(37.799966, -122.429360),
        new google.maps.LatLng(37.800288, -122.429430),
        new google.maps.LatLng(37.800443, -122.429461),
        new google.maps.LatLng(37.800465, -122.429474),
        new google.maps.LatLng(37.800644, -122.429540),
        new google.maps.LatLng(37.800948, -122.429620),
        new google.maps.LatLng(37.801242, -122.429685),
        new google.maps.LatLng(37.801375, -122.429702),
        new google.maps.LatLng(37.801400, -122.429703),
        new google.maps.LatLng(37.801453, -122.429707),
        new google.maps.LatLng(37.801473, -122.429709),
        new google.maps.LatLng(37.801532, -122.429707),
        new google.maps.LatLng(37.801852, -122.429729),
        new google.maps.LatLng(37.802173, -122.429789),
        new google.maps.LatLng(37.802459, -122.429847),
        new google.maps.LatLng(37.802554, -122.429825),
        new google.maps.LatLng(37.802647, -122.429549),
        new google.maps.LatLng(37.802693, -122.429179),
        new google.maps.LatLng(37.802729, -122.428751),
        new google.maps.LatLng(37.766104, -122.409291),
        new google.maps.LatLng(37.766103, -122.409268),
        new google.maps.LatLng(37.766138, -122.409229),
        new google.maps.LatLng(37.766183, -122.409231),
        new google.maps.LatLng(37.766153, -122.409276),
        new google.maps.LatLng(37.766005, -122.409365),
        new google.maps.LatLng(37.765897, -122.409570),
        new google.maps.LatLng(37.765767, -122.409739),
        new google.maps.LatLng(37.765693, -122.410389),
        new google.maps.LatLng(37.765615, -122.411201),
        new google.maps.LatLng(37.765533, -122.412121),
        new google.maps.LatLng(37.765467, -122.412939),
        new google.maps.LatLng(37.765444, -122.414821),
        new google.maps.LatLng(37.765444, -122.414964),
        new google.maps.LatLng(37.765318, -122.415424),
        new google.maps.LatLng(37.763961, -122.415296),
        new google.maps.LatLng(37.763115, -122.415196),
        new google.maps.LatLng(37.762967, -122.415183),
        new google.maps.LatLng(37.762278, -122.415127),
        new google.maps.LatLng(37.761675, -122.415055),
        new google.maps.LatLng(37.760932, -122.414988),
        new google.maps.LatLng(37.759337, -122.414862),
        new google.maps.LatLng(37.773187, -122.421922),
        new google.maps.LatLng(37.773043, -122.422118),
        new google.maps.LatLng(37.773007, -122.422165),
        new google.maps.LatLng(37.772979, -122.422219),
        new google.maps.LatLng(37.772865, -122.422394),
        new google.maps.LatLng(37.772779, -122.422503),
        new google.maps.LatLng(37.772676, -122.422701),
        new google.maps.LatLng(37.772606, -122.422806),
        new google.maps.LatLng(37.772566, -122.422840),
        new google.maps.LatLng(37.772508, -122.422852),
        new google.maps.LatLng(37.772387, -122.423011),
        new google.maps.LatLng(37.772099, -122.423328),
        new google.maps.LatLng(37.771704, -122.423783),
        new google.maps.LatLng(37.771481, -122.424081),
        new google.maps.LatLng(37.771400, -122.424179),
        new google.maps.LatLng(37.771352, -122.424220),
        new google.maps.LatLng(37.771248, -122.424327),
        new google.maps.LatLng(37.770904, -122.424781),
        new google.maps.LatLng(37.770520, -122.425283),
        new google.maps.LatLng(37.770337, -122.425553),
        new google.maps.LatLng(37.770128, -122.425832),
        new google.maps.LatLng(37.769756, -122.426331),
        new google.maps.LatLng(37.769300, -122.426902),
        new google.maps.LatLng(37.769132, -122.427065),
        new google.maps.LatLng(37.769092, -122.427103),
        new google.maps.LatLng(37.768979, -122.427172),
        new google.maps.LatLng(37.768595, -122.427634)
    ];
}
