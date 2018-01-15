import React, { Component, PropTypes } from 'react';

import { Meteor } from 'meteor/meteor'

import classnames from 'classnames'

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in css
        const taskClassName = classnames({
            checked: this.props.task.checked,
            private: this.props.task.private
        });
        return (
            <li className="hex">
                <div className="hexIn">
                    <a className="hexLink" href="#">
                        <img src="https://68.media.tumblr.com/d0db33edebbfc6d56ec41600a1c9afeb/tumblr_n4lx886yCF1r4xjo2o1_500.gif" alt="" />
                        <h1>PIZZA CAT</h1>
                        <p>is in love with pizza</p>
                    </a>
                </div>
            </li>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
};