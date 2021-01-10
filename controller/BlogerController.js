import Blog from '../models/Blog.js'

class BlogerController {
    
    /**
      * @desc    Dashboard page
      * @route   GET /bloger/dashboard
      * @access  Private
     */
    dashboard = async (req, res, next) => {
        const blogs = await Blog.find({ user: req.user.id })

        res.render('bloger/dashboard', { user: req.user, blogs: blogs })
    }
}

const blogercontroller = new BlogerController
export default blogercontroller
