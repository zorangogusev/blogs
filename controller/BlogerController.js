class BlogerController {
    
    /**
      * @desc    Dashboard page
      * @route   GET /bloger/dashboard
      * @access  Private
     */
    dashboard = (req, res, next) => {
        res.render('bloger/dashboard')
    }
}

const blogercontroller = new BlogerController
export default blogercontroller
