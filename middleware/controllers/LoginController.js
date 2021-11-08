class LoginController {

    index(req, res) {
        res.render('login', {layout: false});
    }
}

module.exports = new LoginController;
