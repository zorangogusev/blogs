import Blog from '../models/Blog.js'

class BlogerController {
    
    /**
      * @desc    Dashboard page
      * @route   GET /bloger/dashboard
      * @access  Private
     */
    dashboard = async (req, res, next) => {
        let pagination = {}

        /** Pagination - default page = 1, default limit is 2 */
        pagination.currentPage = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 2
        
        const totalItems = await Blog.countDocuments({ user: req.user.id })
        pagination.totalPages = Math.ceil(totalItems / limit)

        /** Get blogs from database */
        const startIndex = (pagination.currentPage - 1) * limit
        const endIndex = pagination.currentPage * limit
        const blogs = await Blog.find({ user: req.user.id }).skip(startIndex).limit(limit)

        if (endIndex < totalItems) {
            pagination.next = {
                nextPage: pagination.currentPage + 1, 
                limit: limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                prevPage: pagination.currentPage -1,
                limit: limit
            }
        }
      
        pagination.numberOfPagesDisplay = 6

        res.render('bloger/dashboard', { user: req.user, blogs, pagination })
    }
}

const blogercontroller = new BlogerController
export default blogercontroller
