import React from 'react';

import App from '../imports/ui/App.js';
import Article from '../imports/ui/Pages/Article.jsx'

import {mount, withOptions} from 'react-mounter';

const mount2 = withOptions({
    rootId: 'render-target',
    rootProps: {'className': ''}
}, mount);



FlowRouter.route('/', {
    name: 'home',
    action() {
        mount2(App)
    }
});

FlowRouter.route('/article/:id', {
    action: function(params, queryParams) {
        //console.log("Yeah! We are on the post:", params.id);
        mount2(Article)
    }
});