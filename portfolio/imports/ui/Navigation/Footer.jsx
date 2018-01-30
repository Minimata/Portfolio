/**
 * Created by Civilists on 19.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {css} from 'react-emotion'

import LinksToSections from './LinksToSections.jsx'

export default class Footer extends Component {
    render() {
        return (
            <BS.Grid>
                <BS.Col smHidden mdHidden lgHidden>
                    <BS.Navbar inverse fixedTop className={fixedBot}>
                        <LinksToSections className={SpaceEvenly} />
                    </BS.Navbar>
                </BS.Col>
            </BS.Grid>
        );
    }
}

const fixedBot = css`
    position: fixed;
    margin-top: -50px;
    width: 100%;
    top: 100% !important;
    bottom: 0 !important;
`;

const SpaceEvenly = css`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;