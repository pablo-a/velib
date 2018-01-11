var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: 48.8534, lng: 2.3488},
      mapTypeId: 'satellite'
    });

    initData = [
      new google.maps.LatLng(48.882551, 2.345368),
      new google.maps.LatLng(48.882745, 2.344586),
      new google.maps.LatLng(48.882842, 2.343688),
      new google.maps.LatLng(48.882919, 2.342815),
      new google.maps.LatLng(48.882992, 2.342112),
      new google.maps.LatLng(48.883100, 2.341461),
      new google.maps.LatLng(48.883206, 2.340829),
      new google.maps.LatLng(48.883273, 2.340324),
      new google.maps.LatLng(48.851266, 2.303355)
    ];

    heatmap = new google.maps.visualization.HeatmapLayer({
      data: initData,
      map: map
    });



}
