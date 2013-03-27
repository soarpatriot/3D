module.exports = function (compound) {

    var express = require('express');
    var app = compound.app;
    require('./mongoose').init(compound);

    var upload = require('jquery-file-upload-middleware');


    upload.configure({
        uploadDir: app.root + '/public/upload',
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
        app.use('/upload',  function (req, res, next) {
            // imageVersions are taken from upload.configure()
            upload.fileHandler({})(req, res, next);


        });

        /**
        app.use('/upload', function(req, res) {
            //console.log("files:"+JSON.stringify(req.files.files[].name));

            console.log(req.body);
            console.log(req.files);
            // 获得文件的临时路径
            //var tmp_path = req.files.files.path;

            // 指定文件上传后的目录 - 示例为"images"目录。
            var target_path = './public/images/' + req.files.thumbnail.name;
            // 移动文件
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;
                // 删除临时文件夹文件,
                fs.unlink(tmp_path, function() {
                    if (err) throw err;
                    res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
                });
            })
        });**/
        app.use(express.bodyParser({
            uploadDir: app.root + '/tmp'
        }));
        app.use(express.cookieParser('secret'));
        app.use(express.session({secret: 'secret'}));
        app.use(express.methodOverride());
        app.use(app.router);
    });



};
