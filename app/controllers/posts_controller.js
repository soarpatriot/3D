load('application');

before(loadPost,{
    only: ['show','embeded', 'edit', 'update', 'destroy']
    });
before(userLogined,{only:['new','create']});
before(applicationLayout,{all:[]});

action('new', function () {
    this.title = 'New post';
    this.post = new Post;

    render();
});

action(function create() {
    /**
    author    : ObjectId
        , title     : String
        , content    : String
        , published : { type: Boolean, default: false }
    , publishDate: { type: Date, default: Date.now },

    size: {type: Number},
    path:'String',
        type:  'String',
        name: 'String'
     size: {type: Number},
     path:'String',
     type:  'String',
     name: 'String',
     delete_type:'String',
     url: 'String',
     delete_url:'String',
     originalName: 'String'
    **/
    console.log("fileInfo: "+req.body.Post.name);


    var post = new Post({
        title: req.body.Post.originalName,
        content: req.body.Post.originalName,
        name: req.body.Post.name,
        type: req.body.Post.type,
        delete_type:req.body.Post.delete_type,
        url: req.body.Post.url,
        delete_url: req.body.Post.delete_url,
        size: req.body.Post.size,
        published:req.body.Post.published
    });
    this.post = post;

    this.post.save(function (err, post) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: post && post.errors || err});
                } else {
                    send({code: 200, data: post.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Post can not be created');
                    console.log("fail");
                    render('new', {
                        post: post,
                        title: 'New post'
                    });
                } else {
                    console.log("fsuccess");
                    flash('info', 'Post created');
                    redirect(path_to.post(post));
                }
            });
        });
    });
});


action(function upload() {
    req.form.on("progress",function(bytesReceived,bytesExpected){
        console.log("bytesReceived:"+bytesReceived);
        console.log("bytesExpected:"+bytesExpected);
    });
    req.form.on("end",function(){
        console.log(req.files);
        //res.send("done");
    });

    res.redirect("/");
});


action(function index() {
    this.title = 'Posts index';

    Post.find({},function (err, posts) {
        switch (params.format) {
            case "json":
                send({code: 200, data: posts});
                break;
            default:
                render({
                    posts: posts
                });
        }
    });
});

action(function show() {
    this.title = 'Post show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.post});
            break;
        default:
            render({
                layout:"show"
            });
    }
});


action(function embeded() {
    this.title = 'Post show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.post});
            break;
        default:
            render('embeded',{
                layout:"empty"
            });
    }
});

action(function edit() {
    this.title = 'Post edit';
    switch(params.format) {
        case "json":
            send(this.post);
            break;
        default:
            render();
    }
});

action(function snapshot() {

    Post.findOneAndUpdate({'_id': req.body.id}, { $set: {  thumbnail: req.body.snapshotUrl, radius: req.body.radius, cameraX : req.body.cameraX, cameraY : req.body.cameraY, cameraZ : req.body.cameraZ, background: req.body.background  }},  function(err, post){
        if (err || post) {
            return send({code: 404, error: 'Not found'});
        } else {
            this.post = post;
            next();

        }
    }.bind(this));
});

action(function update() {

    this.title = '编辑';
    this.post.update(req.body.Post, function (err,numberAffected, post) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: post && post.errors || err});
                } else {
                    send({code: 200, data: post});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Post updated');
                    redirect(path_to.post(post));
                } else {
                    flash('error', 'Post can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.post.remove(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy post');
                } else {
                    flash('info', 'Post successfully removed');
                }
                send("'" + path_to.posts + "'");
            });
        });
    });
});


function loadPost() {

    console.log("load Post :");
    Post.findOne({'_id': params.id}, function(err, post){
        if (err || !post) {
            if (!err && !post && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.posts);
        } else {
            this.post = post;
            next();
        }
    }.bind(this));
}

function applicationLayout() {
    console.log('filter applicationLayout');
    layout('application');
    next();
}


function userLogined(){

    if(!req.session.user){
        flash('error', '请登陆后再发表模型，谢谢！');
        redirect(path_to.posts);
    }else{
        next();
    }

}
