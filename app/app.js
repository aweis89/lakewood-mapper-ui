require('./components/index.jsx');
import $ from 'jquery';
var ol = window.ol;

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
