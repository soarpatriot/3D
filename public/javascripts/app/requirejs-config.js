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
        "jquery": "jquery-1.8.0.min",
        "underscore": "underscore-min",
        "backbone": "backbone-1.0.0.min",

        //three
        "three": "three.min.js",
        "three-fullscreen":"THREEx.FullScreen",
        "three-screnshot":"THREEx.screenshot",
        //three laoders



        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.fileupload":"fileupload/jquery.fileupload"

    }

});