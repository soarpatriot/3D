/**
 * post function js
 *
 */
require(["underscore","require","jquery","jquery.ui.widget","jquery.iframe-transport","jquery.fileupload"],function(_,require,$) {

    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},

    });
    $('#fileupload').fileupload('option', {

        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png)$/,
                maxFileSize: 20000000 // 20MB
            },
            {
                action: 'resize',
                maxWidth: 1440,
                maxHeight: 900
            },
            {
                action: 'save'
            }
        ]
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

    $('#fileupload').fileupload({
        dataType: 'json',

        add: function (e, data) {

            data.submit();
        },
        change: function (e, data) {
            $.each(data.files, function (index, file) {
                //alert('Selected file: ' + file.name);
            });
        },
        drop: function (e, data) {
            $.each(data.files, function (index, file) {
                alert('Dropped file: ' + file.name);
            });
        },

        done: function (e, data) {

            $.each(data.files, function (index, file) {
                $('<p/>').text(file.name).appendTo($("#upload-result"));
            });
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#percent').text(progress+'%')
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });


});

define("post", function(){});

/**
add: function (e, data) {

    var files = data.files;
    console.log("files: "+files);
},
change: function (e, data) {
    $.each(data.files, function (index, file) {
        alert('Selected file: ' + file.name);
    });
},**/