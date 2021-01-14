import Blog from '../models/Blog.js'

class BlogerController {
    
    /**
      * @desc    Dashboard page
      * @route   GET /bloger/dashboard
      * @access  Private
     */
    dashboard = async (req, res, next) => {
        res.render('bloger/dashboard', { blogs: res.data.blogs, pagination: res.data.pagination })
    }
}

const blogercontroller = new BlogerController
export default blogercontroller
