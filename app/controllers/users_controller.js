load('application');

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy']
});
/**
 * display all users list
 */
action(function index() {
    this.title = 'Users index';
    User.find({},function (err, users) {
        switch (params.format) {
            case "json":
                send({code: 200, data: users});
                break;
            default:
                render({
                    users: users
                });
        }
    });
});

/**
 * redirect to create new user page
 */
action('new', function () {
    this.title = '创建新用户';
    this.user = new User;
    render();
});

/**
 * save created user to persisent
 */
action(function create() {

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
                    render('new', {
                        user: user,
                        title: 'New user'
                    });
                } else {
                    flash('info', 'user created');
                    redirect(path_to.users);
                }
            });
        });
    });
});

/**
 * display single user
 */
action(function show() {
    this.title = 'User show';
    console.log(this.user);
    switch(params.format) {
        case "json":
            send({code: 200, data: this.user});
            break;
        default:
            render();
    }
});


/**
 * nav to the edit user page
 */
action(function edit() {
    this.title = 'user edit';
    switch(params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});

/**
 * update user information
 */
action(function update() {
    var user = this.user;
    this.title = 'Edit post details';

    this.user.update(req.body.User, function (err,numberAffected, user) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: user && user.errors || err});
                } else {
                    send({code: 200, data: post});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'user updated');
                    redirect(path_to.user(user));
                } else {
                    flash('error', 'Post can not be updated');
                    render('edit');
                }
            });
        });
    });
});

/**
 * delete user information
 */
action(function destroy() {
    this.user.remove(function (error) {
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
                    flash('error', 'Can not destroy user');
                } else {
                    flash('info', 'user successfully removed');
                }
                send("'" + path_to.users + "'");
            });
        });
    });
});


/**
 * load user
 * param _id
 */
function loadUser() {
    User.findOne({'_id': params.id}, function(err, user){

        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.users);
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}
