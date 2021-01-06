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
    registerUser = (req, res, next) => {
        console.log('createUser')
        console.log(req.body)

        const { name, email, password, password2 } = req.body

        res.render('register', { name, email, password, password2}) 
    }
}

const usercontroller = new UserController
export default usercontroller
