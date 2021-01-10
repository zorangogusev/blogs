import Blog from '../models/Blog.js'

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
    saveNewBlog = async (req, res, next) => {
        req.body.user = req.user.id

        try {
            let newBlog = await Blog.create(req.body)

            req.flash('success_message', 'Successfully created new blog.')
            res.redirect('/bloger/dashboard')
        } catch(error) {
            req.flash('error_message', 'Error, please try again.')
            res.redirect('/blog/new')
        }
    }

    /**
      * @desc    Show Single Blog
      * @route   GET /blog/:id
      * @access  Private
     */
    showBlog = async (req, res, next) => {
        const blog = await Blog.findOne({ _id: req.params.id })

        if(await blog.user.toString() !== req.user._id.toString()) {
            return res.redirect('/bloger/dashboard')
        }

        res.render('blog/show-single-blog', { blog: blog })
    }

    /**
      * @desc    Edit Blog
      * @route   GET /blog/edit/:id
      * @access  Private
     */
    editBlog = async (req, res, next) => {
        const blog = await Blog.findOne({ _id: req.params.id })
        
        if(await blog.user.toString() !== req.user._id.toString()) {
            return res.redirect('/bloger/dashboard')
        }

        res.render('blog/edit-blog', { blog: blog })
    }

    /**
      * @desc    Save Edited Blog
      * @route   PUT /blog/edit/:id
      * @access  Private
     */
    saveEditBlog = async (req, res, next) => {
            let blog = await Blog.findById(req.params.id)
           
            if(await blog.user.toString() !== req.user._id.toString()) {
                return res.redirect('/bloger/dashboard')
            }

        try {
            let blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            req.flash('success_message', 'Blog successfully edited.')
            res.redirect('/blog/edit/' + req.params.id)
        } catch(error) {
            req.flash('error_message', 'Error, please try again.')
            res.redirect('/blog/edit/' + req.params.id)
        }
    }

    /**
      * @desc    Delete Blog
      * @route   DELETE /blog/:id
      * @access  Private
     */
    deleteBlog = async (req, res, next) => {
        console.log('delete blog')
        let blog = await Blog.findById(req.params.id)
           
        console.log(blog)
        if(await blog.user.toString() !== req.user._id.toString()) {3
            console.log('not owner')
            return res.redirect('/bloger/dashboard')
        }

        blog.remove()

        req.flash('success_message', 'Blog successfully deleted.')
        res.redirect('/bloger/dashboard')
    }
}

const blogcontroller = new BlogController
export default blogcontroller
