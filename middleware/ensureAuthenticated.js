const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error_message', 'Please log in to view this resourece');
    res.redirect('/login');
}

export default ensureAuthenticated
