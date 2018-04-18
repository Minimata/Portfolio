/**
 * Created by Civilists on 05.02.2018
 */

import React, {Component} from 'react';
import styled, {css} from 'react-emotion'
import BS from 'react-bootstrap'

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

export default class NotFound extends Component {
    render() {
        return (
            <div>
                <NavBar reduced/>
                <Offset/>

                <BS.Grid>
                    <BS.Row>
                        <Wrapper>
                            <BS.Col xs={12} md={8}>
                                <img className={ObjectFit}
                                     src="/images/404.jpg"
                                     alt="You weren't supposed to see this shot of teenager me with afro hair..."/>
                            </BS.Col>
                            <BS.Col xs={12} md={4}>
                                <Title>404</Title>
                                <Message>
                                    Oops! You weren't supposed to see this ! Yes, that was my hair when I was a
                                    teenager.
                                </Message>
                                <BS.Button bsStyle="info"
                                           onClick={() => FlowRouter.go('home')}>Get back home
                                </BS.Button>
                            </BS.Col>
                        </Wrapper>
                    </BS.Row>
                    <BS.Row>
                    </BS.Row>
                </BS.Grid>

                <Offset/>
            </div>
        );
    }
}

const ObjectFit = css`
    width: 100%;
    object-fit: fill;
`;

const Wrapper = styled('div')`
    padding: 40px;
    font-family: "Poppins" !important;
    font-size: 16px;
    
    @media(max-width: 768px) {
        padding: 20px 0;
    }
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

const Message = styled('p')`
    margin: 0;
    padding-top: 30px;
    padding-bottom: 30px;
`;