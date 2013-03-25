/**
 * post function js
 *
 */
require(["underscore","backbone","require","jquery","jquery.ui.widget","jquery.iframe-transport","jquery.fileupload"],function(_,Backbone,require,$) {

    _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
    };

    var File = Backbone.Model.extend({
        idAttribute: "_id"

    });

    var FileList = Backbone.Collection.extend({
        Model:File,
        url: '/files'
    });


    var FileView= Backbone.View.extend({

        tagName: "tr",

        template: _.template($('#upload-content-template').html()),

        events: {

        },

        initialize: function() {
            this.$el.html(this.template(this.model.toJSON()));


        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    var UploadView = Backbone.View.extend({

        el: $("#upload-result-div"),



        events: {

        },

        initialize: function() {
            this.table = this.$('#upload-table')
        },
        addOne: function(file) {
            var view = new FileView({model: file});
            this.table.append(view.render().el);
        },

        render: function() {

        }

    });

    var uploadView = new UploadView();

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
            $.each(data.files, function (index, file) {
                alert('files: ' + file.name);
                console.log(JSON.stringify(file));
                var f = new File();
                f.set('name',file.name);
                f.set('size',file.size);

                uploadView.addOne(f);

            });
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