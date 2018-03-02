/**
 * Created by Civilists on 05.02.2018
 */

import {Mongo} from 'meteor/mongo';
import React, {Component} from 'react';
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'
import Textarea from "react-textarea-autosize";

import {categories} from "./Home.jsx";

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

import {Articles} from '../../api/Articles.js';
import ArticlePortion from '../Components/ArticlePortion.jsx'
import {buildRequest} from "../../../lib/router";


export default class NewEntry extends Component {

    constructor(props) {
        super(props);
        if (!categories.includes(this.props.params.category)) {
            FlowRouter.go('notFound');
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubtitleChange = this.handleSubtitleChange.bind(this);
        this.handlePortionChange = this.handlePortionChange.bind(this);

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

    handlePortionChange(e) {
        let newContent = this.state.content;
        newContent[e.target.id].content = e.target.value;
        this.setState({content: newContent});
    }

    AddPortion(type) {
        let id = new Mongo.ObjectID();
        let newContent = this.state.content;
        let content = '';
        if (type === 'image') {
            content = {
                url: "/images/alps.png",
                alt: "Top view of the alps"
            }
        }
        newContent[id] = {
            type: type,
            content: content
        };
        this.setState({content: newContent});
    }

    renderContent(content) {
        let portions = [];
        if (Object.keys(content).length > 0) {
            portions = Object.assign(Object.entries(content).map(([id, data]) => (
                <ArticlePortion key={id} id={id} type={data.type} content={<Textarea id={id} autoFocus className={'form-control'} value={data.content} onChange={this.handlePortionChange} />}/>
            )));
        }
        return portions;
    }

    save(articleId, category) {
        console.log(Object.values(this.state.content));
        let data = {
            category: category,
            image_url: '/images/island2.png',
            title: this.state.title,
            subtitle: this.state.subtitle,
            content: Object.values(this.state.content),
        };
        if(Articles.findOne({_id: new Mongo.ObjectID(articleId)})) {
            Articles.update({_id: new Mongo.ObjectID(articleId)}, {
                $set: data
            });
        }
        else {
            Articles.insert({
                _id: new Mongo.ObjectID(articleId),
                createdAt: new Date(),
                ...data
            });
        }
        FlowRouter.go(buildRequest('article', articleId, {category: category}))
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
                            <ArticlePortion key={new Mongo.ObjectID()} type={'sectionTitle'} content={'Edit options'}/>

                            <BS.ButtonToolbar className={ButtonStyle}>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("sectionTitle")}>Section</BS.Button>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("paragraph")}>Paragraph</BS.Button>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("image")}>Image</BS.Button>
                                <BS.Button bsStyle="info" onClick={() => this.AddPortion("caption")}>Caption</BS.Button>
                            </BS.ButtonToolbar>
                            <BS.ButtonToolbar className={ButtonStyle}>
                                <BS.Button bsStyle="success" onClick={() => (this.save(this.props.params.articleId, this.props.params.category))}>Save</BS.Button>
                            </BS.ButtonToolbar>;
                        </Content>
                    </form>
                </Wrapper>

                <Offset/>
            </div>
        );
    }
}


const Title = styled('h1')`
    padding-top: 30px;
    padding-bottom: 10px

    font-size: 42px;
    font-weight: 600;
    line-height; 1.04;
    letter-spacing: -.015em;
    
    @media(max-width: 768px) {
        font-size: 34px;
    }
`;

const Subtitle = styled('h2')`
    padding-top: 10px;
    padding-bottom: 30px
    
    font-size: 28px;
    font-weight: 400;
    line-height: 1.22;
    letter-spacing: -.012em;
    
    @media(max-width: 768px) {
        font-size: 24px;
    }
`;

const ButtonStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0 !important;
    & > * {
        flex-grow: 1;
        margin: 0 !important;
        border-radius: 0 !important;
    }
    @media(max-width: 768px) {
        width: 100vw;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
`;

const Wrapper = styled('div')`
    padding: 40px 0;
    font-family: "Poppins" !important;
    font-size: 16px;
    & input {
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
