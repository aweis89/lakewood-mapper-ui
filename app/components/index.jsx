import FilteredList from './FilteredList.jsx';
import map from './mapComponent.js';
import React from 'react';

$(document).ready(function() {
  React.render(<FilteredList />, document.getElementById('content'));
});
