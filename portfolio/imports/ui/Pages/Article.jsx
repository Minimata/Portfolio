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
                        <Title>
                            Python heigthmaps
                        </Title>
                        <Subtitle>
                            A Fractal approach
                        </Subtitle>
                    </Header>

                    <Content>
                        <h4>Goal</h4>
                        <p>
                            The goal of this small project was to beta test an idea I had for terrain generation :
                            mixing
                            noise functions and fractals to get some mountains.
                            This idea came to my mind looking at my fellow Alps in Switzerland with Google Maps.
                        </p>
                        <img src={"/images/alps.png"} alt={"A Bird's eye view of the Alps."}/>
                        <p>
                            Look at this an tell me there's not a repeating pattern in there, getting smaller and
                            smaller.
                        </p>
                    </Content>
                </Wrapper>

                <Offset/>
            </div>
        );
    }
}


const Wrapper = styled('div')`
    width: 100%;
    display: block;
    font-family: "Poppins", sans-serif !important;
    
    padding: 20px;
`;

const Header = styled('div')`
    padding: 30px 40px;
`;

const Title = styled('div')``;
const Subtitle = styled('div')``;


const Content = styled('div')`
    padding: 0 0 20px 0;
    
    & img {
        width: 100%;
        object.fit: cover;
        margin: 40px auto;
    }
    & p {
        margin: 0 auto;
        padding: 10px 40px;
    }
    & h4 {
        margin: 0 auto;
        padding: 40px 40px 10px 40px;
    }
`;