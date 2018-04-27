/**
 * Created by Civilists on 30.01.2018
 */

import React, {Component} from 'react';
import styled from 'react-emotion'
import {withTracker} from 'meteor/react-meteor-data';
import {buildRequest} from '../../../lib/router';

import Tile from '../Components/Tile.js';
import Separator from '../Components/Separator.jsx'
import NavBar from '../Navigation/NavBar.jsx'
import Footer from '../Navigation/Footer.jsx'
import Offset from "../Components/Offset.jsx"
import FloatingButton from "../Components/FloatingButton.jsx"

import {Articles} from '../../api/Articles.js';

class Home extends Component {

    renderArticles(articles, category) {
        return articles.map((tile) => (
            <Tile key={tile._id} title={tile.title} subtitle={tile.subtitle} category={category} image={tile.image_url}
                  link={buildRequest('article', tile._id, {
                      category: category
                  })}
                  articleId={tile._id}/>
        ));
    }

    renderMessages() {
        return (
            <HexGrid>
                {this.renderArticles(this.props.messagesArticles, categories[2])}
                <Tile key={201} title={"New message"} subtitle={"Message me !"}
                      image={"images/plus_icon.png"}
                      link={buildRequest('new', new Mongo.ObjectID(), {
                          category: categories[2]
                      })}/>
            </HexGrid>
        );
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Offset/>

                <Separator title={"Works"} />

                <HexGrid>
                    {this.renderArticles(this.props.worksArticles, categories[0])}
                    {Meteor.user() ?
                        Meteor.user().username === "admin" ?
                            <Tile key={1} title={"New"} subtitle={"Add entry"} image={"images/plus_icon.png"}
                                  link={buildRequest('new', new Mongo.ObjectID(), {
                                      category: categories[0]
                                  })}/> : ''
                        : ''
                    }
                </HexGrid>

                <Separator title={"Life"} />

                <HexGrid>
                    {this.renderArticles(this.props.lifeArticles, categories[1])}
                    {Meteor.user() ?
                        Meteor.user().username === "admin" ?
                            <Tile key={101} title={"New"} subtitle={"Add entry"} image={"images/plus_icon.png"}
                                  link={buildRequest('new', new Mongo.ObjectID(), {
                                      category: categories[1]
                                  })}/> : ''
                        : ''
                    }
                </HexGrid>

                <Separator title={"Contact"} />

                <HexGrid>
                    <Tile key={301} title={"CV"} subtitle={"Link to my CV files"}
                          image={"/images/CV.jpg"}
                          link={'https://drive.google.com/drive/folders/1T_ynkRATQmdLY1OOGKxRT2hfE_rfLZJe?usp=sharing'}
                          outsideLink
                    />
                    <Tile key={302} title={"Twitter"} subtitle={"@EpicMinimata"}
                          image={"/images/Twitter.png"}
                          link={'https://twitter.com/EpicMinimata'}
                          outsideLink
                    />
                    <Tile key={303} title={"Linkedin"} subtitle={"Professional account"}
                          image={"/images/linkedin.png"}
                          link={'https://www.linkedin.com/in/alexandre-serex-116428113/'}
                          outsideLink
                    />
                    <Tile key={304} title={"My gmail"} subtitle={"serex.alexandre @gmail.com"}
                          image={"/images/gmail.jpg"}
                          link={'mailto:serex.alexandre@gmail.com'}
                          outsideLink
                          target={'_self'}
                    />
                </HexGrid>

                <Separator title={"Messages"} />

                {this.renderMessages()}

                <FloatingButton/>
                <Offset/>
                <Footer/>
            </div>

        );
    }
}

export const categories = ["works", "life", "messages", "contact"];

export default withTracker(() => {

    Meteor.subscribe('articles');

    return {
        worksArticles: Articles.find({category: categories[0]}, {sort: {lastModified: -1}}).fetch(),
        lifeArticles: Articles.find({category: categories[1]}, {sort: {lastModified: -1}}).fetch(),
        messagesArticles: Articles.find({category: categories[2]}, {sort: {lastModified: -1}}).fetch(),
        contactArticles: Articles.find({category: categories[3]}, {sort: {lastModified: -1}}).fetch(),
        currentUser: Meteor.user(),
    };
})(Home);


const HexGrid = styled('ul')`
    display: block;
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
    
    li {
        width:27.85714285714286%; /* = (100-2.5) / 3.5 */
        padding-bottom: 32.16760145166612%; /* =  width /0.866 */
    }
    
    li:nth-child(3n+2){
        margin:0 1%;
    }
    li:nth-child(6n+4){
        margin-left:0.5%;
    }
    li:nth-child(6n+4), li:nth-child(6n+5), li:nth-child(6n+6) {
        margin-top: -6.9285714285%;
        margin-bottom: -6.9285714285%;
    }
    
    li:nth-child(6n+4):last-child {
        margin-bottom: 0;
    }
    li:nth-child(6n+4):nth-last-child(2), li:nth-child(6n+5):last-child {
        margin-bottom: 0;
    }
    li:nth-child(6n+4):nth-last-child(3), li:nth-child(6n+5):nth-last-child(2), li:nth-child(6n+6):last-child {
        margin-bottom: 0;
    }
    
    li > a{
        width:100%;
        height:100%;
        text-align:center;
        overflow:hidden;
        -webkit-backface-visibility:hidden;
    }
    
    // HEX CONTENT
    
    li img{
        left:-100%; right:-100%;
        padding:0 5%;
        width: auto; height:100%;
        -webkit-transition: all .2s ease-out;
        -ms-transition: all .2s ease-out;
        transition: all .2s ease-out;
    }
    
    a > h1, a > p{
        width:100%;
        margin: auto !important;
        color: white;
    }
    li a h1 {
        bottom:50%;
        padding-bottom:10%;
    }
    li a p{
        top:50%;
        padding-top:10%;
    }
    
    li h1{
        font-style:italic;
        font-weight:normal;
        font-size:1.5em;
        padding-top:100%;
        padding-bottom:100%;
    }
    li h1:after{
        content:'';
        display:block;
        position:absolute;
        bottom:-1px; left:45%;
        width:10%;
        text-align:center;
        z-index: 1;
        border-bottom:2px solid #fff;
    }
    
    //HOVER EFFECT
    li p{
        padding-top:50%;
        padding-bottom:50%;
    }
    li a:hover h1 {
        bottom:110%;
    }
    li a:hover p {
        top:110%;
    }
    li a:hover img {
        transform: scale(1.1);
    }
    
`;
