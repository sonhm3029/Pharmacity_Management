class DashboardController {
    index(req, res) {
        res.render('dashboard', {layout:'staff_layout'});
    }
}

module.exports = new DashboardController;
