/**
 * Created by Civilists on 05.02.2018
 */

import React, {Component} from 'react';
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'
import Textarea from "react-textarea-autosize";

import {categories} from "./Home.jsx";

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"


export default class NewEntry extends Component {

    constructor(props) {
        super(props);
        if (!categories.includes(this.props.category)) {
            FlowRouter.go('notFound');
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubtitleChange = this.handleSubtitleChange.bind(this);

        this.state = {
            title: '',
            subtitle: '',
            content: {}
        };
    }

    getValidationState(value, factor = 1) {
        const length = value.length;
        if (length > 20 * factor || length === 0) return 'error';
        else if (length > 15 * factor) return 'warning';
        else if (length > 0) return 'success';
        return null;
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleSubtitleChange(e) {
        this.setState({subtitle: e.target.value});
    }

    AddPortion(type) {
        let newState = {...this.state.content, id: part};
        this.setState(newState);
        /** this.setState(prevState => ({
            content: {...prevState.part, part}
        })); */
    }

    StoreValue(id, value) {
        this.state.content[id] = value;
    }

    renderContent(content) {
        return Object.assign(...Object.entries(content).map(([k, v]) => ({[k]: v * v})));
        return content.map((part) => (
            ContentTypes[part.type](part)
        ));
    }


    render() {
        return (
            <div>
                <NavBar reduced/>
                <Offset/>

                <Wrapper>
                    <form>
                        <Header>
                            <Title>
                                <BS.FormGroup bsSize="large"
                                              controlId="formBasicText"
                                              validationState={this.getValidationState(this.state.title)}>
                                    <BS.FormControl type="text" placeholder="Title"
                                                    value={this.state.title}
                                                    onChange={this.handleTitleChange}/>

                                    <BS.FormControl.Feedback/>
                                </BS.FormGroup>
                            </Title>
                            <Subtitle>
                                <BS.FormGroup bsSize="large"
                                              controlId="formBasicText"
                                              validationState={this.getValidationState(this.state.subtitle, 1.5)}>
                                    <BS.FormControl type="text" placeholder="Subtitle"
                                                    value={this.state.subtitle}
                                                    onChange={this.handleSubtitleChange}/>

                                    <BS.FormControl.Feedback/>
                                </BS.FormGroup>
                            </Subtitle>

                        </Header>

                        <Content>
                            {this.renderContent(this.state.content)}
                            <SectionTitle>Edit options</SectionTitle>
                            <BS.ButtonToolbar className={SpaceEvenly}>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("title")}>Section title</BS.Button>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("paragraph")}>Paragraph</BS.Button>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("image")}>Image</BS.Button>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("caption")}>Caption</BS.Button>
                                <BS.Button bsStyle="success">Save</BS.Button>
                            </BS.ButtonToolbar>;
                        </Content>
                    </form>
                </Wrapper>

                <Offset/>
            </div>
        );
    }
}

const SpaceEvenly = css`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    & > * {
        flex-grow: 1;
    }
`;

const Wrapper = styled('div')`
    padding: 40px 0;
    font-family: "Poppins" !important;
    font-size: 16px;
    & * {
        margin: 0 auto;
        border-style: none;
        border-radius: 0 !important;
    }
`;

const mainPadding = css`
    padding-right: 20%;
    padding-left: 20%;
    
    @media(max-width: 768px) {
        padding-right: 12%;
        padding-left: 12%;
    }
`;

const Header = styled('div')`
    padding: 30px auto;
    ${mainPadding}
    
    & .glyphicon {
        font-size: 18px;
        opacity: 0.5;
    }
`;


const Content = styled('div')`
    padding: 30px auto;
    
    & > * {
        ${mainPadding}
    }
    
    & img {
        padding: 30px 8% 0 8%;
        object.fit: cover;
        margin: 0 auto;
        width: 100%;
        @media(max-width: 1000px) {
            padding: 30px 0 0 0;
        }
    }
`;
