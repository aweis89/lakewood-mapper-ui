import _ from 'underscore';
import $ from 'jquery';
var MarkerImageUrl = "http://www.clker.com/cliparts/N/a/G/A/e/V/map-marker-th.png";
var ol = window.ol;
var map = window.map;

$(document).ready(function() {
  window.map = new ol.Map({

    layers: [
      new ol.layer.Tile({
        source: new ol.source.Stamen({
          layer: 'watercolor'
        })
      }),

      new ol.layer.Tile({
        source: new ol.source.Stamen({
          layer: 'terrain'
        })
      })
    ],

    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
        collapsible: false
      })
    }),

    view: new ol.View({
      center: ol.proj.transform(
        [-74.2218196, 40.0957316],
        'EPSG:4326',
        'EPSG:3857'
      ),
      zoom: 14,
      minZoom: 13
    })

  });
});

window.Marker = {
  addElement: function (address) {
      var lon = address.longitude;
      var lat = address.latitude;
      var pos = ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857');
      var pin = document.createElement('div');
      pin.className = 'pin';
      var pulse = document.createElement('pulse');
      pulse.className = 'pulse';
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
      window.map.addOverlay(marker);
      window.map.addOverlay(pulseMarker);
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

