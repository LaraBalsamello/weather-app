import React, { Component } from "react";
import Auxiliary from "../hoc/Auxiliary";
import Toolbar from "../Components/Toolbar/Toolbar";
import SearchBox from "../Components/SearchBox/SearchBox";
import ResultsBox from "../Components/ResultsBox/ResultsBox";
import axios from "axios";
import { WEATHER_API_KEY } from "../App";
import WeatherData from "../interfaces/Weather";

class Layout extends Component {

    state = {
        resultsSearch: [],
        weatherSaved: [],
        loading: false
    };

    clickHandler = (weather) => {
        let saved = [...this.state.weatherSaved];
        weather["saved"] = !weather.saved;
        saved.push(weather);

        let arrRes = [...this.state.resultsSearch];
        arrRes = arrRes.filter(res => res.id !== weather.id);
        arrRes.push(weather);
        saved = saved.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
        arrRes = arrRes.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
        this.setState({ weatherSaved: [...saved] })
        this.setState({ resultsSearch: [...arrRes] })
    }

    catchSearch = (value) => {
        this.setState({ resultsSearch: [] })
        if (!this.state.hasResponse) {
            this.callService(value);
        }
    }

    callService = (value) => {
        let valuesToSearch = [];
        if (value.includes(',')) {
            valuesToSearch = value.split(',');
        } else {
            valuesToSearch.push(value);
        }
        for (let index in valuesToSearch) {
            this.setState({ loading: true })
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${valuesToSearch[index]}&units=metric&appid=${WEATHER_API_KEY}`)
                .then(res => {
                    this.setState({ loading: false })
                    let weather = new WeatherData(res.data);
                    let response = [...this.state.resultsSearch];
                    response.push(weather);
                    response = response.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                    this.setState({ resultsSearch: [...response] })
                });
        }

    }
    render() {
        return (
            <Auxiliary className="page-container" >
                <Toolbar weatherSaved={this.state.weatherSaved} showFav={true}></Toolbar>
                <SearchBox getSearch={this.catchSearch}></SearchBox>
                <ResultsBox loading={this.state.loading} click={(weather) => { this.clickHandler(weather) }} results={this.state.resultsSearch}></ResultsBox>
            </Auxiliary>
        );
    }
}

export default Layout;