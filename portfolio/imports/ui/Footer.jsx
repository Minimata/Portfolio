/**
 * Created by Civilists on 19.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {css} from 'react-emotion'

export default class Footer extends Component {
    render() {
        return (
            <BS.Grid>
                <BS.Col smHidden mdHidden lgHidden>
                    <BS.Navbar inverse fixedTop className={fixedBot}>
                        <BS.Nav className={SpaceEvenly}>
                            <BS.NavItem eventKey={1} href="#">
                                Link
                            </BS.NavItem>
                            <BS.NavItem eventKey={2} href="#">
                                Link
                            </BS.NavItem>
                            <BS.NavItem eventKey={3} href="#">
                                Link
                            </BS.NavItem>
                        </BS.Nav>
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