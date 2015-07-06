/*jshint esnext: true */

import React from 'react';

var Filters = {
  search: function (items, searchVal) {
    var filtered = items.filter((item) => {
      var match = item.name.toLowerCase().search(
        searchVal.toLowerCase()
      );
      return match !== -1;
    });
    return filtered;
  }

  //distance: function (longLat, longLat2) {
    //var lat1 = longLat.latitude;
    //var lon1 = longLat.longitude;

    //var lon2 = longLat2.longitude;
    //var lat2 = longLat2.latitude;

    //var R = 6371000; // metres
    //var φ1 = lat1.toRadians();
    //var φ2 = lat2.toRadians();
    //var Δφ = (lat2 - lat1).toRadians();
    //var Δλ = (lon2 - lon1).toRadians();

    //var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      //Math.cos(φ1) * Math.cos(φ2) *
      //Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    //var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //return R * c;
  //}
};

export default Filters;
