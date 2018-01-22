var map, heatmap;

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
