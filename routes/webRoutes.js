import express from 'express'
import ensureAuthenticated from '../middleware/ensureAuthenticated.js'

import HomeController from '../controller/HomeController.js'
import UserController from '../controller/UserController.js'
import BlogerController from '../controller/BlogerController.js'
import BlogController from '../controller/BlogController.js'

const router = express.Router()


router.get('/', HomeController.home)
router.get('/about', HomeController.about)
router.get('/login', HomeController.loginPage)
router.get('/register', HomeController.registerPage)


router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)
router.get('/logout', ensureAuthenticated, UserController.logout)


router.get('/bloger/dashboard', ensureAuthenticated, BlogerController.dashboard)

router.get('/blog/new', ensureAuthenticated, BlogController.newBlog)
router.post('/blog/new', ensureAuthenticated, BlogController.saveNewBlog)
router.get('/blog/:slug', ensureAuthenticated, BlogController.showBlog)
router.get('/blog/edit/:id', ensureAuthenticated, BlogController.editBlog)
router.put('/blog/edit/:id', ensureAuthenticated, BlogController.saveEditBlog)
router.delete('/blog/:id', ensureAuthenticated, BlogController.deleteBlog)


export default router
