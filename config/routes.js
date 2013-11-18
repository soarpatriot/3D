exports.routes = function (map) {

    map.get('/', 'home#index',{as:"root"});
    map.get('/about','about#index');

    map.get('/posts/me','posts#me'); 
    map.resources('posts');
    map.resource('posts', function (post) {

        //vincent521
        post.post('snapshot','posts#snapshot');               // /users/:user_id/avatar
        post.post('published','posts#published');
        post.post('embeded/:id','posts#embeded');
        //user.get('top', 'users#top', {collection: true}); // /users/top
    });

    map.resources('users');

    map.get('signup', 'access#signup');
    map.post('reg', 'access#reg');
    map.get('enter','access#enter');
    map.post('login','access#login');
    map.get('logout','access#logout');
    // map.get('bunny', 'bunny#show', {as: 'rabbit'});
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};