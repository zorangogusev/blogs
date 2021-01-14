const pagination = (model) => 
    async (req, res, next) => {
        let pagination = {}

        /** Pagination - default page = 1, default limit is 2 */
        pagination.currentPage = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 2
        
        const totalItems = await model.countDocuments({ user: req.user.id })
        pagination.totalPages = Math.ceil(totalItems / limit)

        /** Get blogs from database */
        const startIndex = (pagination.currentPage - 1) * limit
        const endIndex = pagination.currentPage * limit
        const blogs = await model.find({ user: req.user.id }).skip(startIndex).limit(limit)

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

        console.log(pagination)
        console.log(blogs)

        res.data = {
            blogs: blogs,
            pagination
        } 

        next()
}

export default pagination
