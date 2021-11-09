const User = require('./model/Authentication');



class AuthProtect {


    requireManagerRole(req, res, next) {
        console.log(req.cookies.userId);
        if(!req.cookies.userId) {
            res.redirect('/');
            return;
        }

        User.findOne({_id: req.cookies.userId})
            .then((auth)=> {
                if(!auth || auth.role != "Manager") {
                    res.redirect('/');
                    return;
                }

                next();
            })
    }

    requireStaffRole(req, res, next) {
        if(!req.cookies.userId) {
            res.redirect('/');
            return;
        }

        User.findOne({_id: req.cookies.userId})
            .then((auth)=> {
                if(!auth || auth.role != "Staff") {
                    res.redirect('/');
                    return;
                }

                next();
            })
    }

};

module.exports = new AuthProtect;