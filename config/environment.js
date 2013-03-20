module.exports = function (compound) {

    var express = require('express');
    var app = compound.app;
    require('./mongoose').init(compound);
    var upload = require('jquery-file-upload-middleware');
    upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/upload',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });

    app.configure(function(){
        app.use(compound.assetsCompiler.init());
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        // make sure you run `npm install browserify uglify-js`

        // app.enable('clientside');
        app.use('/upload', upload.fileHandler());

        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        app.use(express.session({secret: 'secret'}));
        app.use(express.methodOverride());
        app.use(app.router);
    });

};
