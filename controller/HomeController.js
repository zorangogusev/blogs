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
    login = (req, res, next) => { 
        res.render('login') 
    }

    /**
      * @desc    Register page
      * @route   GET /register
      * @access  Public
     */
    register = (req, res, next) => {
        res.render('register') 
    }
}

const homecontroller = new HomeController
export default homecontroller
