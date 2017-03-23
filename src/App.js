import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';
import Menu from './Menu.js';

class App extends Component {

  state = {
      location: 2950157,
      childText: "Click me!",
      data: {},
      dates: [],
      temps: [],
      selected: {
          date: '',
          temp: null
      }
  };

  fetchData = () => {
      //evt.preventDefault();
      var location = this.state.location;
      var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?id=';
      var urlSuffix = '&APPID=6508cdac65a3c15a6cc07bcb91445a4f&units=metric';
      var url = urlPrefix + location + urlSuffix;

      var self = this;

      xhr({
          url: url,
          //interval: 60000000
      }, function (err, data) {
            var body = JSON.parse(data.body);
            var list = body.list;
            var dates = [];
            var temps = [];
            for(var i = 0; i < list.length; i++) {
                dates.push(list[i].dt_txt);
                temps.push(list[i].main.temp);
            }
            self.setState({
                data: body,
                dates: dates,
                temps: temps,
                selected: {
                    date: '',
                    temp: null
                }
            });

      });

      console.log('fetch data for', this.state.location, this.state.data);
  };

  changeLocation = (evt) => {
    this.setState({
        location: evt.target.value
    }) ;

  };

  handleChildClick = (event) => {
     alert("The Child button text is: " + this.state.childText);
     alert("The Child HTML is: " + event.target.outerHTML);
  }

  componentDidMount() {
    //setInterval(this.fetchData, parseInt(this.props.interval));
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.location !== this.state.location) {
    this.fetchData();
    }
  }

  calcWind = (windDir) => {
     var index = Math.round(windDir/45);
     var wind = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
     for(var i = 0; i < wind.length; i++)
    {
        if(index === i)
        {
            return wind[i];
        }
    }
  }

  render() {
    var current, tempMin, tempMax, weatherIcon, description, windDir;

    if(this.state.data.list) {
        current = this.state.data.list[0];
        tempMin = current.main.temp_min;
        tempMax = current.main.temp_max;
        weatherIcon = "http://openweathermap.org/img/w/" +
        current.weather[0].icon + ".png";
        description = current.weather[0].description;
        windDir = this.calcWind(current.wind.deg);
    }

    return (
    <div>
      <h1>Weather</h1>
        {/*<form onSubmit={this.fetchData}>
            <label>I want to know the weather for
            <input placeholder={"City, Country"} type="text"
              value={this.state.location} onChange={this.changeLocation}/>
            </label>
        </form>*/}
      <form>
      <select value={this.state.location} onChange={this.changeLocation}>
        <option defaultValue value="2950157">Berlin</option>
        <option value="5128638">New York</option>
        <option value="6455259">Paris</option>
      </select>
      </form>

      <p className="temp-wrapper">
          <span className="temp">{tempMin}</span>
          <span className="temp">{tempMax}</span>
          <img src={weatherIcon} alt="icon"/>
          <span className="temp">{description}</span>
          <span className="temp">{windDir}</span>
          {/*<span className="temp-symbol">C</span>*/}
      </p>
      {/*Ideally it should work with this..*/}
      <Menu onClick={this.handleChildClick} text={this.state.childText}/>

     </div>
    );
  }
}

export default App;
