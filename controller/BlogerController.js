import Blog from '../models/Blog.js'

class BlogerController {
    
    /**
      * @desc    Dashboard page
      * @route   GET /bloger/dashboard
      * @access  Private
     */
    dashboard = async (req, res, next) => {

        // Pagination - default is page = 1, default limit is 1
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 1
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const total = await Blog.countDocuments()

        const blogs = await Blog.find({ user: req.user.id }).skip(startIndex).limit(limit)

        // Pagination result
        const pagination = {}

        if (endIndex < total) {
            pagination.next = {
                page: page + 1, 
                limit: limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page -1,
                limit: limit
            }
        }

        // console.log('pagination is: ', pagination)
        // console.log(typeof pagination.prev.page)

        res.render('bloger/dashboard', { user: req.user, blogs, pagination })
    }
}

const blogercontroller = new BlogerController
export default blogercontroller
