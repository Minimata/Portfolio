import React, {Component} from 'react'
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'

export default class Tile extends Component {
    renderHex(outsideLink) {
        if(outsideLink) {
            return (
                <Hexagon>
                    <HexLink color={this.props.color ? this.props.hex.color : defaultColor}
                             backColor={this.props.backColor ? this.props.hex.backColor : defaultHoverColor}
                             href={this.props.link}
                             target={this.props.target ? this.props.target : '_blank'}>
                        <HexImg
                            src={this.props.image}
                            alt={this.props.title}/>
                        <HexTitle>{this.props.title}</HexTitle>
                        <HexSubtitle>
                            {this.props.subtitle}
                        </HexSubtitle>
                    </HexLink>
                </Hexagon>
            )
        }
        else {
            return (<Hexagon>
                <HexLink color={this.props.color ? this.props.hex.color : defaultColor}
                         backColor={this.props.backColor ? this.props.hex.backColor : defaultHoverColor}
                         href={''}
                         onClick={() => (this.props.outsideLink ? '' : FlowRouter.go(this.props.link))}>
                    <HexImg
                        src={this.props.image}
                        alt={this.props.title}/>
                    <HexTitle>{this.props.title}</HexTitle>
                    <HexSubtitle>
                        {this.props.subtitle}
                    </HexSubtitle>
                </HexLink>
            </Hexagon>)
        }
    }

    render() {
        return this.renderHex(this.props.outsideLink);
    }
}

const defaultColor = `white`;
const defaultHoverColor = `rgba(22, 23, 24, 0.55)`;

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
    font-size: 1.2em !important;
    @media(max-width: 768px) {
        font-size: 0.8em !important;
    }

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

