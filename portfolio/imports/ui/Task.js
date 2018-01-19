import React, {Component} from 'react'
import styled, {css} from 'react-emotion'

export default class Tile extends Component {
    render() {
        return (
            <Hexagon>
                <HexLink href="#"
                         color={this.props.hex.color ? this.props.hex.color : 'whitesmoke'}
                         backColor={this.props.hex.backColor ? this.props.hex.backColor : 'rgba(0, 8, 16, 0.8)'}>
                    <HexImg
                        src="https://68.media.tumblr.com/d0db33edebbfc6d56ec41600a1c9afeb/tumblr_n4lx886yCF1r4xjo2o1_500.gif"
                        alt=""/>
                    <HexTitle>PIZZA CAT</HexTitle>
                    <HexSubtitle>
                        is in love with {this.props.task.text}
                    </HexSubtitle>
                </HexLink>
            </Hexagon>
        );
    }
}

const Hexagon = styled('li')`
    position:relative;
    list-style-type:none;
    float:left;
    overflow:hidden;
    visibility:hidden;
    -webkit-transform: rotate(-60deg) skewY(30deg);
    -ms-transform: rotate(-60deg) skewY(30deg);
    transform: rotate(-60deg) skewY(30deg);
    
    &:nth-child(6n+4), &:nth-child(6n+5), &:nth-child(6n+6) {
        -webkit-transform: translateX(50%) rotate(-60deg) skewY(30deg);
        -ms-transform: translateX(50%) rotate(-60deg) skewY(30deg);
        transform: translateX(50%) rotate(-60deg) skewY(30deg);
    }
    
    & * {
        position:absolute;
        visibility:visible;
    }
`;

const HexLink = styled('a')`
    display:block;
    color: ${props => props.color} !important;
    -webkit-transform: skewY(-30deg) rotate(60deg);
    -ms-transform: skewY(-30deg) rotate(60deg);
    transform: skewY(-30deg) rotate(60deg);
    
    & > h1, & > p {
        background-color: ${props => props.backColor} !important;
    }
`;

const HexImg = styled('img')`
    margin:0 auto;
`;

const HexText = css`
    font-family: 'Raleway', sans-serif;

    -webkit-transition: top .2s ease-out, bottom .2s ease-out, .2s padding .2s ease-out;
    -ms-transition: top .2s ease-out, bottom .2s ease-out, .2s padding .2s ease-out;
    transition: top .2s ease-out, bottom .2s ease-out, .2s padding .2s ease-out;
`;

const HexTitle = styled('h1')`
    ${HexText}
`;

const HexSubtitle = styled('p')`
    ${HexText}
`;

