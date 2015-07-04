import React from 'react';

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

  componentDidUpdate () {
    //window.map.removeLayer(this.state.markers);
    //this.state.markers = window.Marker.add(this.props.items);
    this.props.items.map(function(item) {
      window.Marker.addElement(item);
    });
  }

  render () {
    return (
      <ul>
        {
          this.props.items.map(function(item) {
           return <li key={item.id}>{item.name}</li>;
          })
        }
      </ul>
    );
  }
}

