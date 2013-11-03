module.exports = function (compound, Post) {
  // define Post here
    Post.prototype.all = function () {
        console.log('meow');
        return null;
    };

    
};