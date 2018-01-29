/**
 * Created by Civilists on 15.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {css} from 'react-emotion'

import LinksToSections from './LinksToSections.jsx'
import Brand from './Brand.jsx'

export default class NavBar extends Component {
    render() {
        return (
            <BS.Grid>
                <BS.Navbar className={makeRoom} inverse fixedTop>
                    <BS.Col smHidden mdHidden lgHidden>
                        <Brand className={`${pullRight} ${BrandStyle}`} />
                    </BS.Col>
                    <BS.Col xsHidden>
                        <Brand className={BrandStyle} />
                    </BS.Col>
                    <BS.Col xsHidden>
                        <LinksToSections pullRight />
                    </BS.Col>
                </BS.Navbar>
            </BS.Grid>
        );
    }
}

const BrandStyle = css`
    & > * {
        font-family: "Poppins", sans-serif;
        font-size: 1.75em;
        font-weight: 300;
        padding-right: 20px;
        padding-left: 20px;
    }
`;

const pullRight = css`
    & > * {
        float: right !important;
    }
}
`;

const makeRoom = css`
    & > * {
        padding: 20px 0;
    }
`;