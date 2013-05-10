require.config({

    baseUrl: "/javascripts",
    waitSeconds:100,

    //some special settings. like exports and dep
    shim: {
        "underscore": {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        }
    },

    paths: {
        //application own js module
        "post":"app/post",

        //js framework
        "underscore": "underscore-min",
        "backbone": "backbone-1.0.0.min",

        //three
        "three": "three.js",


        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.fileupload":"fileupload/jquery.fileupload"

    }

});