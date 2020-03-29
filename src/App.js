import React, { Component } from 'react';
import './App.css';
import Countries from './countries';
import Search from './search';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      countries:[],
      search: ""
    };
  }

  async componentDidMount() {
    const fetchApi = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const countriesObj = await fetchApi.json();
    const countries = Object.keys(countriesObj).map((country) => {
      return [country, countriesObj[country]]
    })
    this.setState({
      countries:countries
    })
  }

  render(){
    return (
      <div className="App container-fluid">
        <div className="header">Corona Virus Infection Tracker <span className="creator">by Satish Chandra Gupta 👨‍🎓</span></div>
        <input className="search" id="search" type="text" placeholder="Search Countries" onChange={(e) => {
          let value = e.target.value;
          value = value.charAt(0).toUpperCase() + value.slice(1);
          let arr = [];
          this.state.countries.forEach((country) => {
            if (country[0].includes(value)) {
              arr.push(country);
            }
          })
          this.setState({
            countries: arr,
            search:value
          });
          if (e.keyCode === e.DOM_VK_BACK_SPACE && value.length == 0) {
          }
        }} />
        <Search countries={this.state.countries} />
        <Countries countries={this.state.countries} />
      </div>
    );
  }
}

export default App;
