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

  genPinElem() {
    return $("<a>", {class: 'pin'})
    .attr("data-toggle", "dropdown")
    .attr("data-trigger", "focus")
    .attr("data-content", "This shouls be the pupups content");
  }

  genPulseElem () {
    return $("<div>", {class: 'pulse'});
  }

  removeMarkers () {
    window.map.getOverlays().getArray().slice(0).forEach(function(overlay) {
      window.map.removeOverlay(overlay);
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
    $.get(Config.urls.shuls, (items) => {
      _.each(items, (item) => {
        item.pin = this.genPinElem();
        item.pulse = this.genPulseElem();
      });
      $("#map").on('click', (e) => {
        $(".popover").remove();
      });
      this.setState({items: items, fullList: items});
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

