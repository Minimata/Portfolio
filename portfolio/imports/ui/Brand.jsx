/**
 * Created by Civilists on 22.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'

export default class Brand extends Component {
    render() {
        return (
            <BS.Navbar.Header {...this.props}>
                <BS.Navbar.Brand>
                    <a href="#">Alexandre Serex</a>
                </BS.Navbar.Brand>
            </BS.Navbar.Header>
        );
    }
}