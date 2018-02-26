import React from 'react';

import App from '../imports/ui/App.js';
import Article from '../imports/ui/Pages/Article.jsx'
import NewEntry from '../imports/ui/Pages/NewEntry.jsx'
import NotFound from '../imports/ui/Pages/NotFound.jsx'

import {mount, withOptions} from 'react-mounter';


export function buildRequest(name, param, queryParams) {
    let query = '/' + name + '/' + param + '?';
    for(const [name, value] of Object.entries(queryParams)) {
        query += name + '=' + value + '&';
    }
    return query.slice(0, -1);  //remove last '&'
}


const mount2 = withOptions({
    rootId: 'render-target',
    rootProps: {'className': ''}
}, mount);


FlowRouter.route('/', {
    name: 'home',
    action() {
        mount(App)
    }
});

FlowRouter.route('/article/:articleId', {
    name: 'article',
    action: function (params, queryParams) {
        mount(Article, {articleId: params.articleId, ...queryParams})
    }
});

FlowRouter.route('/new/:articleId', {
    name: 'new',
    action: function (params, queryParams) {
        mount(NewEntry, {articleId: params.articleId, ...queryParams});
    }
});

FlowRouter.notFound = {
    name: 'notFound',
    action: function (params, queryParams) {
        console.log(params, queryParams);
        mount(NotFound)
    }
};