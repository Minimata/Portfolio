/**
 * Created by Civilists on 22.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {css} from 'react-emotion'

export default class LinksToSections extends Component {
    render() {
        return (
                <BS.Nav {...this.props}>
                    <BS.NavItem eventKey={1} href="#">
                        <BS.Col className={LinkWrapper} xsHidden><BS.Glyphicon glyph="stats"><span className={Link}> Works</span></BS.Glyphicon></BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="stats" /></BS.Col>
                    </BS.NavItem>
                    <BS.NavItem eventKey={2} href="#">
                        <BS.Col className={LinkWrapper} xsHidden><BS.Glyphicon glyph="user"><span className={Link}> Life</span></BS.Glyphicon></BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="user" /></BS.Col>
                    </BS.NavItem>
                    <BS.NavItem eventKey={3} href="#">
                        <BS.Col className={LinkWrapper} xsHidden><BS.Glyphicon glyph="pencil"><span className={Link}> Messages</span></BS.Glyphicon></BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="pencil" /></BS.Col>
                    </BS.NavItem>
                    <BS.NavItem eventKey={4} href="#">
                        <BS.Col className={LinkWrapper} xsHidden><BS.Glyphicon glyph="envelope"><span className={Link}> Contact</span></BS.Glyphicon></BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="envelope" /></BS.Col>
                    </BS.NavItem>
                </BS.Nav>
        );
    }
}

const Link = css`
    font-family: "Poppins", sans-serif;
`;

const LinkWrapper = css`
    padding: 0 20px;
	@media (min-width: 1200px) {
        padding: 0 40px;
	}
`;