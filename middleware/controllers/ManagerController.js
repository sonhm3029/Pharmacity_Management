const User = require('../model/Authentication');

class ManagerController {

    show(req, res) {
        
        User.findOne({_id: req.cookies.userId})
            .then((auth) => {
                if(auth.role != 'Manager') {
                    res.redirect('/staff')
                    return;
                }
                res.render('dashboard', {layout:'main'});
            })
        
    }


    dashboard(req, res) {
        res.render('dashboard', {layout:'main'});
    }
}

module.exports = new ManagerController;
