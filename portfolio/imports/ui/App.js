import React, { Component } from 'react';

import Task from './Task.js';
import NavBar from './NavBar.jsx'

import styled from 'react-emotion'

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
            { _id: 8, text: 'Task 8' },
            { _id: 9, text: 'Task 9' },
            { _id: 10, text: 'Task 10' },
            { _id: 11, text: 'Task 11' },
            { _id: 12, text: 'Task 12' },
            { _id: 13, text: 'Task 13' },
        ];
    }

    renderTasks() {
        let hex = {};
        return this.getTasks().map((task) => (
            <Task key={task._id} task={task} hex={hex}/>
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

                <HexGrid>
                    <li></li>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                    <li></li>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                    <Task task={{text: "pizza!"}} hex={{}}/>
                </HexGrid>

                <HexGrid>
                    {this.renderTasks()}
                </HexGrid>
            </div>
        );
    }
}

const HexGrid = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    font-family: 'Raleway', sans-serif;
    font-size: 15px;
    list-style-type: none;
    overflow:hidden;
    width:90%;
    margin:0 auto;
    
    :after {
        content:"";
        display:block;
        clear:both;
    }
    
    li {
        width:27.85714285714286%; /* = (100-2.5) / 3.5 */
        padding-bottom: 32.16760145166612%; /* =  width /0.866 */
    }
    
    
    li:nth-child(3n+2){
        margin:0 1%;
    }
    li:nth-child(6n+4){
        margin-left:0.5%;
    }
    li:nth-child(6n+4), li:nth-child(6n+5), li:nth-child(6n+6) {
        margin-top: -6.9285714285%;
        margin-bottom: -6.9285714285%;
    }
    li:nth-child(6n+4):last-child, li:nth-child(6n+5):last-child, li:nth-child(6n+6):last-child{
        margin-bottom:0%;
    }
    li > a{
        width:100%;
        height:100%;
        text-align:center;
        overflow:hidden;
        -webkit-backface-visibility:hidden;
    }
    
    // HEX CONTENT
    
    li img{
        left:-100%; right:-100%;
        width: auto; height:100%;
    }
    a h1, a p{
        width:90%;
        padding:0 5%;
    }
    li h1{
        bottom:110%;
        font-style:italic;
        font-weight:normal;
        font-size:1.5em;
        padding-top:100%;
        padding-bottom:100%;
    }
    li h1:after{
        content:'';
        display:block;
        position:absolute;
        bottom:-1px; left:45%;
        width:10%;
        text-align:center;
        z-index:1;
        border-bottom:2px solid #fff;
    }
    li p{
        padding-top:50%;
        top:110%;
        padding-bottom:50%;
    }
    
    
    // HOVER EFFECT
    li a:hover h1 {
        bottom:50%;
        padding-bottom:10%;
    }
    li a:hover p{
        top:50%;
        padding-top:10%;
    }
`;
