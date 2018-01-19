/**
 * Created by Civilists on 15.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import styled, {css} from 'react-emotion'

export default class NavBar extends Component {
    render() {
        return (
            <BS.Grid>
                <BS.Navbar inverse fixedTop>
                    <BS.Navbar.Header className={CenterX}>
                        <BS.Navbar.Brand>
                            <a href="#">Alexandre Serex</a>
                        </BS.Navbar.Brand>
                    </BS.Navbar.Header>
                    <BS.Col xsHidden>
                        <BS.Nav pullRight>
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
                    </BS.Col>
                </BS.Navbar>
            </BS.Grid>
        );
    }
}

const CenterX = css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
`;