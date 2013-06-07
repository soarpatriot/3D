load('application');


action('index', function () {
    this.title = '3D Studio';
    Post.findOne({})
        .nin('url',[null,''])
        .sort('-publishDate')
        .exec(function(err,post){
            if(err){
                console.log('load post for home page error');
            }else{

                //console.log('post url:'+this.post.url); //{post:post}
                render({post:post});
            }
        })

});

