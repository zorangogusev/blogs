import Blog from '../models/Blog.js'
import { uploadPhoto } from '../middleware/uploadPhoto.js'
import fs from 'fs'

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
        const title = req.body.title
        const description = req.body.description

        try {
            let newBlog = await Blog.create(req.body)

            await uploadPhoto(req, res, () => {
                if(req.fileValidationError) {
                    res.render('blog/new-blog', { 
                        error_message: req.fileValidationError,
                        title: title,
                        description: description
                    })
                } else {
                    req.flash('success_message', 'Successfully created new blog.')
                    res.redirect('/bloger/dashboard')
                }
            })
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
        let old_photo = blog.photo
        let new_photo = req.body.photo
        
        if(await blog.user.toString() !== req.user._id.toString()) {
            return res.redirect('/bloger/dashboard')
        }

        try {
            let blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })

            if(new_photo) {
                if(fs.existsSync(process.cwd() + '/assets/photos/blog-photos/' + old_photo)) {
                    fs.unlink(process.cwd() + '/assets/photos/blog-photos/' + old_photo, (err) => console.log(err))  
                }

                await uploadPhoto(req, res, () => {
                    if(req.fileValidationError) {
                        let message = req.fileValidationError
                    } else {
                        let message = 'Blog successfully edited.'
                    }
                })
            }

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
        let blog = await Blog.findById(req.params.id)
        let photoForDeleting = blog.photo
           
        if(await blog.user.toString() !== req.user._id.toString()) {
            return res.redirect('/bloger/dashboard')
        }

        if(await blog.remove()) {
            if(fs.existsSync(process.cwd() + '/assets/photos/blog-photos/' + photoForDeleting)) {
                fs.unlink(process.cwd() + '/assets/photos/blog-photos/' + photoForDeleting, (err) => console.log(err))  
            }

            req.flash('success_message', 'Blog successfully deleted.')
            res.redirect('/bloger/dashboard')
        }
    }
}

const blogcontroller = new BlogController
export default blogcontroller
