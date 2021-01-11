import mongoose from 'mongoose'
import slugify from 'slugify'

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

blogSchema.pre('validate', async function(next) {
    if(this.title) {
        this.slug = slugify(this.title + '-' + Date.now(), { lower: true, strict: true })
    }

    next()
})

const Blog = mongoose.model('Blog', blogSchema)
export default Blog
