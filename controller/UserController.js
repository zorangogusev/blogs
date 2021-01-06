import User from '../models/User.js'
import bcrypt from 'bcryptjs'

class UserController {
    
    /**
      * @desc    Login user
      * @route   POST /login
      * @access  Public
     */
    loginUser = (req, res, next) => { 
        console.log('loginUser here')
        res.render('login') 
    }
    
    /**
      * @desc    Register/Create user
      * @route   POST /register
      * @access  Public
     */
    registerUser = async (req, res, next) => {
        console.log('createUser')
        console.log(req.body)

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

        if (errors.length > 0) {
            res.render('register', { errors, name, email, password, password2}) 
            return
        }

        const newUser = new User({ name, email, password })
        newUser.save()
        
        req.flash('success_message', 'You are regitered and can log in.')
        res.redirect('/login')
    }
}

const usercontroller = new UserController
export default usercontroller
