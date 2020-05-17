import React, { Fragment, useState } from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import './india.css';

const India = ({ countries }) => {

    let india = [], days, deathTotal = 0, confirmedTotal = 0, recoveredTotal = 0, deathToday = 0, recoveredToday = 0, confirmedToday = 0, dateToday = [], dateSeries = [], confirmedSeries = [], individualConfirmedSeries = [];

    const [value, setValue] = useState(0); // integer state
    // update the state to force render

    const setGraph = () => countries.forEach((country, index) => {
        if (country[0] === 'India') {
            india = country;
            days = india[1].length;
            deathTotal = india[1][days - 1].deaths;
            confirmedTotal = india[1][days - 1].confirmed;
            recoveredTotal = india[1][days - 1].recovered;
            deathToday = india[1][days - 1].deaths - india[1][days - 2].deaths;
            confirmedToday = india[1][days - 1].confirmed - india[1][days - 2].confirmed;
            recoveredToday = india[1][days - 1].recovered - india[1][days - 2].recovered;
            dateToday = india[1][days - 1].date;

            let ScrollInput = document.getElementById('checkGraphUpToDate') ? document.getElementById('checkGraphUpToDate').value : 0;

            for (let i = ScrollInput; i < days; i++) {
                confirmedSeries.push(india[1][i].confirmed);
                if (i == 0)
                    individualConfirmedSeries.push(0);
                else
                    individualConfirmedSeries.push(india[1][i].confirmed - india[1][i - 1].confirmed);
                dateSeries.push(india[1][i].date)
            }
            
            if (ScrollInput != null && document.getElementById('scrollValue') != null)
                document.getElementById('scrollValue').innerHTML = ScrollInput;

        }
    });
    setGraph();


    const overAllPatients = {
        labels: ['infected', 'recovered', 'dead'],
        datasets: [
            {
                label: 'Overall Status of death and recovery',
                backgroundColor: [
                    'rgba(255, 165, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(255, 0, 0, 0.9)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 165, 0, 0.8)',
                    'rgba(0, 128, 0, 0.8)',
                    'rgba(255, 0, 0, 0.8)'
                ],
                data: [confirmedTotal, recoveredTotal, deathTotal]
            }
        ]
    }

    const overAllDays = {
        labels: dateSeries,
        datasets: [
            {
                label: 'Overall Infected People',
                backgroundColor: "rgba(53, 78, 107, 0.6)",
                hoverBackgroundColor: 'rgba(53, 78, 107, 0.9)',
                data: confirmedSeries
            }
        ]
    }
    
    const individualDays = {
        labels: dateSeries,
        datasets: [
            {
                label: 'Today\'s infection',
                backgroundColor: 'rgba(221, 43, 52, 0.6)',
                hoverBackgroundColor: 'rgba(221, 43, 52, 0.6)',
                data: individualConfirmedSeries
            }
        ]
    }

    return (
        <Fragment>

            <div className="overallcard row">
                <div className="india col-md-4" key={india[0]}>
                    <div className="countryName">{india[0]}</div>
                    <img src="https://www.countryflags.io/IN/flat/64.png" alt={`⛳`} />
                    <div className="infection">Total Cases <i className='fas fa-lungs-virus' style={{ 'color': 'black' }}></i>: {confirmedTotal}</div>
                    <div className="infection">New Cases 🔥: {confirmedToday}</div>
                    <div className="recovered">Recovered 😎: {recoveredTotal}</div>
                    <div className="recovered">Today's Recovery 😃: {recoveredToday}</div>
                    <div className="active">Active Cases 🤒: {confirmedTotal - recoveredTotal - deathTotal}</div>
                    <div className="death">Total Deaths 💀: {deathTotal}</div>
                    <div className="death">Today's Death ⚰️: {deathToday}</div>
                    <div className="date">📆 {dateToday}</div>
                </div>
                <div className="col-md-8">
                    <Doughnut
                        data={overAllPatients}
                        options={{
                            title: {
                                display: true,
                                text: 'Total death, reacoverd and remaining infecteds',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>

            <h3>Scroll the Scrollbar to set graph</h3>
            <input type="range" min="0" max={days} defaultValue="0" name="checkGraphUpToLastDate" onChange={setGraph, () => setValue(value => ++value)} id="checkGraphUpToDate" />
            <p>Graph from day <span id="scrollValue">0</span> to day {days}</p>

            <div className="totaldata row">
                <div className="col-md-6">
                    <Line
                        data={overAllDays}
                        height={200}
                        options={{
                            title: {
                                display: true,
                                text: 'Total Rise and Fall in cases of corona',
                                fontSize: 20
                            },
                            
                            legend: {
                                display: false,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <Bar
                        data={overAllDays}
                        height={200}
                        options={{
                            title: {
                                display: true,
                                text: 'Total Rise and Fall in cases of corona',
                                fontSize: 20
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>
            <div className="individual row">
                <div className="col-md-6">
                    <Line
                        data={individualDays}
                        height={200}
                        options={{
                            title: {
                                display: true,
                                text: 'Today\'s Rise and Fall in cases of corona',
                                fontSize: 20
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <Bar
                        data={individualDays}
                        height={200}
                        options={{
                            title: {
                                display: true,
                                text: 'Today\'s Rise and Fall in cases of corona',
                                fontSize: 20
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>

        </Fragment>
    );
}
export default India;