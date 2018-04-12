/**
 * Created by Civilists on 06.02.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'
import Textarea from "react-textarea-autosize";

export default class ArticlePortion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.data,
            url: '',
        };

        this.handleValueChanged = this.handleValueChanged.bind(this);
        this.handleURLChanged = this.handleURLChanged.bind(this);
        this.titleEditable = this.titleEditable.bind(this);
        this.subtitleEditable = this.subtitleEditable.bind(this);
        this.sectionTitleEditable = this.sectionTitleEditable.bind(this);
        this.paragraphEditable = this.paragraphEditable.bind(this);
        this.imageEditable = this.imageEditable.bind(this);
        this.captionEditable = this.captionEditable.bind(this);
        this.getData = this.getData.bind(this);

        this.contentTypes = {
            "title": (data) => {
                return (<Title>{data}</Title>)
            },
            "subtitle": (data) => {
                return (<Subtitle>{data}</Subtitle>)
            },
            "owner": (data) => {
                return (<Owner>Written by {data}</Owner>)
            },
            "sectionTitle": (data) => {
                return (<SectionTitle>{data}</SectionTitle>)
            },
            "paragraph": (data) => {
                return (<Paragraph>{data}</Paragraph>)
            },
            "image": (data) => {
                return (<img src={data.url} alt={data.alt}/>)
            },
            "caption": (data) => {
                return (<Caption>{data}</Caption>)
            },
        };

        this.editableContent = {
            "title": this.titleEditable,
            "subtitle": this.subtitleEditable,
            "sectionTitle": this.sectionTitleEditable,
            "paragraph": this.paragraphEditable,
            "image": this.imageEditable,
            "caption": this.captionEditable
        };
    }

    componentDidMount() {
        if(this.props.type === 'image') {
            this.setState({
                value: this.props.data.alt,
                url: this.props.data.url
            })
        }
    }

    handleValueChanged(e) {
        this.setState({value: e.target.value});
    }

    handleURLChanged(e) {
        this.setState({url: e.target.value});
    }

    titleEditable() {
        return <Title><Textarea autoFocus className={'form-control'} value={this.state.value}
                                onChange={this.handleValueChanged}/></Title>;
    }

    subtitleEditable() {
        return <Subtitle><Textarea autoFocus className={'form-control'} value={this.state.value}
                                   onChange={this.handleValueChanged}/></Subtitle>;
    }

    sectionTitleEditable() {
        return <SectionTitle><Textarea autoFocus className={'form-control'} value={this.state.value}
                                       onChange={this.handleValueChanged}/></SectionTitle>;
    }

    paragraphEditable() {
        return <Paragraph><Textarea autoFocus className={'form-control'} value={this.state.value}
                                    onChange={this.handleValueChanged}/></Paragraph>;
    }

    imageEditable() {
        //this.setState({value: this.props.data});
        return (
            <Paragraph>
                <Textarea className={'form-control'}
                          placeholder={'Image URL'}
                          value={this.state.url}
                          onChange={this.handleURLChanged}/>
                <Textarea autoFocus
                          className={'form-control'}
                          placeholder={'Description'}
                          value={this.state.value}
                          onChange={this.handleValueChanged}/>
            </Paragraph>
        );
    }

    captionEditable() {
        return <Caption><Textarea autoFocus className={'form-control'} value={this.state.value}
                                  onChange={this.handleValueChanged}/></Caption>;
    }

    getData() {
        let data = {
            type: this.props.type,
            content: this.state.value
        };
        if (this.props.type === 'image') {
            data.content = {
                url: this.state.url,
                alt: this.state.value
            }
        }
        return data;
    }

    render() {
        if (this.props.editable) {
            return this.editableContent[this.props.type]();
        }
        else {
            return this.contentTypes[this.props.type](this.props.data);
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
    padding-bottom: 5px
    
    font-size: 28px;
    font-weight: 400;
    line-height: 1.22;
    letter-spacing: -.012em;
    
    @media(max-width: 768px) {
        font-size: 24px;
    }
`;

const Owner = styled('p')`
    padding-top: 5px;
    padding-bottom: 10px
    
    font-size: 14px;
    font-weight: 200;
    font-style: italic;
    line-height: 1.14;
    letter-spacing: -.01em;
    
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