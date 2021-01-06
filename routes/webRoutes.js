import express from 'express'
import HomeController from '../controller/HomeController.js'
import UserController from '../controller/UserController.js'

const router = express.Router()

router.get('/', HomeController.home)
router.get('/about', HomeController.about)
router.get('/login', HomeController.loginPage)
router.get('/register', HomeController.registerPage)


router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)

export default router
