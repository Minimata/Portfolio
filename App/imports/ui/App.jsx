import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Tasks} from '../api/tasks.jsx'

import Task from './Task.jsx';
import NavigationBar from './NavigationBar/NavigationBar.jsx'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideCompleted: false
        }
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }

        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    renderNav() {
        return (
            <NavigationBar/>
        )
    }


    handleSubmit(event) {
        event.preventDefault();

        //Find text via the React reference
        let textInput = ReactDOM.findDOMNode(this.refs.textInput);
        const text = textInput.value.trim();

        Meteor.call('tasks.insert', text);

        //Clear form
        textInput.value = '';
    }


    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted
        })
    }

    render() {
        return (
            <div id="wrapper-main" className="wrapper">
                <div id="navbar-main" className="nav">
                    {this.renderNav()}
                </div>

                <div className="perspGrid">
                    <ul id="hexGrid">
                        {this.renderTasks()}
                    </ul>
                </div>
            </div>
        );

        {/*
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>

                    <AccountsUIWrapper />

                    { this.props.currentUser ? //opérateur ternaire un peu long
                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text"
                                   ref="textInput"
                                   placeholder="Type to add new tasks"/>
                        </form> : ''
                    }

                </header>

            </div>

         */
        }
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
        incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
        currentUser: Meteor.user()
    };
}, App);