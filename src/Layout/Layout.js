import React, { Component } from "react";
import Auxiliary from "../hoc/Auxiliary";
import Toolbar from "../Components/Toolbar/Toolbar";
import SearchBox from "../Components/SearchBox/SearchBox";
import ResultsBox from "../Components/ResultsBox/ResultsBox";
import axios from "axios";
import { WEATHER_API_KEY } from "../App";

class Layout extends Component {

    state = {
        resultsSearch: [],
    };

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
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${valuesToSearch[index]}&units=metric&appid=${WEATHER_API_KEY}`)
                .then(res => {
                    const response = [...this.state.resultsSearch];
                    response.push(res.data)
                    this.setState({ resultsSearch: [...response] })
                    console.log(this.state.resultsSearch)
                });
        }

    }
    render() {
        return (
            <Auxiliary className="page-container" >
                <Toolbar></Toolbar>
                <SearchBox getSearch={this.catchSearch}></SearchBox>
                <ResultsBox results={this.state.resultsSearch}></ResultsBox>
            </Auxiliary>
        );
    }
}

export default Layout;