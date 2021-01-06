class HomeController {
    /**
      * @desc    Home page
      * @route   GET /
      * @access  Public
     */
    home = (req, res, next) => {
        res.render('home')
    }

    /**
      * @desc    About page
      * @route   GET /about
      * @access  Public
     */
    about = (req, res, next) => { 
        res.render('about') 
    }

    /**
      * @desc    Login page
      * @route   GET /login
      * @access  Public
     */
    loginPage = (req, res, next) => { 
        res.render('login') 
    }

        /**
      * @desc    Login user
      * @route   POST /login
      * @access  Public
     */
    loginUser = (req, res, next) => { 
        res.render('login') 
    }

    /**
      * @desc    Register page
      * @route   GET /register
      * @access  Public
     */
    registerPage = (req, res, next) => {
        res.render('register') 
    }
    
    /**
      * @desc    Create user
      * @route   POST /register
      * @access  Public
     */
    createUser = (req, res, next) => {
        console.log('here')
        console.log(req.body)

        res.render('register') 
    }
}

const homecontroller = new HomeController
export default homecontroller
