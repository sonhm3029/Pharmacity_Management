module.exports.requireAuth = function(req, res, next) {
    if(!req.cookies.userId) {
        res.redirect('/');
        return;
    }
}