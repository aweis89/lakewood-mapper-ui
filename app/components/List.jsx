import React from 'react';
import _ from 'underscore';
//import $ from 'jquery';

export default class List extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  //componentDidMount () {
    //this.props.items.map(function(item) {
      //window.Marker.addElement(item);
    //});
  //}
  //

  getTime (item) {
    var r;
    if(item) {
      r = item.time;
    } else {
      r = "";
    }
    return r;
  }

  addMarkers () {
    var item = this.props.item;

    $(item.pin).click( ()=> {
      this.showPopup();
    });

    window.Marker.addMarker(item, item.pin);
    window.Marker.addMarker(item, item.pulse);
  }

  componentDidUpdate () {
    this.addMarkers();
  }

  componentDidMount () {
    this.addMarkers();
  }

  popupContent () {
    var shachrises = this.props.item.shachrises;
    var minchas = this.props.item.minchas;
    var marives = this.props.item.marives;
    var header = "<tr><th>Shachris</th><th>Mincha</th><th>Marive</th></tr>";
    var rows = [];
    for(var i = 0; (i < shachrises.length) || (i < minchas.length) || (i < marives.length); i++) {
      var shachrisTime = this.getTime(shachrises[i]);
      var minchaTime = this.getTime(minchas[i]);
      var mariveTime = this.getTime(marives[i]);
      var row = "<tr><td>" + shachrisTime + "</td><td>" + minchaTime + "</td><td>" + mariveTime + "</td></tr>";
      rows.push(row);
    }

    //return "<table class='table'>" + header + shachrisTimes.join("") + minchaTimes.join("") + mariveTimes.join(" ") + "</table>";
    return "<table class='table'>" + header + rows.join("") + "</table>";
  }

  popupElem () {
    var name = this.props.item.name;
    var content = $("<div>", {class: "popup-content", title: name});
    return content;
  }

  showPopup (event) {
    $(".popover").remove();
    var popupElem = this.popupElem();
    var offset = [-5, -22];
    var positioning = 'top-center';
    var content = this.getContent;
    window.Marker.addMarker(
   
      this.props.item,
      popupElem,
      positioning,
      offset
    );
    $(popupElem).popover({
      'placement': 'top',
      'animation': false,
      'html': true,
      'content': this.popupContent()
    });
    $(popupElem).popover('show');
  }

  centerMap () {
    window.Marker.center(this);
  }

  handleClick() {
    this.showPopup();
    //window.Marker.center(this);
  }

  render () {
    var item = this.props.item;
    return (
      <li className='shul' onClick={this.handleClick.bind(this)} key={item.id} >
        {item.name}
      </li>
    );
  }
}

