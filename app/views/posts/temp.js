<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="/javascripts/fileupload/vendor/jquery.ui.widget.js"></script>
    <script src="/javascripts/fileupload/jquery.iframe-transport.js"></script>
    <script src="/javascripts/fileupload/jquery.fileupload.js"></script>
    <script>
    $(function () {

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
    </script>






shim: {
    'jquery-ui-widget': ['jquery'],
    'jquery-tras': ['jquery-ui-widget'],
    'jquery-fileupload': ['jquery-tras']
    }