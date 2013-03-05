load('application');

before(logoLayout, {
    only: ['enter', 'login']
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
    this.title = '用户登录';

});
/**
 *  enter into user reg
 */
action(function signup() {
    this.title = '用户登录';
    this.user = new User;
    render();
});
/**
 * load user
 * param _id
 */
function logoLayout() {
    layout('logo');
    next();
}