
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Articles = new Mongo.Collection('articles');

Meteor.methods({
    'articles.insert'(article) {
        check(article.data.title, String);
        check(article.data.subtitle, String);
        if(article.data.data[0].type === 'image') {
            check(article.data.data[0].content.alt, String);
        }
        else {
            check(article.data.data[0].content, String);
        }

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }


        Articles.insert({
            _id: new Mongo.ObjectID(article.articleId),
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            ...(article.data)
        });
    },
    'articles.remove'(articleId) {
        check(articleId, String);
        Articles.remove({_id: new Mongo.ObjectID(articleId)});
    },
    'articles.update'(data) {
        check(data.articleId, String);
        Articles.update({_id: new Mongo.ObjectID(data.articleId)}, {
            $set: data.data
        });
    },
});