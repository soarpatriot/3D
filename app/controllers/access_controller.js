load('application');

before(logoLayout, {
    only: ['enter', 'login','signup']
});
/**
 * enter into user login page
 */
action('enter',function enter() {
    this.title = '用户登录';
    this.user = new User;
    render('login');
});
/**
 *  do user login action
 */
action(function login() {
    var user = req.body.User;
    User.findOne({'name': user.name,'password':user.password}, function(err, user){

        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            flash('info', 'login failure');
            flash('user', user);
            redirect(path_to.enter);
        } else {
            flash('info', 'login successfully');
            req.session.user = user;
            redirect(path_to.root);
        }
    });

});
/**
 *  enter into user reg
 */
action(function signup() {
    this.title = '用户注册';
    this.user = new User;
    render();
});

/**
 *  enter into user reg
 */
action(function reg() {

    var newUser = new User({
        name: req.body.User.name,
        email: req.body.User.email,
        password: req.body.User.password
    });

    newUser.save(function (err, user) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: user && user.errors || err});
                } else {
                    send({code: 200, data: user.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'user can not be created');
                    render('signup', {
                        user: user,
                        title: '用户注册'
                    });
                } else {
                    flash('info', 'user created');
                    req.session.user = user;
                    redirect(path_to.root);
                }
            });
        });
    });
});
/**
 * load user
 * param _id
 */
function logoLayout() {
    layout('logo');
    next();
}