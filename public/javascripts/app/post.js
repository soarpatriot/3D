/**
 * post function js
 *
 */
require(["underscore","require","jquery","jquery.ui.widget","jquery.iframe-transport","jquery.fileupload"],function(_,require,$) {

    $('#fileupload').fileupload({
        dataType: 'json',
        drop: function (e, data) {
            $.each(data.files, function (index, file) {
                alert('Dropped file: ' + file.name);
            });
        },

        done: function (e, data) {
            console.log(data);
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