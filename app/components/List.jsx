import React from 'react';

export default class List extends React.Component {

  componentDidMount () {
    this.props.items.map(function(item) {
      window.Marker.add(item);
    });
  }

  componentDidUpdate () {
    this.props.items.map(function(item) {
      window.Marker.add(item);
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

