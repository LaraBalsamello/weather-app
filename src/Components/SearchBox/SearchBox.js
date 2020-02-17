import React, { Component } from "react";
import "../SearchBox/SearchBox.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBox extends Component {

    state = {
        valueInput: "",
        timer: 0
    };

    searchHandler = (e, duration) => {
        let durationSec = duration;
        clearTimeout(this.state.timer);
        this.setState({
            timer: setTimeout(() => {
                if (this.state.valueInput.length >= 3) {
                    this.props.getSearch(this.state.valueInput);
                }
            }, durationSec)
        });
        this.setState({ valueInput: e.target.value });
    }

    render() {
        return (
            <div className="search-box">
                <label>Buscá una o varias ciudades!</label>
                <div className="search-container">
                    <input
                        placeholder="Ejemplo: London, Lisbon, Buenos Aires"
                        type="text"
                        value={this.state.valueInput}
                        onChange={(e) => { this.searchHandler(e, 1000) }} >
                    </input>
                    <div className="for-cursor" onChange={(e) => { this.searchHandler(e, 0) }}>
                        <FontAwesomeIcon
                            className="fontawesome-icon small-search-icon"
                            icon={faSearch} />
                    </div>
                </div>
            </div>
        )
    }
};

export default SearchBox; 
