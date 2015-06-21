'use strict';
/** @jsx React.DOM */

var FilteredList = require('./FilteredList.jsx');
var map = require('./mapComponent.js');
var React = require('react');
var $ = require('jquery');

$(document).ready(function() {
  React.render(<FilteredList />, document.getElementById('content'));
});
