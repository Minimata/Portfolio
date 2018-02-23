/**
 * Created by Civilists on 30.01.2018
 */

import {Mongo} from 'meteor/mongo';
import styled, {css} from 'react-emotion'
import React, {Component} from 'react';
import BS from 'react-bootstrap'

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

import {Articles} from '../../api/Articles.js';
import ArticlePortion from '../Components/ArticlePortion.jsx'

export default class Article extends Component {

    constructor(props) {
        super(props);
        try {
            this.article = Articles.findOne({_id: new Mongo.ObjectID(this.props.articleId)});
        }
        catch (error) {
            console.log(error);
            FlowRouter.go('notFound');
        }

        if (!this.article) {
            FlowRouter.go('notFound');
        }
    }

    renderContent(content) {
        return content.map((part) => {
            let id = new Mongo.ObjectID();
            return <ArticlePortion key={id} id={id} type={part.type} content={part.content}/>
        });
    }

    deleteArticle() {

    }

    render() {
        if (this.article) {
            return (
                <div>
                    <NavBar reduced/>
                    <Offset/>

                    <Wrapper>
                        <Header>
                            <BS.ButtonToolbar className={SpaceEvenly}>
                                <BS.Button bsStyle="info" onClick={() => FlowRouter.go('/new/' + this.category)}>Edit</BS.Button>
                                <BS.Button bsStyle="danger" onClick={this.deleteArticle()}>Delete</BS.Button>
                            </BS.ButtonToolbar>
                            <ArticlePortion id={new Mongo.ObjectID()} type={'title'} content={this.article.title} />
                            <ArticlePortion id={new Mongo.ObjectID()} type={'subtitle'} content={this.article.subtitle} />
                        </Header>

                        <Content>
                            {this.renderContent(this.article.content)}
                        </Content>
                    </Wrapper>

                    <Offset/>
                </div>
            );
        }
        else return (<div/>)
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
