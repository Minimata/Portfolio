/**
 * Created by Civilists on 22.01.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {css} from 'react-emotion'
import {Link} from 'react-scroll'
import {Template} from "meteor/templating";
import {Blaze} from "meteor/blaze";
import ReactDOM from "react-dom";


export default class LinksToSections extends Component {

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
            <ul className={`nav navbar-nav navbar-right ${SpaceEvenly}`}>
                <li role={"presentation"} className={pointer}>
                    <Link to="Works" spy={true} smooth={true} offset={-90} duration={275}>
                        <BS.Col className={LinkWrapper} xsHidden>
                            <BS.Glyphicon glyph="stats">
                                <span className={LinkStyle}> Works</span>
                            </BS.Glyphicon>
                        </BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="stats"/></BS.Col>
                    </Link>
                </li>
                <li role={"presentation"} className={pointer}>
                    <Link to="Life" spy={true} smooth={true} offset={-90} duration={275}>
                        <BS.Col className={LinkWrapper} xsHidden>
                            <BS.Glyphicon glyph="user">
                                <span className={LinkStyle}> Life</span>
                            </BS.Glyphicon>
                        </BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="user"/></BS.Col>
                    </Link>
                </li>
                <li role={"presentation"} className={pointer}>
                    <Link to="Messages" spy={true} smooth={true} offset={-90} duration={275}>
                        <BS.Col className={LinkWrapper} xsHidden>
                            <BS.Glyphicon glyph="pencil">
                                <span className={LinkStyle}> Messages</span>
                            </BS.Glyphicon>
                        </BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="pencil"/></BS.Col>
                    </Link>
                </li>
                <li role={"presentation"} className={pointer}>
                    <Link to="Contact" spy={true} smooth={true} offset={-90} duration={275}>
                        <BS.Col className={LinkWrapper} xsHidden>
                            <BS.Glyphicon glyph="envelope">
                                <span className={LinkStyle}> Contact</span>
                            </BS.Glyphicon>
                        </BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="envelope"/></BS.Col>
                    </Link>
                </li>
                <li role={"presentation"} className={pointer}>
                    <a onClick={this.handleSingUpClick}>
                        <BS.Col className={LinkWrapper} xsHidden>
                            <BS.Glyphicon glyph="off">
                                <span className={LinkStyle}> Account</span>
                            </BS.Glyphicon>
                        </BS.Col>
                        <BS.Col smHidden mdHidden lgHidden><BS.Glyphicon glyph="off"/></BS.Col>
                        <span className={this.state.loginOpen ? HiddenA : Hidden} ref={"container"} />
                    </a>
                </li>
            </ul>
        );
    }
}

const HiddenA = css`
    position: absolute;
    a {
        display: none;
    }
`;

const Hidden = css`
    display: none;
`;


const pointer = css`
    cursor: pointer;
`;

const LinkStyle = css`
    font-family: "Poppins", sans-serif;
`;

const LinkWrapper = css`
    padding: 0 5px;
	@media (min-width: 1200px) {
        padding: 0 40px;
	}
	@media (min-width: 992px) {
        padding: 0 20px;
	}
`;

const SpaceEvenly = css`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;