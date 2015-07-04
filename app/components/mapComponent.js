import _ from 'underscore';
import $ from 'jquery';
var MarkerImageUrl = "http://www.clker.com/cliparts/N/a/G/A/e/V/map-marker-th.png";
var ol = window.ol;
var map = window.map;

window.Marker = {

  addMarker: function(address, element, positioning, offset) {
    positioning = positioning || 'center-center';
    offset = offset || [0, 0];

    var lon = address.longitude;
    var lat = address.latitude;
    var pos = ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857');

    var overlay = new ol.Overlay({
      position: pos,
      positioning: positioning,
      element: element,
      stopEvent: false,
      offset: offset
    });
    window.map.addOverlay(overlay);
  },

  addMarkers: function (address) {

      var pinElement = $("<a>", {class: 'pin'}).attr("data-toggle", "dropdown").attr("data-trigger", "focus").attr("data-content", "This shouls be the pupups content");
      var pulseElement = $("<div>", {class: 'pulse'});
      window.Marker.addMarker(address, pinElement);
      window.Marker.addMarker(address, pulseElement);
  },

  center: function (address) {
    var lon = address.longitude;
    var lat = address.latitude;
    window.map.getView().setCenter(ol.proj.transform([lon, lat], 'EPSG:4326', 'EPSG:3857'));
    window.map.getView().setZoom(5);
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

