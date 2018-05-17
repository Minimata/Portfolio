/**
 * Created by Civilists on 30.01.2018
 */

import {Mongo} from 'meteor/mongo';
import styled, {css} from 'react-emotion'
import React, {Component} from 'react';
import BS from 'react-bootstrap'
import {withTracker} from 'meteor/react-meteor-data';

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

import {Articles} from '../../api/Articles.js';
import ArticlePortion from '../Components/ArticlePortion.jsx'
import {buildRequest} from '../../../lib/router';

import moment from 'moment';

class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            article: undefined
        };
    }

    componentDidMount() {
        try {
            let article = this.props.articles.findOne({_id: new Mongo.ObjectID(this.props.params.articleId)});
            this.isEditable = !!Meteor.user();
            if (this.isEditable) {
                this.isEditable = Meteor.user().username === article.username || Meteor.user().username === 'admin';
            }

            this.setState({article: article});
        }
        catch (error) {
            console.log(error);
            FlowRouter.go('notFound');
        }
		
		window.scrollTo(0, 0)
    }

    renderContent(content) {
        return content
            .filter(part => {
                if (part) return true;
                return false;
            })
            .map((part) => {
                let id = new Mongo.ObjectID();
                return <ArticlePortion key={id} id={id} type={part.type} data={part.content}/>
            });
    }

    deleteArticle(articleId) {
        Meteor.call('articles.remove', articleId);
        FlowRouter.go('home');
    }

    render() {
            return (
                <div>
                    <NavBar reduced/>
                    <Offset/>
                    {this.state.article ?
                        <Wrapper>
                            <Header>
                                {
                                    this.isEditable ?
                                        <BS.ButtonToolbar className={SpaceEvenly}>
                                            <BS.Button bsStyle="info"
                                                       onClick={() => FlowRouter.go(buildRequest('new', this.props.params.articleId, {category: this.props.params.category}))}>Edit</BS.Button>
                                            <BS.Button bsStyle="danger"
                                                       onClick={() => (this.deleteArticle(this.props.params.articleId))}>Delete</BS.Button>
                                        </BS.ButtonToolbar> : null
                                }
                                <ArticlePortion id={new Mongo.ObjectID()} type={'title'} data={this.state.article.title}/>
                                <ArticlePortion id={new Mongo.ObjectID()} type={'subtitle'} data={this.state.article.subtitle}/>

                                <ArticlePortion id={new Mongo.ObjectID()} type={'timeEdit'}
                                                data={"Created " + new moment(this.state.article.createdAt).format("DD-MM-YYYY").toString() +
                                                " - last updated " + new moment(this.state.article.lastModified).format("DD-MM-YYYY").toString()}/>
                            </Header>

                            <Content>
                                {this.renderContent(this.state.article.data)}
                            </Content>
                        </Wrapper>
                        : <div/>
                    }

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
})(Article);

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
    }
    
    & > div > * {
        padding-right: 20%;
        padding-left: 20%;
        
        @media(max-width: 768px) {
            padding-right: 12%;
            padding-left: 12%;
        }
    }
`;

const Header = styled('div')`
    padding: 30px auto;
`;


const Content = styled('div')`
    padding: 30px auto;
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
