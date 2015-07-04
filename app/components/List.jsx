import React from 'react';
import $ from 'jquery';

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

  popupElem () {
    var name = this.props.item.name;
      var container = $("<div>", {id: "popup", class: "ol-popup"});
      var closer = $("<a>", {class: "ol-popup-closer", id: "popup-closer", text: name, href: "#"});
      var content = $("<div>", {class: "popover-content", text: name});
      container.append(closer);
      container.append(content);
      return container;
  }

  showPopup (event) {
    var popupElem = this.popupElem();
    var offset = [0, -20];
    var positioning = 'top-center';
    window.Marker.addMarker(
      this.props.item,
      popupElem,
      positioning,
      offset
    );
  }

  render () {
    var item = this.props.item;
    return (
      <li onClick={this.showPopup.bind(this)} key={item.id} >
        {item.name}
      </li>
    );
  }
}

