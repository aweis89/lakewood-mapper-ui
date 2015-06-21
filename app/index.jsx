'use strict';
/** @jsx React.DOM */

var FilteredList = require('./FilteredList.jsx');
var map = require('./map.js');
var React = require('../bower_components/react/react');
var $ = require('jquery');

$(document).ready(function() {
  React.render(<FilteredList />, document.getElementById('content'));
});
