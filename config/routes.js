exports.routes = function (map) {

    map.get('/', 'home#index');
    map.resources('posts');
    map.resources('users');


    map.get('signup', 'access#signup');
    map.get('login','access#enter');
    map.post('login','access#login');
    // map.get('bunny', 'bunny#show', {as: 'rabbit'});
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};