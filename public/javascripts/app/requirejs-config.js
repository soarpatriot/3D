require.config({
    baseUrl: "/javascripts",
    waitSeconds:100,
    paths: {
        //application own js module
        "post":"app/post",

        //js framework
        "jquery.ui.widget": "fileupload/vendor/jquery.ui.widget",
        "jquery.iframe-transport":"fileupload/jquery.iframe-transport",
        "jquery.fileupload":"fileupload/jquery.fileupload"

    }
});