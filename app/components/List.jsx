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
    //var currentLi = $(e.target);
    //var position = currentLi.offset().top;
    //var parent_pos = $('.top').offset().top;
    //var targetPos = position - parent_pos;
    //$(".filter-list").scrollTop(Math.abs(targetPos));
    //$(".top").removeClass('top');
    //currentLi.addClass('top');

    //console.log(position);
    //console.log(parent_pos);
    //console.log(targetPos);
  }

  handleClick (e) {
    this.showPopup(e);
    this.scrollTop(e);
  }

  render () {
    var item = this.props.item;
    var className = `shul-li ${this.props.className}`;
    return (
      <li
        className={className}
        id={item.id}
        onClick={this.handleClick.bind(this)}
        key={item.id} >
        {item.name}
      </li>
    );
  }
}

