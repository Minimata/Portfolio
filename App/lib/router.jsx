
import App from '../imports/ui/App.jsx';

FlowRouter.route( '/', {
    name: 'home',
    action() {
        ReactLayout.render( App );
    }
});