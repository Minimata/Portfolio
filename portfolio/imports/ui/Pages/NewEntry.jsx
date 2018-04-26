/**
 * Created by Civilists on 05.02.2018
 */

import {Mongo} from 'meteor/mongo';
import React, {Component} from 'react';
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

import {categories} from "./Home.jsx";

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

import {Articles} from '../../api/Articles.js';
import ArticlePortion from '../Components/ArticlePortion.jsx'
import {buildRequest} from "../../../lib/router";


class NewEntry extends Component {

    constructor(props) {
        super(props);
        if (!categories.includes(this.props.params.category)) {
            FlowRouter.go('notFound');
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubtitleChange = this.handleSubtitleChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.removePortion = this.removePortion.bind(this);

        let title = '';
        let subtitle = '';
        let image_url = '/images/message.png';
        this.portionRefs = {};

        let article = this.props.articles.findOne({_id: new Mongo.ObjectID(this.props.params.articleId)});
        if (article) {
            title = article.title;
            subtitle = article.subtitle;
            image_url = article.image_url;
        }

        this.state = {
            title: title,
            subtitle: subtitle,
            image_url: image_url,
            data: {}
        };

        if (article) {
            article.data.forEach(elem => {
                if (elem) {
                    this.addPortion(elem.type, elem.content);
                }
            })
        }
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

    handleImageChange(e) {
        this.setState({image_url: e.target.value});
    }

    addPortion(type, content = '') {
        let id = new Mongo.ObjectID();
        let newData = this.state.data;
        newData[id] = {
            type: type,
            content: <ArticlePortion ref={instance => {
                this.portionRefs[id] = instance
            }} editable key={id} id={id} type={type} data={content} deleteFunc={this.removePortion}/>
        };
        this.setState({data: newData});
    }

    removePortion(id) {
        let newData = this.state.data;
        delete newData[id];
        this.setState({data: newData});
    }

    renderContent() {
        let portions = [];
        if (Object.keys(this.state.data).length > 0) {
            portions = Object.assign(Object.entries(this.state.data).map(([id, content]) => (content.content)));
        }
        return portions;
    }

    save(articleId, category) {
        //console.log(this.state.data, this.portionRefs);
        let content = Object.values(this.portionRefs)
            .filter(portion => {
                if (portion) return true;
                return false;
            })
            .map(portion => {
                return portion.getData();
            });
        let data = {
            category: category,
            title: this.state.title,
            subtitle: this.state.subtitle,
            image_url: this.state.image_url,
            data: content,
        };
        if (this.props.articles.findOne({_id: new Mongo.ObjectID(articleId)})) {
            Meteor.call('articles.update', {
                articleId: articleId,
                data: data
            });
        }
        else {
            Meteor.call('articles.insert', {
                articleId: articleId,
                data: data
            });
        }
        FlowRouter.go(buildRequest('article', articleId, {
            category: category
        }))
    }

    renderHexagonImageInput() {
        return (
            <ImageURL>
                <BS.FormGroup bsSize="large"
                              controlId="formBasicText">
                    <BS.FormControl type="text" placeholder="Image URL"
                                    value={this.state.image_url}
                                    onChange={this.handleImageChange}/>

                    <BS.FormControl.Feedback/>
                </BS.FormGroup>
            </ImageURL>
        )
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
                            {Meteor.user() ? this.renderHexagonImageInput() : null}
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
                            {this.renderContent()}
                            <ArticlePortion key={new Mongo.ObjectID()} type={'sectionTitle'} content={'Edit options'}/>

                            <BS.ButtonToolbar className={ButtonStyle}>
                                <BS.Button bsStyle="info"
                                           onClick={() => this.addPortion("sectionTitle")}>Section</BS.Button>
                                <BS.Button bsStyle="info"
                                           onClick={() => this.addPortion("paragraph")}>Paragraph</BS.Button>
                                {Meteor.user() ? <BS.Button bsStyle="info"
                                                                                 onClick={() => this.addPortion("image")}>Image</BS.Button> : null}
                                <BS.Button bsStyle="info" onClick={() => this.addPortion("caption")}>Caption</BS.Button>
                            </BS.ButtonToolbar>
                            <BS.ButtonToolbar className={ButtonStyle}>
                                <BS.Button bsStyle="success"
                                           onClick={() => (this.save(this.props.params.articleId, this.props.params.category))}>Save</BS.Button>
                            </BS.ButtonToolbar>
                        </Content>
                    </form>
                </Wrapper>

                <Offset/>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('articles');
    return {
        articles: Articles
    }
})(NewEntry);


const ImageURL = styled('h3')`
    padding-top: 10px;
    padding-bottom: 10px

    font-size: 22px;
    font-weight: 300;
    letter-spacing: -.01em;
    
    @media(max-width: 768px) {
        font-size: 18px;
    }
`;

const Title = styled('h1')`
    padding-top: 30px;
    padding-bottom: 10px

    font-size: 42px;
    font-weight: 600;
    line-height: 1.04;
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
