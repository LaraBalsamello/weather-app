import React, { Component } from "react";
import Toolbar from "../../Components/Toolbar/Toolbar";
import ResultBox from "../../Components/ResultsBox/ResultsBox";
import "../MyFavoriteCities/MyFavoriteCities.scss";

class MyFavouriteCities extends Component {
    state = {
        savedCities: []
    }
    componentDidMount() {
        if (this.props.history.location.state) {
            const savedCity = this.props.history.location.state.savedCity;
            this.setState({ savedCities: [...savedCity] })
        }
    }
    render() {
        let toRender = (null);
        if (this.state && this.state.savedCities.length === 0) {
            toRender = (<div className="container-no-results"><p>No tenés ciudades favoritas guardadas</p></div>);
        } else {
            toRender = (<ResultBox results={this.state.savedCities}></ResultBox>
            );
        }
        return (
            <div>
                <Toolbar showFav={false}></Toolbar>
                {toRender}
            </div>
        );
    }
}

export default MyFavouriteCities;