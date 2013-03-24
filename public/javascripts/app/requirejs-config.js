require.config({

    baseUrl: "/javascripts",
    waitSeconds:100,

    //some special settings. like exports and dep
    shim: {
        "underscore": {
            exports: '_'
        }
    },

    paths: {
        //application own js module
        "post":"app/post",

        //js framework
        "underscore":"underscore-min",
        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.fileupload":"fileupload/jquery.fileupload"

    }

});