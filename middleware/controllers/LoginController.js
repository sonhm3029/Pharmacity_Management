const {Schema} = require('mongoose');
const User = require('../model/Authentication');

const bcrypt = require('bcryptjs');



class LoginController {

    show(req, res, next) {
        // res.clearCookie('userId');
        var id = req.cookies.userId;
        if(id) {
            User.findOne({_id: id})
                .then((auth)=> {

                    if(auth.role === 'Staff') {
                        res.redirect('/staff');
                    }

                    if(auth.role === 'Manager') {
                        res.redirect('/manager');
                    }

                })
                .catch(next)
            return;
        }

        res.render('login', {layout: false});
    }

    authenticate(req, res, next) {
        
        const {username, password} = req.body;

        User.findOne({username: username})
            .then((auth) => {
                console.log(auth,'OK');
                if(!auth) {
                    res.render('login',{
                        errors: [
                            'Tài khoản không hợp lệ'
                        ],
                        layout: false});
                    return;
                }

                if(bcrypt.compareSync(password, auth.password) == false) {
                    res.render('login',{
                        errors: [
                            'Mật khẩu không hợp lệ'
                        ],
                        layout: false});
                    return;
                }
  
                // crypt auth id
                // var salt = bcrypt.genSaltSync(10);
                var crypt_id = auth._id;
                // crypt_id = bcrypt.hashSync(crypt_id, salt);

                if(auth.role === 'Staff') {
                    // Set cookies
                    res.cookie('userId', crypt_id, {
                        expires: new Date(Date.now() + 5*3600000)
                    });
                    res.redirect('/staff');
                }
                if(auth.role === 'Manager') {

                    // Set cookies
                    res.cookie('userId', crypt_id, {
                        expires: new Date(Date.now() + 5*3600000)
                    });
                    res.redirect('/manager');
                }
            })
            .catch(next);
        
    }

    logOut(req, res, next) {
        res.clearCookie('userId');
        res.redirect('/');
    }
}

module.exports = new LoginController;
