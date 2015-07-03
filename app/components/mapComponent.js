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
      zoom: 10,
      minZoom: 15
    })

  });
});

window.Marker = {
  add: function (address) {
    var lon = address.longitude;
    var lat = address.latitude;
    var feature = new ol.Feature({
      name: address.name,
      geometry: new ol.geom.Point(ol.proj.transform([Number(lon), Number(lat)], 'EPSG:4326', 'EPSG:3857'))
    });

    var vectorSource = new ol.source.Vector({
      features: [feature]
    });
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://ol3js.org/en/master/examples/data/icon.png'})
    });
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle
    });
    window.map.addLayer(vectorLayer);
  }
};

