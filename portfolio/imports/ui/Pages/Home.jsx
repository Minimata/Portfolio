/**
 * Created by Civilists on 30.01.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'
import { withTracker } from 'meteor/react-meteor-data';

import Tile from '../Components/Tile.js';
import Separator from '../Components/Separator.jsx'
import NavBar from '../Navigation/NavBar.jsx'
import Footer from '../Navigation/Footer.jsx'
import Offset from "../Components/Offset.jsx"

import { Articles } from '../../api/Articles.js';


class Home extends Component {

    renderArticles(articles) {
        return articles.map((tile) => (
            <Tile key={tile._id} title={tile.title} subtitle={tile.subtitle}
                  image={tile.image_url} link={'/article/' + tile._id} />
        ));
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Offset/>

                <Separator title={"Works"}>
                    A description of some projects I worked (or keep working) on.
                </Separator>

                <HexGrid>
                    {this.renderArticles(this.props.worksArticles)}
                    {/** <Tile key={1} title={"Python Heightmaps"} subtitle={"A fractal approach"} image={"images/island3.png"} link={'/article/0'}/> **/}
                </HexGrid>

                <Separator title={"Life"}>
                    Some moments of my life and education. It's the blog part of this website.
                </Separator>

                <HexGrid>
                    {this.renderArticles(this.props.lifeArticles)}
                </HexGrid>

                <Separator title={"Messages"}>
                    What do you think about me ? You can write it down and it will be instantly visible for everyone.
                </Separator>

                <HexGrid>
                    {this.renderArticles(this.props.messagesArticles)}
                </HexGrid>

                <Separator title={"Contact"}>
                    Here's how you can contact me of course.
                </Separator>

                <HexGrid>
                    {this.renderArticles(this.props.contactArticles)}
                </HexGrid>

                <Offset/>
                <Footer/>
            </div>

        );
    }
}


export default withTracker(() => {
    return {
        worksArticles: Articles.find({category: "works"}).fetch(),
        lifeArticles: Articles.find({category: "life"}).fetch(),
        messagesArticles: Articles.find({category: "messages"}).fetch(),
        contactArticles: Articles.find({category: "contact"}).fetch(),
    };
})(Home);


const HexGrid = styled('ul')`
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
    list-style-type: none;
    font-family: "Poppins", sans-serif;
    overflow:hidden;
    width:75%;
    margin: 40px auto 40px auto;
    
    @media(max-width: 1200px) {
        width: 90%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    
    @media(max-width: 768px) {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    
    &:after {
        content:"";
        display:block;
        clear:both;
    }
    
    & li {
        width:27.85714285714286%; /* = (100-2.5) / 3.5 */
        padding-bottom: 32.16760145166612%; /* =  width /0.866 */
    }
    
    & li:nth-child(3n+2){
        margin:0 1%;
    }
    & li:nth-child(6n+4){
        margin-left:0.5%;
    }
    & li:nth-child(6n+4), li:nth-child(6n+5), li:nth-child(6n+6) {
        margin-top: -6.9285714285%;
        margin-bottom: -6.9285714285%;
    }
    & li:nth-child(6n+4):last-child, li:nth-child(6n+5):last-child, li:nth-child(6n+6):last-child{
        margin-bottom:0%;
    }
    & li > a{
        width:100%;
        height:100%;
        text-align:center;
        overflow:hidden;
        -webkit-backface-visibility:hidden;
    }
    
    // HEX CONTENT
    
    & li img{
        left:-100%; right:-100%;
        width: auto; height:100%;
    }
    & a > h1, & a > p{
        width:100%;
        padding:0 5%;
        margin: auto !important;
    }
    & li h1{
        bottom:110%;
        font-style:italic;
        font-weight:normal;
        font-size:1.5em;
        padding-top:100%;
        padding-bottom:100%;
    }
    & li h1:after{
        content:'';
        display:block;
        position:absolute;
        bottom:-1px; left:45%;
        width:10%;
        text-align:center;
        z-index:1;
        border-bottom:2px solid #fff;
    }
    & li p{
        padding-top:50%;
        top:110%;
        padding-bottom:50%;
    }
    
    
    // HOVER EFFECT
    & li a:hover h1 {
        bottom:50%;
        padding-bottom:10%;
    }
    & li a:hover p{
        top:50%;
        padding-top:10%;
    }
`;