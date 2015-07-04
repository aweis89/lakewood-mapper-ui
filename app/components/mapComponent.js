import _ from 'underscore';
import $ from 'jquery';
var MarkerImageUrl = "http://www.clker.com/cliparts/N/a/G/A/e/V/map-marker-th.png";
var ol = window.ol;
var map = window.map;

window.Marker = {
  addElement: function (address) {
      var lon = address.longitude;
      var lat = address.latitude;
      var pos = ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857');
      
      var pin = $("<a>", {class: 'pin'}).attr("data-toggle", "dropdown").attr("data-trigger", "focus").attr("data-content", "This shouls be the pupups content");
      var pulse = $("<div>", {class: 'pulse'});
      var popupElem = $("<div>");
      var marker = new ol.Overlay({
        position: pos,
        positioning: 'center-center',
        element: pin,
        stopEvent: false
      });
      var pulseMarker = new ol.Overlay({
        position: pos,
        positioning: 'center-center',
        element: pulse,
        stopEvent: false
      });
      var popupMarker = new ol.Overlay({
        position: pos,
        positioning: 'top',
        element: popupElem,
        stopEvent: false
      });

      window.map.addOverlay(marker);
      window.map.addOverlay(pulseMarker);
      window.map.addOverlay(popupMarker);
      
  },

  add: function (addresses) {
    var features = [];
    for(var i = 0; i < addresses.length; i++) {
      var address = addresses[i];
      var lon = address.longitude;
      var lat = address.latitude;
      var feature = new ol.Feature({
        name: address.name,
        geometry: new ol.geom.Point(ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857'))
      });
     features.push(feature);
    }

    var vectorSource = new ol.source.Vector({
      features: features
    });
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: MarkerImageUrl
      })
    });
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle
    });
    window.map.addLayer(vectorLayer);
    return vectorLayer;
  }
};

