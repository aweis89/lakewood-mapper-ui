import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import List from './List.jsx';
import Config from '../../config/default.json';
import Filters from '../filters/general.js';
import shulStore from '../stores/shulStore.js';

class FilterList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fullList: [],
      items: []
    };
  }

  genMarker(item) {
    return window.L.marker([item.latitude, item.longitude]);
  }

  genPulseElem () {
    return $("<div>", {class: 'pulse'});
  }

  removeMarkers () {
    //window.map.removeLayer(window.markerCluster);
  }

  addMarkers () {
    window.markerCluster.clearLayers();
    var _this = this;
    this.state.items.map(function(item) {
      window.markerCluster.addLayer(item.marker);
    });
    window.map.addLayer(window.markerCluster);
  }

  filterList (event) {
    var filtered = Filters.search(
      this.state.fullList, event.target.value
    );
    this.setState({items: filtered});
  }

  componentDidUpdate () {
    this.removeMarkers();
    this.addMarkers();
  }

  componentDidMount () {
    window.markerCluster = new window.L.MarkerClusterGroup();
    shulStore.getAll(function(items) {
      this.setState({items: items, fullList: items});
      this.addMarkers();
    }.bind(this));
  }

  liElements () {
    var i = 0;
    var list_elem = this.state.items.map(function(item) {
      var className = (i === 0) ? 'top' : 'notTop';
      i++;
      return <List className={className} key={item.id} item={ item } />;
    });
    return list_elem;
  }

  render () {
    return (
      <div className="filter-list">
        <input
          type="text"
          placeholder="Search"
          onChange={ this.filterList.bind(this) }
        />
        <ul id="shul-ul"> {this.liElements()} </ul>
      </div>
    );
  }
}

export default FilterList;

