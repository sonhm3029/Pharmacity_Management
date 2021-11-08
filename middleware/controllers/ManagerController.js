class ManagerController {

    show(req, res) {
        res.render('dashboard', {layout:'main'});
    }
}

module.exports = new ManagerController;
