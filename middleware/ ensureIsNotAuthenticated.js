const ensureIsNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) res.redirect('/bloger/dashboard')
}

export default ensureIsNotAuthenticated