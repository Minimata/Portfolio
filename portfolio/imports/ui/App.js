import React, { Component } from 'react';

import BS from 'react-bootstrap'
import styled, {css} from 'react-emotion'

import Tile from './Tile.js';
import NavBar from './NavBar.jsx'
import Footer from './Footer.jsx'
import Separator from './Separator.jsx'


// App component - represents the whole app
export default class App extends Component {

    getTasks() {
        return [
            { _id: 1, text: 'Tile 1' },
            { _id: 2, text: 'Tile 2' },
            { _id: 3, text: 'Tile 3' },
            { _id: 4, text: 'Tile 4' },
            { _id: 5, text: 'Tile 5' },
            { _id: 6, text: 'Tile 6' },
            { _id: 7, text: 'Tile 7' },
        ];
    }

    renderWorks() {
        let hex = {};
        return this.getTasks().map((task) => (
            <Tile key={task._id} task={task} hex={hex}/>
        ));
    }

    render() {
        return (
            <BS.Grid className={NoMarginNoPadding}>
                <NavBar/>
                <Offset/>

                <Separator title={"Works"}>
                    A description of some projects I worked (or keep working) on.
                </Separator>

                <HexGrid>
                    {this.renderWorks()}
                </HexGrid>

                <Separator title={"Life"}>
                    Some moments of my life and education. It's the blog part of this website.
                </Separator>

                <HexGrid>
                    {this.renderWorks()}
                </HexGrid>

                <Separator title={"Messages"}>
                    What do you think about me ? You can write it down and it will be instantly visible for everyone.
                </Separator>

                <HexGrid>
                    {this.renderWorks()}
                </HexGrid>

                <Separator title={"Contact"}>
                    Here's how you can contact me of course.
                </Separator>

                <HexGrid>
                    {this.renderWorks()}
                </HexGrid>

                <Offset/>

                <Footer/>
            </BS.Grid>
        );
    }
}

const NoMarginNoPadding = css`
    width: 100%;
    margin: 0;
    padding: 0;
`;

const Offset = styled('div')`
    width: 100%;
    min-height: 50px;
    height: 90px;
    clear;
`;


const HexGrid = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    list-style-type: none;
    font-family: 'Raleway', sans-serif;
    overflow:hidden;
    width:75%;
    margin: 40px auto 40px auto;
    
    @media(max-width: 1200px) {
        width: 90%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    @media(max-width: 768px) {
        ${NoMarginNoPadding}
    }
    
    &:after {
        content:"";
        display:block;
        clear:both;
    }
    
    & li {
        width:27.85714285714286%; /* = (100-2.5) / 3.5 */
        padding-bottom: 32.16760145166612%; /* =  width /0.866 */
    }
    
    & li:nth-child(3n+2){
        margin:0 1%;
    }
    & li:nth-child(6n+4){
        margin-left:0.5%;
    }
    & li:nth-child(6n+4), li:nth-child(6n+5), li:nth-child(6n+6) {
        margin-top: -6.9285714285%;
        margin-bottom: -6.9285714285%;
    }
    & li:nth-child(6n+4):last-child, li:nth-child(6n+5):last-child, li:nth-child(6n+6):last-child{
        margin-bottom:0%;
    }
    & li > a{
        width:100%;
        height:100%;
        text-align:center;
        overflow:hidden;
        -webkit-backface-visibility:hidden;
    }
    
    // HEX CONTENT
    
    & li img{
        left:-100%; right:-100%;
        width: auto; height:100%;
    }
    & a h1, & a p{
        width:100%;
        padding:0 5%;
        margin: auto !important;
    }
    & li h1{
        bottom:110%;
        font-style:italic;
        font-weight:normal;
        font-size:1.5em;
        padding-top:100%;
        padding-bottom:100%;
    }
    & li h1:after{
        content:'';
        display:block;
        position:absolute;
        bottom:-1px; left:45%;
        width:10%;
        text-align:center;
        z-index:1;
        border-bottom:2px solid #fff;
    }
    & li p{
        padding-top:50%;
        top:110%;
        padding-bottom:50%;
    }
    
    
    // HOVER EFFECT
    & li a:hover h1 {
        bottom:50%;
        padding-bottom:10%;
    }
    & li a:hover p{
        top:50%;
        padding-top:10%;
    }
`;
