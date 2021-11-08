const {Schema} = require('mongoose');
const User = require('../model/Authentication');

const bcrypt = require('bcryptjs');



class LoginController {

    show(req, res) {
        res.render('login', {layout: false});
    }

    authenticate(req, res, next) {
        
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

                if(bcrypt.compareSync(password, auth.password) == false) {
                    res.render('login',{
                        errors: [
                            'Mật khẩu không hợp lệ'
                        ],
                        layout: false});
                    return;
                }
  
           

                if(auth.role === 'Staff') {
                    // Set cookies

                    console.log(auth);
                    res.redirect('/staff');
                }
                if(auth.role === 'Manager') {

                    // Set cookies
                    res.cookie('userId', auth._id);
                    res.redirect('/manager');
                }
            })
            .catch(next);
        
    }
}

module.exports = new LoginController;
