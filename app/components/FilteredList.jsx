'use strict';
/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var $ = require('jquery');
var RestaurantUrl = 'http://localhost:3000/shuls.json';

module.exports = React.createClass({

  filterList: function(event) {
    var updatedList = this.state.fullList;
    updatedList = updatedList.filter(function(item){
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },

  componentDidMount: function() {
    $.get(RestaurantUrl, function(response){
      if(this.isMounted()) {
        this.setState({items: response, fullList: response});
      }
    }.bind(this));
  },

  getInitialState: function(){
    return {
      fullList: [],
      items: []
    };
  },

  render: function(){
    return (
      <div className="filter-list">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
        <List items={this.state.items}/>
      </div>
    );
  }
});

var List = React.createClass({
  render: function(){
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
});
