const pagination = (model, blogsPerPage) => 
    async (req, res, next) => {
        let pagination = {}

        /** Pagination - default page = 1, default limit is 2 */
        pagination.currentPage = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || blogsPerPage
        
        /** Get blogs from database */
        const startIndex = (pagination.currentPage - 1) * limit
        const endIndex = pagination.currentPage * limit

        let totalItems = 0
        let blogs = {}

        if(typeof req.user != 'undefined' && req.originalUrl.split('?')[0] == '/bloger/dashboard' ) {
            console.log('have req.user.id')
            totalItems = await model.countDocuments({ user: req.user.id })
            blogs = await model.find({ user: req.user.id }).skip(startIndex).limit(limit)
        } else {
            console.log('dont have req.user.id')
            totalItems = await model.countDocuments()
            blogs = await model.find().skip(startIndex).limit(limit)
        }

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
      
        pagination.totalPages = Math.ceil(totalItems / limit)
        pagination.numberOfPagesDisplay = 6
        pagination.urlParams = req.originalUrl.split('?')[0]
        
        res.data = {
            blogs: blogs,
            pagination
        } 

        next()
}

export default pagination
