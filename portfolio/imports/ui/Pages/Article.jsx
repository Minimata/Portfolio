/**
 * Created by Civilists on 30.01.2018
 */

import BS from 'react-bootstrap'
import styled, {css} from 'react-emotion'
import React, {Component} from 'react';

import NavBar from '../Navigation/NavBar.jsx'
import Offset from "../Components/Offset.jsx"

export default class Article extends Component {
    render() {
        return (
            <div>
                <NavBar reduced/>
                <Offset/>

                <Wrapper>
                    <Header>
                        <Title>Python heigthmaps</Title>
                        <Subtitle>A Fractal approach</Subtitle>
                    </Header>

                    <Content>
                        <SectionTitle>Goal</SectionTitle>

                        <Paragraph>
                            The goal of this small project was to beta test an idea I had for terrain generation :
                            mixing
                            noise functions and fractals to get some mountains.
                            This idea came to my mind looking at my fellow Alps in Switzerland with Google Maps.
                        </Paragraph>

                        <img src={"/images/alps.png"} alt={"A Bird's eye view of the Alps."}/>
                        <Legend>
                            Look at this an tell me there's not a repeating pattern in there, getting smaller and
                            smaller.
                        </Legend>

                        <Paragraph>
                            The goal of this small project was to beta test an idea I had for terrain generation :
                            mixing
                            noise functions and fractals to get some mountains.
                            This idea came to my mind looking at my fellow Alps in Switzerland with Google Maps.
                        </Paragraph>

                        <Paragraph>
                            The goal of this small project was to beta test an idea I had for terrain generation :
                            mixing
                            noise functions and fractals to get some mountains.
                            This idea came to my mind looking at my fellow Alps in Switzerland with Google Maps.
                        </Paragraph>
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
`;

const mainPadding = css`
    padding-right: 20%;
    padding-left: 20%;
`;

const Header = styled('div')`
    margin: 20px auto;
    padding: 30px auto;
    ${mainPadding}
`;

const Title = styled('h1')`
    margin-top: 30px;
    margin-bottom: 10px

    font-size: 42px;
    font-weight: 600;
    line-height; 1.04;
    letter-spacing: -.015em;
    
    @media(max-width: 768px) {
        font-size: 34px;
    }
`;

const Subtitle = styled('h2')`
    margin-top: 10px;
    margin-bottom: 30px
    
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
    margin-top: 40px;
    margin-bottom: 10px;
`;

const Paragraph = styled('p')`
    margin: 20px auto;
`;

const Legend = styled('p')`
    margin: 20px 10% 50px 10%;
    font-style: italic;
    color: rgb(100, 100, 100);
`;