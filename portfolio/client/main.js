import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import NavBar from '../imports/ui/NavBar.jsx'
import Footer from '../imports/ui/Footer.jsx'

Meteor.startup(() => {
    render(<NavBar/>, document.getElementById('navbar-target'));
    render(<Footer/>, document.getElementById('footer-target'));
});