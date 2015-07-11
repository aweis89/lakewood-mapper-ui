import $ from 'jquery';
//import emitter from 'emitter';
import _ from 'underscore';
import Config from '../../config/default.json';

class Prayer {
  constructor(data) {
    this.time = Date.today().at({
      hour: Number(data.hour),
      minute: Number(data.minute)
    }).toString("h:mm tt");
  }
}

class Mincha extends Prayer {
  constructor(data) { super(data); }
}
class Marive extends Prayer {
  constructor(data) { super(data); }
}
class Shachris extends Prayer {
  constructor(data) { super(data); }
}

class Shul {
  constructor(data) {
    this.name = data.name;
    this.minchas = data.minchas.map(m => new Mincha(m));
    this.marives = data.marives.map(m => new Marive(m));
    this.shachrises = data.shachrises.map(s => new Shachris(s));
    this.marker = this.marker(data.latitude, data.longitude);
  }

  marker(lat, lon) {
    var marker = window.L.marker([lat, lon]);
    marker.bindPopup(this.popupContent());
    return marker;
  }

  popupContent () {
    var shachrises = this.shachrises;
    var minchas = this.minchas;
    var marives = this.marives;
    var header = "<tr><td>Shachris</td><td>Mincha</td><td>Marive</td></tr>";
    var rows = [];
    for(var i = 0; (i < shachrises.length) || (i < minchas.length) || (i < marives.length); i++) {
      var shachrisTime = this.getTime(shachrises[i]);
      var minchaTime = this.getTime(minchas[i]);
      var mariveTime = this.getTime(marives[i]);
      var row = `<tr>
      <td> ${shachrisTime} </td>
      <td> ${minchaTime} </td>
      <td> ${mariveTime} </td>
      </tr>`;
      rows.push(row);
    }
    return `<table class="table"> ${header} ${rows.join("")} </table>`;
  }

  getTime (item) {
    return item ? item.time : "";
  }


}

class Store {
  constructor(url) {
    this._collection = [];
    this._url = url;
  }

  getAll(callback) {
    $.get(this._url, (items) => {
      items = items.map(item => new Shul(item));
      callback(items);
    })
    .fail(function(error) {
      console.log(error);
    });
  }

  _notify() {
    //emitter.emit("changed", this.collection);
  }
}


var shulStore = new Store(Config.urls.shuls);
export default shulStore;
module.exports = shulStore;
