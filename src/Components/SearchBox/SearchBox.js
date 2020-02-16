import React, { Component } from "react";
import "../SearchBox/SearchBox.scss";


class SearchBox extends Component {

    state = {
        valueInput: "",
        timer: 0
    };

    searchHandler = (e) => {
        let durationSec = 1000;
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
                <label>Search a city!</label>
                <input type="text" value={this.state.valueInput} onChange={this.searchHandler} ></input>
            </div>
        )
    }
};

export default SearchBox; 
