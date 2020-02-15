import React, { Component } from "react";
import Auxiliary from "../hoc/Auxiliary";
import Toolbar from "../Components/Toolbar/Toolbar";
import SearchBox from "../Components/SearchBox/SearchBox";
import ResultsBox from "../Components/ResultsBox/ResultsBox";


class Layout extends Component {

    render() {
        return (
            <Auxiliary>
                <Toolbar></Toolbar>
                <SearchBox></SearchBox>
                <ResultsBox></ResultsBox>
            </Auxiliary>
        );
    }
}

export default Layout;