/**
 * Created by Civilists on 05.02.2018
 */

import React, {Component} from 'react';
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <NavBar reduced/>
                <Offset/>

                <BS.Button>NotFound !</BS.Button>

                <Offset/>
            </div>
        );
    }
}