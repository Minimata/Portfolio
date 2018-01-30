import React, { Component } from 'react';

import BS from 'react-bootstrap'
import {css} from 'react-emotion'

import Home from "./Pages/Home.jsx"

// App component - represents the whole app
export default class App extends Component {
    render() {
        return (
            <BS.Grid className={NoMarginNoPadding}>
                <Home/>
            </BS.Grid>
        );
    }
}

const NoMarginNoPadding = css`
    width: 100%;
    margin: 0;
    padding: 0;
`;
