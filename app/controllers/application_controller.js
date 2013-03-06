before('protect from forgery', function () {
  protectFromForgery('631794ea1063fd4568e5fb5695c4b6d62d81ea94');
});

before(loadUserFromSeesionToReq
);

/**
 * load user
 * param _
 */
function loadUserFromSeesionToReq() {
    console.log("sss");
    console.log(JSON.stringify(req.session.user))
    if(req.session.user){
        req.user = req.session.user;
        console.log(JSON.stringify(req.session.user))
    }
    next();
}