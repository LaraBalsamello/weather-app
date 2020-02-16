import React, { Component } from "react";
import Toolbar from "../../Components/Toolbar/Toolbar";
import ResultBox from "../../Components/ResultsBox/ResultsBox";

class MyFavouriteCities extends Component {
    state = {
        savedCities: []
    }
    componentDidMount() {
        const savedCity = this.props.history.location.state.savedCity;
        this.setState({ savedCities: [...savedCity] })
    }
    render() {
        return (
            <div>
                <Toolbar showFav={false}></Toolbar>
                <ResultBox results={this.state.savedCities}></ResultBox>
            </div>
        );
    }
}

export default MyFavouriteCities;