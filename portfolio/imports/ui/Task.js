import React, {Component} from 'react'
import styled, {css} from 'react-emotion'

import {screenWidths} from './commonValues.js'

export default class Task extends Component {
    render() {
        return (
            <Hexagon>
                <HexIn>
                    <HexLink href="#">
                        <img
                            src="https://68.media.tumblr.com/d0db33edebbfc6d56ec41600a1c9afeb/tumblr_n4lx886yCF1r4xjo2o1_500.gif"
                            alt=""/>
                        <h1>PIZZA CAT</h1>
                        <p>is in love with {this.props.task.text}</p>
                    </HexLink>
                </HexIn>
            </Hexagon>
        );
    }
}

const HexLink = styled('a')`
    display:block;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    overflow: hidden;
    -webkit-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    -ms-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    transform: skewY(-30deg) rotate3d(0,0,1,60deg);
    
    :hover h1, :focus h1, :hover p, :focus p {
        -webkit-transform:translate3d(0,0,0);
        -ms-transform:translate3d(0,0,0);
        transform:translate3d(0,0,0);
    }
`;

const HexIn = styled('div')`
    position: absolute;
    width:96%;
    padding-bottom: 110.851%; // =  width / sin(60)
    margin:0 2%;
    overflow: hidden;
    visibility: hidden;
    outline:1px solid transparent; // fix for jagged edges in FF on hover transition
    -webkit-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
    -ms-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
    transform: rotate3d(0,0,1,-60deg) skewY(30deg);
    
    * {
        position: absolute;
        visibility: visible;
        outline:1px solid transparent; // fix for jagged edges in FF on hover transition
    }
`;

const hexText = css`
    width: 100%;
    padding: 5%;
    box-sizing:border-box;
    background-color: rgba(0, 128, 128, 0.8);
    font-weight: 300;
    -webkit-transition:  -webkit-transform .2s ease-out, opacity .3s ease-out;
    transition:          transform .2s ease-out, opacity .3s ease-out;
`;

const Hexagon = styled('li')`
    position: relative,
    visibility: hidden,
    outline: '1px solid transparent', // fix for jagged edges in FF on hover transition
    
    ::after {
        content:'';
        display:block;
        padding-bottom: 86.602%;  // =  100 / tan(60) * 1.5
    }
    
    img {
        left: -100%;
        right: -100%;
        width: auto;
        height: 100%;
        margin: 0 auto;
        -webkit-transform: rotate3d(0,0,0,0deg);
        -ms-transform: rotate3d(0,0,0,0deg);
        transform: rotate3d(0,0,0,0deg);
    }
    
    h1 {
        ${hexText};
        bottom: 50%;
        padding-top:50%;
        font-size: 1.5em;
        z-index: 1;
        -webkit-transform:translate3d(0,-100%,0);
        -ms-transform:translate3d(0,-100%,0);
        transform:translate3d(0,-100%,0);
    }
    
    h1::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 45%;
        width: 10%;
        text-align: center;
        border-bottom: 1px solid #fff;
    }
    
    p {
        ${hexText};
        top: 50%;
        padding-bottom:50%;
        -webkit-transform:translate3d(0,100%,0);
        -ms-transform:translate3d(0,100%,0);
        transform:translate3d(0,100%,0);
     }
     
     
    @media (min-width:${screenWidths[1]}px) {
        width: 50%; /* = 100 / 3 */
        :nth-child(3n+3){ /* first hexagon of even rows */
            margin-left:25%;  /* = width of .hex / 2  to indent even rows */
        }
    }
    @media (min-width:${screenWidths[2]}px) {
        width: 33.333%; /* = 100 / 3 */
        :nth-child(5n+4){ /* first hexagon of even rows */
            margin-left:16.666%;  /* = width of .hex / 2  to indent even rows */
        }
    }
    @media (min-width:${screenWidths[3]}px) {
        width: 25%; /* = 100 / 4 */
        :nth-child(7n+5){ /* first hexagon of even rows */
            margin-left:12.5%;  /* = width of .hex / 2  to indent even rows */
        }
    }
    @media (min-width:${screenWidths[4]}px) {
        width: 20%; /* = 100 / 5 */
        :nth-child(9n+6){ /* first hexagon of even rows */
            margin-left:10%;  /* = width of .hex / 2  to indent even rows */
        }
    }
`;
