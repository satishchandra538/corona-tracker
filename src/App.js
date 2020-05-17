import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';
import Countries from './components/allcountries/countries';
import CountryTable from './components/allcountries/table';
import India from './components/india/india';
//mport Visualise from './components/visualisation/visualise';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      totalCountries: [],
      search: ""
    };
  }

  async componentDidMount() {
    const fetchApi = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const countriesObj = await fetchApi.json();

    const countries = Object.keys(countriesObj).map((country) => {
      return [country, countriesObj[country]]
    })

    let days = countries[0][1].length - 1;
    for (let i = 0; i < countries.length / 50; i++) {
      countries.sort((a, b) => {
        return b[1][days].confirmed - a[1][days].confirmed;
      })
    }

    this.setState({
      countries: countries,
      totalCountries: countries
    })
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <div className="header"><i className='fas fa-lungs-virus' style={{'color':'white'}}></i>Corona Virus Infection Tracker <span className="creator">by Satish Chandra Gupta 👨‍🎓</span></div>

          <nav className="navigation-bar">
              <Link to="/">Home</Link>
              <Link to="/india">India</Link>
              {/* <Link to="/visualisation">Visualise</Link> */}
            </nav>

          <Route path="/" exact render={() => <input className="search" id="search" type="text" placeholder="Search your country..." onChange={(e) => {
            let value = e.target.value;
            //Old Search method
            // value = value.charAt(0).toUpperCase() + value.slice(1);
            // let arr = [], total = [...this.state.totalCountries];
            // total.forEach((country) => {
            //   if (country[0].includes(value)) {
            //     arr.push(country);
            //   }
            // })
            let valueReg = new RegExp(value, "i");
            let arr = [], total = [...this.state.totalCountries];
            total.forEach((country) => {
              if (country[0].search(valueReg) !== -1) {
                arr.push(country);
                console.log(country)
              }
            })

            this.setState({
              countries: arr,
              search: value
            });
          }}
          />}
          />

          <Route path="/" exact strict render={(props) => <CountryTable countries={this.state.countries} />} />
          <Route path="/" exact strict render={(props) => <Countries countries={this.state.countries} />} />
          <Route path="/india" exact strict render={(props) => <India countries={this.state.totalCountries} />} />
          {/* <Route path="/visualisation" exact render={(props) => <Visualise countries={this.state.countries} />} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
