/**
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


 var EventEmitter = require('events').EventEmitter;
 var UploadHandler = function (req, res, callback) {
    //EventEmitter.call(this);
    this.req = req;
    this.res = res;
    this.callback = callback;
};
 function progress(){
    return 555;
}

 EventEmitter.emit('progress');


 **/

action('create',function(){


    console.log("id******************************:");
    res.redirect("/posts");

    /**
    req.form.on("progress",function(bytesReceived,bytesExpected){
        //res.send(bytesReceived);
        //var progress = ((bytesReceived / bytesExpected)*100)+"％";

        //res.send("bytesReceived");
    });
    req.form.on("end",function(){

        var post = new Post({
            title:req.files.files.name,
            size: req.files.files.size,
            path: req.files.files.path,
            type:  req.files.files.type,
            name: req.files.files.name
        });

        this.post = post;
        this.post.save(function (err, post) {
            var _id = post._id;
            console.log("id:"+_id);
            res.redirect("/posts/"+_id);
        });
    });**/

});
