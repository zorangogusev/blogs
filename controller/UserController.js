import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import passport from 'passport'

class UserController {
    
    /**
      * @desc    Login user
      * @route   POST /login
      * @access  Public
     */
    loginUser = (req, res, next) => { 
        passport.authenticate('local',  {
            successRedirect: '/bloger/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }
    
    /**
      * @desc    Register/Create user
      * @route   POST /register
      * @access  Public
     */
    registerUser = async (req, res, next) => {
        const { name, email, password, password2 } = req.body
                              
        await this.validateUserInputFields(req, res, next)

        if (req.errors) {                     
            let errors = req.errors
            res.render('register', { errors, name, email, password, password2 })
        } else { 
            const newUser = new User({ name, email, password })
            newUser.save()
            
            req.flash('success_message', 'You are regitered and can log in.')
            res.redirect('/login')
        }
    }

    logout = (req, res, next) => {
        req.logout()
        req.flash('success_message', 'Successfully logged out.')
        res.redirect('/login')
    }

    validateUserInputFields = async (req, res, next) => {
        const { name, email, password, password2 } = req.body
        let errors = []

        /** Check required fields */
        if (!name || !email || !password || !password2) {
            errors.push({ message: 'Please fill in all fields' })
        }

        /** Check password length */
        if (password.length < 6) {
            errors.push({ message: 'Password should be at least 6 characters' })
        }

        /** Check matching passwords */
        if (password !== password2) {
            errors.push({ message: 'Passwords do not match' })
        }

        let user = {}
        user = await User.findOne({ email: email })

        if (user) {
            errors.push({ message: 'Email is already register' })
        }

        req.errors = (errors.length > 0) ? errors : false

        next()
    }
}

const usercontroller = new UserController
export default usercontroller
