
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Articles = new Mongo.Collection('articles');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('articles', function tasksPublication() {
        return Articles.find();
    });
}

Meteor.methods({
    'articles.insert'(article) {
        check(article.data.title, String);
        check(article.data.subtitle, String);
        if(article.data.data[0]) {
            if(article.data.data[0].type === 'image') {
                check(article.data.data[0].content.alt, String);
            }
            else {
                check(article.data.data[0].content, String);
            }
        }

        let owner = new Mongo.ObjectID();
        let username = "Guest";
        if(Meteor.user()) {
            owner = Meteor.userId();
            username = Meteor.user().username;
        }

        Articles.insert({
            _id: new Mongo.ObjectID(article.articleId),
            createdAt: new Date(),
            lastModified: new Date(),
            owner: owner,
            username: username,
            ...(article.data)
        });
    },
    'articles.remove'(articleId) {
        check(articleId, String);
        if(Meteor.user().username !== 'admin') {
            if(Articles.findOne({_id: new Mongo.ObjectID(articleId)}).owner !== Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
        }
        Articles.remove({_id: new Mongo.ObjectID(articleId)});
    },
    'articles.update'(data) {
        check(data.articleId, String);
        if(Meteor.user().username !== 'admin') {
            if (Articles.findOne({_id: new Mongo.ObjectID(data.articleId)}).owner !== Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
        }
        content = {
            lastModified: new Date(),
            ...data.data
        };
        Articles.update({_id: new Mongo.ObjectID(data.articleId)}, {
            $set: content
        });
    },
});