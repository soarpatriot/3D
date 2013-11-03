load('application');


action('index', function () {
    this.title = '三维云';
    var start = 0;
    var fetchSize = 3
    Post.find()
        .skip(0)
        .limit(3)
        .nin('url',[null,''])
        .sort('-publishDate')
        .exec(function(err,posts){
            if(err){
                console.log('load post for home page error');
            }else{
                var post = posts[0];
                var list = [posts[1],posts[2]];
                //console.log('post url:'+this.post.url); //{post:post}
                render({post:post,
                        posts:list
                });
            }
        });

    /**
    Post.findOne({})
        .nin('url',[null,''])
        .sort('-publishDate')
        .exec(function(err,post){
            if(err){
                console.log('load post for home page error');
            }else{
                Post.findOne({})
                //console.log('post url:'+this.post.url); //{post:post}
                render({post:post});
            }
        })**/

});

