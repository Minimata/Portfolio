import React from 'react';

import App from '../imports/ui/App.js';

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