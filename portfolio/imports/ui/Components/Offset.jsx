/**
 * Created by Civilists on 30.01.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'

export default class Offset extends Component {
    render() {
        return (
            <Off />
        );
    }
}

const Off = styled('div')`
    width: 100%;
    min-height: 50px;
    height: 90px;
    clear;
`;