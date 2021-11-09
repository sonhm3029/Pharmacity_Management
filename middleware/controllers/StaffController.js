
const User = require('../model/Authentication');

class StaffController {

    show(req, res) {

        User.findOne({_id: req.cookies.userId})
            .then((auth)=> {
                if(auth.role != 'Staff') {
                    res.redirect('/manager')
                    return;
                }
                res.render('product_manage', {layout:'staff_layout'});
            })
        
    }
}

module.exports = new StaffController;
