import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
import '../../bower_components/bootstrap/dist/js/bootstrap.js';

export default class List extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  popupElem () {
    var name = this.props.item.name;
    var content = $("<div>", {class: "popup-content", title: name});
    return content;
  }

  showPopup () {
    var marker = this.props.item.marker;
    window.markerCluster.zoomToShowLayer(marker, function() {
      marker.openPopup();
    });
  }

  scrollTop (e) {
    var $box_parent = $(e.target).parent();
    var top_offset = $box_parent.position().top;
    $box_parent.parent().animate({
      'margin-top': 0 - top_offset
    });
  }

  handleClick (e) {
    this.showPopup(e);
    this.scrollTop(e);
  }

  render () {
    var item = this.props.item;
    return (
      <li
        className='shul'
        id={item.id}
        onClick={this.handleClick.bind(this)}
        key={item.id} >
        {item.name}
      </li>
    );
  }
}

