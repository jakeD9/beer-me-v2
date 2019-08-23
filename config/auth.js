module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.send('Please log in to view this resource');
        }
    }
}