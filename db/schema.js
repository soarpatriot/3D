/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

/**
var Post = describe('Post', function () {
    property('title', String);
    property('content', String);
    property('published', Boolean);
    set('restPath', pathTo.posts);
});
**/



/**
customSchema(function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/xiaodonggua');

    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var BlogPost = new Schema({
        author    : ObjectId
        , title     : String
        , content    : String
        , published : Boolean
        , body      : String
        , date      : Date
    });

    var Post = mongoose.model('BlogPost', BlogPost);
    Post.modelName = 'BlogPost'; // this is for some features inside compound (helpers, etc)

    module.exports['BlogPost'] = Post;
});**/
module.exports = function (mongoose, compound) {

    var schemaOptions = {
        toJSON: {
            virtuals: true
        }
    };

    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    //Post's comments
    var FileSchema  = new Schema({
        size: {type: Number},
        path:'String',
        type:  'String',
        name: 'String'

    },schemaOptions);
    var File = mongoose.model('FileSchema', FileSchema);
    File.modelName = 'File';
    compound.models.File = File;

    /**
     *  {"name":"flamingo (13).js","originalName":"flamingo.js",
        *  "size":79998,"type":"application/javascript","delete_type":"DELETE",
        *  "url":"http://localhost:3000/upload/flamingo%20(13).js",
        *  "delete_url":"http://localhost:3000/upload/flamingo%20(13).js"}
     * @type {mongoose.Schema}
     */
    var PostSchema = new Schema({
        author    : ObjectId
        , title     : String
        , content    : String
        , published : { type: Boolean, default: false }
        , publishDate: { type: Date, default: Date.now },

        size: {type: Number},
        path:'String',
        type:  'String',
        name: 'String',
        delete_type:'String',
        url: 'String',
        delete_url:'String',
        originalName: 'String'
    },schemaOptions);

    var Post = mongoose.model('PostSchema', PostSchema);
    Post.modelName = 'Post'; // this is for some features inside compound (helpers, etc)

    //module.exports['BlogPost'] = Post;
    compound.models.Post = Post;


    var UserSchema = mongoose.Schema({
        name: 'String',
        password: 'String',
        faceId: 'String',
        gender: { type: String, default: '未知' },
        email:'String',
        regTime:{ type: Date, default: Date.now }
    },schemaOptions);

    var User = mongoose.model('UserSchema', UserSchema);
    User.modelName = 'User'; // this is for some features inside compound (helpers, etc)

    //module.exports['User'] = Post;
    compound.models.User = User;

};


