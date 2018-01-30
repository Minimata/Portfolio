/**
 * Created by Civilists on 22.01.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'
import {Element} from 'react-scroll'

export default class Separator extends Component {
    render() {
        return (
            <Element name={this.props.id}>
                <FullWidthBackground>
                    <Title>
                        {this.props.title}
                    </Title>

                    <Content>
                        {this.props.children}
                    </Content>
                </FullWidthBackground>
            </Element>
        );
    }
}

const FullWidthBackground = styled('div')`
    right: 0;
    width: 100%;
    background-color: rgb(42, 43, 44);
    color: whitesmoke;
    padding: 20px
    
    display: flex;
    flex-direction: column;
    
    & > p {
        font-family: "Poppins", sans-serif;
        margin: 0 auto;
        padding: 20px 40px;
    }
    
    
    @media(max-width: 1200px) {
        padding: 10px;
        & > p {
            padding: 10px;
        }
    }
    
    @media(max-width: 768px) {
        
    }
    
`;

const Title = styled('p')`
    font-size: 1.75em;
    font-weight: 300;
    line-height: 1.5;
    
    border-bottom: 1px solid rgb(100, 100, 100);
`;

const Content = styled('p')`
    font-size: 1.25em;
    font-weight: 200;
    line-height: 1.5;
`;
