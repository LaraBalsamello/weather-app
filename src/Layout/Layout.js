import React, { Component } from "react";
import Auxiliary from "../hoc/Auxiliary";
import Toolbar from "../Components/Toolbar/Toolbar";
import SearchBox from "../Components/SearchBox/SearchBox";
import ResultsBox from "../Components/ResultsBox/ResultsBox";
import axios from "axios";
import "../Layout/Layout.scss";
import { WEATHER_API_KEY } from "../App";
import WeatherData from "../interfaces/Weather";

class Layout extends Component {

    state = {
        resultsSearch: [],
        weatherSaved: [],
        loading: false,
        error: null
    };

    clickHandler = (weather) => {
        let saved = [...this.state.weatherSaved];
        if (weather.saved === false) {
            saved.push(weather);
            weather["saved"] = true;
        } else {
            weather["saved"] = false;
            saved = saved.filter(s => s.id !== weather.id);
        }
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
        this.setState({ error: null })
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
                }).catch(Error => this.setState({
                    error: (<div className="container-not-found"><p>No se han encontrado resultados para la búsqueda</p></div>),
                    loading: false
                }));
        }

    }
    render() {
        return (
            <Auxiliary className="page-container" >
                <Toolbar weatherSaved={this.state.weatherSaved} showFav={true}></Toolbar>
                <SearchBox getSearch={this.catchSearch}></SearchBox>
                <ResultsBox
                    dontShowHeart={false}
                    loading={this.state.loading}
                    click={(weather) => { this.clickHandler(weather) }}
                    results={this.state.resultsSearch}>
                </ResultsBox>
                {this.state.error}
            </Auxiliary>
        );
    }
}

export default Layout;