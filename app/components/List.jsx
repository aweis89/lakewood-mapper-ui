import React from 'react';

class List extends React.Component {
  render () {
    return (
      <ul>
        {
          this.props.items.map(function(item) {
           return <li key={item.id}>{item.name} : {item.id}</li>;
          })
        }
      </ul>
    );
  }
}

export default List;
