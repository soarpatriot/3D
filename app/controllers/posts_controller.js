load('application');

before(loadPost,{
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New post';
    this.post = new Post;
    render();
});

action(function create() {

    var post = new Post({
        title: req.body.Post.title,
        content: req.body.Post.content,
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
                    render('new', {
                        post: post,
                        title: 'New post'
                    });
                } else {
                    flash('info', 'Post created');
                    redirect(path_to.posts);
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
    console.log(JSON.stringify(this.post));
    switch(params.format) {
        case "json":
            send({code: 200, data: this.post});
            break;
        default:
            render();
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
/*
action(function upload(){
    this.title = '上传';
    render('_upload');
})**/

function loadPost() {

    console.log("load Post:");
    Post.findOne({'_id': params.id}, function(err, post){
        if (err || !post) {
            if (!err && !post && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.posts);
        } else {
            this.post = post;

            console.log("load:"+JSON.stringify(this.post));
            next();

        }
    }.bind(this));
}

function applicationLayout() {
    layout('application');
    next();
}