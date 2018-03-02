/**
 * Created by Civilists on 06.02.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'
import Textarea from "react-textarea-autosize";

export const ContentTypes = {
    "title": (data) => {return (<Title>{data}</Title>)},
    "subtitle": (data) => {return (<Subtitle>{data}</Subtitle>)},
    "sectionTitle": (data) => {return (<SectionTitle>{data}</SectionTitle>)},
    "paragraph": (data) => {return (<Paragraph>{data}</Paragraph>)},
    "image": (data) => {return (<img src={data.url} alt={data.alt}/>)},
    "caption": (data) => {return (<Caption>{data}</Caption>)},
};

export const EditableContent = {
    "title": titleEditable,
    "subtitle": subtitleEditable,
    "sectionTitle": sectionTitleEditable,
    "paragraph": paragraphEditable,
    "image": imageEditable,
    "caption": captionEditable
};

function titleEditable(data) {
    return <Title><Textarea autoFocus className={'form-control'} value={data.content} onChange={data.onChange} /></Title>;
}
function subtitleEditable(data) {
    return <Subtitle><Textarea autoFocus className={'form-control'} value={data.content} onChange={data.onChange} /></Subtitle>;
}
function sectionTitleEditable(data) {
    return <SectionTitle><Textarea autoFocus className={'form-control'} value={data.content} onChange={data.onChange} /></SectionTitle>;
}
function paragraphEditable(data) {
    return <Paragraph><Textarea autoFocus className={'form-control'} value={data.content} onChange={data.onChange} /></Paragraph>;
}
function imageEditable(data) {
    return <img src={data.url} alt={data.alt}/>;
}
function captionEditable(data) {
    return <Caption><Textarea autoFocus className={'form-control'} value={data.content} onChange={data.onChange} /></Caption>;
}

export default class ArticlePortion extends Component {
    render() {//onChange doesn't work. Integrate it to the article portion
        if(this.props.editable) {
            return EditableContent[this.props.type](this.props.data);
        }
        else {
            return ContentTypes[this.props.type](this.props.data);
        }
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
    text-align: center;
    padding-top: 20px;
    padding-bottom: 50px;
    margin: auto 10%;
    font-style: italic;
    color: rgb(100, 100, 100);
`;