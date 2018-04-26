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
                </FloatButton>
                <span className={this.state.loginOpen ? HiddenA : Hidden} ref={"container"}/>
            </div>
        );
    }
}


const FloatButton = styled('a')`
    position: absolute;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 2px;
    height: 2px;
    cursor: pointer;
    background-color: rgba(42, 43, 44, 0);
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
