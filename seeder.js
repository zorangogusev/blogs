import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import User from './models/User.js'
import Blog from './models/Blog.js'

/** Load dotenv file with enviromental data */
dotenv.config({ path: './config/config.env' })

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

/** Read JSON files */
const users = JSON.parse(fs.readFileSync('./_seeder_data/users.json', 'utf-8'))
const blogs = JSON.parse(fs.readFileSync('./_seeder_data/blogs.json', 'utf-8'))

const importData = async () => {
    try {
        await User.create(users)
        await Blog.create(blogs)

        const sourceDirectoryOfBlogPhotos = process.cwd() + '/_seeder_data/blog-photos/'
        const destinationDirectoryOfBlogPhotos = process.cwd() + '/assets/photos/blog-photos/'
        const filesForCopy = await fs.readdirSync(sourceDirectoryOfBlogPhotos)
        for(let filename of filesForCopy){
            /** File destination.txt will be created or overwritten by default */
            await fs.copyFile(sourceDirectoryOfBlogPhotos + filename, destinationDirectoryOfBlogPhotos + filename, (err) => {
                if (err) throw err
                console.log('source.txt was copied to destination.txt')
            })
        }

        console.log('Data imported...'.green.inverse)
        console.log('Photos copied...'.green.inverse)
        process.exit()
    } catch (err) {
        console.log(err)
    }

}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Blog.deleteMany()

        const directoryForDelete = process.cwd() + '/assets/photos/blog-photos'
        const filesForDelete = await fs.readdirSync(directoryForDelete)
        for(let filename of filesForDelete){
            await fs.unlink(path.join(directoryForDelete, filename), err => {
                if (err) console.log(err)
            })
        }

        console.log('Data deleted...'.red.inverse)
        console.log('Photos deleted...'.red.inverse)
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

if(process.argv[2] == '-import') {
    /** node seeder -import */
    importData()
} else if (process.argv[2] == '-delete') {
    deleteData()
}
