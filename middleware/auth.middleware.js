const User = require('./model/Authentication');

module.exports.requireAuth = function(req, res, next) {
    if(!req.cookies.userId) {
        res.redirect('/');
        return;
    }

    User.findOne({_id: req.cookies.userId})
        .then((auth)=> {
            if(!auth) {
                res.redirect('/');
                return;
            }

            next();
        })


}