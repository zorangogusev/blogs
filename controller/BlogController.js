class BlogController {


    /**
      * @desc    Create Blog
      * @route   POST /blog/new
      * @access  Private
     */
    newBlog = (req, res, next) => {


        res.render('blog/new-blog')
    }

    /**
      * @desc    Save New Blog
      * @route   POST /blog/new
      * @access  Private
     */
    saveNewBlog = (req, res, next) => {
        console.log('saveNewBlog')

        res.render('blog/new-blog')
    }


    /**
      * @desc    Show Single Blog
      * @route   GET /blog/:slug
      * @access  Private
     */
    showBlog = (req, res, next) => {
        const blog = {
                        id: 1,
                        title: "Test",
                        description: "Description for Test",
                        slug: "test-1"

                    }

        res.render('blog/show-single-blog', { blog: blog })
    }

    /**
      * @desc    Edit Blog
      * @route   GET /blog/edit/:id
      * @access  Private
     */
    editBlog = (req, res, next) => {
        const blog = {
                        id: 1,
                        title: "Test",
                        description: "Description for Test",
                        slug: "test-1"

                    }

        res.render('blog/edit-blog', { blog: blog })
    }

    /**
      * @desc    Save Edited Blog
      * @route   PUT /blog/edit/:id
      * @access  Private
     */
    saveEditBlog = (req, res, next) => {
        console.log('saveEditBlog')

        res.redirect('/bloger/dashboard')
    }

        /**
      * @desc    Delete Blog
      * @route   DELETE /blog/:id
      * @access  Private
     */
    deleteBlog = (req, res, next) => {
        console.log('delete blog')

        // res.render('blog/edit-blog', { blog: blog })
    }

}

const blogcontroller = new BlogController
export default blogcontroller
