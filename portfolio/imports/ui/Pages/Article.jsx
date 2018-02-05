/**
 * Created by Civilists on 30.01.2018
 */

import { Mongo } from 'meteor/mongo';
import styled, {css} from 'react-emotion'
import React, {Component} from 'react';

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

import { Articles } from '../../api/Articles.js';

const ContentTypes = {
    "title": renderTitle,
    "paragraph": renderParagraph,
    "image": renderImage,
    "legend": renderLegend,
};

function renderTitle(content) {
    return(<SectionTitle key={new Mongo.ObjectID()}>{content}</SectionTitle>);
}
function renderParagraph(content) {
    return(<Paragraph key={new Mongo.ObjectID()}>{content}</Paragraph>);
}
function renderImage(content) {
    return(<img key={new Mongo.ObjectID()} src={content.url} alt={content.alt}/>);
}
function renderLegend(content) {
    return(<Legend key={new Mongo.ObjectID()}>{content}</Legend>);
}

export default class Article extends Component {

    constructor(props) {
        super(props);
        this.article = Articles.findOne({_id: new Mongo.ObjectID(this.props.articleId)});
    }

    renderContent(content) {
        return content.map((part) => (
            ContentTypes[part.type](part.content)
        ));
    }

    render() {
        return (
            <div>
                <NavBar reduced/>
                <Offset/>

                <Wrapper>
                    <Header>
                        <Title>{this.article.title}</Title>
                        <Subtitle>{this.article.subtitle}</Subtitle>
                    </Header>

                    <Content>
                        {this.renderContent(this.article.content)}
                    </Content>
                </Wrapper>

                <Offset/>
            </div>
        );
    }
}


const Wrapper = styled('div')`
    padding: 40px 0;
    font-family: "Poppins" !important;
    font-size: 16px;
    & * {
        margin: 0 auto;
    }
`;

const mainPadding = css`
    padding-right: 20%;
    padding-left: 20%;
`;

const Header = styled('div')`
    padding: 30px auto;
    ${mainPadding}
`;

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

const SectionTitle = styled('h4')`
    padding-top: 40px;
    padding-bottom: 10px;
`;

const Paragraph = styled('p')`
    margin: 0;
    padding-top: 30px;
    padding-bottom: 30px;
`;

const Legend = styled('p')`
    padding-top: 20px;
    padding-bottom: 50px;
    margin: 0 10%;
    font-style: italic;
    color: rgb(100, 100, 100);
`;