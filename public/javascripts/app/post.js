/**
 * post function js
 *
 */
require(["require","jquery","jquery.iframe-transport","jquery.fileupload"],function(require,$) {




    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url:'/upload'
    });
    $('#fileupload').fileupload('option', {

        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|js)$/i,
        process: [
            {
                action: 'load',
                fileTypes: /^image\/(gif|jpeg|png|js)$/,
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
            $.each(data.files, function (index, file) {
                $('<p/>').text(file.name).appendTo($("#upload-result"));
            });
            /**
             *  {"name":"flamingo (13).js","originalName":"flamingo.js",
             *  "size":79998,"type":"application/javascript","delete_type":"DELETE",
             *  "url":"http://localhost:3000/upload/flamingo%20(13).js",
             *  "delete_url":"http://localhost:3000/upload/flamingo%20(13).js"}
             * @type {*}
             */
            var jqXHR = data.submit()
                .success(function (result, textStatus, jqXHR) {
                    console.log("result: "+JSON.stringify(result[0]));

                    $("#file-name").val(result[0].name);
                    $("#file-original").val(result[0].originalName);
                    $("#file-size").val(result[0].size);
                    $("#file-delete_type").val(result[0].delete_type);
                    $("#file-url").val(result[0].url);
                    $("#file-delete_url").val(result[0].delete_url);


                    /**
                    var post1 = {
                        name:result[0].name,
                        originalName:result[0].originalName,
                        size:result[0].size,
                        delete_type:result[0].delete_type,
                        url:result[0].url,
                        delete_url:result[0].delete_url
                    };
                    var authenticity_token = $("input[name='authenticity_token']").val();
                    var params = {
                        authenticity_token:authenticity_token,
                        Post:post1
                    }
                    **/
//                    alert(authenticity_token);
                    /**
                    $.ajax({
                        type: 'post',
                        url: '/posts',
                        data: params,
                        success: function(){

                        },
                        dataType: 'json'
                    });
                    **/
                    $("#post-form").submit();


                })
                .error(function (jqXHR, textStatus, errorThrown) {

                })
                .complete(function (result, textStatus, jqXHR) {
                    console.log("result complete: "+JSON.stringify(result));
                });




            //data.submit();
        },
        change: function (e, data) {
            $.each(data.files, function (index, file) {

            });
        },
        drop: function (e, data) {
            $.each(data.files, function (index, file) {

            });
        },

        done: function (e, data) {

            var fileInfo;
            $.each(data.files, function (index, file) {



                /**
                "name": "flamingo (39).js",
                    "originalName": "flamingo.js",
                    "size": 79998,
                    "type": "application/javascript",
                    "delete_type": "DELETE",
                    "url": "http://localhost:3000/upload/flamingo%20(39).js",
                    "delete_url": "http://localhost:3000/upload/flamingo%20(39).js"**/

                var fileInfo = {
                    name: file.name,
                    originalName:file.originalName,
                    size:file.size,
                    type:file.type,
                    delete_type:file.delete_type,
                    url:file.url,
                    delete_url:file.delete_url
                };


                console.log("fileInfo: "+JSON.stringify(fileInfo));


                /**
                $.ajax({
                    type: 'POST',
                    url: '/post',
                    data: fileInfo,
                    success: success,
                    dataType: dataType
                });**/
            });





        },

        /**
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#percent').text(progress+'%')
            $('#progress .bar').css(
                'width',
                progress + '%'
            );
        },**/
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

