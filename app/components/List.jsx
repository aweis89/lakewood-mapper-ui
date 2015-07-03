import React from 'react';

export default class List extends React.Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate () {
    window.map.removeLayer(this.state.markers);
    this.state.markers = window.Marker.add(this.props.items);
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

