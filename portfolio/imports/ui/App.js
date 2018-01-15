import React, { Component } from 'react';

import Task from './Task.js';
import NavBar from './NavBar.jsx'

import styled, {css} from 'react-emotion'
import {screenWidths} from './commonValues.js'

// App component - represents the whole app
export default class App extends Component {

    getTasks() {
        return [
            { _id: 1, text: 'Task 1' },
            { _id: 2, text: 'Task 2' },
            { _id: 3, text: 'Task 3' },
            { _id: 4, text: 'Task 4' },
            { _id: 5, text: 'Task 5' },
            { _id: 6, text: 'Task 6' },
            { _id: 7, text: 'Task 7' },
        ];
    }

    renderTasks() {
        return this.getTasks().map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    renderNav() {
        return (
            <NavBar/>
        )
    }

    render() {
        return (
            <div id="wrapper-main" className="wrapper">
                <div id="navbar-main" className="nav">
                    {this.renderNav()}
                </div>

                <Perspective>
                    <HexGrid>
                        {this.renderTasks()}
                    </HexGrid>
                </Perspective>
            </div>
        );
    }
}

const Perspective = styled('div')`
    // perspective: 750px;
`;

const HexGrid = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    list-style-type: none;
    // transform: rotateX(30deg);
    
    @media (min-width:${screenWidths[0]}px) {
        font-size: 13px;
    }
    @media (min-width:${screenWidths[1]}px) {
        padding-bottom: 11.2%
    }
    @media (min-width:${screenWidths[2]}px) {
        padding-bottom: 7.4%
    }
    @media (min-width:${screenWidths[3]}px) {
        padding-bottom: 5.5%
    }
    @media (min-width:${screenWidths[4]}px) {
        padding-bottom: 4.4%
    }
`;