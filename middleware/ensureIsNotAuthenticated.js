const ensureIsNotAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/bloger/dashboard')
}

export default ensureIsNotAuthenticated