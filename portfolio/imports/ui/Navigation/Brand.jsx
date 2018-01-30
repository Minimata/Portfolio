/**
 * Created by Civilists on 22.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {css} from 'react-emotion'

export default class Brand extends Component {

    toHome() {
        FlowRouter.go('home');
    }

    render() {
        return (
            <BS.Navbar.Header {...this.props}>
                <BS.Navbar.Brand className={pointer}>
                    <a onClick={this.toHome} >Alexandre Serex</a>
                </BS.Navbar.Brand>
            </BS.Navbar.Header>
        );
    }
}

const pointer = css`
    cursor: pointer;
`;