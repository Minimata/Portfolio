/**
 * Created by Civilists on 06.02.2018
 */

import React, {Component} from 'react';
import BS from 'react-bootstrap'
import styled, {css} from 'react-emotion'
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
        this.deleteButton = this.deleteButton.bind(this);
        this.remove = this.remove.bind(this);

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
            "timeEdit": (data) => {
                return (<TimeEdit>{data}</TimeEdit>)
            },
            "sectionTitle": (data) => {
                return (<SectionTitle className={overflow}>{data}</SectionTitle>)
            },
            "paragraph": (data) => {
                return (<Paragraph className={overflow}>{data}</Paragraph>)
            },
            "image": (data) => {
                return (<img className={Image} src={data.url} alt={data.alt}/>)
            },
            "caption": (data) => {
                return (<Caption className={overflow}>{data}</Caption>)
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
        if (this.props.type === 'image') {
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

    remove() {
        this.props.deleteFunc(this.props.id);
    }

    deleteButton() {
        return (
            <BS.Button bsStyle="danger"
                       onClick={this.remove}>
                <BS.Glyphicon glyph="remove"/>
            </BS.Button>

        );
    }

    titleEditable() {
        return (
            <Title>
                <Textarea autoFocus className={'form-control'} value={this.state.value}
                          onChange={this.handleValueChanged}/>
            </Title>
        );
    }

    subtitleEditable() {
        return (<Subtitle>
            <Textarea autoFocus className={'form-control'} value={this.state.value}
                      onChange={this.handleValueChanged}/>
            </Subtitle>
        );
    }

    sectionTitleEditable() {
        return (
            <SectionTitle>
                <Textarea autoFocus className={'form-control'} value={this.state.value}
                          onChange={this.handleValueChanged}/>
                {this.deleteButton()}
            </SectionTitle>
        );
    }

    paragraphEditable() {
        return (
            <Paragraph><Textarea autoFocus className={'form-control'} value={this.state.value}
                                 onChange={this.handleValueChanged}/>
                {this.deleteButton()}
            </Paragraph>
        );
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
                {this.deleteButton()}
            </Paragraph>
        );
    }

    captionEditable() {
        return (
            <Caption><Textarea autoFocus className={'form-control'} value={this.state.value}
                               onChange={this.handleValueChanged}/>
                {this.deleteButton()}
            </Caption>
        );
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

const Image = css`
    object-fit: contain;
    max-height: 600px;
`;

const FlexRow = css`
    display: flex;
    justify-content: space-between;
`;

const overflow = css`
    word-break: break-word;
    overflow-wrap: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    -o-hyphens: auto;
    hyphens: auto;
`;

const Title = styled('h1')`
    ${overflow}
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
    ${overflow}
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


const TimeEdit = styled('p')`
    padding-top: 0;
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
    ${FlexRow}

    padding-top: 40px;
    padding-bottom: 10px;
`;

const Paragraph = styled('div')`
    ${FlexRow}

    margin: 0;
    padding-top: 30px;
    padding-bottom: 30px;
`;

const Caption = styled('div')`
    ${FlexRow}

    text-align: center;
    padding-top: 20px;
    padding-bottom: 50px;
    margin: auto 10% !important;
    font-style: italic;
    color: rgb(200, 200, 200);
`;