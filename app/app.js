require('./components/index.jsx');
import $ from 'jquery';
var ol = window.ol;

$(document).ready(function() {
var styles = [
  'Road',
  'AerialWithLabels'
];
var layers = [];
var i, ii;
for (i = 0, ii = styles.length; i < ii; ++i) {
  layers.push(new ol.layer.Tile({
    visible: false,
    preload: Infinity,
    source: new ol.source.BingMaps({
      key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
      imagerySet: styles[i]
      // use maxZoom 19 to see stretched tiles instead of the BingMaps
      // "no photos at this zoom level" tiles
      // maxZoom: 19
    })
  }));
}

  window.map = new ol.Map({

//var styles = [
  //'Road',
  //'Aerial',
  //'AerialWithLabels',
  //'collinsBart',
  //'ordnanceSurvey'
//]
    //layers: [
      //new ol.layer.Tile({
        //source: new ol.source.BingMaps({
          //key: 'AhPCuW6fOJHCt6N6pM2EoEoMkn6suqlauZcFFtxSI-U-HBEzgBnU2E4FyHgnvx7N',
          //imagerySet: 'AerialWithLabels'
        //})
      //})
    //],
    layers: layers,

    loadTilesWhileInteracting: true,

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

  var select = document.getElementById('layer-select');
  function onChange() {
    var style = select.value;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      layers[i].setVisible(styles[i] === style);
    }
  }
  select.addEventListener('change', onChange);
  onChange();
});
