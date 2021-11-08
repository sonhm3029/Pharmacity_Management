const {Schema} = require('mongoose');
const User = require('../model/Authentication');

const bcrypt = require('bcryptjs');



class LoginController {

    index(req, res) {
        res.render('login', {layout: false});
    }

    show(req, res, next) {
        
        const {username, password} = req.body;

        User.findOne({username: username})
            .then((auth) => {
                if(!auth) {
                    res.render('login',{
                        errors: [
                            'Tài khoản không hợp lệ'
                        ],
                        layout: false});
                    return;
                }

                if(password !== auth.password) {
                    res.render('login',{
                        errors: [
                            'Mật khẩu không hợp lệ'
                        ],
                        layout: false});
                    return;
                }

                res.redirect('/');
            })
        
    }
}

module.exports = new LoginController;
