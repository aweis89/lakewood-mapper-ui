//var React = require('react');
import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import List from './List.jsx';
var Config = require('../../config/default.json');
var RestaurantUrl = 'http://localhost:3000/shuls.json';

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullList: [],
      items: []
    };
  }

  filterList (event) {
    var updatedList = this.state.fullList;
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }

  componentDidMount () {
    $.get(Config.urls.shuls, (response) => {
      this.setState({items: response, fullList: response});
    });
  }

  render () {
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
        <List items={this.state.items}/>
      </div>
    );
  }
}

module.exports = FilterList;
