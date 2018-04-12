/**
 * Created by Civilists on 11.04.2018
 */

import React, {Component} from 'react';

import BS from 'react-bootstrap'
import styled, {css} from 'react-emotion'

import {Template} from "meteor/templating";
import {Blaze} from "meteor/blaze";
import ReactDOM from "react-dom";

export default class FloatingButton extends Component {

    constructor(props) {
        super(props);

        this.handleSingUpClick = this.handleSingUpClick.bind(this);
        this.state = {
            loginOpen: false
        }
    }

    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }

    handleSingUpClick(e) {
        this.refs.container.children[0].children[0].children[0].click();
        let newState = !this.state.loginOpen;
        this.setState({loginOpen: newState});
    }

    render() {
        return (
            <div>
                <FloatButton onClick={this.handleSingUpClick}>
                    <BS.Glyphicon glyph="off"/>
                </FloatButton>
                <span className={this.state.loginOpen ? HiddenA : Hidden} ref={"container"}/>
            </div>
        );
    }
}


const FloatButton = styled('a')`
    position: fixed;
    right: 50px;
    bottom: 50px;
    
    @media(max-width: 768px) {
        bottom: 100px;
    }
    
    cursor: pointer;
    
    width: 50px;
    height: 50px;
    
    background-color: rgb(42, 43, 44);
    color: #9d9d9d;
    border: 2px solid whitesmoke;
    border-radius: 50%;
    
    font-size: 16px;
    text-decoration: none !important;
    :hover {
        color: whitesmoke;
    }
    
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HiddenA = css`
    position: absolute;
    z-index: 30000;
    > div > div > a, > div > div > div > a {
        display: none;
    }
`;

const Hidden = css`
    display: none;
`;
