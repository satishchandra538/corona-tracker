import React, { Fragment } from 'react';
import * as data from './countrycode.json';

const Country = ({countries}) => {
    // const countryflag = Object.keys(data).map((name) => {
    //     return data[name][0];
    // })
    const countryflag = data[0];
    return (
        <Fragment>
            {
                countries.map((country) => {
                    let days = country[1].length - 1;
                    let source = `https://www.countryflags.io/${countryflag[country[0]]}/flat/64.png`;
                    return(
                        <div className="country col-md-4 col-md-offset-2" key={country[0]}>
                            <div className="countryName">{country[0]}</div>
                            <img src={source} alt={`⛳`} />
                            <div className="infection">Total Cases 😷: {country[1][days].confirmed}</div>
                            <div className="infection">New Cases 🔥: {country[1][days].confirmed - country[1][days -1].confirmed}</div>
                            <div className="recovered">Recovered 🥳: {country[1][days].recovered}</div>
                            <div className="active">Active Cases 🤒: {country[1][days].confirmed - country[1][days].recovered - country[1][days].deaths}</div>
                            <div className="death">Total Deaths 💀: {country[1][days].deaths}</div>
                            <div className="death">Today's Death ⚰️: {country[1][days].deaths - country[1][days -1 ].deaths}</div>
                            <div className="date">📆 {country[1][days].date}</div>
                        </div>
                    )
                })
            }
        </Fragment>
    )
}
export default Country;