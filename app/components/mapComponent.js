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
          layer: 'terrain-labels'
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
      zoom: 15,
      minZoom: 12
    })

  });
});
