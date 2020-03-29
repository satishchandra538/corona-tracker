import React, { Fragment } from 'react';

const Search = ({countries,search}) => {
    let deaths = 0, confirmed = 0, recovered = 0, active = 0;
    for (let i = 0; i < countries.length; i++) {
        let days = countries[i][1].length - 1;
        deaths += countries[i][1][days].deaths;
        confirmed += countries[i][1][days].confirmed;
        recovered += countries[i][1][days].recovered;
    }
    active = confirmed - deaths - recovered;
    return (
        <Fragment>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Countries Infected 🏳️‍🌈</th>
                            <th>Confirmed Cases 🤒</th>
                            <th>Recovered 🥳</th>
                            <th>Deaths 💀</th>
                            <th>Active 😷</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{countries.length}</td>
                            <td>{confirmed}</td>
                            <td>{recovered}</td>
                            <td>{deaths}</td>
                            <td>{active}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}
export default Search;