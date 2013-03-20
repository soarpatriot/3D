exports.routes = function (map) {

    //map.get('root', 'home#index');
    map.get('/', 'home#index',{as:"root"});

    map.get('/posts/upload', 'posts#upload');
    map.resources('posts');
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