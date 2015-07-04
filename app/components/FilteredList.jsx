import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import List from './List.jsx';
import Config from '../../config/default.json';
import Filters from '../filters/general.js';

class FilterList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fullList: [],
      items: []
    };
  }

  removeMarkers () {
    window.map.getOverlays().getArray().slice(0).forEach(function(overlay) {
      window.map.removeOverlay(overlay);
    });
  }

  componentDidUpdate () {
    this.state.items.map(function(item) {
      window.Marker.addMarkers(item);
    });
  }

  filterList (event) {
    this.removeMarkers();
    var filtered = Filters.search(
      this.state.fullList, event.target.value
    );
    this.setState({items: filtered});
  }

  componentDidMount () {
    $.get(Config.urls.shuls, (response) => {
      this.setState({items: response, fullList: response});
    });
  }

  render () {
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={ this.filterList.bind(this) }/>
        <ul>
        {
          this.state.items.map(function(item) {
          return (
            <List key={item.id} item={ item } />
            );
          })
        }
      </ul>
      </div>
    );
  }
}

export default FilterList;

