exports.routes = function (map) {

    map.get('/', 'home#index');
    map.resources('posts');
    map.resources('users');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};