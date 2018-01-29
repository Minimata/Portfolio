import React, {Component} from 'react'
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'

export default class Tile extends Component {

    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }



    render() {
        return (
            <Hexagon>
                <HexLink href="#"
                         color={this.props.color ? this.props.hex.color : 'whitesmoke'}
                         backColor={this.props.backColor ? this.props.hex.backColor : 'rgba(0, 8, 16, 0.8)'}
                         onClick={this.handleShow}>
                    <HexImg
                        src={this.props.image}
                        alt={this.props.title}/>
                    <HexTitle>{this.props.title}</HexTitle>
                    <HexSubtitle>
                        {this.props.subtitle}
                    </HexSubtitle>
                </HexLink>
                <BS.Modal show={this.state.show} onHide={this.handleClose} bsSize="large" className={ModalStyle}>
                    <BS.Modal.Header className={ModalHeaderStyle} closeButton>
                        <BS.Modal.Title>{this.props.title}</BS.Modal.Title>
                    </BS.Modal.Header>
                    <BS.Modal.Body className={ModalBodyStyle}>

                        {this.props.children}

                    </BS.Modal.Body>
                    <BS.Modal.Footer>
                        <BS.Button onClick={this.handleClose}>Close</BS.Button>
                    </BS.Modal.Footer>
                </BS.Modal>
            </Hexagon>
        );
    }
}



const ModalStyle = css`
    font-family: "Poppins", sans-serif !important;
    
    & > div {
        margin-top: 0;
        margin-bottom: 0;
    }
    
    & .modal-content {
        -webkit-border-radius: 0px !important;
        -moz-border-radius: 0px !important;
        border-radius: 0px !important;
    }
`;

const ModalHeaderStyle = css`
    padding: 30px 40px;
`;

const ModalBodyStyle = css`
    padding: 0 0 20px 0;
    
    & img {
        width: 100%;
        object.fit: cover;
        margin: 40px auto;
    }
    & p {
        margin: 0 auto;
        padding: 10px 40px;
    }
    & h4 {
        margin: 0 auto;
        padding: 40px 40px 10px 40px;
    }
`;




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
    
    @media(max-width: 500px) {
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

