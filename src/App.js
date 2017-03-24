import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';
//import Menu from './Menu.js';

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
      var urlSuffix = '&APPID=9244945f673887f74fded07b1857e368&units=metric';
      var url = urlPrefix + location + urlSuffix;

      var self = this;

      xhr({
          url: url,
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
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.location !== this.state.location) {
    this.fetchData();
    }
    // else{
    //   setInterval(this.fetchData, 100 * 600);
    // }
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
    var totalLength, city, current, weatherIcon, tempMin, tempMax, description, windDir, windSpeed, clouds, pressure;

    if(this.state.data.list) {
        totalLength = Object.keys(this.state.data.list).length;
        city = this.state.data.city.name;

        current = this.state.data.list[0];
        weatherIcon = "http://openweathermap.org/img/w/" +
        current.weather[0].icon + ".png";
        tempMin = Math.round(current.main.temp_min);
        tempMax = Math.round(current.main.temp_max);
        description = current.weather[0].description;
        windDir = this.calcWind(current.wind.deg);
        windSpeed = current.wind.speed;
        clouds = current.clouds.all;
        pressure = current.main.pressure;
    }

    return (
    <div className="wrapper">
      <h1>{city}</h1>

      <form>
      <select value={this.state.location} onChange={this.changeLocation}>
        <option value="2950157">Berlin</option>
        <option value="5128638">New York</option>
        <option value="6455259">Paris</option>
      </select>
      </form>

      <div className="data-wrapper">
          <p className="tempMin"><span className="tempMax">{tempMax}&deg;&nbsp;</span>{tempMin}&deg;</p>
          {/*<img src={weatherIcon} alt="icon"/>*/}
          <span className="temp">{description}</span>
          <span className="temp">{windDir}</span>
          <span className="temp">{windSpeed} m/s</span>
          <span className="temp">{clouds} %</span>
          <span className="temp">{pressure} hpa</span>
      </div>
      <h2>Forecast</h2>
      <p>sjsjskjskjsckjsckjkcsjcsjkcskjkcjskcjkcjkscjskjcsckjkcjskjsckjcsskjc</p>
      
      {/*Ideally it should work with this..
      <Menu onClick={this.handleChildClick} text={this.state.childText}/>
      <Menu l1="Berlin" id1="2950157" l2="New York" id2="5128638" onSelect={this.changeLocation}/>*/}

     </div>
    );
  }
}

export default App;
