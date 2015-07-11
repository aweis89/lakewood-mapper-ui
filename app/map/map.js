import $ from 'jquery';
import bingInit from './bing.js';
var BingApiKey = 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3';

$(document).ready(function() {
  var L = window.L;
  bingInit(L);

  var map = window.map = L.map('map', {
    center: [40.09363459618479, -74.2246627807617],
    zoom: 14
  });

  var satelite = new L.BingLayer(BingApiKey, {
    type: 'AerialWithLabels',
    maxZoom: 20
  });

  var road = new L.BingLayer(BingApiKey, {
    type: 'road',
    maxZoom: 19
  });

  map.addLayer(road);

  L.easyButton('glyphicon-road', function(btn) {
    map.removeLayer(satelite);
    map.addLayer(road);
  }, 'road view').addTo(map);

  L.easyButton('glyphicon-globe', function(btn) {
    map.removeLayer(road);
    map.addLayer(satelite);
  }).addTo(map);

});
