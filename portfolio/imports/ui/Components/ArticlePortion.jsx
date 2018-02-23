/**
 * Created by Civilists on 06.02.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'




export default class ArticlePortion extends Component {

    constructor(props){
        super(props);
        this.contentTypes = {
            "title": (content) => {return (<Title>{content}</Title>)},
            "subtitle": (content) => {return (<Subtitle>{content}</Subtitle>)},
            "sectionTitle": (content) => {return (<SectionTitle>{content}</SectionTitle>)},
            "paragraph": (content) => {return (<Paragraph>{content}</Paragraph>)},
            "image": (content) => {return (<img src={content.url} alt={content.alt}/>)},
            "caption": (content) => {return (<Caption>{content}</Caption>)},
            "legend": (content) => {return (<Caption>{content}</Caption>)},  //backwards compatibility until next DB drop
        };
    }

    render() {
        return this.contentTypes[this.props.type](this.props.content);
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


const SectionTitle = styled('h4')`
    padding-top: 40px;
    padding-bottom: 10px;
`;

const Paragraph = styled('div')`
    margin: 0;
    padding-top: 30px;
    padding-bottom: 30px;
`;

const Caption = styled('div')`
    padding-top: 20px;
    padding-bottom: 50px;
    margin: 0 10%;
    font-style: italic;
    color: rgb(100, 100, 100);
`;