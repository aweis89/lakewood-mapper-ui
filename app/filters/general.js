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
};

export default Filters;
